/* Helpers de rastreamento (Meta Pixel + GTM/GA4). Só rodam no navegador. */

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/** Marca, no envio do formulário, que a próxima /obrigado vem de um lead real. */
export const LEAD_FLAG = "abs_lead_ok";

/** Chama fbq quando o Pixel estiver carregado (tenta por até ~5s). */
function withFbq(fn: (fbq: Fbq) => void, tries = 25) {
  if (window.fbq) return fn(window.fbq);
  if (tries > 0) setTimeout(() => withFbq(fn, tries - 1), 200);
}

export function trackPageView() {
  withFbq((fbq) => fbq("track", "PageView"));
}

/** Evento de conversão. Usado SOMENTE na página /obrigado. */
export function trackLead() {
  withFbq((fbq) => fbq("track", "Lead"));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead" });
  window.gtag?.("event", "generate_lead");
}
