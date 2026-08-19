import { cn } from "@/lib/utils";

/**
 * Monograma de marca — la "Ē" sola, sin anillo de texto ni círculo.
 *
 * Reemplaza a CircularSeal en sus usos como firma de marca (header, centro
 * de filas de íconos, footer) por pedido explícito del cliente: la E no va
 * más dentro de un círculo en ningún lugar del sitio. Mismo tratamiento
 * tipográfico que Wordmark/HeroWordmark (macrón como barra absoluta sobre
 * la letra), a cualquier tamaño — invierte de color heredando currentColor
 * de la zona, igual que el resto de la marca.
 *
 * CircularSeal.tsx queda en el repo sin uso (no se borró por si se necesita
 * revertir), pero ya no se importa desde ningún lugar del sitio.
 */
export function Monogram({
  size = 32,
  decorative = true,
  label = "Espresso Coffee Shop",
  className,
}: {
  size?: number;
  decorative?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <span
      {...(decorative
        ? { "aria-hidden": "true" as const }
        : { role: "img", "aria-label": label })}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center font-garet font-semibold leading-none select-none",
        className,
      )}
      style={{ fontSize: size }}
    >
      <span className="relative inline-block">
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 bg-current"
          style={{ top: "-0.2em", width: "0.62em", height: Math.max(1.5, size * 0.035) }}
        />
        E
      </span>
    </span>
  );
}
