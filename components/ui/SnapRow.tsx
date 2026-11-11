import { Reveal } from "./Reveal";

/**
 * Carrossel horizontal com scroll-snap no celular (cada card ocupa ~85% da
 * largura, deixando o próximo à mostra) e grid a partir de md.
 */
export function SnapRow({
  items,
  cols,
  className = "",
}: {
  items: React.ReactNode[];
  /** Classes de grid a partir de md, ex.: "md:grid-cols-2 lg:grid-cols-4" */
  cols: string;
  className?: string;
}) {
  return (
    <ul
      className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${cols} ${className}`}
    >
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={i}
          delay={i * 80}
          className="w-[85%] shrink-0 snap-start md:w-auto"
        >
          {item}
        </Reveal>
      ))}
    </ul>
  );
}
