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

/** Seção 9 — O que você leva. */
export function Deliverables() {
  const { bonus, guarantee, investment } = deliverables;

  return (
    <section className={`bg-white text-ink ${sectionY}`}>
      <Container>
        <Reveal>
          <Heading className="max-w-4xl">{deliverables.title}</Heading>
        </Reveal>

        <ul className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {deliverables.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 80}>
              <div
                className={`h-full rounded-3xl border border-alpha/25 bg-ink text-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)] ${cardPad}`}
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-alpha text-ink">
                    <Icon name={p.icon} className="size-7" />
                  </span>
                  <h3 className="text-xl font-semibold md:text-2xl">{p.title}</h3>
                </div>
                <ul className="mt-8 space-y-3.5">
                  {p.items.map((it) => (
                    <li key={it} className={`flex gap-3 text-white/85 ${cardText}`}>
                      <Icon name="check" className="mt-1 size-5 shrink-0 text-alpha" />
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
          <div className="mt-8 grid overflow-hidden rounded-3xl bg-ink text-white lg:grid-cols-2">
            <div className="relative h-[340px] sm:h-[440px] lg:h-auto lg:min-h-[560px]">
              <Photo img={bonus.image} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/40" />
            </div>
            <div className={`flex flex-col justify-center ${cardPad} lg:p-14`}>
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-alpha text-ink">
                  <Icon name="gift" className="size-7" />
                </span>
                <h3 className="text-2xl font-semibold md:text-3xl">{bonus.title}</h3>
              </div>
              <ul className="mt-8 space-y-5">
                {bonus.items.map((b) => (
                  <li key={b} className="flex gap-4 text-lg text-white/90 md:text-xl">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-alpha text-ink">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Investimento + garantia */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className={`flex h-full flex-col justify-center rounded-3xl border border-ink/10 bg-ink/[0.03] ${cardPad}`}>
              <p className="text-lg text-ink/70 md:text-xl">{investment.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
                {investment.text}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className={`flex h-full gap-5 rounded-3xl border border-alpha/40 bg-alpha/10 ${cardPad}`}>
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-alpha text-ink">
                <Icon name="shield" className="size-7" />
              </span>
              <div>
                <h3 className="text-xl font-semibold md:text-2xl">{guarantee.title}</h3>
                <p className={`mt-2 text-ink/80 ${cardText}`}>{guarantee.text}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button href={deliverables.cta.href}>
            {deliverables.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
