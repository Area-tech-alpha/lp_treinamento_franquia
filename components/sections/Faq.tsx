import { faq } from "@/content/abs";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Heading, sectionY } from "@/components/ui/primitives";

/** Seção 12 — Dúvidas. Accordion com <details>/<summary> nativos (teclado e leitor de tela). */
export function Faq() {
  return (
    <section id="duvidas" className={`bg-ink ${sectionY}`}>
      <Container className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
        <Reveal>
          <Heading>{faq.label}</Heading>
        </Reveal>
        <Reveal delay={100}>
          <div className="divide-y divide-white/10 rounded-3xl border border-alpha/15 bg-ink-2 px-6 md:px-10">
            {faq.items.map((item) => (
              <details key={item.q} name="duvidas" className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-medium text-white transition-colors hover:text-alpha focus-visible:text-alpha focus-visible:outline-none md:py-7 md:text-xl">
                  {item.q}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-alpha/40 text-alpha transition-transform duration-300 group-open:rotate-45 group-open:bg-alpha group-open:text-ink">
                    <Icon name="plus" className="size-5" />
                  </span>
                </summary>
                <p className="pr-12 pb-7 text-base leading-relaxed text-muted md:text-lg">
                  {item.a.filter((part) => part !== null).join(" ")}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
