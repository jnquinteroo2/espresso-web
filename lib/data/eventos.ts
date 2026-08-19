import { cache } from "react";
import { eventos } from "@/content/eventos";
import type { EventoVinyl } from "@/content/types";

export const getEventos = cache((): EventoVinyl[] => eventos);

export const getEventoBySlug = cache((slug: string): EventoVinyl | undefined =>
  eventos.find((e) => e.slug === slug),
);

export const getProximoEvento = cache((): EventoVinyl | undefined => eventos[0]);
