"use client";

import { useEffect } from "react";

/**
 * UN solo listener de scroll (rAF-throttled) que escribe --scroll-progress
 * en :root. CircularSeal y ProgressBar lo leen desde CSS — sin GSAP,
 * sin ScrollTrigger, sin dependencia. Se monta una vez por página.
 */
export function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    function update() {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
