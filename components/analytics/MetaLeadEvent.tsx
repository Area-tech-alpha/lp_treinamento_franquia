"use client";

import { useEffect } from "react";
import { metaOriginParams } from "@/lib/meta-event-origin";
import { LEAD_EVENT_ID_KEY } from "@/lib/meta-lead-event";

/**
 * Em /obrigado: dispara o Lead do pixel UMA vez, com o mesmo eventID que o servidor
 * mandou pela CAPI (deduplicação). O id sai do sessionStorage antes do disparo, então
 * recarregar a página não dispara de novo. Sem fbq (bloqueado), não faz nada.
 */
export function MetaLeadEvent() {
  useEffect(() => {
    let eventId: string | null = null;
    try {
      eventId = sessionStorage.getItem(LEAD_EVENT_ID_KEY);
      if (eventId) sessionStorage.removeItem(LEAD_EVENT_ID_KEY);
    } catch {
      return; // sessionStorage indisponível
    }
    if (!eventId) return;
    const eventID = eventId;

    // O <Script id="meta-pixel"> é afterInteractive: o stub do fbq pode ainda não
    // existir neste momento. Espera até 5 s; o stub enfileira até o fbevents.js carregar.
    let tries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const fire = () => {
      if (typeof window.fbq === "function") {
        try {
          window.fbq("track", "Lead", metaOriginParams("navegador", "/obrigado"), { eventID });
        } catch {
          /* pixel quebrado/bloqueado: a CAPI já cobre o Lead */
        }
        return;
      }
      if (++tries < 50) timer = setTimeout(fire, 100);
    };
    fire();
    return () => clearTimeout(timer);
  }, []);

  return null;
}
