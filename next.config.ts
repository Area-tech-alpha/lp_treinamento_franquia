import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Todas as imagens vêm de /public. Para usar imagens de outro domínio,
    // declare aqui, ex.: { protocol: "https", hostname: "cdn.exemplo.com" }
    remotePatterns: [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
