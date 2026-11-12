import Image from "next/image";
import { logos } from "@/content/abs";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/primitives";

/**
 * Seção 11 — Faixa de logos (antes de Dúvidas).
 * Só aparece quando houver logos em content/abs.ts.
 */
export function LogosSection() {
  if (logos.items.length === 0) return null;
  return (
    <section className="glow-sides py-12 md:py-16 lg:py-6">
      <Container>
        <Reveal className="mb-8">
          <p className="text-center text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">
            {logos.title}
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-alpha/20 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {logos.items.map((logo) => (
              <li key={logo.src} className="relative grid h-24 place-items-center bg-white px-5">
                <div className="relative h-10 w-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="180px"
                    className="object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
