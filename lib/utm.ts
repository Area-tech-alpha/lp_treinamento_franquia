import { UTM_KEYS } from "@/lib/lead-schema";

export type Utms = Record<(typeof UTM_KEYS)[number], string>;

const STORAGE_KEY = "abs_utms";

const empty = (): Utms =>
  Object.fromEntries(UTM_KEYS.map((k) => [k, ""])) as Utms;

/**
 * Lê as UTMs da URL na chegada e guarda em sessionStorage.
 * Se a URL não tiver UTMs, devolve as já guardadas na sessão.
 */
export function captureUtms(): Utms {
  const fromUrl = empty();
  let hasUrlUtm = false;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) {
        fromUrl[k] = v.slice(0, 300);
        hasUrlUtm = true;
      }
    }
  } catch {
    /* ignore */
  }

  try {
    if (hasUrlUtm) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return { ...empty(), ...(JSON.parse(saved) as Partial<Utms>) };
  } catch {
    /* sessionStorage indisponível (aba anônima, bloqueio etc.) */
  }
  return fromUrl;
}
