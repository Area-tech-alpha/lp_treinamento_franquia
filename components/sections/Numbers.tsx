import Image from "next/image";
import { brand, numbers } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Heading, sectionY } from "@/components/ui/primitives";

const COLS: Record<number, string> = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

/**
 * Seção 3 — Números. Tudo centralizado.
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
        className="pointer-events-none absolute top-1/2 left-1/2 -z-20 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[90%] md:max-w-[1400px]"
      >
        <Image
          src={brand.alphaLogo.src}
          alt=""
          width={brand.alphaLogo.width}
          height={brand.alphaLogo.height}
          sizes="(min-width: 768px) 90vw, 140vw"
          className="h-auto w-full object-contain opacity-20 blur-[12px]"
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
        <Heading className="mx-auto max-w-4xl text-center">{numbers.title}</Heading>

        <ul className={`mt-16 grid gap-8 ${COLS[items.length] ?? COLS[4]}`}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 80}>
              <div className="h-full rounded-3xl border border-alpha/25 bg-ink/70 p-8 backdrop-blur-md lg:p-10">
                <p className="text-6xl leading-none font-semibold tracking-tight text-alpha lg:text-7xl">
                  {item.value}
                </p>
                <p className="mt-5 text-lg text-white/85">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-16 text-center text-xl font-medium text-white">{numbers.closing}</p>
      </Container>
    </section>
  );
}
