"use client";

import { useEffect } from "react";

/**
 * Detecta qué [data-zone-track] section está bajo la línea del header
 * (72px desde arriba) y copia sus --bg/--fg a --active-bg/--active-fg en
 * :root. Header y ProgressBar leen esas variables para invertir con la
 * zona real que hay debajo — sin esto el header queda fijo en la zona por
 * defecto (paper) sin importar qué se scrollee debajo.
 */
const HEADER_HEIGHT = 72;

export function ActiveZoneTracker() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-zone-track]"),
    );
    if (sections.length === 0) return;

    function applyFrom(el: Element) {
      const cs = getComputedStyle(el);
      root.style.setProperty("--active-bg", cs.getPropertyValue("--bg"));
      root.style.setProperty("--active-fg", cs.getPropertyValue("--fg"));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // El más alto en el documento entre los que cruzan la línea es la zona activa.
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        applyFrom(visible[0].target);
      },
      {
        rootMargin: `-${HEADER_HEIGHT}px 0px -${typeof window !== "undefined" ? window.innerHeight - HEADER_HEIGHT - 1 : 0}px 0px`,
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));
    applyFrom(sections[0]);

    return () => observer.disconnect();
  }, []);

  return null;
}
