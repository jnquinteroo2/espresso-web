"use client";

import { useState } from "react";
import type { Cafe } from "@/content/types";
import { cn } from "@/lib/utils";

export function CafeImageCarousel({ cafe }: { cafe: Cafe }) {
  const fotos = [cafe.imagenes.bolsa, cafe.imagenes.caficultor, cafe.imagenes.notas];
  const [index, setIndex] = useState(0);

  function anterior() {
    setIndex((i) => (i - 1 + fotos.length) % fotos.length);
  }

  function siguiente() {
    setIndex((i) => (i + 1) % fotos.length);
  }

  return (
    <div
      className="relative aspect-4/5 overflow-hidden lg:aspect-auto lg:h-[calc(100vh-140px)]"
      style={{ backgroundColor: cafe.colorBloque }}
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Fotos de ${cafe.nombre.replace(/\n/g, " ")}`}
    >
      {fotos.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
            i === index ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          draggable={false}
        />
      ))}

      <button
        type="button"
        onClick={anterior}
        aria-label="Foto anterior"
        className="rounded-pill absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-beige/40 bg-ink/30 text-beige backdrop-blur-sm transition-colors hover:bg-ink/50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M15 5 L8 12 L15 19" />
        </svg>
      </button>
      <button
        type="button"
        onClick={siguiente}
        aria-label="Foto siguiente"
        className="rounded-pill absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-beige/40 bg-ink/30 text-beige backdrop-blur-sm transition-colors hover:bg-ink/50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M9 5 L16 12 L9 19" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-hidden="true">
        {fotos.map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-pill h-1.5 w-1.5 transition-colors",
              i === index ? "bg-beige" : "bg-beige/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
