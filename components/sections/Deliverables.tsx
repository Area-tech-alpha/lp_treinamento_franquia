import { deliverables } from "@/content/abs";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import {
  Button,
  cardPad,
  cardText,
  Container,
  Heading,
  sectionY,
} from "@/components/ui/primitives";

/** Seção 9 — O que você leva. 6 cards: 1 / 2 / 3 colunas. */
export function Deliverables() {
  const { bonus, guarantee, investment } = deliverables;

  return (
    <section className={`bg-white text-ink ${sectionY}`}>
      <Container>
        <Reveal>
          <Heading className="max-w-3xl">{deliverables.title}</Heading>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {deliverables.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 80}>
              <div
                className={`h-full rounded-2xl border border-alpha/25 bg-ink text-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)] ${cardPad}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-alpha text-ink">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold md:text-xl">{p.title}</h3>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className={`flex gap-2.5 text-white/85 ${cardText}`}>
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-alpha md:mt-1" />
                      <span className="first-letter:uppercase">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Bônus */}
        <Reveal>
          <div className="mt-6 grid overflow-hidden rounded-2xl bg-ink text-white lg:grid-cols-2">
            <div className="relative h-60 sm:h-80 lg:h-auto lg:min-h-110">
              <Photo img={bonus.image} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/40" />
            </div>
            <div className={`flex flex-col justify-center ${cardPad} lg:p-12`}>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-alpha text-ink">
                  <Icon name="gift" className="size-5" />
                </span>
                <h3 className="text-xl font-semibold md:text-2xl">{bonus.title}</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {bonus.items.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-white/90 md:text-lg">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-alpha text-ink md:mt-1">
                      <Icon name="check" className="size-3" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Investimento + garantia */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal>
            <div className={`flex h-full flex-col justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] ${cardPad}`}>
              <p className="text-base text-ink/70 md:text-lg">{investment.label}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
                {investment.text}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className={`flex h-full gap-4 rounded-2xl border border-alpha/40 bg-alpha/10 ${cardPad}`}>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-alpha text-ink">
                <Icon name="shield" className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold md:text-xl">{guarantee.title}</h3>
                <p className={`mt-1.5 text-ink/80 ${cardText}`}>{guarantee.text}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button href={deliverables.cta.href}>{deliverables.cta.label}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
