import { cache } from "react";
import { cafes } from "@/content/cafes";
import type { Cafe } from "@/content/types";

export const getCafes = cache((): Cafe[] => cafes);

export const getCafeBySlug = cache((slug: string): Cafe | undefined =>
  cafes.find((c) => c.slug === slug),
);

export const getOtrosLotes = cache((slug: string, limit = 3): Cafe[] =>
  cafes.filter((c) => c.slug !== slug).slice(0, limit),
);
