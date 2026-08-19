import { cn } from "@/lib/utils";

export type BrandIconName = "arco" | "asterisco" | "reloj" | "estrella";

// TODO: contenido de ejemplo — reemplazar con datos reales del cliente
// Estos 4 paths son una interpretación propia (arco/portal, asterisco de 8
// brazos, reloj de arena, estrella de 8 puntas), NO los SVG originales de la
// marca — no se tuvo acceso a ellos. Placeholder explícito, ver punto 1 de
// docs/CONTENIDO-PENDIENTE.md. Al llegar los originales: reemplazar únicamente
// el atributo `d` de cada entrada, sin tocar la API del componente (props
// name/size/decorative/label, stroke="currentColor", stroke-width por tramo
// en strokeWidthFor()). Misma regla aplica a espresso-seal.svg si el cliente
// prefiere el asset estático sobre el sello generado en CircularSeal.tsx.
const paths: Record<BrandIconName, string> = {
  arco: "M5 21 V12 A7 7 0 0 1 19 12 V21",
  asterisco: "M12 4 V20 M4 12 H20 M6.34 6.34 L17.66 17.66 M17.66 6.34 L6.34 17.66",
  reloj:
    "M6 3 H18 M6 21 H18 M6 3 C6 8 9 9.5 12 12 C15 9.5 18 8 18 3 M6 21 C6 16 9 14.5 12 12 C15 14.5 18 16 18 21",
  estrella:
    "M12 2 L13.53 8.3 L19.07 4.93 L15.7 10.47 L22 12 L15.7 13.53 L19.07 19.07 L13.53 15.7 L12 22 L10.47 15.7 L4.93 19.07 L8.3 13.53 L2 12 L8.3 10.47 L4.93 4.93 L10.47 8.3 Z",
};

/** Grosor por tramo de tamaño con corrección óptica (addendum-01 §3). */
function strokeWidthFor(size: number) {
  if (size <= 20) return 1.25;
  if (size <= 28) return 1.5;
  if (size <= 40) return 1.75;
  return 2;
}

export function BrandIcon({
  name,
  size = 24,
  className,
  decorative = true,
  label,
}: {
  name: BrandIconName;
  size?: number;
  className?: string;
  decorative?: boolean;
  label?: string;
}) {
  return (
    <div
      className={cn("inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label ?? name}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidthFor(size)}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[name]} />
      </svg>
    </div>
  );
}
