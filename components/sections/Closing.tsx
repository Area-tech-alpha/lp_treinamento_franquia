import { closing } from "@/content/abs";
import { AlphaLogo } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container, Heading, leadText, sectionY } from "@/components/ui/primitives";

/** Seção 13 — Fechamento. Os dois botões rolam até o formulário. */
export function Closing() {
  const [primary, secondary] = closing.ctas;

  return (
    <section className={`bg-ink ${sectionY}`}>
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl border border-alpha/30 px-5 py-16 text-center md:px-12 md:py-20 lg:py-24">
            <Photo img={closing.image} sizes="(min-width: 1240px) 1176px, 100vw" className="-z-20" />
            <div className="absolute inset-0 -z-10 bg-ink/80" />
            <div className="absolute -bottom-40 left-1/2 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-alpha/25 blur-[120px]" />

            <div className="flex justify-center">
              <AlphaLogo className="h-11 w-auto md:h-12" />
            </div>
            <Heading className="mx-auto mt-6 max-w-3xl">{closing.title}</Heading>
            <p className={`mx-auto mt-3 max-w-2xl text-white/80 ${leadText}`}>
              {closing.numbers} {closing.text}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:items-center lg:flex-row">
              <Button href={primary.href}>{primary.label}</Button>
              <Button href={secondary.href} variant="ghost">
                <Icon name="whatsapp" className="size-5" />
                {secondary.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
