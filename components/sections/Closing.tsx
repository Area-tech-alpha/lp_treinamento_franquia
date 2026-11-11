import { closing } from "@/content/abs";
import { AlphaLogo } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container, Heading, leadText, sectionY } from "@/components/ui/primitives";

/** Seção 13 — Fechamento. */
export function Closing() {
  const [primary, secondary] = closing.ctas;

  return (
    <section className={`bg-ink ${sectionY}`}>
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-alpha/30 px-6 py-20 text-center md:px-16 md:py-28 lg:py-32">
            <Photo img={closing.image} sizes="(min-width: 1280px) 1200px, 100vw" className="-z-20" />
            <div className="absolute inset-0 -z-10 bg-ink/80" />
            <div className="absolute -bottom-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-alpha/25 blur-[120px]" />

            <div className="flex justify-center">
              <AlphaLogo className="h-14 w-auto md:h-16" />
            </div>
            <Heading className="mx-auto mt-10 max-w-4xl">{closing.title}</Heading>
            <p className={`mx-auto mt-6 max-w-3xl text-white/80 ${leadText}`}>
              {closing.numbers} {closing.text}
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 lg:flex-row">
              <Button href={primary.href}>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="ghost" size="ctaCompact">
                <Icon name="whatsapp" className="size-6" />
                {secondary.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
