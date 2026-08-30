"use client";

import { useEffect, useRef, useState } from "react";

import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import type { MethodsShopItem } from "@/content/types";
import { useOrderStore, orderItemId } from "@/lib/store/order";
import { formatCOP } from "@/lib/whatsapp";

export function MethodsShopCard({ item }: { item: MethodsShopItem }) {
  const colores = item.colores ?? [];
  const [color, setColor] = useState(colores[0] ?? "");
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useOrderStore((s) => s.addItem);
  const openCart = useOrderStore((s) => s.openCart);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const sinPrecio = item.precio <= 0;
  const disabled = !item.stock || sinPrecio;

  function handleAgregar() {
    addItem({
      id: orderItemId(item.slug, color),
      slug: item.slug,
      nombre: item.nombre,
      detalle: color ? `${item.marca} · ${color}` : item.marca,
      href: `/methods-shop/${item.categoria}`,
      precioUnitario: item.precio,
    });
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
    openCart();
  }

  return (
    <article className="flex h-full flex-col gap-3">
      <div className="relative aspect-3/4 overflow-hidden bg-zone-fg/[0.04] flex items-end p-4">
        <img
          src={item.imagen}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {!item.stock && (
          <span className="relative bg-zone-bg px-2 py-1 font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg">
            Agotado
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg">
          {item.marca}
        </span>
        <h3 className="font-garet text-[length:var(--text-h3)] leading-tight line-clamp-2 min-h-[2.2em]">
          {item.nombre}
        </h3>
        <p className="font-source-sans text-[length:var(--text-body)] text-zone-fg/70 line-clamp-3 min-h-[4.5em]">
          {item.descripcion}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {colores.length > 0 && (
          <label className="flex flex-col gap-1">
            <span className="sr-only">Color de {item.nombre}</span>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              disabled={colores.length === 1}
              className="min-h-11 w-full border border-zone-rule bg-transparent px-3 font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] transition-colors hover:border-zone-fg focus:border-zone-fg focus:outline-none disabled:opacity-60"
            >
              {colores.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}

        <span className="font-dinish text-[length:var(--text-lead)] tabular-nums">
          {sinPrecio ? "Precio por confirmar" : formatCOP(item.precio)}
        </span>

        <ButtonOutline
          as="button"
          type="button"
          onClick={handleAgregar}
          disabled={disabled}
          size="sm"
          fullWidth
          className="transition-colors duration-[var(--dur-fast)]"
        >
          {!item.stock ? "Agotado" : sinPrecio ? "Próximamente" : justAdded ? "Añadido ✓" : "Añadir al carrito"}
        </ButtonOutline>
      </div>
    </article>
  );
}
