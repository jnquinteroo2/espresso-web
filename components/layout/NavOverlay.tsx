"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { IconRow } from "@/components/brand/IconRow";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { href: string; label: string; sublabel?: string }[] = [
  { href: "/nosotros", label: "Quiénes somos", sublabel: "Nuestros proyectos" },
  { href: "/cafe", label: "Coffee" },
  { href: "/suscripcion", label: "Suscripción" },
  { href: "/methods-shop", label: "Methods shop" },
  { href: "/marcas-aliadas", label: "Marcas aliadas" },
  { href: "/contacto", label: "Contáctanos" },
];

export function NavOverlay({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelId = "nav-overlay-panel";

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        returnFocusRef.current?.focus();
        return;
      }
      const panel = document.getElementById(panelId);
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, returnFocusRef]);

  return (
    <ThemeZone
      theme="ink"
      as="div"
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto",
        "transition-transform duration-[var(--dur-slow)] ease-[var(--ease-inout)]",
        open ? "translate-y-0" : "-translate-y-full pointer-events-none",
      )}
    >
      {}
      <div className="sticky top-0 z-10 h-[72px]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-end px-5 md:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => {
              onClose();
              returnFocusRef.current?.focus();
            }}
            aria-label="Cerrar menú"
            className={cn(
              "min-h-11 min-w-11 flex items-center justify-center hover:opacity-60",
              "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
              open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
            )}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5 L19 19" />
              <path d="M19 5 L5 19" />
            </svg>
          </button>
        </div>
      </div>

      <Container className="flex min-h-[calc(100svh-72px)] flex-col justify-between gap-16 pb-24 pt-4">
        <nav aria-label="Navegación principal" className="grid gap-10 pt-8 lg:grid-cols-[2fr_1fr]">
          <ol className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  "flex items-baseline gap-4 md:gap-6",
                  "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }}
              >
                <span className="font-dinish text-[length:clamp(28px,4vw,48px)] leading-none text-zone-fg/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}

                  className="font-dinish font-bold text-[length:var(--text-h2)] leading-[1.1] hover:opacity-60 transition-opacity"
                >
                  {item.label}
                  {}
                  {item.sublabel && (
                    <span className="block font-garet text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-[#878787]">
                      {item.sublabel}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>

          <div
            className={cn(

              "font-garet text-[length:var(--text-body)] text-[#878787] flex flex-col gap-4 self-end",
              "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: open ? `${120 + NAV_ITEMS.length * 40}ms` : "0ms" }}
          >
            <p>Mosquera, Cundinamarca</p>
            <p>Lunes a domingo, 10:00 a.m. – 8:00 p.m.</p>
            <p>WhatsApp: +57 313 4047 822</p>
            <p>@espressocoffeeshop</p>
          </div>
        </nav>

        {}
        <IconRow
          withSeal={false}
          gap="gap-14 md:gap-24"
          className={cn(
            "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
          style={{ transitionDelay: open ? `${160 + NAV_ITEMS.length * 40}ms` : "0ms" }}
        />
      </Container>
    </ThemeZone>
  );
}
