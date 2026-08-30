import { cache } from "react";
import { carta, cartaFiltrado } from "@/content/carta";
import type { CartaFiltrado, CartaItem, CartaSeccion } from "@/content/types";

export const getCarta = cache((): CartaItem[] => carta);

export const getCartaBySeccion = cache((seccion: CartaSeccion): CartaItem[] =>
  carta.filter((i) => i.seccion === seccion),
);

export const getCartaFiltrado = cache((): CartaFiltrado => cartaFiltrado);
