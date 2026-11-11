"use client";

import { useRef, useState } from "react";

/**
 * Carrossel com scroll-snap no mobile (cada card ~85% da largura, deixando o
 * próximo à mostra) + indicador de posição (bolinhas). A partir de md vira grid.
 */
export function SnapCarousel({
  items,
  cols,
  label,
  itemClassNames,
}: {
  items: React.ReactNode[];
  /** Classes de grid a partir de md, ex.: "md:grid-cols-2 lg:grid-cols-4" */
  cols: string;
  /** Nome do carrossel para leitores de tela. */
  label: string;
  /** Classes extras por item, na mesma ordem de items (ex.: "lg:col-span-2"). */
  itemClassNames?: string[];
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.offsetWidth + 16; // largura do card + gap-4
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  const goTo = (i: number) => {
    const el = listRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={listRef}
        onScroll={onScroll}
        aria-label={label}
        className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${cols}`}
      >
        {items.map((item, i) => (
          <li key={i} className={`w-[85%] shrink-0 snap-start md:w-auto ${itemClassNames?.[i] ?? ""}`}>
            {item}
          </li>
        ))}
      </ul>

      {/* Indicador de posição (só no mobile) */}
      {items.length > 1 && (
        <div className="mt-5 flex justify-center gap-1 md:hidden">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para o depoimento ${i + 1} de ${items.length}`}
              aria-current={i === active}
              className="grid size-10 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-alpha" : "w-2 bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
