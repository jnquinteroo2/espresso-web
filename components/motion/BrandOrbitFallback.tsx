import type { Marca } from "@/content/types";
import { PLACEHOLDER_ASSETS } from "@/content/brand-assets";

export function BrandOrbitFallback({ marcas }: { marcas: Marca[] }) {
  return (

    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
      {marcas.map((marca) => (
        <span key={marca.nombre} className="flex w-32 items-center justify-center">
          {}
          <img
            src={PLACEHOLDER_ASSETS.marcaLogoTemp}
            alt={marca.nombre}
            className="h-9 w-auto max-w-32 object-contain select-none brand-invert-dark"
            draggable={false}
          />
        </span>
      ))}
    </div>
  );
}
