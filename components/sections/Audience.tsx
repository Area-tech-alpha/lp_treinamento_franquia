import { audience } from "@/content/abs";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import {
  cardPad,
  cardText,
  cardTitle,
  Container,
  Heading,
  sectionY,
} from "@/components/ui/primitives";

/** Seção 7 — Para quem é. */
export function Audience() {
  return (
    <section className={`bg-white text-ink ${sectionY}`}>
      <Container>
        <Reveal>
          <Heading className="max-w-4xl">{audience.title}</Heading>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="h-full">
            <div className="relative h-[360px] overflow-hidden rounded-3xl sm:h-[460px] lg:h-full lg:min-h-[640px]">
              <Photo img={audience.image} sizes="(min-width: 1024px) 42vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </Reveal>

          <ul className="grid gap-8 sm:grid-cols-2">
            {audience.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80}>
                <div
                  className={`group h-full rounded-3xl border border-alpha/20 bg-ink text-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] ${cardPad}`}
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-alpha text-ink transition-transform duration-300 group-hover:-rotate-6">
                    <Icon name={item.icon} className="size-7" />
                  </span>
                  <h3 className={`mt-8 ${cardTitle}`}>{item.title}</h3>
                  <p className={`mt-3 text-muted ${cardText}`}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <p className="mt-10 flex items-start gap-4 rounded-2xl border border-ink/10 bg-ink/[0.03] p-6 text-lg text-ink/80 md:p-8 md:text-xl">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white">
              <Icon name="x" className="size-4" />
            </span>
            <span>
              <strong className="font-semibold text-ink">{audience.notFor.label}</strong>{" "}
              {audience.notFor.text}
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
