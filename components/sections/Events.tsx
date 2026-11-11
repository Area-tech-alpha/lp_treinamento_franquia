import { events } from "@/content/home";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container, Eyebrow, Tag } from "@/components/ui/primitives";

export function Events() {
  return (
    <section id="eventos" className="bg-ink py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-alpha/20 bg-gradient-to-br from-ink-3 to-[#2a2410]">
            <Photo
              src={events.image.src}
              alt={events.image.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="-z-10"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
            <div className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-alpha/25 blur-[100px]" />

            <div className="max-w-xl px-6 py-14 sm:px-12 sm:py-20">
              <Eyebrow>{events.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-balance text-white sm:text-5xl">
                {events.title}
              </h2>
              <p className="mt-4 text-white/75 sm:text-lg">{events.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {events.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <Button href={events.cta.href} arrow className="mt-9">
                {events.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>

        <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {events.gallery.map((item, i) => (
            <Reveal as="li" key={item.image.src + i} delay={i * 80}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-3 to-[#2a2410]">
                <Photo
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-white">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
