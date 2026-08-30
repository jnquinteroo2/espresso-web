"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FACET_LABELS, type FacetKey, type Filters } from "@/lib/cafe-facets";

export function FilterBar({
  options,
  filters,
  onToggle,
  onClear,
  resultCount,
}: {
  options: Record<FacetKey, string[]>;
  filters: Filters;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);

  const activeChips = (Object.keys(filters) as FacetKey[]).flatMap((key) =>
    (filters[key] ?? []).map((value) => ({ key, value })),
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="sticky top-[72px] z-30 bg-zone-bg border-b border-zone-rule">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="min-h-11 px-4 border border-zone-fg flex items-center gap-2 font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-colors duration-[var(--dur-fast)] hover:bg-zone-fg hover:text-zone-bg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 6h16M8 12h8M11 18h2" />
            </svg>
            Filtrar
            {activeChips.length > 0 && (
              <span className="font-dinish text-[length:var(--text-micro)]">({activeChips.length})</span>
            )}
          </button>

          <p className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg/60">
            {resultCount} {resultCount === 1 ? "lote" : "lotes"}
          </p>
        </div>

        {activeChips.length > 0 && (
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 pb-4 flex flex-wrap items-center gap-2">
            {activeChips.map(({ key, value }) => (
              <button
                key={`${key}-${value}`}
                type="button"
                onClick={() => onToggle(key, value)}
                className="min-h-9 px-3 border border-zone-fg font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] flex items-center gap-1.5 transition-colors duration-[var(--dur-fast)] hover:bg-zone-fg hover:text-zone-bg"
              >
                {value}
                <span aria-hidden="true">×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={onClear}
              className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[45] bg-ink/40 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtrar café"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col bg-zone-bg text-zone-fg border-l border-zone-rule",
          "transition-transform duration-[var(--dur-base)] ease-[var(--ease-inout)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zone-rule">
          <h2 className="font-dinish text-[length:var(--text-label)] uppercase tracking-[0.14em]">
            Filtrar
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar filtros"
            className="min-h-11 min-w-11 flex items-center justify-center transition-opacity duration-[var(--dur-fast)] hover:opacity-60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5 L19 19" />
              <path d="M19 5 L5 19" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
          {(Object.keys(FACET_LABELS) as FacetKey[]).map((key, i) => {
            const values = options[key];
            if (!values || values.length === 0) return null;
            return (
              <div
                key={key}
                className={cn(
                  "flex flex-col gap-3 transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 30}ms` : "0ms" }}
              >
                <h3 className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
                  {FACET_LABELS[key]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => {
                    const active = filters[key]?.includes(value) ?? false;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onToggle(key, value)}
                        aria-pressed={active}
                        className={cn(
                          "min-h-9 px-3 border font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] transition-colors duration-[var(--dur-fast)]",
                          active
                            ? "border-zone-fg bg-zone-fg text-zone-bg"
                            : "border-zone-rule hover:border-zone-fg",
                        )}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-zone-rule px-6 py-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClear}
            disabled={activeChips.length === 0}
            className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] underline underline-offset-4 transition-opacity duration-[var(--dur-fast)] hover:opacity-60 disabled:opacity-30 disabled:pointer-events-none"
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="min-h-11 px-6 border border-zone-fg bg-zone-fg text-zone-bg font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-opacity duration-[var(--dur-fast)] hover:opacity-80"
          >
            Ver {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
          </button>
        </div>
      </div>
    </>
  );
}
