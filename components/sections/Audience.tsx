import { audience } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionTitle } from "@/components/ui/primitives";

export function Audience() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle eyebrow={audience.eyebrow} title={audience.title} />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audience.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <div className="group h-full rounded-3xl border border-alpha/15 bg-ink-2 p-7 transition-colors duration-300 hover:border-alpha/50">
                <span className="grid size-12 place-items-center rounded-2xl bg-alpha text-ink transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
