import { cache } from "react";
import { carta } from "@/content/carta";
import type { CartaItem, CartaSeccion } from "@/content/types";

export const getCarta = cache((): CartaItem[] => carta);

export const getCartaBySeccion = cache((seccion: CartaSeccion): CartaItem[] =>
  carta.filter((i) => i.seccion === seccion),
);
