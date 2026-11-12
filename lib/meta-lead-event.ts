/** Chave do sessionStorage com o eventId do Lead (gravada no envio, lida em /obrigado). */
export const LEAD_EVENT_ID_KEY = "abs_meta_lead_event_id";

/** UUID v4 para o event_id do Lead (pixel + CAPI). */
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* contexto não seguro */
  }
  // Fallback para navegadores sem crypto.randomUUID.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** Guarda o eventId para o /obrigado disparar o Lead do pixel. */
export function storeLeadEventId(eventId: string): void {
  try {
    sessionStorage.setItem(LEAD_EVENT_ID_KEY, eventId);
  } catch {
    /* sessionStorage indisponível: só o Lead do servidor (CAPI) é enviado */
  }
}
