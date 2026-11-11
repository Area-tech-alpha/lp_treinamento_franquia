import { testimonials } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionTitle } from "@/components/ui/primitives";

export function Testimonials() {
  return (
    <section id="depoimentos" className="glow-bottom py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            text={testimonials.text}
            center
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {testimonials.highlights.map((h, i) => (
            <Reveal as="li" key={h.image.src} delay={i * 100}>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-alpha/20 bg-gradient-to-br from-ink-3 to-[#2a2410]">
                <Photo
                  src={h.image.src}
                  alt={h.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 font-medium text-white sm:p-7 sm:text-lg">
                  {h.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl bg-alpha p-7 text-ink shadow-[0_25px_60px_-25px_rgba(255,212,0,0.6)]">
                <p className="text-2xl font-semibold tracking-tight">
                  {t.result}
                </p>
                <div className="my-5 h-px bg-ink/15" />
                <blockquote className="flex-1 text-base leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <div
                  className="mt-6 flex gap-0.5"
                  role="img"
                  aria-label="5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" filled className="size-4" />
                  ))}
                </div>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-sm font-semibold text-alpha">
                    {t.photo ? (
                      <Photo src={t.photo.src} alt={t.photo.alt} fill sizes="48px" />
                    ) : (
                      "α"
                    )}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-ink/70">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <h3 className="mt-20 text-center text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {testimonials.moreTitle}
          </h3>
        </Reveal>
        <ul className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {testimonials.prints.map((print, i) => (
            <Reveal as="li" key={print.src} delay={(i % 4) * 70} className="mb-4 break-inside-avoid">
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-3 to-[#2a2410] ${
                  i % 3 === 0 ? "aspect-[3/5]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Photo
                  src={print.src}
                  alt={print.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
