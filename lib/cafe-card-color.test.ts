import { describe, it, expect } from "vitest";
import { resolveCardColors, contrastRatio, ZONE_BG, type ColorBloque } from "./cafe-card-color";
import type { Theme } from "@/components/primitives/ThemeZone";

const ZONES: Theme[] = ["paper", "beige", "blue", "green", "ink"];
const COLORES: ColorBloque[] = ["#000000", "#072230", "#0A302B"];
const TEXT_HEX = { beige: "#FFF7E6", ink: "#000000" } as const;

describe("resolveCardColors — addendum-06 fix 1", () => {
  it.each(ZONES.flatMap((zone) => COLORES.map((original) => [zone, original] as const)))(
    "zona=%s colorBloque=%s: bloque vs fondo de zona >= 3:1, texto vs bloque >= 4.5:1",
    (zone, original) => {
      const { bg, text } = resolveCardColors(original, zone);
      const bgVsZone = contrastRatio(bg, ZONE_BG[zone]);
      const textVsBg = contrastRatio(TEXT_HEX[text], bg);

      expect(bgVsZone, `bloque ${bg} vs zona ${zone} (${ZONE_BG[zone]})`).toBeGreaterThanOrEqual(3);
      expect(textVsBg, `texto ${text} vs bloque ${bg}`).toBeGreaterThanOrEqual(4.5);
    },
  );

  it("es estable — misma tarjeta + misma zona da siempre el mismo resultado", () => {
    const a = resolveCardColors("#072230", "blue");
    const b = resolveCardColors("#072230", "blue");
    expect(a).toEqual(b);
  });

  it("en zona clara conserva el colorBloque original de la tarjeta", () => {
    expect(resolveCardColors("#0A302B", "beige")).toEqual({ bg: "#0A302B", text: "beige" });
    expect(resolveCardColors("#0A302B", "paper")).toEqual({ bg: "#0A302B", text: "beige" });
  });

  it("en zona oscura siempre invierte a bloque beige + texto ink, sin importar el original", () => {
    for (const zone of ["blue", "green", "ink"] as const) {
      for (const original of COLORES) {
        expect(resolveCardColors(original, zone)).toEqual({ bg: "#FFF7E6", text: "ink" });
      }
    }
  });
});
