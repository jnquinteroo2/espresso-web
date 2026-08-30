"use client";

import { useEffect, useState } from "react";

import { HERO_INTRO_FRAMES, PLACEHOLDER_ASSETS } from "@/content/brand-assets";
import { cn } from "@/lib/utils";

/** Fotogramas de la intro, cada uno con su propia duración (ver brand-assets). */
const INTRO_FRAMES = HERO_INTRO_FRAMES;
/** Si las imágenes tardan más que esto, se salta la intro y queda el logo. */
const PRELOAD_TIMEOUT_MS = 2500;

export function HeroWordmark() {
  // null = logo final (estado inicial, y estado definitivo al terminar la intro).
  const [frame, setFrame] = useState<number | null>(null);

  // Precarga los fotogramas y recién ahí arranca la secuencia, para que no
  // aparezcan huecos en blanco mientras cada imagen se descarga.
  useEffect(() => {
    if (INTRO_FRAMES.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let settled = 0;

    const onSettle = () => {
      settled += 1;
      if (!cancelled && settled === INTRO_FRAMES.length) setFrame(0);
    };

    const images = INTRO_FRAMES.map(({ src }) => {
      const img = new window.Image();
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = src;
      return img;
    });

    // Si la red va lenta no se muestra una intro entrecortada: queda el logo.
    const timeout = window.setTimeout(() => {
      cancelled = true;
    }, PRELOAD_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Cada fotograma dura lo suyo; al pasar el último vuelve al logo.
  useEffect(() => {
    if (frame === null) return;

    const timeout = window.setTimeout(() => {
      setFrame(frame + 1 < INTRO_FRAMES.length ? frame + 1 : null);
    }, INTRO_FRAMES[frame].ms);

    return () => window.clearTimeout(timeout);
  }, [frame]);

  const isFinal = frame === null;
  const src = isFinal ? PLACEHOLDER_ASSETS.heroLogo : INTRO_FRAMES[frame].src;

  return (
    // Marco fijo: todas las imágenes (logo e intro) se escalan para llenarlo
    // lo máximo que permita su proporción, así ninguna se ve más chica que
    // otra y el bloque no cambia de ancho durante la secuencia.
    <span className="block h-[clamp(200px,30vw,480px)] w-[min(88vw,880px)] max-w-full">
      <img
        src={src}
        alt="Espresso Coffee Shop"
        className={cn(
          "h-full w-full object-contain select-none",
          // La imagen final va un poco más grande que los fotogramas de la intro.
          isFinal && "scale-[1.15]",
        )}
        draggable={false}
      />
    </span>
  );
}
