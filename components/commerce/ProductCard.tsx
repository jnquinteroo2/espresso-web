import Link from "next/link";
import type { Cafe } from "@/content/types";
import type { Theme } from "@/components/primitives/ThemeZone";
import { RoastScale } from "@/components/commerce/RoastScale";
import { RibbonTag } from "@/components/primitives/RibbonTag";
import { resolveCardColors } from "@/lib/cafe-card-color";
import { formatCOP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const ESTADO_LABEL: Record<Cafe["estado"], string | null> = {
  disponible: null,
  limitada: "Edición limitada",
  preventa: "Preventa",
  agotado: "Agotado",
};

/**
 * Sin fotografía de producto todavía (ver docs/CONTENIDO-PENDIENTE.md) — el
 * bloque usa `colorBloque` como fondo plano, honesto con lo que hay en vez
 * de referenciar un <img> roto.
 *
 * `zone`: zona de tema activa donde se renderiza la tarjeta. Los 3 colores
 * de colorBloque son todos oscuros y fallan contraste entre sí (~1.0-1.5:1,
 * ver lib/cafe-card-color.ts) — en zonas oscuras (home con la fila de
 * iconos activa) la tarjeta se resuelve contra la zona, no contra su color
 * fijo. En /cafe y /cafe/[slug] la zona siempre es "beige", así que no
 * cambia nada ahí — solo importa donde la zona es dinámica.
 */
export function ProductCard({ cafe, zone = "beige" }: { cafe: Cafe; zone?: Theme }) {
  const ribbon = ESTADO_LABEL[cafe.estado];
  const precioDesde = Math.min(...cafe.presentaciones.map((p) => p.precio));
  const { bg, text } = resolveCardColors(cafe.colorBloque, zone);

  return (
    <Link href={`/cafe/${cafe.slug}`} className="group flex flex-col">
      <div
        className="relative aspect-4/5 flex items-start justify-start p-4"
        style={{ backgroundColor: bg }}
      >
        <span
          className={cn(
            "font-dinish text-[length:var(--text-numeral)] leading-none",
            text === "beige" ? "text-beige" : "text-ink",
          )}
        >
          {cafe.codigo}
        </span>
        {ribbon && <RibbonTag text={ribbon} />}
      </div>

      <div className="border-t border-zone-rule pt-4 mt-4 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-garet text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)]">
            {cafe.nombre}
          </h3>
          <span className="shrink-0 flex items-baseline gap-1.5">
            <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg/60">
              Desde
            </span>
            <span className="font-dinish text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)] tabular-nums">
              {formatCOP(precioDesde)}
            </span>
          </span>
        </div>
        <p className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em]">
          {cafe.notas.join(" | ")}
        </p>
        <RoastScale tueste={cafe.tueste} className="pt-1" />
      </div>

      <span className="mt-3 w-full border border-zone-fg text-zone-fg text-center py-3 font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:bg-zone-fg group-hover:text-zone-bg">
        Pedir
      </span>
    </Link>
  );
}
