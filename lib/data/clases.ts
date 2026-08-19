import { cache } from "react";
import { clases } from "@/content/clases";
import type { Clase } from "@/content/types";

export const getClases = cache((): Clase[] => clases);

export const getClaseBySlug = cache((slug: string): Clase | undefined =>
  clases.find((c) => c.slug === slug),
);
