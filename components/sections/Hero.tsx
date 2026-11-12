import Image from "next/image";
import { brand, hero } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/primitives";
import { LeadForm } from "@/components/form/LeadForm";

/** Glow âmbar do símbolo decorativo do canto. */
const symbolGlow = {
  filter:
    "drop-shadow(0 0 16px #FFAB00) drop-shadow(0 0 36px rgba(255,171,0,0.5))",
};

/**
 * Seção 1 — Hero full-bleed com o formulário.
 * Foto escurecida cobrindo tudo, gradiente + faixa de glow âmbar à esquerda.
 * Desktop: texto e prova à esquerda, card do formulário à direita (#formulario).
 * Celular: headline + sub → formulário → prova.
 */
export function Hero() {
  const [before] = hero.headline.split(hero.highlight);
  const { proof } = hero;

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ink pt-[72px]">
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
      {/* Símbolo decorativo no canto inferior direito, só na margem ao lado do card
          (nunca atrás dele): cresce conforme sobra espaço; escondido em telas menores. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-2 -z-10 hidden size-20 min-[1352px]:block min-[1500px]:right-4 min-[1500px]:bottom-4 min-[1500px]:size-[120px] 2xl:right-6 2xl:bottom-6 2xl:size-36"
      >
        <Image src={brand.symbol.src} alt="" fill sizes="144px" className="object-contain" style={symbolGlow} />
      </div>

      <Container className="grid content-center gap-8 py-10 md:py-12 lg:min-h-[calc(100vh-72px)] lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-6 lg:py-6">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal>
            <h1 className="text-4xl leading-[1.1] font-medium tracking-tight text-balance md:text-5xl lg:text-[64px]">
              {before}
              <span className="text-alpha">{hero.highlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{hero.sub}</p>
          </Reveal>
        </div>

        {/* Formulário: destino de todos os botões da página */}
        <div
          id="formulario"
          className="scroll-mt-[88px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <Reveal delay={120}>
            <LeadForm />
          </Reveal>
        </div>

        {/* Prova social (sem estrelas: não temos essa nota) */}
        <Reveal delay={200} className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="flex flex-wrap items-center gap-4">
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
      </Container>
    </section>
  );
}
