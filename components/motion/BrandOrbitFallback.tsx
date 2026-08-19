import type { Marca } from "@/content/types";

/** Grid estático — siempre en el DOM, visible vía CSS cuando prefers-reduced-motion o sin soporte preserve-3d (ver globals.css). */
export function BrandOrbitFallback({ marcas }: { marcas: Marca[] }) {
  return (
    <div data-orbit-fallback className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {marcas.map((marca) => (
        <span
          key={marca.nombre}
          className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] text-center"
        >
          {marca.nombre}
        </span>
      ))}
    </div>
  );
}
