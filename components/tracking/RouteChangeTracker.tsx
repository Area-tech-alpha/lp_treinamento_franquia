"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/track";

/**
 * PageView do Pixel nas navegações internas (ex.: formulário → /obrigado).
 * O PageView da primeira carga já é disparado pelo script do Pixel.
 * (GA4 rastreia mudanças de rota sozinho via "enhanced measurement".)
 */
export function RouteChangeTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}
