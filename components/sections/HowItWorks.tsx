import { howItWorks } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import {
  cardPad,
  cardText,
  cardTitle,
  Container,
  Heading,
  Label,
  leadText,
  sectionY,
} from "@/components/ui/primitives";

/** Seção 5 — Como funciona. 4 etapas lado a lado (empilhadas no celular). */
export function HowItWorks() {
  return (
    <section id="como-funciona" className={`glow-sides ${sectionY}`}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Label>{howItWorks.label}</Label>
            <Heading className="mt-5">{howItWorks.title}</Heading>
            <p className={`mt-6 max-w-2xl text-muted ${leadText}`}>{howItWorks.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative h-[320px] overflow-hidden rounded-3xl border border-alpha/20 sm:h-[420px] lg:h-[480px]">
              <Photo img={howItWorks.image} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.steps.map((s, i) => (
            <Reveal as="li" key={s.number} delay={i * 90}>
              <article
                className={`relative h-full overflow-hidden rounded-3xl border border-alpha/20 bg-ink-2 transition-colors duration-300 hover:border-alpha/50 ${cardPad}`}
              >
                <div className="absolute -top-16 -right-16 size-44 rounded-full bg-alpha/10 blur-2xl" />
                <p className="text-6xl leading-none font-semibold tracking-tight text-alpha md:text-7xl">
                  {s.number}
                </p>
                <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">
                  {s.when}
                </p>
                <h3 className={`mt-3 text-white ${cardTitle}`}>{s.title}</h3>
                <p className={`mt-4 text-muted ${cardText}`}>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
