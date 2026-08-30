"use client";

import { useEffect, useRef } from "react";
import type { MediaGaleria } from "@/content/brand-assets";

/**
 * Grilla de la galería de maquila: 2 columnas en móvil, 3 en escritorio.
 *
 * Los clips solo se reproducen mientras están a la vista; fuera de pantalla se
 * pausan, para no tener ocho videos decodificando a la vez.
 */
export function GaleriaMaquila({ items }: { items: MediaGaleria[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const videos = Array.from(grid.querySelectorAll("video"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "200px" },
    );
    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div ref={gridRef} className="grid grid-cols-2 gap-1.5 md:grid-cols-3 md:gap-2">
      {items.map((item) => (
        <div key={item.src} className="aspect-square overflow-hidden bg-zone-fg/[0.06]">
          {item.tipo === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
              draggable={false}
            />
          )}
        </div>
      ))}
    </div>
  );
}
