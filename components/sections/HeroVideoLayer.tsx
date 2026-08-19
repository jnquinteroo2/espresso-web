"use client";

import { useEffect, useState } from "react";

/**
 * Video de fondo del hero, lavado con velo blanco (85% opacity) para que
 * la zona siga leyéndose paper y el wordmark siga en negro — ver
 * docs/CONTENIDO-PENDIENTE.md. Ninguno de los dos archivos existe todavía
 * (bloqueado por el cliente); el componente queda listo para recibirlos:
 * basta con completar VIDEO_SRC/POSTER_SRC.
 *
 * Reglas de performance (no negociables):
 * - El LCP de / SIEMPRE debe ser el wordmark (server-rendered, capa de
 *   video montada aparte via dynamic import ssr:false).
 * - preload="none": el <video> no se monta con fuente hasta confirmar en
 *   cliente que aplica reproducir (desktop + sin reduced-motion + sin
 *   Save-Data + conexión no 2g/3g). Sin esto no hay fetch alguno.
 * - Poster (cuando exista) se muestra siempre que no se cumplan esas
 *   condiciones — incluido mobile, donde el video nunca se monta.
 */
const VIDEO_SRC: string | null = null; // TODO: contenido pendiente — bloqueado por el cliente, ver CONTENIDO-PENDIENTE.md
const POSTER_SRC: string | null = null; // TODO: contenido pendiente — poster AVIF <40KB con el mismo lavado

export function HeroVideoLayer() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    if (!VIDEO_SRC) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    type NavigatorWithConnection = Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const connection = (navigator as NavigatorWithConnection).connection;
    const saveData = connection?.saveData ?? false;
    const slowConnection = connection?.effectiveType === "2g" || connection?.effectiveType === "3g";

    if (reducedMotion || !isDesktop || saveData || slowConnection) return;
    setCanPlayVideo(true);
  }, []);

  if (!VIDEO_SRC && !POSTER_SRC) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ aspectRatio: "16 / 9" }} aria-hidden="true">
      {POSTER_SRC && (
        // eslint-disable-next-line @next/next/no-img-element -- poster lavado decorativo, nunca debe competir por LCP con next/image
        <img src={POSTER_SRC} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {canPlayVideo && VIDEO_SRC && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC ?? undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      {/* Velo blanco — lee como fantasma apenas perceptible, la zona sigue siendo paper */}
      <div className="absolute inset-0 bg-white/85" />
    </div>
  );
}
