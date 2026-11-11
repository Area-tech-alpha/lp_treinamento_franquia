import Image from "next/image";
import { brand } from "@/content/abs";

/**
 * Logo do menu/rodapé: alpha-simbolo.png + "Alpha Business School" em HTML.
 * O PNG não é editado; o nome usa a fonte do site.
 */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={brand.symbol.src}
        alt=""
        width={brand.symbol.width}
        height={brand.symbol.height}
        sizes="40px"
        className="h-9 w-auto"
      />
      <span className="text-lg leading-none font-semibold tracking-tight whitespace-nowrap text-white">
        {brand.name}
      </span>
    </span>
  );
}

/** Logo da Alpha Assessoria (alpha-logo.png). */
export function AlphaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src={brand.alphaLogo.src}
      alt={brand.alphaLogo.alt}
      width={brand.alphaLogo.width}
      height={brand.alphaLogo.height}
      sizes="240px"
      className={className}
    />
  );
}

/** Símbolo da ABS (alpha-simbolo.png) em âmbar luminoso: glow via drop-shadow. */
export function AbsSymbol({
  className = "size-40",
  pulse = true,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-[-20%] rounded-full bg-alpha/35 blur-[60px] ${
          pulse ? "animate-pulse-glow" : ""
        }`}
      />
      <Image
        src={brand.symbol.src}
        alt={brand.symbol.alt}
        fill
        sizes="320px"
        className="abs-glow relative object-contain"
      />
    </div>
  );
}
