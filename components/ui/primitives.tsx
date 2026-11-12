import Link from "next/link";

/* Escala tipográfica e de espaçamento ---------------------------------------- */

/** Padding vertical padrão das seções. */
export const sectionY = "py-12 md:py-16 lg:py-20";
/** Texto corrido. */
export const leadText = "text-lg leading-relaxed";
/** Título de card. */
export const cardTitle = "text-xl lg:text-2xl font-semibold leading-snug";
/** Texto de card (nunca menor que 14px). */
export const cardText = "text-base lg:text-lg leading-relaxed";
/** Padding de card. */
export const cardPad = "p-6 lg:p-8";
/** Números grandes (Seção 3 e etapas da Seção 5). */
export const bigNumber = "text-5xl lg:text-6xl leading-none font-semibold tracking-tight text-alpha";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Rótulo de seção: CAPS, âmbar. */
export function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm font-semibold tracking-[0.2em] text-alpha uppercase ${className}`}
    >
      {children}
    </p>
  );
}

/** H2 das seções: 30px → 36px → 48px. */
export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl leading-[1.15] font-medium tracking-tight text-balance md:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

/** http(s) abre em nova aba; âncoras (#x, /#x) rolam suave; o resto é rota interna. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
const isAnchor = (href: string) => href.startsWith("#") || href.startsWith("/#");

export function SmartLink({
  href,
  className,
  children,
  onClick,
  ...rest
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }
  if (isAnchor(href)) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

/* Botões no padrão Staage: largura fixa grande, rounded-lg, sem seta. ------- */
const buttonBase =
  "inline-flex items-center justify-center gap-3 rounded-lg font-bold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpha disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const buttonSizes = {
  /** CTA principal: w-full no celular, mínimo 340px a partir de sm. */
  cta: "h-14 w-full sm:w-auto sm:min-w-85 px-8 text-lg",
  /** Mesmo CTA ocupando toda a largura disponível (formulário, menu mobile). */
  ctaFull: "h-14 w-full px-8 text-lg",
  /** Botão do formulário (compacto, largura total). */
  form: "h-14 w-full px-6 text-base lg:text-lg",
  /** Botão do menu. */
  menu: "h-11 px-6 text-sm",
};

const buttonVariants = {
  primary:
    "bg-alpha text-black shadow-[0_10px_30px_rgba(255,171,0,0.35)] hover:-translate-y-0.5 hover:brightness-110",
  ghost:
    "border-2 border-white/25 text-white hover:-translate-y-0.5 hover:border-alpha hover:text-alpha",
};

export function buttonClass(
  variant: keyof typeof buttonVariants = "primary",
  size: keyof typeof buttonSizes = "cta",
) {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]}`;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "cta",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
}) {
  return (
    <SmartLink href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </SmartLink>
  );
}

export function Tag({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-semibold tracking-[0.1em] uppercase ${
        light
          ? "border-ink/15 bg-ink/5 text-ink"
          : "border-alpha/35 bg-alpha/10 text-alpha"
      }`}
    >
      {children}
    </span>
  );
}
