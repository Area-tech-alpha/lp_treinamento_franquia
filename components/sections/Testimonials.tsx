import { testimonials, type Testimonial } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SnapRow } from "@/components/ui/SnapRow";
import { cardPad, Container, Heading, sectionY } from "@/components/ui/primitives";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-alpha text-ink shadow-[0_30px_70px_-30px_rgba(255,171,0,0.65)]">
      {t.photo && (
        <div className="relative aspect-[4/5]">
          <Photo img={t.photo} sizes="(min-width: 1024px) 30vw, 85vw" />
        </div>
      )}
      <div className={`flex flex-1 flex-col ${cardPad}`}>
        <p className="text-2xl leading-tight font-semibold tracking-tight md:text-3xl">{t.result}</p>
        {(t.name || t.city) && (
          <figcaption className="mt-6 border-t border-ink/15 pt-5">
            {t.name && <span className="block text-lg font-semibold">{t.name}</span>}
            {t.city && <span className="block text-base text-ink/70">{t.city}</span>}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/** Seção 10 — Depoimentos. Foto do abraço (P&B) ao fundo; carrossel no celular. */
export function Testimonials() {
  // Depoimento com resultado null some; os outros se reorganizam.
  const items = testimonials.items.filter((t) => t.result !== null);
  const cols =
    items.length >= 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : items.length === 3
        ? "md:grid-cols-3"
        : items.length === 2
          ? "md:grid-cols-2 md:mx-auto md:max-w-4xl"
          : "md:grid-cols-1 md:mx-auto md:max-w-xl";

  return (
    <section id="resultados" className={`relative isolate overflow-hidden ${sectionY}`}>
      <Photo img={testimonials.background} sizes="100vw" className="-z-20" />
      <div className="absolute inset-0 -z-10 bg-ink/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/40 to-ink" />

      <Container>
        <Reveal>
          <Heading className="mx-auto max-w-3xl text-center">{testimonials.title}</Heading>
        </Reveal>

        <SnapRow
          className={`mt-12 ${items.length === 1 ? "max-md:[&>li]:w-full" : ""}`}
          cols={cols}
          items={items.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        />

        <Reveal>
          {testimonials.more && (
            <p className="mt-10 text-center text-lg font-medium text-white md:text-xl">
              {testimonials.more}
            </p>
          )}
          <p className="mt-5 text-center text-sm text-white/55">{testimonials.disclaimer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
