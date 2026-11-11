import { ecosystem } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button, Container, SectionTitle } from "@/components/ui/primitives";

/** Posições dos 4 pilares em volta da esfera (desktop). */
const positions = [
  "lg:left-[6%] lg:top-[14%]",
  "lg:right-[6%] lg:top-[14%]",
  "lg:left-[6%] lg:bottom-[14%]",
  "lg:right-[6%] lg:bottom-[14%]",
];

function Sphere() {
  return (
    <div className="relative mx-auto grid size-56 place-items-center sm:size-72">
      {/* anéis orbitais */}
      <div className="absolute inset-[-18%] rounded-full border border-alpha/15" />
      <div className="absolute inset-[-38%] rounded-full border border-dashed border-alpha/10" />
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-alpha/40 blur-[70px]" />
      {/* esfera */}
      <div
        className="relative size-full animate-float rounded-full shadow-[0_0_80px_-10px_rgba(255,212,0,0.7),inset_-20px_-30px_60px_rgba(120,70,0,0.7)]"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #fff6c2 0%, #ffe14d 18%, #ffd400 40%, #d89a00 72%, #6b4300 100%)",
        }}
      >
        <div className="absolute top-[14%] left-[22%] h-[18%] w-[30%] rotate-[-25deg] rounded-full bg-white/50 blur-md" />
        <span className="absolute inset-0 grid place-items-center text-3xl font-semibold tracking-tight text-ink/85 sm:text-4xl">
          {ecosystem.center}
        </span>
      </div>
    </div>
  );
}

export function Ecosystem() {
  return (
    <section id="o-que-e" className="glow-sides relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow={ecosystem.eyebrow}
            title={ecosystem.title}
            text={ecosystem.text}
            center
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-alpha/20 bg-ink-2 px-6 py-16 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-10 lg:min-h-[34rem] lg:py-0">
            <div className="absolute inset-0 bg-[radial-gradient(30rem_20rem_at_50%_50%,rgba(255,212,0,0.12),transparent)]" />

            {/* linhas ligando os pilares à esfera (desktop) */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 hidden size-full lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {[
                [20, 20],
                [80, 20],
                [20, 80],
                [80, 80],
              ].map(([x, y]) => (
                <line
                  key={`${x}-${y}`}
                  x1={x}
                  y1={y}
                  x2="50"
                  y2="50"
                  stroke="rgba(255,212,0,0.35)"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.8"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            <div className="relative lg:absolute lg:inset-0 lg:grid lg:place-items-center">
              <Sphere />
            </div>

            <ul className="relative mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:static lg:mt-0">
              {ecosystem.pillars.map((p, i) => (
                <li
                  key={p.label}
                  className={`lg:absolute ${positions[i]}`}
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-alpha/25 bg-ink/80 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-alpha text-ink sm:size-10">
                      <Icon name={p.icon} className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-white sm:text-base">
                      {p.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-ink-3 p-6 sm:flex-row sm:items-center sm:p-8">
            <p className="max-w-2xl text-lg font-medium text-white sm:text-xl">
              {ecosystem.strip.text}
            </p>
            <Button href={ecosystem.strip.cta.href} arrow className="shrink-0">
              {ecosystem.strip.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
