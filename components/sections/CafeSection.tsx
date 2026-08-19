"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Monogram } from "@/components/brand/Monogram";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { cafes } from "@/content/cafes";
import type { Theme } from "@/components/primitives/ThemeZone";
import { cn } from "@/lib/utils";

type Criterio = "origen" | "perfil" | "metodo" | "edicion";

const TABS: { criterio: Criterio; icon: BrandIconName; label: string; zone: Theme }[] = [
  { criterio: "origen", icon: "asterisco", label: "Origen", zone: "beige" },
  { criterio: "perfil", icon: "arco", label: "Perfil", zone: "blue" },
  { criterio: "metodo", icon: "reloj", label: "Método", zone: "green" },
  { criterio: "edicion", icon: "estrella", label: "Edición", zone: "ink" },
];

function cafesFor(criterio: Criterio) {
  switch (criterio) {
    case "origen":
      return cafes.slice(0, 6);
    case "perfil":
      return cafes.filter((c) => c.perfil === "moderno");
    case "metodo":
      return cafes.filter((c) => c.metodos.includes("filtrado"));
    case "edicion":
      return cafes.filter((c) => c.estado === "limitada" || c.estado === "preventa");
  }
}

export function CafeSection() {
  const [active, setActive] = useState<Criterio>("origen");
  const tabRefs = useRef<Record<Criterio, HTMLButtonElement | null>>({
    origen: null,
    perfil: null,
    metodo: null,
    edicion: null,
  });

  const activeTab = TABS.find((t) => t.criterio === active)!;
  const filtrados = cafesFor(active);

  function onKeyDown(e: React.KeyboardEvent) {
    const idx = TABS.findIndex((t) => t.criterio === active);
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = TABS.length - 1;
    if (nextIdx === null) return;
    e.preventDefault();
    const next = TABS[nextIdx].criterio;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      data-theme={activeTab.zone}
      data-zone-track="true"
      className="bg-zone-bg text-zone-fg transition-colors duration-[600ms] ease-[var(--ease-inout)]"
      aria-labelledby="cafe-heading"
    >
      <Section>
        <Container className="flex flex-col gap-12">
          <Reveal as="div" className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <MicroLabel numeral="01">El café</MicroLabel>
              <DisplayTitle level={2} id="cafe-heading">
                Lotes de la temporada
              </DisplayTitle>
              <p className="font-source-sans text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)] max-w-prose">
                Tostamos en pequeños lotes cada semana. Cada bolsa lleva su fecha de tueste, su origen y su perfil. Si no está en la lista, es porque se acabó.
              </p>
            </div>
            <Link
              href="/cafe"
              className="shrink-0 font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Ver todo el café →
            </Link>
          </Reveal>

          <Reveal
            as="div"
            delay={80}
            role="tablist"
            aria-label="Filtrar lotes por criterio"
            onKeyDown={onKeyDown}
            className="flex items-center justify-center gap-8 md:gap-12"
          >
            {TABS.slice(0, 2).map((tab) => (
              <Tab key={tab.criterio} tab={tab} active={active} setActive={setActive} tabRefs={tabRefs} />
            ))}
            <Monogram size={34} className="pointer-events-none select-none" />
            {TABS.slice(2).map((tab) => (
              <Tab key={tab.criterio} tab={tab} active={active} setActive={setActive} tabRefs={tabRefs} />
            ))}
          </Reveal>

          <p aria-live="polite" className="sr-only">
            {filtrados.length} {filtrados.length === 1 ? "lote encontrado" : "lotes encontrados"} por {activeTab.label.toLowerCase()}
          </p>

          <div
            role="tabpanel"
            id="cafe-tabpanel"
            aria-labelledby={`tab-${active}`}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtrados.map((cafe, i) => (
              <Reveal key={cafe.slug} delay={Math.min(i, 5) * 30}>
                <ProductCard cafe={cafe} zone={activeTab.zone} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </section>
  );
}

function Tab({
  tab,
  active,
  setActive,
  tabRefs,
}: {
  tab: { criterio: Criterio; icon: BrandIconName; label: string };
  active: Criterio;
  setActive: (c: Criterio) => void;
  tabRefs: React.RefObject<Record<Criterio, HTMLButtonElement | null>>;
}) {
  const selected = active === tab.criterio;
  return (
    <button
      ref={(el) => {
        tabRefs.current[tab.criterio] = el;
      }}
      type="button"
      role="tab"
      id={`tab-${tab.criterio}`}
      aria-selected={selected}
      aria-controls="cafe-tabpanel"
      tabIndex={selected ? 0 : -1}
      onClick={() => setActive(tab.criterio)}
      className={cn(
        "flex flex-col items-center gap-2 pb-1.5 border-b-2 transition-colors",
        selected ? "border-zone-fg" : "border-transparent hover:opacity-70",
      )}
    >
      <BrandIcon name={tab.icon} size={26} decorative={false} label={tab.label} />
      <span className="sr-only">{tab.label}</span>
    </button>
  );
}
