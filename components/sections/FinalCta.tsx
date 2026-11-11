import { finalCta } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";

export function FinalCta() {
  return (
    <section id="cta-final" className="bg-ink py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-alpha/30 bg-gradient-to-br from-ink-3 to-[#2a2410] px-6 py-20 text-center sm:px-12 sm:py-28">
            <Photo
              src={finalCta.image.src}
              alt={finalCta.image.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="-z-10 opacity-35"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
            <div className="absolute -bottom-40 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-alpha/30 blur-[120px]" />

            <Eyebrow>{finalCta.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance text-white sm:text-6xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/75 sm:text-lg">
              {finalCta.text}
            </p>
            <Button
              href={finalCta.cta.href}
              className="mt-10 px-8 py-4 text-base"
            >
              <Icon name="whatsapp" className="size-5" />
              {finalCta.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
