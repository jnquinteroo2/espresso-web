"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useOrderStore, selectTotalItems } from "@/lib/store/order";
import { BRAND_ASSETS } from "@/content/brand-assets";

const NavOverlay = dynamic(
  () => import("@/components/layout/NavOverlay").then((m) => m.NavOverlay),
  { ssr: false },
);
const CartDrawer = dynamic(
  () => import("@/components/commerce/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false },
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const totalItems = useOrderStore(selectTotalItems);
  const isCartOpen = useOrderStore((s) => s.isCartOpen);
  const openCart = useOrderStore((s) => s.openCart);
  const [cartHasOpened, setCartHasOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (isCartOpen && !cartHasOpened) {
    setCartHasOpened(true);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-[72px] bg-active-bg text-active-fg transition-colors duration-[600ms] ease-[var(--ease-inout)]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
          <Link
            href="/"
            aria-label="Espresso Coffee Shop — inicio"
            className="flex items-center hover:opacity-60 transition-opacity"
          >
            {}
            <img
              src={BRAND_ASSETS.selloCircular}
              alt=""
              aria-hidden="true"
              className="h-12 w-12 object-contain select-none pointer-events-none"
              draggable={false}
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/cafe"
              aria-label="Buscar café"
              className="min-h-11 min-w-11 flex items-center justify-center hover:opacity-60 transition-opacity"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21 L16.65 16.65" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative min-h-11 min-w-11 flex items-center justify-center hover:opacity-60 transition-opacity"
              aria-haspopup="dialog"
              aria-expanded={isCartOpen}
              aria-label={`Ver carrito${mounted && totalItems > 0 ? ` (${totalItems} ítems)` : ""}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 4h2l2.6 12.4a2 2 0 0 0 2 1.6h8a2 2 0 0 0 2-1.6L21 8H6" />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
              </svg>
              {mounted && totalItems > 0 && (

                <span
                  aria-hidden="true"
                  className="rounded-pill absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center bg-seal px-1 font-dinish text-[9px] text-beige"
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                if (!hasOpened) {

                  setHasOpened(true);
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => setOpen(true));
                  });
                } else {
                  setOpen(true);
                }
              }}
              aria-label="Abrir menú"
              aria-expanded={open}
              className={cn(
                "min-h-11 min-w-11 flex flex-col items-center justify-center gap-2 hover:opacity-60 transition-opacity",
              )}
            >
              <span className="block h-px w-7 bg-current" />
              <span className="block h-px w-7 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {hasOpened && (
        <NavOverlay open={open} onClose={() => setOpen(false)} returnFocusRef={menuButtonRef} />
      )}
      {cartHasOpened && <CartDrawer />}
    </>
  );
}
