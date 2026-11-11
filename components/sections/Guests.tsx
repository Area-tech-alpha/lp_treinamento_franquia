import { guests, type Person } from "@/content/abs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
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
    <article className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-2">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Photo
          img={person.image}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 85vw"
          className="grayscale transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        {hasInfo && (
          <div className="absolute inset-x-0 bottom-0 p-8">
            {person.name && (
              <h3 className="text-2xl font-semibold text-alpha md:text-3xl">{person.name}</h3>
            )}
            {person.role && (
              <p className="mt-1 text-base text-white/80 md:text-lg">{person.role}</p>
            )}
            {person.theme && (
              <p className="mt-4 border-t border-white/15 pt-4 text-base text-white/90 md:text-lg">
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

/** Carrossel com scroll-snap no celular; grid a partir do tablet. */
function PeopleRow({ people, cols }: { people: Person[]; cols: string }) {
  return (
    <ul
      className={`-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden ${cols}`}
    >
      {people.map((p, i) => (
        <Reveal
          as="li"
          key={i}
          delay={i * 80}
          className="w-[82%] shrink-0 snap-start sm:w-auto"
        >
          <PersonCard person={p} />
        </Reveal>
      ))}
    </ul>
  );
}

/** Seção 6 — Convidados e time Alpha (fotos em P&B, nome em âmbar). */
export function Guests() {
  return (
    <section id="convidados" className={`bg-ink ${sectionY}`}>
      <Container>
        <Reveal className="max-w-4xl">
          <Label>{guests.label}</Label>
          <Heading className="mt-5">{guests.title}</Heading>
          <p className={`mt-6 max-w-3xl text-muted ${leadText}`}>{guests.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {guests.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Reveal>

        {/* Convidados: só aparece quando houver convidados em content/abs.ts */}
        {guests.items.length > 0 && (
          <div className="mt-16">
            <PeopleRow people={guests.items} cols="sm:grid-cols-2 xl:grid-cols-4" />
          </div>
        )}

        {guests.team.length > 0 && (
          <div className="mt-16">
            {guests.teamLine && (
              <Reveal>
                <p className="mb-8 max-w-4xl text-xl font-medium text-white md:text-2xl">
                  {guests.teamLine}
                </p>
              </Reveal>
            )}
            <PeopleRow people={guests.team} cols="sm:grid-cols-2" />
          </div>
        )}
      </Container>
    </section>
  );
}
