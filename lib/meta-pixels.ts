// Fixo no código (não em env) de propósito: só este pixel deve receber eventos
// desta LP. Mesmo padrão da LP Restaurante.
export const META_PIXEL_ID = "1769339974357043";

export type CapiTokenInfo = {
  source: string;
  length: number;
  startsWithEAA: boolean;
  wasSanitized: boolean;
};

// Token colado na Vercel com espaço, quebra de linha, aspas ou "Bearer" faz o Meta
// responder "Cannot parse access token". Limpa isso e devolve um diagnóstico
// (sem o token) para o log mostrar o que veio de errado.
export function getMetaCapiToken(): { token: string; info: CapiTokenInfo } | undefined {
  const specificKey = `META_CAPI_TOKEN_${META_PIXEL_ID}`;
  const source = process.env[specificKey] ? specificKey : "META_CAPI_TOKEN";
  const raw = process.env[source];
  if (!raw) return undefined;

  const token = raw.trim().replace(/^["']|["']$/g, "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return undefined;

  return {
    token,
    info: {
      source,
      length: token.length,
      startsWithEAA: token.startsWith("EAA"),
      wasSanitized: token !== raw,
    },
  };
}
