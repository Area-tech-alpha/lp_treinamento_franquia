import Link from "next/link";
import { Icon } from "./Icon";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] text-alpha ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  text,
  dark = true,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <Eyebrow className={dark ? "" : "text-gold"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={`mt-3 text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-muted" : "text-muted-dark"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  arrow?: boolean;
};

/** Links http(s) (WhatsApp) abrem em nova aba; âncoras (#secao) rolam suave. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-alpha text-ink hover:bg-alpha-soft shadow-[0_8px_30px_-8px_rgba(255,212,0,0.55)]",
    ghost: "border border-white/20 text-white hover:border-alpha hover:text-alpha",
    dark: "bg-ink text-white hover:bg-ink-3",
  }[variant];

  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha ${styles} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <Icon
          name="arrow"
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Tag({
  children,
  dark = true,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
        dark
          ? "border-alpha/30 bg-alpha/10 text-alpha"
          : "border-ink/15 bg-ink/5 text-ink"
      }`}
    >
      {children}
    </span>
  );
}

/** Wordmark provisório. Troque por <Image src="/images/logo.svg" /> quando tiver o arquivo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid size-8 place-items-center rounded-lg bg-alpha text-lg font-bold text-ink">
        α
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">
        Alpha<span className="text-alpha">.</span>
      </span>
    </span>
  );
}
