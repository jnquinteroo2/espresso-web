import type { Metadata } from "next";
import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { getMethodsShopCategoriaCount } from "@/lib/data/methods-shop";
import { METHODS_SHOP_CATEGORIA_IMAGEN } from "@/content/brand-assets";
import type { CategoriaMethodsShop } from "@/content/types";

export const metadata: Metadata = {
  title: "Methods shop",
  description: "Equipos y accesorios de café de especialidad: molinos, drips, accesorios, merch, tazas y filtros.",
};

const CATEGORIAS: { num: string; nombre: string; categoria: CategoriaMethodsShop }[] = [
  { num: "01", nombre: "Molinos", categoria: "molinos" },
  { num: "02", nombre: "Drips", categoria: "drips" },
  { num: "03", nombre: "Accesorios", categoria: "accesorios" },
  { num: "04", nombre: "Merch", categoria: "merch" },
  { num: "05", nombre: "Tazas", categoria: "tazas" },
  { num: "06", nombre: "Filtros", categoria: "filtros" },
];

export default function MethodsShopHubPage() {
  return (
    <ThemeZone theme="paper" as="div" track>
      <Container className="pt-12 pb-8 flex flex-col gap-4">
        <MicroLabel>Methods shop</MicroLabel>
        <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
          Equipos y accesorios
        </DisplayTitle>
        <p className="font-source-sans text-[length:var(--text-lead)] max-w-prose">
          No vendemos lo que no probamos. Todo lo de esta sección está en uso diario en Mosquera.
        </p>
      </Container>

      <Section className="!pt-4">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.categoria}
              href={`/methods-shop/${c.categoria}`}
              className="group relative aspect-square flex flex-col justify-between overflow-hidden p-8 bg-zone-fg/[0.04]"
            >
              <img
                src={METHODS_SHOP_CATEGORIA_IMAGEN[c.categoria]}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-105"
                draggable={false}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/40 transition-colors group-hover:from-ink/80"
              />
              <span className="relative font-dinish text-[length:var(--text-numeral)] leading-none text-paper">
                {c.num}
              </span>
              <div className="relative flex items-end justify-between text-paper">
                <span className="font-garet text-[length:var(--text-h2)] leading-none">{c.nombre}</span>
                <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
                  {getMethodsShopCategoriaCount(c.categoria)} ítems
                </span>
              </div>
            </Link>
          ))}
        </Container>
      </Section>
    </ThemeZone>
  );
}
