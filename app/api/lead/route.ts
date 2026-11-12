import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { after } from "next/server";
import { z } from "zod";
import { resolveMetaClickIds, sendLeadToMetaCapi } from "@/lib/meta-capi";
import { leadSchema } from "@/lib/lead-schema";

/** Data/hora ISO 8601 no fuso America/Sao_Paulo, ex.: 2026-11-11T17:20:05-03:00 */
function nowSaoPaulo(date = new Date()): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const offset = (parts.timeZoneName ?? "GMT-03:00").replace("GMT", "") || "+00:00";
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

/** URL mascarada para log: só host + primeiros 8 caracteres do path. */
function maskUrl(raw: string): string {
  try {
    const u = new URL(raw);
    return `${u.host}${u.pathname.slice(0, 8)}…`;
  } catch {
    return "(URL inválida)";
  }
}

/**
 * POST /api/lead
 * Valida o lead (zod) e repassa para o webhook (LEAD_WEBHOOK_URL), que alimenta
 * a planilha e dispara o WhatsApp. A URL do webhook fica só no servidor.
 * Com o webhook ok, agenda o Lead da CAPI (Meta) em after(): não atrasa nem
 * quebra a resposta.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot preenchido = robô. Responde OK sem repassar.
  if (lead.website) return Response.json({ ok: true });

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";

  // Chaves fixas; string vazia quando não houver valor.
  const payload = {
    nome: lead.nome,
    whatsapp: `55${lead.whatsapp.replace(/\D/g, "")}`,
    whatsapp_formatado: lead.whatsapp,
    email: lead.email,
    agencia: lead.agencia,
    faturamento: lead.faturamento,
    tamanho_time: lead.time,
    inicio: lead.prazo,
    consentimento: true,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_content: lead.utm_content,
    utm_term: lead.utm_term,
    utm_id: lead.utm_id,
    gclid: lead.gclid,
    fbclid: lead.fbclid,
    landing_page: lead.landing_page,
    referrer: lead.referrer,
    pagina_envio: lead.pagina_envio || request.headers.get("referer") || "",
    user_agent: request.headers.get("user-agent") ?? "",
    ip: forwardedFor.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "",
    origem: "lp-alpha-business-school",
    enviado_em: nowSaoPaulo(),
  };

  // Dados da CAPI resolvidos agora (cookies da requisição); o envio fica para o after().
  const cookieStore = await cookies();
  const { fbc, fbp } = resolveMetaClickIds(
    { fbc: cookieStore.get("_fbc")?.value, fbp: cookieStore.get("_fbp")?.value },
    lead.fbclid || undefined,
  );
  const scheduleCapi = () =>
    after(() =>
      sendLeadToMetaCapi({
        eventId: lead.event_id || randomUUID(),
        eventSourceUrl: payload.pagina_envio || undefined,
        email: lead.email,
        phone: payload.whatsapp,
        name: lead.nome,
        ip: payload.ip || undefined,
        userAgent: payload.user_agent || undefined,
        fbp,
        fbc,
      }),
    );

  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      // Em desenvolvimento, sem webhook configurado: só registra no terminal.
      console.info("[api/lead] LEAD_WEBHOOK_URL ausente (dev). Payload:", payload);
      scheduleCapi();
      return Response.json({ ok: true, dev: true });
    }
    console.error("[api/lead] LEAD_WEBHOOK_URL ausente");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  // Logs de falha: nunca a URL completa nem os dados do lead.
  const target = maskUrl(webhook);
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const body = (await res.text().catch(() => "")).slice(0, 300);
      console.error(
        `[api/lead] Webhook falhou: status=${res.status} timeout=false destino=${target} corpo=${JSON.stringify(body)}`,
      );
      return Response.json({ ok: false, error: "webhook" }, { status: 502 });
    }
  } catch (err) {
    const timeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    const reason = err instanceof Error ? `${err.name}: ${err.message}`.slice(0, 300) : "erro desconhecido";
    console.error(
      `[api/lead] Webhook falhou: status=sem-resposta timeout=${timeout} destino=${target} erro=${JSON.stringify(reason)}`,
    );
    return Response.json({ ok: false, error: "webhook" }, { status: 502 });
  }

  scheduleCapi();
  return Response.json({ ok: true });
}
