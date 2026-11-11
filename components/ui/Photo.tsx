import Image from "next/image";
import type { Img } from "@/content/abs";

/**
 * Foto do conteúdo (next/image, sempre com fill + object-cover).
 * O recorte vem de `img.position` (object-position), definido em content/abs.ts.
 */
export function Photo({
  img,
  sizes,
  className = "",
  preload = false,
}: {
  img: Img;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
      style={img.position ? { objectPosition: img.position } : undefined}
    />
  );
}
