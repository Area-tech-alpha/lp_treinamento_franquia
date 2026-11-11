import { whyNow } from "@/content/abs";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import {
  Button,
  cardPad,
  cardText,
  cardTitle,
  Container,
  Heading,
  sectionY,
} from "@/components/ui/primitives";

/** Seção 8 — Por que agora. (O card "Próximo início" só aparece com a data.) */
export function WhyNow() {
  const items = whyNow.items;
  const cols = items.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className={`glow-sides ${sectionY}`}>
      <Container>
        <Reveal>
          <Heading className="mx-auto max-w-3xl text-center">{whyNow.title}</Heading>
        </Reveal>

        <ul className={`mt-8 grid grid-cols-1 gap-5 ${cols}`}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90}>
              <div className={`h-full rounded-2xl border border-alpha/20 bg-ink-2 ${cardPad}`}>
                <span className="grid size-12 place-items-center rounded-xl bg-alpha/10 text-alpha ring-1 ring-alpha/40">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className={`mt-6 text-white ${cardTitle}`}>{item.title}</h3>
                <p className={`mt-2 text-muted ${cardText}`}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex justify-center">
          <Button href={whyNow.cta.href}>{whyNow.cta.label}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
