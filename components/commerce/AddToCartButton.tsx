"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { useOrderStore, orderItemId } from "@/lib/store/order";

export function AddToCartButton({
  slug,
  nombre,
  detalle,
  href,
  precio,
  disabled = false,
  size,
}: {
  slug: string;
  nombre: string;
  detalle?: string;
  href?: string;
  precio: number;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useOrderStore((s) => s.addItem);
  const openCart = useOrderStore((s) => s.openCart);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function handleClick() {
    addItem({
      id: orderItemId(slug),
      slug,
      nombre,
      detalle,
      href,
      precioUnitario: precio,
    });
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
    openCart();
  }

  return (
    <ButtonOutline
      as="button"
      type="button"
      onClick={handleClick}
      disabled={disabled}
      size={size}
      fullWidth
      className="transition-colors duration-[var(--dur-fast)]"
    >
      {disabled ? "Agotado" : justAdded ? "Añadido ✓" : "Añadir al carrito"}
    </ButtonOutline>
  );
}
