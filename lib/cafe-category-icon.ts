import type { Cafe } from "@/content/types";
import type { BrandIconName } from "@/components/brand/BrandIcon";

export const CATEGORIA_ICON: Record<Cafe["categoria"], BrandIconName> = {
  snow: "asterisco",
  fire: "estrella",
  terra: "reloj",
  sand: "arco",
};
