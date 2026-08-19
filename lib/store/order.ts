import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Carrito genérico — cualquier producto de la tienda (café, methods shop...)
 * cabe en esta forma. `detalle` es una línea descriptiva libre para la
 * variante elegida (ej. "250 g · Espresso" en café, o la marca en methods
 * shop); `href` permite volver al producto desde el carrito.
 */
export type OrderItem = {
  id: string;
  slug: string;
  nombre: string;
  detalle?: string;
  href?: string;
  cantidad: number;
  precioUnitario: number;
};

type OrderState = {
  items: OrderItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<OrderItem, "cantidad"> & { cantidad?: number }) => void;
  removeItem: (id: string) => void;
  setCantidad: (id: string, cantidad: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, cantidad: i.cantidad + (item.cantidad ?? 1) }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, cantidad: item.cantidad ?? 1 }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setCantidad: (id, cantidad) =>
        set((state) => ({
          items:
            cantidad <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, cantidad } : i)),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "espresso-order",
      // Solo persistimos los productos entre visitas — isCartOpen es estado
      // de UI efímero, no debe "recordar" el panel abierto al recargar.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/** Id estable por producto + variante — mismo slug con distinta variante son líneas distintas del carrito. */
export function orderItemId(slug: string, variante = ""): string {
  return variante ? `${slug}-${variante}` : slug;
}

export const selectTotalItems = (state: OrderState): number =>
  state.items.reduce((sum, i) => sum + i.cantidad, 0);

export const selectTotalPrecio = (state: OrderState): number =>
  state.items.reduce((sum, i) => sum + i.precioUnitario * i.cantidad, 0);
