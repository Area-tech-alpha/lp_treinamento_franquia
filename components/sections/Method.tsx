import { method } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import {
  Button,
  Container,
  Eyebrow,
  SectionTitle,
  Tag,
} from "@/components/ui/primitives";

export function Method() {
  const { mindset } = method;

  return (
    <section id="metodo" className="glow-sides relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow={method.eyebrow}
            title={method.title}
            text={method.text}
          />
        </Reveal>

        {/* Bloco de mentalidade */}
        <Reveal delay={80}>
          <div className="mt-12 grid overflow-hidden rounded-3xl border border-alpha/20 bg-ink-2 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[16/10] bg-gradient-to-br from-ink-3 to-[#2a2410] lg:aspect-auto lg:min-h-[22rem]">
              <Photo
                src={mindset.image.src}
                alt={mindset.image.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink-2/60" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <Eyebrow>{mindset.label}</Eyebrow>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance text-white sm:text-3xl">
                {mindset.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{mindset.text}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-16 text-lg font-medium text-white">
            {method.chooseLabel}
          </p>
        </Reveal>

        <div className="mt-6 flex flex-col gap-16 sm:gap-20">
          {method.paths.map((path, i) => (
            <div key={path.id} id={path.id} className="scroll-mt-24">
              {/* divisor com ícone */}
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-alpha text-ink shadow-[0_0_30px_-4px_rgba(255,212,0,0.7)]">
                    <Icon name={path.icon} className="size-5" />
                  </span>
                  <Eyebrow>{path.audience}</Eyebrow>
                  <span className="h-px flex-1 bg-gradient-to-r from-alpha/40 to-transparent" />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <article
                  className={`mt-6 grid overflow-hidden rounded-3xl border border-alpha/20 bg-ink-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-3 to-[#2a2410] lg:aspect-auto lg:min-h-[28rem]">
                    <Photo
                      src={path.image.src}
                      alt={path.image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2/80 via-transparent to-transparent" />
                    <span className="absolute top-5 left-5 rounded-full bg-alpha px-3 py-1 text-xs font-semibold text-ink">
                      {path.badge}
                    </span>
                  </div>

                  <div className="flex flex-col p-7 sm:p-10">
                    <h3 className="text-2xl font-medium tracking-tight text-balance text-white sm:text-3xl">
                      {path.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {path.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <ul className="mt-7 space-y-4">
                      {path.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-white/85">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-alpha text-ink">
                            <Icon name="check" className="size-3" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-9">
                      <Button href={path.cta.href} arrow>
                        {path.cta.label}
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
