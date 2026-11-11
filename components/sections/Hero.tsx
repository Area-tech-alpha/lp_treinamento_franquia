import Image from "next/image";
import { brand, hero } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container } from "@/components/ui/primitives";

/** Glow âmbar forte do símbolo grande do hero. */
const symbolGlow = {
  filter:
    "drop-shadow(0 0 32px #FFAB00) drop-shadow(0 0 64px rgba(255,171,0,0.5))",
};

/**
 * Seção 1 — Hero full-bleed.
 * Foto escurecida cobrindo tudo, gradiente + faixa de glow âmbar à esquerda,
 * texto à esquerda (~55%) e o símbolo da ABS grande à direita.
 */
export function Hero() {
  const [before] = hero.headline.split(hero.highlight);
  const { proof } = hero;

  return (
    <section
      id="inicio"
      className="relative isolate flex items-center overflow-hidden bg-ink pt-16 lg:min-h-[max(40rem,85svh)] lg:pt-18"
    >
      {/* Fundo: foto escurecida (P&B por padrão; ver hero.treatment) */}
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        preload
        sizes="100vw"
        quality={80}
        className={`-z-30 object-cover object-[center_45%] ${
          hero.treatment === "color" ? "brightness-[0.4]" : "brightness-[0.35] grayscale"
        }`}
      />
      {/* Gradiente da esquerda (legibilidade do texto) */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-ink from-0% via-ink/80 via-30% to-transparent to-55% max-lg:bg-ink/55 max-lg:bg-none" />
      {/* Faixa de glow âmbar vertical na borda esquerda */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-30 lg:w-50"
        style={{ background: "linear-gradient(90deg, rgba(255,171,0,0.35), transparent)" }}
      />

      <Container className="grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[55%_45%] lg:gap-0 lg:py-16">
        {/* Símbolo: à direita no desktop, acima do texto no celular */}
        <Reveal className="flex justify-center lg:order-2">
          <div className="relative size-40 sm:size-48 md:size-56 lg:size-100 xl:size-120">
            <Image
              src={brand.symbol.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 260px, 200px"
              className="object-contain"
              style={symbolGlow}
            />
          </div>
        </Reveal>

        <div className="lg:order-1 lg:pr-8">
          <Reveal>
            <h1 className="text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
              {before}
              <span className="text-alpha">{hero.highlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 lg:text-xl">
              {hero.sub}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Button href={hero.cta.href} className="mt-8">
              {hero.cta.label}
            </Button>
          </Reveal>

          {/* Prova social (sem estrelas: não temos essa nota) */}
          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {proof.avatars.length > 0 && (
                <ul className="flex -space-x-3" aria-label="Franqueados Alpha">
                  {proof.avatars.slice(0, 5).map((a) => (
                    <li
                      key={a.src}
                      className="relative size-10 overflow-hidden rounded-full border-2 border-ink"
                    >
                      <Image src={a.src} alt={a.alt} fill sizes="40px" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-base leading-snug text-white/80 lg:text-lg">
                <p>
                  <strong className="font-bold text-white">{proof.revenue.value}</strong>{" "}
                  {proof.revenue.label}
                </p>
                {proof.franchisees && (
                  <p>
                    <strong className="font-bold text-white">{proof.franchisees.value}</strong>{" "}
                    {proof.franchisees.label}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
