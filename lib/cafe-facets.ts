import type { Cafe } from "@/content/types";

export type FacetKey =
  | "tueste"
  | "origen"
  | "proceso"
  | "perfil"
  | "cafeina"
  | "variedad"
  | "estado"
  | "metodo";

export const FACET_LABELS: Record<FacetKey, string> = {
  tueste: "Tueste",
  origen: "Origen",
  proceso: "Proceso",
  perfil: "Perfil",
  cafeina: "Cafeína",
  variedad: "Variedad",
  estado: "Estado",
  metodo: "Método",
};

const ESTADO_LABEL: Record<Cafe["estado"], string> = {
  disponible: "Disponible",
  limitada: "Edición limitada",
  preventa: "Preventa",
  agotado: "Agotado",
};

const METODO_LABEL: Record<string, string> = {
  espresso: "Espresso",
  filtrado: "Filtrado",
  prensa: "Prensa",
  coldbrew: "Cold brew",
};

export type Filters = Partial<Record<FacetKey, string[]>>;

function valueOf(cafe: Cafe, key: FacetKey): string[] {
  switch (key) {
    case "tueste":
      return [cafe.tuesteNombre];
    case "origen":
      return [cafe.origen.pais];
    case "proceso":
      return [cafe.origen.proceso];
    case "perfil":
      return [cafe.perfil];
    case "cafeina":
      return [cafe.descafeinado ? "Descafeinado" : "Con cafeína"];
    case "variedad":
      return [cafe.origen.variedad];
    case "estado":
      return [ESTADO_LABEL[cafe.estado]];
    case "metodo":
      return cafe.metodos.map((m) => METODO_LABEL[m] ?? m);
  }
}

/** Solo valores que de verdad existen en el catálogo — nunca facetas vacías. */
export function getFacetOptions(cafes: Cafe[], key: FacetKey): string[] {
  const set = new Set<string>();
  for (const cafe of cafes) {
    for (const v of valueOf(cafe, key)) set.add(v);
  }
  return Array.from(set).sort();
}

export function applyFilters(cafes: Cafe[], filters: Filters): Cafe[] {
  return cafes.filter((cafe) =>
    (Object.keys(filters) as FacetKey[]).every((key) => {
      const active = filters[key];
      if (!active || active.length === 0) return true;
      const values = valueOf(cafe, key);
      return active.some((v) => values.includes(v));
    }),
  );
}

export function filtersFromSearchParams(sp: URLSearchParams): Filters {
  const filters: Filters = {};
  for (const key of Object.keys(FACET_LABELS) as FacetKey[]) {
    const raw = sp.get(key);
    if (raw) {
      const values = raw.split(",").filter(Boolean);
      if (values.length > 0) filters[key] = values;
    }
  }
  return filters;
}

export function searchParamsFromFilters(filters: Filters): string {
  const sp = new URLSearchParams();
  for (const key of Object.keys(filters) as FacetKey[]) {
    const values = filters[key];
    if (values && values.length > 0) sp.set(key, values.join(","));
  }
  return sp.toString();
}
