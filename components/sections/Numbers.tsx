import { numbers } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionTitle } from "@/components/ui/primitives";

export function Numbers() {
  return (
    <section className="bg-white py-20 text-ink sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow={numbers.eyebrow}
            title={numbers.title}
            dark={false}
            center
          />
        </Reveal>

        <Reveal delay={80}>
          <figure className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br from-ink-3 to-[#2a2410] sm:aspect-[21/9]">
            <Photo
              src={numbers.image.src}
              alt={numbers.image.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-white sm:p-8 sm:text-lg">
              {numbers.imageCaption}
            </figcaption>
          </figure>
        </Reveal>

        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 80}>
              <div className="h-full rounded-3xl border border-alpha/20 bg-ink p-7 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-2xl bg-alpha/10 text-alpha ring-1 ring-alpha/30">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <p className="mt-8 text-4xl font-medium tracking-tight break-words text-white sm:text-5xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
