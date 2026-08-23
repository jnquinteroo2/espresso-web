"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, buildOrderMessage, formatCOP } from "@/lib/whatsapp";
import { useOrderStore, selectTotalPrecio } from "@/lib/store/order";

export function CartDrawer() {
  const isOpen = useOrderStore((s) => s.isCartOpen);
  const close = useOrderStore((s) => s.closeCart);
  const items = useOrderStore((s) => s.items);
  const removeItem = useOrderStore((s) => s.removeItem);
  const setCantidad = useOrderStore((s) => s.setCantidad);
  const clear = useOrderStore((s) => s.clear);
  const total = useOrderStore(selectTotalPrecio);

  const [visible, setVisible] = useState(false);

  if (!isOpen && visible) {
    setVisible(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  function handleComprar() {
    if (items.length === 0) return;
    window.open(getWhatsAppUrl(buildOrderMessage(items)), "_blank", "noopener,noreferrer");
    clear();
    close();
  }

  return (
    <>
      {}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-[45] bg-ink/40 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col bg-zone-bg text-zone-fg border-l border-zone-rule",
          "transition-transform duration-[var(--dur-base)] ease-[var(--ease-inout)]",
          visible ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zone-rule">
          <h2 className="font-dinish text-[length:var(--text-label)] uppercase tracking-[0.14em]">
            Tu carrito {items.length > 0 && <span className="text-zone-fg/50">({items.length})</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="min-h-11 min-w-11 flex items-center justify-center transition-opacity duration-[var(--dur-fast)] hover:opacity-60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5 L19 19" />
              <path d="M19 5 L5 19" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-source-sans text-[length:var(--text-body)] text-zone-fg/70">
              Todavía no has añadido nada.
            </p>
            <Link
              href="/cafe"
              onClick={close}
              className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Ver café
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col gap-2 pb-6 border-b border-zone-rule last:border-b-0 last:pb-0",
                    "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                    visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  )}
                  style={{ transitionDelay: visible ? `${80 + Math.min(i, 5) * 30}ms` : "0ms" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={close}
                          className="font-garet text-[length:var(--text-h3)] leading-tight hover:opacity-60 transition-opacity"
                        >
                          {item.nombre}
                        </Link>
                      ) : (
                        <span className="font-garet text-[length:var(--text-h3)] leading-tight">{item.nombre}</span>
                      )}
                      {item.detalle && (
                        <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg/60">
                          {item.detalle}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Quitar ${item.nombre} del carrito`}
                      className="shrink-0 font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] underline underline-offset-4 hover:opacity-60 transition-opacity"
                    >
                      Quitar
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCantidad(item.id, item.cantidad - 1)}
                        aria-label={`Restar cantidad de ${item.nombre}`}
                        className="min-h-9 min-w-9 border border-zone-rule hover:border-zone-fg transition-colors"
                      >
                        −
                      </button>
                      <span className="font-dinish tabular-nums w-5 text-center" aria-live="polite">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCantidad(item.id, item.cantidad + 1)}
                        aria-label={`Sumar cantidad de ${item.nombre}`}
                        className="min-h-9 min-w-9 border border-zone-rule hover:border-zone-fg transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-dinish text-[length:var(--text-label)] tabular-nums">
                      {formatCOP(item.precioUnitario * item.cantidad)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zone-rule px-6 py-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
                  Total
                </span>
                <span className="font-dinish text-[length:var(--text-numeral)] leading-none tabular-nums">
                  {formatCOP(total)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleComprar}
                className="min-h-11 w-full border border-zone-fg bg-zone-fg text-zone-bg font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-opacity duration-[var(--dur-fast)] hover:opacity-80"
              >
                Comprar por WhatsApp
              </button>
              <button
                type="button"
                onClick={clear}
                className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] underline underline-offset-4 hover:opacity-60 transition-opacity self-center"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
