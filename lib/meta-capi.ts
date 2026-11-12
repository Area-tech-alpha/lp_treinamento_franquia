import { createHash } from "node:crypto";
import { getMetaCapiToken, META_PIXEL_ID, type CapiTokenInfo } from "@/lib/meta-pixels";
import { metaOriginParams, pathFromUrl } from "@/lib/meta-event-origin";

const GRAPH_API_VERSION = "v21.0";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

/** [sha256(trim + lowercase)] ou undefined (o campo é omitido, nunca vai null). */
function hashed(value: string | null | undefined) {
  const v = value?.trim().toLowerCase();
  return v ? [sha256(v)] : undefined;
}

/** Remove chaves undefined/null/"" (nada de "ph":[null]). */
function compact(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  );
}

export type CapiLeadInput = {
  eventId: string;
  eventSourceUrl?: string;
  email: string;
  /** Só dígitos, já com 55. */
  phone: string;
  name: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
};

export type CapiResult = {
  status: "sent" | "error" | "no_token";
  httpStatus?: number;
  eventsReceived?: number;
  fbtraceId?: string;
  error?: string;
  testEventCode?: string;
  hasFbp: boolean;
  hasFbc: boolean;
  durationMs?: number;
  token?: CapiTokenInfo;
};

// Nunca lança. Chamado dentro de after(), depois de o webhook responder ok, para não
// atrasar nem quebrar o envio do lead. O eventId é o mesmo do fbq("track","Lead") do
// navegador em /obrigado: é ele que permite à Meta deduplicar pixel e servidor.
// Logs sem token e sem dados pessoais.
export async function sendLeadToMetaCapi(input: CapiLeadInput): Promise<CapiResult> {
  const base = { hasFbp: !!input.fbp, hasFbc: !!input.fbc };
  const credentials = getMetaCapiToken();
  if (!credentials) {
    console.warn("[meta-capi] META_CAPI_TOKEN não definido — Lead não enviado pelo servidor");
    return { ...base, status: "no_token" };
  }
  const { token, info: tokenInfo } = credentials;
  const pixelId = META_PIXEL_ID;
  const [firstName, ...rest] = input.name.trim().split(/\s+/);
  const lastName = rest.length ? rest[rest.length - 1] : undefined;

  const userData = compact({
    em: hashed(input.email),
    ph: hashed(input.phone.replace(/\D/g, "")),
    fn: hashed(firstName),
    ln: hashed(lastName),
    client_ip_address: input.ip,
    client_user_agent: input.userAgent,
    fbp: input.fbp,
    fbc: input.fbc,
  });

  const body: Record<string, unknown> = {
    data: [
      compact({
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl,
        user_data: userData,
        custom_data: metaOriginParams("servidor", pathFromUrl(input.eventSourceUrl)),
      }),
    ],
  };

  // Com test_event_code o evento só aparece na aba "Testar eventos" e não conta
  // para os anúncios. Vai no log justamente para flagrar isso em produção.
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim() || undefined;
  if (testEventCode) body.test_event_code = testEventCode;

  const startedAt = Date.now();
  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      },
    );
    const json = (await res.json().catch(() => ({}))) as {
      events_received?: number;
      fbtrace_id?: string;
      error?: { message?: string; fbtrace_id?: string };
    };
    const result: CapiResult = {
      ...base,
      status: res.ok ? "sent" : "error",
      httpStatus: res.status,
      eventsReceived: json.events_received,
      fbtraceId: json.fbtrace_id ?? json.error?.fbtrace_id,
      error: json.error?.message,
      testEventCode,
      durationMs: Date.now() - startedAt,
      token: res.ok ? undefined : tokenInfo,
    };
    if (res.ok) {
      console.info(`[meta-capi:${pixelId}] Lead ${input.eventId} recebido`, result);
    } else {
      console.error(`[meta-capi:${pixelId}] Lead ${input.eventId} HTTP ${res.status}`, result);
    }
    return result;
  } catch (err) {
    const error = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error(`[meta-capi:${pixelId}] Lead ${input.eventId} erro de rede: ${error}`);
    return { ...base, status: "error", error, testEventCode, durationMs: Date.now() - startedAt };
  }
}

// fbclid capturado na sessão é a fonte principal: não depende do Pixel ter carregado.
// O cookie _fbc ("fb.1.<ms>.<fbclid>") vale se for do mesmo clique. Sem cookie mas
// com fbclid, monta o fbc no formato da Meta (como na LP Restaurante).
export function resolveMetaClickIds(
  cookie: { fbc?: string; fbp?: string },
  sessionFbclid: string | undefined,
) {
  const fbcCookie = cookie.fbc || undefined;
  const fbclidFromCookie = fbcCookie?.split(".").slice(3).join(".") || undefined;
  const fbclid = sessionFbclid || fbclidFromCookie;
  const fbc =
    fbcCookie && (!sessionFbclid || fbclidFromCookie === sessionFbclid)
      ? fbcCookie
      : fbclid
        ? `fb.1.${Date.now()}.${fbclid}`
        : undefined;
  return { fbc, fbp: cookie.fbp || undefined };
}
