// Meta Pixel (fbevents.js), injetado pelo <Script id="meta-pixel"> do app/layout.tsx.
// O stub existe mesmo com o fbevents.js bloqueado (adblock, navegador do Instagram):
// só o script real define fbq.callMethod.
type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export {};
