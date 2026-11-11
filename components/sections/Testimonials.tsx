import { testimonials } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { cardPad, Container, Heading, sectionY } from "@/components/ui/primitives";

/** Seção 10 — Depoimentos. Foto do abraço (P&B) ao fundo com overlay. */
export function Testimonials() {
  // Depoimento com resultado null some; os outros se reorganizam.
  const items = testimonials.items.filter((t) => t.result !== null);
  const grid =
    items.length >= 4
      ? "md:grid-cols-2 xl:grid-cols-4"
      : items.length === 3
        ? "md:grid-cols-3"
        : items.length === 2
          ? "md:grid-cols-2 max-w-5xl mx-auto"
          : "max-w-2xl mx-auto";

  return (
    <section id="resultados" className={`relative isolate overflow-hidden ${sectionY}`}>
      <Photo img={testimonials.background} sizes="100vw" className="-z-20" />
      <div className="absolute inset-0 -z-10 bg-ink/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/40 to-ink" />

      <Container>
        <Reveal>
          <Heading className="mx-auto max-w-4xl text-center">{testimonials.title}</Heading>
        </Reveal>

        <ul className={`mt-16 grid gap-8 ${grid}`}>
          {items.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <figure className="flex h-full flex-col overflow-hidden rounded-3xl bg-alpha text-ink shadow-[0_30px_70px_-30px_rgba(255,171,0,0.65)]">
                {t.photo && (
                  <div className="relative aspect-[4/5]">
                    <Photo img={t.photo} sizes="(min-width: 1024px) 30vw, 90vw" />
                  </div>
                )}
                <div className={`flex flex-1 flex-col ${cardPad}`}>
                  <p className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
                    {t.result}
                  </p>
                  {(t.name || t.city) && (
                    <figcaption className="mt-8 border-t border-ink/15 pt-6">
                      {t.name && <span className="block text-xl font-semibold">{t.name}</span>}
                      {t.city && <span className="block text-lg text-ink/70">{t.city}</span>}
                    </figcaption>
                  )}
                </div>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          {testimonials.more && (
            <p className="mt-14 text-center text-xl font-medium text-white md:text-2xl">
              {testimonials.more}
            </p>
          )}
          <p className="mt-6 text-center text-sm text-white/55">{testimonials.disclaimer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
