"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/utm";

/** Guarda UTMs, click IDs, landing page e referrer na primeira página da sessão. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
