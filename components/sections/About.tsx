import { about } from "@/content/abs";
import { AbsSymbol } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import {
  Button,
  Container,
  Heading,
  Label,
  leadText,
  sectionY,
} from "@/components/ui/primitives";

/**
 * Posições dos 6 pilares numa elipse em volta do símbolo (desktop), em %.
 * Ordem: começa no alto à esquerda e segue no sentido horário.
 */
const ORBIT = [240, 300, 0, 60, 120, 180].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x: 50 + 37 * Math.cos(r), y: 50 + 36 * Math.sin(r) };
});

function Pillar({ icon, label }: (typeof about.pillars)[number]) {
  return (
    <div className="flex h-full items-center gap-4 rounded-2xl border border-alpha/25 bg-ink/85 px-5 py-4 backdrop-blur-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-alpha text-ink md:size-12">
        <Icon name={icon} className="size-5 md:size-6" />
      </span>
      <span className="text-[15px] leading-tight font-semibold text-white md:text-lg lg:whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/** Seção 2 — O que é a Alpha Business School. */
export function About() {
  return (
    <section id="o-que-e" className={`glow-sides ${sectionY}`}>
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Label>{about.label}</Label>
          <Heading className="mt-5">{about.title}</Heading>
          <p className={`mx-auto mt-6 max-w-3xl text-muted ${leadText}`}>{about.text}</p>
        </Reveal>

        <Reveal delay={100}>
          {/* Desktop: símbolo no centro e pilares orbitando, ligados por linhas */}
          <div className="relative mt-16 hidden aspect-[16/9] overflow-hidden rounded-3xl border border-alpha/20 bg-ink-2 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(34rem_22rem_at_50%_50%,rgba(255,171,0,0.15),transparent)]" />
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
            >
              <ellipse
                cx="50"
                cy="50"
                rx="37"
                ry="36"
                fill="none"
                stroke="rgba(255,171,0,0.18)"
                strokeDasharray="0.6 1.2"
                vectorEffect="non-scaling-stroke"
              />
              {ORBIT.map((p, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,171,0,0.4)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AbsSymbol className="size-56 xl:size-64" />
            </div>
            <ul>
              {about.pillars.map((p, i) => (
                <li
                  key={p.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${ORBIT[i].x}%`, top: `${ORBIT[i].y}%` }}
                >
                  <Pillar {...p} />
                </li>
              ))}
            </ul>
          </div>

          {/* Celular/tablet: símbolo em cima, pilares em grid 2x3 */}
          <div className="mt-12 rounded-3xl border border-alpha/20 bg-ink-2 px-4 py-12 sm:px-8 lg:hidden">
            <div className="flex justify-center">
              <AbsSymbol className="size-32 sm:size-40" />
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {about.pillars.map((p) => (
                <li key={p.label} className="[&>div]:gap-2.5 [&>div]:px-3 [&>div]:py-3 sm:[&>div]:px-4">
                  <Pillar {...p} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-ink-3 p-6 md:p-8 lg:flex-row lg:items-center lg:p-10">
            <p className="max-w-3xl text-xl leading-snug font-medium text-white md:text-2xl">
              {about.strip.text}
            </p>
            <Button href={about.strip.cta.href} className="shrink-0">
              {about.strip.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
