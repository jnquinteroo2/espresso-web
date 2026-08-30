"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Container } from "@/components/primitives/Container";
import { MethodsShopCard } from "@/components/commerce/MethodsShopCard";
import type { MethodsShopItem } from "@/content/types";

/**
 * Filtro por marca + grilla de productos de una categoría.
 *
 * Filtra en el cliente leyendo ?marca= de la URL (y la actualiza al tocar un
 * chip, así el enlace se sigue pudiendo compartir). Antes esto se resolvía en
 * el servidor con `searchParams`, lo que impedía exportar el sitio estático.
 */
export function MethodsShopCategoriaGrid({ items }: { items: MethodsShopItem[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeMarcas = (searchParams.get("marca") ?? "").split(",").filter(Boolean);
  const marcas = Array.from(new Set(items.map((item) => item.marca))).sort();
  const filtered =
    activeMarcas.length > 0 ? items.filter((item) => activeMarcas.includes(item.marca)) : items;

  function alternar(marca: string) {
    const next = activeMarcas.includes(marca)
      ? activeMarcas.filter((m) => m !== marca)
      : [...activeMarcas, marca];
    router.replace(next.length > 0 ? `${pathname}?marca=${next.join(",")}` : pathname, {
      scroll: false,
    });
  }

  return (
    <>
      {marcas.length > 1 && (
        <Container className="flex flex-wrap gap-2 pb-8">
          {marcas.map((marca) => {
            const activa = activeMarcas.includes(marca);
            return (
              <button
                key={marca}
                type="button"
                onClick={() => alternar(marca)}
                aria-pressed={activa}
                className={`min-h-9 px-3 flex items-center border font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] transition-colors ${
                  activa
                    ? "border-zone-fg bg-zone-fg text-zone-bg"
                    : "border-zone-rule hover:border-zone-fg"
                }`}
              >
                {marca}
              </button>
            );
          })}
        </Container>
      )}

      <Container>
        <h2 className="sr-only">Productos</h2>
        {filtered.length === 0 ? (
          <p className="font-source-sans text-[length:var(--text-lead)] py-16 text-center">
            Ningún producto con esa marca todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filtered.map((item) => (
              <MethodsShopCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
