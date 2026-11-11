import Image from "next/image";
import { form, logos } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/primitives";
import { LeadForm } from "@/components/form/LeadForm";

/**
 * Seção 11 — Logos e formulário.
 * No desktop (lg+) a seção ocupa a tela abaixo do menu e o formulário inteiro
 * cabe sem rolar. Container um pouco mais largo aqui para as opções caberem
 * em 1 linha.
 */
export function LeadSection() {
  return (
    <section
      id="formulario"
      className="glow-sides py-16 md:py-24 lg:flex lg:min-h-[calc(100vh-4.5rem)] lg:items-center lg:py-8"
    >
      <div className="w-full">
        {/* Faixa de logos: só aparece quando houver logos em content/abs.ts */}
        {logos.items.length > 0 && (
          <Container>
            <Reveal className="mb-12">
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
        )}

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-center lg:gap-10 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <Reveal>
            <h2 className="text-3xl leading-[1.15] font-medium tracking-tight text-balance lg:text-4xl">
              {form.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{form.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
