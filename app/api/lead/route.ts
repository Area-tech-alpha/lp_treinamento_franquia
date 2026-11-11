import { z } from "zod";
import { leadSchema } from "@/lib/lead-schema";

/**
 * POST /api/lead
 * Valida o lead (zod) e repassa para o webhook do n8n (LEAD_WEBHOOK_URL),
 * que alimenta a planilha de leads e dispara o WhatsApp.
 * A URL do webhook fica só no servidor — nunca vai para o navegador.
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

  const { website, ...lead } = parsed.data;

  // Honeypot preenchido = robô. Responde OK sem repassar.
  if (website) return Response.json({ ok: true });

  const payload = {
    ...lead,
    whatsapp_digitos: `55${lead.whatsapp.replace(/\D/g, "")}`,
    origem: "LP Alpha Business School",
    pagina: request.headers.get("referer") ?? "",
    enviado_em: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      // Em desenvolvimento, sem webhook configurado: só registra no terminal.
      console.info("[api/lead] LEAD_WEBHOOK_URL não definido. Lead recebido:", payload);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[api/lead] LEAD_WEBHOOK_URL não configurado.");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[api/lead] Webhook respondeu", res.status);
      return Response.json({ ok: false, error: "webhook" }, { status: 502 });
    }
  } catch (err) {
    console.error("[api/lead] Falha ao chamar o webhook:", err);
    return Response.json({ ok: false, error: "webhook" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
