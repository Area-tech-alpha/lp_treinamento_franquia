import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// /obrigado fica fora do sitemap (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
