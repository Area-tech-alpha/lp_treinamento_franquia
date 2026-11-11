import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Deploys de preview da Vercel não devem ser indexados.
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    rules: isPreview
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
