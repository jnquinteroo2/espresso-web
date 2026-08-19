"use client";

import { useEffect, useMemo, useState } from "react";
import type { Cafe } from "@/content/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { FilterBar } from "@/components/commerce/FilterBar";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import {
  FACET_LABELS,
  applyFilters,
  filtersFromSearchParams,
  getFacetOptions,
  searchParamsFromFilters,
  type FacetKey,
  type Filters,
} from "@/lib/cafe-facets";

export function CafeCatalog({ cafes }: { cafes: Cafe[] }) {
  const [filters, setFilters] = useState<Filters>({});
  const [hydrated, setHydrated] = useState(false);

  // Lee el estado inicial de la URL (compartible/recuperable — criterio de aceptación #7).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setFilters(filtersFromSearchParams(sp));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const qs = searchParamsFromFilters(filters);
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [filters, hydrated]);

  const options = useMemo(() => {
    const entries = (Object.keys(FACET_LABELS) as FacetKey[]).map(
      (key) => [key, getFacetOptions(cafes, key)] as const,
    );
    return Object.fromEntries(entries) as Record<FacetKey, string[]>;
  }, [cafes]);

  const filtered = useMemo(() => applyFilters(cafes, filters), [cafes, filters]);

  function toggle(key: FacetKey, value: string) {
    setFilters((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }

  function clear() {
    setFilters({});
  }

  return (
    <div>
      <FilterBar
        options={options}
        filters={filters}
        onToggle={toggle}
        onClear={clear}
        resultCount={filtered.length}
      />

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 py-12">
        <p aria-live="polite" className="sr-only">
          {filtered.length} {filtered.length === 1 ? "café encontrado" : "cafés encontrados"}
        </p>
        <h2 className="font-dinish text-[length:var(--text-label)] tabular-nums mb-8">
          {filtered.length} {filtered.length === 1 ? "lote" : "lotes"}
        </h2>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <p className="font-source-sans text-[length:var(--text-lead)]">
              Ningún lote cumple con esos filtros.
            </p>
            <ButtonOutline as="button" type="button" onClick={clear}>
              Limpiar filtros
            </ButtonOutline>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cafe, i) => (
              <div
                key={cafe.slug}
                className="animate-[fade-in-up_var(--dur-base)_var(--ease-out)_both]"
                style={{ animationDelay: `${Math.min(i, 5) * 30}ms` }}
              >
                <ProductCard cafe={cafe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
