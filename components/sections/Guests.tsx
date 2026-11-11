import { guests, type Person } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SnapRow } from "@/components/ui/SnapRow";
import {
  Container,
  Heading,
  Label,
  leadText,
  sectionY,
  Tag,
} from "@/components/ui/primitives";

function PersonCard({ person }: { person: Person }) {
  const hasInfo = person.name || person.role || person.theme;
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-2">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Photo
          img={person.image}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 85vw"
          className="grayscale transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        {hasInfo && (
          <div className="absolute inset-x-0 bottom-0 p-6">
            {person.name && (
              <h3 className="text-xl font-semibold text-alpha md:text-2xl">{person.name}</h3>
            )}
            {person.role && <p className="mt-1 text-sm text-white/80 md:text-base">{person.role}</p>}
            {person.theme && (
              <p className="mt-3 border-t border-white/15 pt-3 text-sm text-white/90 md:text-base">
                <span className="text-white/55">Aula: </span>
                {person.theme}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/** Seção 6 — Convidados e time Alpha (fotos em P&B, nome em âmbar; carrossel no celular). */
export function Guests() {
  return (
    <section id="convidados" className={`bg-ink ${sectionY}`}>
      <Container>
        <Reveal className="max-w-3xl">
          <Label>{guests.label}</Label>
          <Heading className="mt-4">{guests.title}</Heading>
          <p className={`mt-5 text-muted ${leadText}`}>{guests.text}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {guests.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Reveal>

        {/* Convidados: só aparece quando houver convidados em content/abs.ts */}
        {guests.items.length > 0 && (
          <SnapRow
            className="mt-12"
            cols="md:grid-cols-2 lg:grid-cols-4"
            items={guests.items.map((p, i) => (
              <PersonCard key={i} person={p} />
            ))}
          />
        )}

        {guests.team.length > 0 && (
          <div className="mt-12">
            {guests.teamLine && (
              <p className="mb-6 max-w-3xl text-lg font-medium text-white md:text-xl">
                {guests.teamLine}
              </p>
            )}
            <SnapRow
              cols="md:grid-cols-2 lg:mx-auto lg:max-w-4xl"
              items={guests.team.map((p, i) => (
                <PersonCard key={i} person={p} />
              ))}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
