import { hero } from "@/content/home";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";

export function Hero() {
  const [before] = hero.title.split(hero.highlight);

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pt-28 pb-16 sm:items-center sm:pb-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_70%_20%,#2a2410,transparent)]">
        <Photo
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
        />
      </div>
      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      {/* Glow amarelo */}
      <div className="absolute -bottom-40 -left-40 -z-10 size-[32rem] rounded-full bg-alpha/20 blur-[120px]" />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
              {before}
              <span className="text-alpha">{hero.highlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} arrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
