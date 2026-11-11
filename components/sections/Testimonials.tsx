import { testimonials, type Testimonial } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { Container, Heading, sectionY } from "@/components/ui/primitives";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-alpha text-ink shadow-[0_30px_70px_-30px_rgba(255,171,0,0.65)]">
      {t.photo && (
        <div className="relative aspect-[4/5]">
          <Photo img={t.photo} sizes="(min-width: 1024px) 25vw, 85vw" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-snug font-medium opacity-70 md:text-base">{t.antes}</p>
        <p className="mt-1.5 text-2xl leading-tight font-bold tracking-tight">{t.depois}</p>
        <figcaption className="mt-auto pt-5">
          <div className="border-t border-ink/15 pt-4">
            <span className="block text-base font-semibold">{t.name}</span>
            {t.city && <span className="block text-sm text-ink/70">{t.city}</span>}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * Seção 10 — Depoimentos. Foto do abraço (P&B) ao fundo.
 * Desktop 4 colunas, tablet 2, mobile carrossel com bolinhas.
 */
export function Testimonials() {
  const items = testimonials.items;

  return (
    <section id="resultados" className={`relative isolate overflow-hidden ${sectionY}`}>
      <Photo img={testimonials.background} sizes="100vw" className="-z-20" />
      <div className="absolute inset-0 -z-10 bg-ink/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/40 to-ink" />

      <Container>
        <Reveal>
          <Heading className="mx-auto max-w-3xl text-center">{testimonials.title}</Heading>
        </Reveal>

        <div className="mt-12">
          <SnapCarousel
            label="Depoimentos de franqueados"
            cols="md:grid-cols-2 lg:grid-cols-4"
            items={items.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          />
        </div>

        <Reveal>
          {testimonials.more && (
            <p className="mt-10 text-center text-lg font-medium text-white md:text-xl">
              {testimonials.more}
            </p>
          )}
          <p className="mt-6 text-center text-sm text-white/55">{testimonials.disclaimer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
