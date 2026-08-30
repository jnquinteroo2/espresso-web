"use client";

import { useEffect, useState } from "react";

import { PLACEHOLDER_ASSETS } from "@/content/brand-assets";

const VIDEO_SRC: string | null = null;
const POSTER_SRC: string | null = PLACEHOLDER_ASSETS.heroFondo;

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
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {POSTER_SRC && (
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

      <div className="absolute inset-0 bg-black/100" />
    </div>
  );
}
