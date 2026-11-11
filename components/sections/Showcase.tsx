import { showcase } from "@/content/home";
import { Photo } from "@/components/ui/Photo";

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-44 shrink-0 rounded-[2.2rem] bg-ink p-2 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.55)] sm:w-56">
      <div className="absolute top-3.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-ink-3 to-[#2a2410]">
        <Photo src={src} alt={alt} fill sizes="224px" />
      </div>
    </div>
  );
}

/** Faixa amarela com carrossel infinito de celulares (CSS puro). */
export function Showcase() {
  const items = [...showcase.items, ...showcase.items];

  return (
    <section
      aria-label={showcase.title}
      className="overflow-hidden bg-alpha py-16 sm:py-20"
    >
      <h2 className="px-4 text-center text-2xl font-medium tracking-tight text-ink sm:text-4xl">
        {showcase.title}
      </h2>
      <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] sm:gap-8">
          {items.map((item, i) => (
            <li key={i} aria-hidden={i >= showcase.items.length}>
              <PhoneFrame src={item.src} alt={item.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
