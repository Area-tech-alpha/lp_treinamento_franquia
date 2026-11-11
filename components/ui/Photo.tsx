"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

/**
 * next/image com fallback: se o arquivo ainda não existir em /public/images,
 * a imagem some e fica só o fundo do container (gradiente escuro),
 * em vez do ícone de imagem quebrada.
 */
export function Photo({ className = "", alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  // Cobre o caso em que a imagem falhou antes da hidratação (onError não dispara).
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !props.src) return null;
  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
