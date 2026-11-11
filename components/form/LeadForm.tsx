"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { form, leadOptions, whatsapp } from "@/content/abs";
import { leadSchema, UTM_KEYS } from "@/lib/lead-schema";
import { maskPhone } from "@/lib/phone";
import { LEAD_FLAG } from "@/lib/track";
import { captureUtms } from "@/lib/utm";
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
  "investimento",
  "prazo",
  "consentimento",
];

const inputCls =
  "mt-2.5 block w-full rounded-xl border bg-white px-5 py-4 text-lg text-ink placeholder:text-ink/40 outline-none transition focus:border-alpha focus:ring-4 focus:ring-alpha/25";

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

  // UTMs: lidas da URL na chegada, guardadas na sessão e escritas nos campos ocultos.
  useEffect(() => {
    const utms = captureUtms();
    const el = formRef.current;
    if (!el) return;
    for (const k of UTM_KEYS) {
      const input = el.elements.namedItem(k);
      if (input instanceof HTMLInputElement) input.value = utms[k];
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
      // UTMs: campo oculto (preenchido na chegada) ou, como reserva, a sessão.
      ...(() => {
        const stored = captureUtms();
        return Object.fromEntries(
          UTM_KEYS.map((k) => [k, String(fd.get(k) || stored[k] || "")]),
        );
      })(),
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
        formRef.current
          ?.querySelector<HTMLElement>(`[data-field="${first}"]`)
          ?.focus();
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
      try {
        sessionStorage.setItem(LEAD_FLAG, "1");
      } catch {
        /* ignore */
      }
      router.push("/obrigado");
    } catch {
      setStatus("error");
    }
  }

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-erro`} className="mt-2 text-base font-medium text-red-600">
        {errors[f]}
      </p>
    ) : null;

  const textInput = (
    f: TextField,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <label htmlFor={f} className="text-base font-semibold text-ink md:text-lg">
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

  const choiceGroup = (f: ChoiceField, cols: string) => (
    <fieldset>
      <legend className="text-base font-semibold text-ink md:text-lg">
        {form.labels[f]}
      </legend>
      <div className={`mt-3 flex flex-wrap gap-3 ${cols}`}>
        {leadOptions[f].map((opt, i) => {
          const checked = choice[f] === opt;
          return (
          <label
            key={opt}
            className={`relative flex min-w-max grow basis-0 cursor-pointer items-center gap-3 rounded-xl border whitespace-nowrap px-5 py-4 text-base font-medium text-ink md:text-lg transition has-checked:border-alpha has-checked:bg-alpha/15 has-checked:ring-2 has-checked:ring-alpha has-focus-visible:ring-4 has-focus-visible:ring-alpha/40 hover:border-ink/40 ${
              errors[f] ? "border-red-400" : "border-ink/15"
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
            <span
              aria-hidden="true"
              className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                checked ? "border-alpha bg-alpha" : "border-ink/25"
              }`}
            >
              {checked && <span className="size-2.5 rounded-full bg-ink" />}
            </span>
            {opt}
          </label>
          );
        })}
      </div>
      {fieldError(f)}
    </fieldset>
  );

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-8 rounded-3xl bg-white p-6 text-ink shadow-[0_40px_100px_-40px_rgba(255,171,0,0.45)] sm:p-10 lg:p-12"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {textInput("nome", { type: "text", autoComplete: "name", placeholder: "Seu nome" })}
        {textInput("whatsapp", {
          type: "tel",
          inputMode: "numeric",
          autoComplete: "tel-national",
          placeholder: "(00) 00000-0000",
        })}
        {textInput("email", {
          type: "email",
          autoComplete: "email",
          placeholder: "voce@agencia.com.br",
        })}
        {textInput("agencia", {
          type: "text",
          autoComplete: "organization",
          placeholder: "Nome ou @ da agência",
        })}
      </div>

      {choiceGroup("faturamento", "")}
      {choiceGroup("time", "")}
      {choiceGroup("investimento", "")}
      {choiceGroup("prazo", "")}

      {/* Honeypot anti-spam (invisível para pessoas) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Campos ocultos de UTM (preenchidos no envio a partir da sessão) */}
      {UTM_KEYS.map((k) => (
        // sem value/defaultValue: o React não pode sobrescrever o valor escrito no efeito
        <input key={k} type="hidden" name={k} />
      ))}

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-base text-ink/80">
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
            className="mt-0.5 size-6 shrink-0 accent-alpha"
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
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-base text-red-700">
          {form.error}{" "}
          <SmartLink
            href={whatsapp("Erro no formulário")}
            className="font-semibold underline underline-offset-2"
          >
            Falar no WhatsApp
          </SmartLink>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className={buttonClass("primary", "ctaFull")}
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
