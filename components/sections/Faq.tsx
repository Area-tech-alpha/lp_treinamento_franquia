import { faq } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionTitle } from "@/components/ui/primitives";

/** Accordion com <details> nativo: acessível e sem JavaScript. */
export function Faq() {
  return (
    <section id="faq" className="glow-sides py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionTitle eyebrow={faq.eyebrow} title={faq.title} />
        </Reveal>
        <Reveal delay={100}>
          <div className="divide-y divide-white/10 rounded-3xl border border-alpha/15 bg-ink-2 px-6 sm:px-8">
            {faq.items.map((item) => (
              <details key={item.q} name="faq" className="group py-2">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-4 text-left text-base font-medium text-white transition-colors hover:text-alpha sm:text-lg">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-alpha/30 text-alpha transition-transform duration-300 group-open:rotate-45 group-open:bg-alpha group-open:text-ink">
                    <Icon name="plus" className="size-4" />
                  </span>
                </summary>
                <p className="pr-12 pb-5 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
