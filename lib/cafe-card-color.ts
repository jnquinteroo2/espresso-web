import type { Theme } from "@/components/primitives/ThemeZone";

export type ColorBloque = "#000000" | "#072230" | "#0A302B";

export const ZONE_BG: Record<Theme, string> = {
  paper: "#FFFFFF",
  beige: "#FFF7E6",
  blue: "#072230",
  green: "#0A302B",
  ink: "#000000",
};

const DARK_ZONES: ReadonlySet<Theme> = new Set(["blue", "green", "ink"]);

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

export function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}
