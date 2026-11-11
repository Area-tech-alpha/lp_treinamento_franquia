import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Todas as imagens vêm de /public. Para usar imagens de outro domínio,
    // declare aqui, ex.: { protocol: "https", hostname: "cdn.exemplo.com" }
    remotePatterns: [],
    // 80 = qualidade do fundo do hero (Next 16 exige a lista de qualidades permitidas)
    qualities: [75, 80],
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
