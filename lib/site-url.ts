/**
 * URL pública do site, usada em metadataBase (OG image, canonical),
 * sitemap e robots.
 *
 * Ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL — defina com o domínio final (ex.: https://alpha.com.br)
 * 2. VERCEL_PROJECT_PRODUCTION_URL — domínio de produção do projeto na Vercel
 * 3. VERCEL_URL — URL do deploy atual (previews)
 * 4. http://localhost:3000 — desenvolvimento local
 */
function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();
