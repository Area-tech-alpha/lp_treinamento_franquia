import { z } from "zod";
import { leadOptions } from "@/content/abs";
import { PHONE_PATTERN } from "@/lib/phone";
import { ATTRIBUTION_KEYS } from "@/lib/utm";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");

/** Campos preenchidos pela pessoa (validados no navegador e no servidor). */
export const leadFields = {
  nome: z.string().trim().min(2, "Informe seu nome.").max(120, "Nome muito longo."),
  whatsapp: z
    .string()
    .trim()
    .regex(PHONE_PATTERN, "Informe o WhatsApp no formato (00) 00000-0000."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(160, "E-mail muito longo.")
    .pipe(z.email("Informe um e-mail válido.")),
  agencia: z
    .string()
    .trim()
    .min(2, "Informe o nome ou @ da agência.")
    .max(120, "Texto muito longo."),
  faturamento: z.enum(leadOptions.faturamento, { error: "Escolha o faturamento mensal." }),
  time: z.enum(leadOptions.time, { error: "Escolha o tamanho do time." }),
  prazo: z.enum(leadOptions.prazo, { error: "Escolha quando quer começar." }),
  consentimento: z.literal(true, { error: "Para continuar, aceite receber contato." }),
};

/** Corpo do POST /api/lead: campos + atribuição + página de envio. */
export const leadSchema = z.object({
  ...leadFields,
  ...(Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, optionalText(1000)])) as Record<
    (typeof ATTRIBUTION_KEYS)[number],
    ReturnType<typeof optionalText>
  >),
  pagina_envio: optionalText(1000),
  // event_id do Lead (UUID gerado no navegador): o mesmo vai no pixel e na CAPI.
  event_id: optionalText(64),
  // honeypot anti-spam: se vier preenchido, a API descarta em silêncio
  website: optionalText(500),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
