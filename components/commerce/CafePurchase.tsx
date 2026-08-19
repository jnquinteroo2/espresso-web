"use client";

import { useEffect, useRef, useState } from "react";
import type { Cafe } from "@/content/types";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { formatCOP } from "@/lib/whatsapp";
import { useOrderStore, orderItemId } from "@/lib/store/order";

export function CafePurchase({ cafe }: { cafe: Cafe }) {
  const [presentacionIdx, setPresentacionIdx] = useState(0);
  const [molienda, setMolienda] = useState(cafe.moliendas[0]);
  const [cantidad, setCantidad] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useOrderStore((s) => s.addItem);
  const openCart = useOrderStore((s) => s.openCart);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const presentacion = cafe.presentaciones[presentacionIdx];
  const total = presentacion.precio * cantidad;

  function handleAgregar() {
    addItem({
      id: orderItemId(cafe.slug, `${presentacion.gramos}g-${molienda}`),
      slug: cafe.slug,
      nombre: cafe.nombre,
      detalle: `${presentacion.gramos} g · ${molienda}`,
      href: `/cafe/${cafe.slug}`,
      cantidad,
      precioUnitario: presentacion.precio,
    });
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
    openCart();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
          Presentación
        </span>
        <div className="flex flex-wrap gap-2">
          {cafe.presentaciones.map((p, i) => (
            <button
              key={p.gramos}
              type="button"
              onClick={() => setPresentacionIdx(i)}
              aria-pressed={i === presentacionIdx}
              className={`min-h-11 px-4 border font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-colors ${
                i === presentacionIdx
                  ? "border-zone-fg bg-zone-fg text-zone-bg"
                  : "border-zone-rule hover:border-zone-fg"
              }`}
            >
              {p.gramos} g
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
          Molienda
        </span>
        <div className="flex flex-wrap gap-2">
          {cafe.moliendas.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMolienda(m)}
              aria-pressed={m === molienda}
              className={`min-h-11 px-4 border font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-colors ${
                m === molienda
                  ? "border-zone-fg bg-zone-fg text-zone-bg"
                  : "border-zone-rule hover:border-zone-fg"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
          Cantidad
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            aria-label="Restar cantidad"
            className="min-h-11 min-w-11 border border-zone-rule hover:border-zone-fg"
          >
            −
          </button>
          <span className="font-dinish tabular-nums w-6 text-center" aria-live="polite">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            aria-label="Sumar cantidad"
            className="min-h-11 min-w-11 border border-zone-rule hover:border-zone-fg"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">Total</span>
        <span className="font-dinish text-[length:var(--text-numeral)] leading-none tabular-nums">
          {formatCOP(total)}
        </span>
      </div>

      <ButtonOutline
        as="button"
        type="button"
        onClick={handleAgregar}
        fullWidth
        className="transition-colors duration-[var(--dur-fast)]"
      >
        {justAdded ? "Añadido ✓" : "Añadir al carrito"}
      </ButtonOutline>
    </div>
  );
}
