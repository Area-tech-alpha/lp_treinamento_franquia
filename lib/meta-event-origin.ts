// Parâmetros de origem que vão em TODO evento desta LP para o pixel
// (custom_data). Com "origem" e "canal", o Events Manager e as conversões
// personalizadas separam o que veio daqui e por qual canal (pixel ou CAPI).
// Sem import de Node: usado no navegador (pixel) e no servidor (CAPI).

export const META_EVENT_ORIGIN = "lp-alpha-business-school";

export type MetaEventChannel = "navegador" | "servidor";

export function metaOriginParams(canal: MetaEventChannel, pagina: string | null | undefined) {
  return {
    origem: META_EVENT_ORIGIN,
    canal,
    ...(pagina ? { pagina } : {}),
  };
}

// Caminho sem query: UTM/fbclid não precisam ir duplicados (a Meta já recebe a URL).
export function pathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
}
