import { z } from "zod";
import { leadOptions } from "@/content/abs";
import { PHONE_PATTERN } from "@/lib/phone";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const utm = z.string().trim().max(300).optional().default("");

/** Validação do lead — usada no formulário (client) e em /api/lead (server). */
export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Nome muito longo."),
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
  faturamento: z.enum(leadOptions.faturamento, {
    error: "Escolha o faturamento mensal.",
  }),
  time: z.enum(leadOptions.time, { error: "Escolha o tamanho do time." }),
  investimento: z.enum(leadOptions.investimento, {
    error: "Escolha uma opção.",
  }),
  prazo: z.enum(leadOptions.prazo, { error: "Escolha quando quer começar." }),
  consentimento: z.literal(true, {
    error: "Para continuar, aceite receber contato.",
  }),
  utm_source: utm,
  utm_medium: utm,
  utm_campaign: utm,
  utm_content: utm,
  utm_term: utm,
  // honeypot anti-spam: se vier preenchido, a API descarta em silêncio
  website: z.string().max(500).optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
