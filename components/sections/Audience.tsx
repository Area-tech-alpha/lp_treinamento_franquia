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

/** Seção 7 — Para quem é. 4 cards: 1 coluna no mobile, 2 no md, 4 no lg. */
export function Audience() {
  return (
    <section className={`bg-white text-ink ${sectionY}`}>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <Heading>{audience.title}</Heading>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative h-52 overflow-hidden rounded-2xl sm:h-64">
              <Photo img={audience.image} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </Reveal>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {audience.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <div
                className={`group h-full rounded-2xl border border-alpha/20 bg-ink text-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] ${cardPad}`}
              >
                <span className="grid size-12 place-items-center rounded-xl bg-alpha text-ink transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className={`mt-6 ${cardTitle}`}>{item.title}</h3>
                <p className={`mt-2 text-muted ${cardText}`}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-8 flex items-start gap-3 rounded-xl border border-ink/10 bg-ink/[0.03] p-5 text-base text-ink/80 md:text-lg">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink text-white">
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
