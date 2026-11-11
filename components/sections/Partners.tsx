import { partners } from "@/content/home";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionTitle } from "@/components/ui/primitives";

export function Partners() {
  return (
    <section className="glow-sides py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow={partners.eyebrow}
            title={partners.title}
            center
          />
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-alpha/20 bg-ink/10 shadow-[0_30px_80px_-30px_rgba(255,212,0,0.25)] sm:grid-cols-4">
            {partners.logos.map((logo, i) => (
              <li
                key={i}
                className="relative grid h-28 place-items-center bg-white px-6 sm:h-32"
              >
                {logo.image ? (
                  <div className="relative h-12 w-full">
                    <Photo
                      src={logo.image.src}
                      alt={logo.image.alt}
                      fill
                      sizes="200px"
                      className="object-contain! opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-muted-dark">
                    {logo.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
