import Image from "next/image";
import { brand, form, logos } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/primitives";
import { LeadForm } from "@/components/form/LeadForm";

/**
 * Seção 11 — Faixa de logos (antes de Dúvidas).
 * Só aparece quando houver logos em content/abs.ts.
 */
export function LogosSection() {
  if (logos.items.length === 0) return null;
  return (
    <section className="glow-sides py-12 md:py-16 lg:py-6">
      <Container>
        <Reveal className="mb-8">
          <p className="text-center text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">
            {logos.title}
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-alpha/20 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {logos.items.map((logo) => (
              <li key={logo.src} className="relative grid h-24 place-items-center bg-white px-5">
                <div className="relative h-10 w-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="180px"
                    className="object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Formulário — primeira seção da página, logo abaixo do menu fixo (72px).
 * Fundo amarelo Alpha (gradiente âmbar) com o símbolo em preto como textura.
 * No desktop (lg+) ocupa a primeira tela e o formulário inteiro cabe sem rolar.
 * Container um pouco mais largo aqui para as opções caberem em 1 linha.
 */
export function LeadSection() {
  return (
    <section
      id="formulario"
      className="relative isolate overflow-hidden pt-[calc(72px+3rem)] pb-12 md:pt-[calc(72px+4rem)] md:pb-16 lg:flex lg:min-h-screen lg:items-center lg:pt-[calc(72px+1.5rem)] lg:pb-6"
      style={{ background: "linear-gradient(135deg, #FFAB00, #FFC233)" }}
    >
      {/* Textura: símbolo da Alpha grande, em preto, quase transparente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-10%] -z-10 aspect-square w-[min(110vw,52rem)] -translate-y-1/2 opacity-[0.06] max-lg:right-[-35%]"
      >
        <Image src={brand.symbol.src} alt="" fill sizes="832px" className="object-contain brightness-0" />
      </div>
      <div className="w-full">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 md:px-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-center lg:gap-10 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <Reveal>
            <h2 className="text-3xl leading-[1.15] font-medium tracking-tight text-balance text-ink lg:text-4xl">
              {form.title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/75">{form.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
