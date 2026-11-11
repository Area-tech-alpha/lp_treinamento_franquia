"use client";

import { useEffect } from "react";
import { LEAD_FLAG, trackLead } from "@/lib/track";

/**
 * Dispara o evento "Lead" — usado SOMENTE em /obrigado.
 * Só conta quando a pessoa chegou aqui pelo envio do formulário
 * (flag na sessão), para recarregar a página não gerar Lead duplicado.
 */
export function LeadEvent() {
  useEffect(() => {
    let shouldTrack = true;
    try {
      shouldTrack = sessionStorage.getItem(LEAD_FLAG) === "1";
      sessionStorage.removeItem(LEAD_FLAG);
    } catch {
      /* sem sessionStorage: dispara mesmo assim */
    }
    if (shouldTrack) trackLead();
  }, []);

  return null;
}
