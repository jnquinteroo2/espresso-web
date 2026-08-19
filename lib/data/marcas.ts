import { cache } from "react";
import { marcas } from "@/content/marcas";
import type { Marca, TipoMarca } from "@/content/types";

export const getMarcas = cache((): Marca[] => marcas);

export const getMarcasByTipo = cache((tipo: TipoMarca): Marca[] =>
  marcas.filter((m) => m.tipo === tipo),
);
