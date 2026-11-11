import Image from "next/image";
import { form, logos } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Heading, leadText, sectionY } from "@/components/ui/primitives";
import { LeadForm } from "@/components/form/LeadForm";

/** Seção 11 — Logos e formulário. */
export function LeadSection() {
  return (
    <section id="formulario" className={`glow-sides ${sectionY}`}>
      <Container>
        {/* Faixa de logos: só aparece quando houver logos em content/abs.ts */}
        {logos.items.length > 0 && (
          <Reveal className="mb-20">
            <p className="text-center text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">
              {logos.title}
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-alpha/20 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
              {logos.items.map((logo) => (
                <li key={logo.src} className="relative grid h-28 place-items-center bg-white px-6">
                  <div className="relative h-12 w-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="200px"
                      className="object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <Heading>{form.title}</Heading>
            <p className={`mt-6 text-muted ${leadText}`}>{form.text}</p>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
