import Image from "next/image";
import { brand, hero } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container } from "@/components/ui/primitives";

/** Glow âmbar forte do símbolo grande do hero. */
const symbolGlow = {
  filter:
    "drop-shadow(0 0 40px #FFAB00) drop-shadow(0 0 80px rgba(255,171,0,0.5))",
};

/**
 * Seção 1 — Hero full-bleed (padrão staage.com).
 * Foto P&B escurecida cobrindo tudo, gradiente + faixa de glow âmbar à esquerda,
 * texto à esquerda (~55%) e o símbolo da ABS grande à direita.
 */
export function Hero() {
  const [before] = hero.headline.split(hero.highlight);
  const { proof } = hero;

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-ink pt-20 lg:min-h-[720px]"
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
        className="absolute inset-y-0 left-0 -z-10 w-[200px]"
        style={{ background: "linear-gradient(90deg, rgba(255,171,0,0.35), transparent)" }}
      />

      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[55%_45%] lg:gap-0 lg:py-20">
        {/* Símbolo grande: à direita no desktop, acima do texto no celular */}
        <Reveal className="flex justify-center lg:order-2">
          <div className="relative size-48 sm:size-60 lg:size-[420px] xl:size-[520px]">
            <Image
              src={brand.symbol.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 420px, 240px"
              className="object-contain"
              style={symbolGlow}
            />
          </div>
        </Reveal>

        <div className="lg:order-1 lg:pr-10">
          <Reveal>
            <h1 className="text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {before}
              <span className="text-alpha">{hero.highlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90 lg:text-2xl">
              {hero.sub}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Button href={hero.cta.href} className="mt-10">
              {hero.cta.label}
            </Button>
          </Reveal>

          {/* Prova social (sem estrelas: não temos essa nota) */}
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {proof.avatars.length > 0 && (
                <ul className="flex -space-x-3" aria-label="Franqueados Alpha">
                  {proof.avatars.slice(0, 5).map((a) => (
                    <li
                      key={a.src}
                      className="relative size-12 overflow-hidden rounded-full border-2 border-ink"
                    >
                      <Image src={a.src} alt={a.alt} fill sizes="48px" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-lg leading-snug text-white/80">
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
