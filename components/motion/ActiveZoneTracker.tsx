"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_HEIGHT = 72;

export function ActiveZoneTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let sections: HTMLElement[] = [];
    let ticking = false;

    function applyFrom(el: Element) {
      const cs = getComputedStyle(el);
      root.style.setProperty("--active-bg", cs.getPropertyValue("--bg"));
      root.style.setProperty("--active-fg", cs.getPropertyValue("--fg"));
    }

    function update() {
      ticking = false;
      if (sections.length === 0) return;
      const line = HEADER_HEIGHT + 1;

      let current: HTMLElement | null = null;
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = s;
          break;
        }
      }
      if (!current) {

        const first = sections[0];
        current = first.getBoundingClientRect().top > line ? first : sections[sections.length - 1];
      }
      applyFrom(current);
    }

    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    sections = Array.from(document.querySelectorAll<HTMLElement>("[data-zone-track]"));
    update();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

  return null;
}
