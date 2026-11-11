import { faq } from "@/content/abs";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Heading, sectionY } from "@/components/ui/primitives";

/** Seção 12 — Dúvidas. Accordion com <details>/<summary> nativos (teclado e leitor de tela). */
export function Faq() {
  return (
    <section id="duvidas" className={`bg-ink ${sectionY}`}>
      <Container className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-14">
        <Reveal>
          <Heading>{faq.label}</Heading>
        </Reveal>
        <Reveal delay={100}>
          <div className="divide-y divide-white/10 rounded-2xl border border-alpha/15 bg-ink-2 px-5 md:px-8">
            {faq.items.map((item) => (
              <details key={item.q} name="duvidas" className="group">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-5 py-5 text-left text-base font-medium text-white transition-colors hover:text-alpha focus-visible:text-alpha focus-visible:outline-none md:text-lg">
                  {item.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-alpha/40 text-alpha transition-transform duration-300 group-open:rotate-45 group-open:bg-alpha group-open:text-ink">
                    <Icon name="plus" className="size-4" />
                  </span>
                </summary>
                <p className="pr-10 pb-6 text-sm leading-relaxed text-muted md:text-base">
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
