import Link from "next/link";

/* Escala tipográfica e de espaçamento (referência: staage.com) ---------------- */

/** Padding vertical padrão das seções. */
export const sectionY = "py-20 md:py-28 lg:py-36";
/** Texto corrido. */
export const leadText = "text-lg md:text-xl leading-relaxed";
/** Título de card. */
export const cardTitle = "text-xl md:text-2xl font-semibold leading-snug";
/** Texto de card. */
export const cardText = "text-base md:text-lg leading-relaxed";
/** Padding de card. */
export const cardPad = "p-8 lg:p-10";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>
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

/** H2 das seções: text-3xl no mobile, text-5xl no desktop. */
export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl ${className}`}
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
  /** CTA principal: w-full no celular, 420px no desktop. */
  cta: "h-16 w-full px-8 text-xl sm:h-[76px] sm:w-[420px] sm:text-2xl",
  /** Mesmo CTA ocupando toda a largura disponível (formulário). */
  ctaFull: "h-16 w-full px-8 text-xl sm:h-[76px] sm:text-2xl",
  /** Mesmo formato, texto menor (para rótulos longos). */
  ctaCompact: "h-16 w-full px-6 text-lg sm:h-[76px] sm:w-[420px] sm:text-xl",
  /** Botão do menu. */
  menu: "h-12 px-6 text-base",
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
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold tracking-[0.12em] uppercase ${
        light
          ? "border-ink/15 bg-ink/5 text-ink"
          : "border-alpha/35 bg-alpha/10 text-alpha"
      }`}
    >
      {children}
    </span>
  );
}
