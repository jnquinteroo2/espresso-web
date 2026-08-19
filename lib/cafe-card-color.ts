import type { Theme } from "@/components/primitives/ThemeZone";

/** Paleta de bloque de café — ver content/types.ts, restringida a estos 3 valores. */
export type ColorBloque = "#000000" | "#072230" | "#0A302B";

export const ZONE_BG: Record<Theme, string> = {
  paper: "#FFFFFF",
  beige: "#FFF7E6",
  blue: "#072230",
  green: "#0A302B",
  ink: "#000000",
};

const DARK_ZONES: ReadonlySet<Theme> = new Set(["blue", "green", "ink"]);

/**
 * Resuelve el bloque de color de una tarjeta contra la zona activa.
 *
 * Los 3 colores de `colorBloque` (ink/blue/green) son todos oscuros —
 * cualquier combinación de dos de ellos entre sí da ~1.0-1.5:1 de contraste
 * (ver docs/qa/contrast.md, addendum-06). Evitar solo la coincidencia exacta
 * con la zona activa NO alcanza: en cualquier zona oscura, los 3 fallan por
 * igual. Por eso en zona oscura la tarjeta se invierte por completo a bloque
 * beige + texto ink (13.4-19.7:1, ver test). En zona clara (paper/beige) se
 * mantiene el colorBloque original de la tarjeta (ya verificado en Fase 4,
 * 14-21:1). Función pura, determinística — misma tarjeta + misma zona =
 * mismo resultado siempre (estabilidad exigida por addendum-06).
 */
export function resolveCardColors(
  original: ColorBloque,
  zone: Theme,
): { bg: string; text: "beige" | "ink" } {
  if (DARK_ZONES.has(zone)) {
    return { bg: "#FFF7E6", text: "ink" };
  }
  return { bg: original, text: "beige" };
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const chan = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

/** Ratio de contraste WCAG entre dos colores hex. */
export function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}
