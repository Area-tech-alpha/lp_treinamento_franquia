"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { form, leadOptions } from "@/content/abs";
import { leadSchema } from "@/lib/lead-schema";
import { maskPhone } from "@/lib/phone";
import { ATTRIBUTION_KEYS, getAttribution } from "@/lib/utm";
import { buttonClass, SmartLink } from "@/components/ui/primitives";

type ChoiceField = keyof typeof leadOptions;
type TextField = "nome" | "whatsapp" | "email" | "agencia";
type Field = TextField | ChoiceField | "consentimento";
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = [
  "nome",
  "whatsapp",
  "email",
  "agencia",
  "faturamento",
  "time",
  "prazo",
  "consentimento",
];

// Inputs h-11; no mobile, altura mínima de 40px reais e fonte de 16px (globals.css)
// para o iOS não dar zoom.
const inputCls =
  "block h-11 w-full rounded-lg border bg-white px-4 text-base text-ink placeholder:text-ink/40 outline-none transition focus:border-alpha focus:ring-4 focus:ring-alpha/25 max-lg:h-[2.875rem]";

export function LeadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [text, setText] = useState<Record<TextField, string>>({
    nome: "",
    whatsapp: "",
    email: "",
    agencia: "",
  });
  const [choice, setChoice] = useState<Partial<Record<ChoiceField, string>>>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  // Campos ocultos (briefing): preenchidos com a atribuição first-touch da sessão.
  useEffect(() => {
    const data = getAttribution();
    const el = formRef.current;
    if (!el) return;
    for (const k of ATTRIBUTION_KEYS) {
      const input = el.elements.namedItem(k);
      if (input instanceof HTMLInputElement) input.value = data[k];
    }
  }, []);

  const clearError = (f: Field) =>
    setErrors((e) => (e[f] ? { ...e, [f]: undefined } : e));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      ...text,
      ...choice,
      consentimento: consent,
      // atribuição: campos ocultos; se vazios, a guardada na sessão
      ...(() => {
        const stored = getAttribution();
        return Object.fromEntries(
          ATTRIBUTION_KEYS.map((k) => [k, String(fd.get(k) || stored[k] || "")]),
        );
      })(),
      pagina_envio: window.location.href,
      website: String(fd.get("website") ?? ""),
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (FIELD_ORDER.includes(key) && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = FIELD_ORDER.find((f) => next[f]);
      if (first) {
        formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/obrigado");
    } catch {
      // Webhook fora de 2xx (502) ou falha de rede: mostra erro e não redireciona.
      setStatus("error");
    }
  }

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-erro`} className="mt-1.5 text-sm font-medium text-red-600">
        {errors[f]}
      </p>
    ) : null;

  const textInput = (f: TextField, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={f} className="mb-1.5 block text-sm font-semibold text-ink">
        {form.labels[f]}
      </label>
      <input
        id={f}
        name={f}
        data-field={f}
        value={text[f]}
        onChange={(e) => {
          const v = f === "whatsapp" ? maskPhone(e.target.value) : e.target.value;
          setText((t) => ({ ...t, [f]: v }));
          clearError(f);
        }}
        aria-invalid={!!errors[f]}
        aria-describedby={errors[f] ? `${f}-erro` : undefined}
        className={`${inputCls} ${errors[f] ? "border-red-500" : "border-ink/15"}`}
        {...props}
      />
      {fieldError(f)}
    </div>
  );

  // Opções em chips (flex-wrap, largura pelo conteúdo). Radio real (sr-only) com foco visível.
  const choiceGroup = (f: ChoiceField) => (
    <div role="radiogroup" aria-labelledby={`${f}-label`}>
      <p id={`${f}-label`} className="mb-1.5 text-sm font-semibold text-ink">
        {form.labels[f]}
      </p>
      <div className="flex flex-wrap gap-2">
        {leadOptions[f].map((opt, i) => {
          const checked = choice[f] === opt;
          return (
            <label
              key={opt}
              className={`inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition has-focus-visible:ring-4 has-focus-visible:ring-alpha/40 max-lg:h-auto max-lg:min-h-[2.875rem] ${
                checked
                  ? "border-alpha bg-alpha text-black"
                  : `bg-white text-ink hover:border-ink/40 ${errors[f] ? "border-red-400" : "border-ink/15"}`
              }`}
            >
              <input
                type="radio"
                name={f}
                value={opt}
                checked={checked}
                data-field={i === 0 ? f : undefined}
                aria-describedby={errors[f] ? `${f}-erro` : undefined}
                onChange={() => {
                  setChoice((c) => ({ ...c, [f]: opt }));
                  clearError(f);
                }}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
      {fieldError(f)}
    </div>
  );

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 text-ink shadow-[0_40px_100px_-40px_rgba(255,171,0,0.45)] lg:p-7"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {textInput("nome", { type: "text", autoComplete: "name", placeholder: "Seu nome" })}
        {textInput("whatsapp", {
          type: "tel",
          inputMode: "numeric",
          autoComplete: "tel-national",
          placeholder: "(00) 00000-0000",
        })}
        {textInput("email", { type: "email", autoComplete: "email", placeholder: "voce@agencia.com.br" })}
        {textInput("agencia", {
          type: "text",
          autoComplete: "organization",
          placeholder: "Nome ou @ da agência",
        })}
      </div>

      {choiceGroup("faturamento")}
      {choiceGroup("time")}
      {choiceGroup("prazo")}

      {/* Honeypot anti-spam (invisível para pessoas) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Campos ocultos de atribuição (sem value: o React não sobrescreve o que o efeito grava) */}
      {ATTRIBUTION_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} />
      ))}

      <div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink/80 max-lg:min-h-[2.875rem]">
          <input
            type="checkbox"
            data-field="consentimento"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              clearError("consentimento");
            }}
            aria-invalid={!!errors.consentimento}
            aria-describedby={errors.consentimento ? "consentimento-erro" : undefined}
            className="size-5 shrink-0 accent-alpha"
          />
          <span>
            {form.consent.text} (
            <SmartLink
              href={form.consent.href}
              className="font-semibold text-ink underline underline-offset-2 hover:text-alpha"
              target="_blank"
            >
              {form.consent.linkLabel}
            </SmartLink>
            ).
          </span>
        </label>
        {fieldError("consentimento")}
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {form.error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className={buttonClass("primary", "form")}
      >
        {sending && (
          <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {sending ? form.sending : form.submit}
      </button>
    </form>
  );
}
