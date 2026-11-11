import { howItWorks } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import {
  bigNumber,
  cardPad,
  cardText,
  cardTitle,
  Container,
  Heading,
  Label,
  leadText,
  sectionY,
} from "@/components/ui/primitives";

/** Seção 5 — Como funciona. 4 etapas: 1 coluna no mobile, 2 no md, 4 no lg. */
export function HowItWorks() {
  return (
    <section id="como-funciona" className={`glow-sides ${sectionY}`}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Label>{howItWorks.label}</Label>
            <Heading className="mt-4">{howItWorks.title}</Heading>
            <p className={`mt-5 max-w-xl text-muted ${leadText}`}>{howItWorks.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative h-60 overflow-hidden rounded-2xl border border-alpha/20 sm:h-80 lg:h-95">
              <Photo img={howItWorks.image} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </Reveal>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {howItWorks.steps.map((s, i) => (
            <Reveal as="li" key={s.number} delay={i * 90}>
              <article
                className={`relative h-full overflow-hidden rounded-2xl border border-alpha/20 bg-ink-2 transition-colors duration-300 hover:border-alpha/50 ${cardPad}`}
              >
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-alpha/10 blur-2xl" />
                <p className={bigNumber}>{s.number}</p>
                <p className="mt-6 text-sm font-semibold tracking-[0.15em] text-white/60 uppercase">
                  {s.when}
                </p>
                <h3 className={`mt-2 text-white ${cardTitle}`}>{s.title}</h3>
                <p className={`mt-3 text-muted ${cardText}`}>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
