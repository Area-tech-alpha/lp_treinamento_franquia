/**
 * Atribuição first-touch: na primeira página da sessão, lê UTMs/click IDs da
 * URL, a landing page e o referrer, e guarda em sessionStorage. Visitas
 * seguintes na mesma sessão NÃO sobrescrevem o que já foi guardado.
 */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "fbclid",
  "landing_page",
  "referrer",
] as const;

export type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string>;

const STORAGE_KEY = "abs_attribution";
const URL_PARAMS = ATTRIBUTION_KEYS.filter(
  (k) => k !== "landing_page" && k !== "referrer",
);

const empty = (): Attribution =>
  Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, ""])) as Attribution;

function fromCurrentPage(): Attribution {
  const data = empty();
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of URL_PARAMS) data[k] = (params.get(k) ?? "").slice(0, 300);
    data.landing_page = window.location.href.slice(0, 1000);
    data.referrer = document.referrer.slice(0, 1000);
  } catch {
    /* ignore */
  }
  return data;
}

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty(), ...(JSON.parse(raw) as Partial<Attribution>) } : null;
  } catch {
    return null;
  }
}

/** Chamada ao carregar qualquer página: guarda só se ainda não houver nada. */
export function captureAttribution(): void {
  if (readStored()) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromCurrentPage()));
  } catch {
    /* sessionStorage indisponível (aba anônima, bloqueio etc.) */
  }
}

/** Atribuição para o envio do lead (guardada; se não houver, a da página atual). */
export function getAttribution(): Attribution {
  return readStored() ?? fromCurrentPage();
}
