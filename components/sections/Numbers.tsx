import Image from "next/image";
import { brand, numbers } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { bigNumber, cardPad, Container, Heading, sectionY } from "@/components/ui/primitives";

const COLS: Record<number, string> = {
  1: "",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

/**
 * Seção 3 — Números. Tudo centralizado (1 coluna no mobile, 3 no lg).
 * Fundo #0A0A0A com a logo da Alpha (alpha-logo.png) desfocada atrás dos cards,
 * brilho âmbar leve no centro e vinheta escura nas bordas.
 */
export function Numbers() {
  // Card com valor null some; os outros se reorganizam.
  const items = numbers.items.filter((i) => i.value !== null);

  return (
    <section className={`relative isolate overflow-hidden bg-ink ${sectionY}`}>
      {/* Brilho âmbar leve no centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,171,0,0.08), transparent 70%)",
        }}
      />
      {/* Logo da Alpha desfocada (decorativa) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-20 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[90%] md:max-w-350"
      >
        <Image
          src={brand.alphaLogo.src}
          alt=""
          width={brand.alphaLogo.width}
          height={brand.alphaLogo.height}
          sizes="(min-width: 768px) 90vw, 140vw"
          className="h-auto w-full object-contain opacity-20 blur-[0.75rem]"
        />
      </div>
      {/* Vinheta escura nas bordas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 45%, rgba(10,10,10,0.92) 100%)",
        }}
      />

      <Container>
        <Heading className="mx-auto max-w-3xl text-center">{numbers.title}</Heading>

        <ul className={`mt-12 grid grid-cols-1 gap-5 lg:gap-6 ${COLS[items.length] ?? COLS[4]}`}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 80}>
              <div className={`h-full rounded-2xl border border-alpha/25 bg-ink/70 backdrop-blur-md ${cardPad}`}>
                <p className={bigNumber}>{item.value}</p>
                <p className="mt-4 text-base text-white/85 md:text-lg">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-12 text-center text-lg font-medium text-white md:text-xl">
          {numbers.closing}
        </p>
      </Container>
    </section>
  );
}
