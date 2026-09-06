import Link from "next/link";
import type { Cafe } from "@/content/types";
import type { Theme } from "@/components/primitives/ThemeZone";
import { RoastScale } from "@/components/commerce/RoastScale";
import { RibbonTag } from "@/components/primitives/RibbonTag";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { resolveCardColors } from "@/lib/cafe-card-color";
import { formatCOP } from "@/lib/whatsapp";
import { CATEGORIA_ICON } from "@/lib/cafe-category-icon";

const ESTADO_LABEL: Record<Cafe["estado"], string | null> = {
  disponible: null,
  limitada: "Edición limitada",
  preventa: "Preventa",
  agotado: "Agotado",
  nuevo: "Nuevo",
};

export function ProductCard({
  cafe,
  zone = "beige",
  icon,
}: {
  cafe: Cafe;
  zone?: Theme;
  icon?: BrandIconName;
}) {
  const ribbon = ESTADO_LABEL[cafe.estado];
  const precioDesde = Math.min(...cafe.presentaciones.map((p) => p.precio));
  const { bg } = resolveCardColors(cafe.colorBloque, zone);
  const resolvedIcon = icon ?? CATEGORIA_ICON[cafe.categoria];

  return (
    <div className="flex flex-col">
      <Link href={`/cafe/${cafe.slug}`} className="flex flex-col">
        <BrandIcon name={resolvedIcon} size={22} decorative className="mb-3 self-start" />
        <div
          className="relative aspect-4/5 flex items-start justify-start p-4 overflow-hidden rounded-card-photo"
          style={{ backgroundColor: bg }}
        >
          <img
            src={cafe.imagenes.bolsa}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          {ribbon && <RibbonTag text={ribbon} />}
        </div>

        <div className="border-t border-zone-rule pt-4 mt-4 flex flex-col gap-2">
          {}
          <p className="font-garet text-[length:var(--text-label)] text-[#878787]">
            Categoria {cafe.categoria}
          </p>
          <div className="flex items-start justify-between gap-4">
            {}
            <h3 className="font-dinish font-bold text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)] whitespace-pre-line">
              {cafe.nombre}
            </h3>
            {}
            <span className="shrink-0 flex flex-col items-end gap-0.5">
              {}
              <span className="font-garet text-[length:var(--text-note)] tracking-[0.14em] text-[#878787]">
                cop
              </span>
              <span className="font-dinish text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)] tabular-nums">
                {formatCOP(precioDesde)}
              </span>
            </span>
          </div>
          {}
          <p className="font-garet text-[length:var(--text-note)] tracking-[0.18em] text-[#878787]">
            {cafe.notas.join(" | ")}
          </p>
          <RoastScale tueste={cafe.tueste} className="pt-1" />
        </div>
      </Link>

      <div className="mt-3">
        <AddToCartButton
          slug={cafe.slug}
          nombre={cafe.nombre}
          href={`/cafe/${cafe.slug}`}
          precio={precioDesde}
          disabled={cafe.estado === "agotado"}
        />
      </div>
    </div>
  );
}
