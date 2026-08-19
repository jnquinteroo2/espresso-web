import type { Metadata } from "next";
import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { getMethodsShopCategoriaCount } from "@/lib/data/methods-shop";
import type { CategoriaMethodsShop } from "@/content/types";

export const metadata: Metadata = {
  title: "Methods shop",
  description: "Equipos y accesorios de café de especialidad: métodos, molinos, tazas y accesorios.",
};

const CATEGORIAS: { num: string; nombre: string; categoria: CategoriaMethodsShop }[] = [
  { num: "01", nombre: "Métodos", categoria: "metodos" },
  { num: "02", nombre: "Molinos", categoria: "molinos" },
  { num: "03", nombre: "Tazas", categoria: "tazas" },
  { num: "04", nombre: "Accesorios", categoria: "accesorios" },
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
              className="group aspect-square flex flex-col justify-between p-8 bg-zone-fg/[0.04] hover:bg-zone-fg/[0.08] transition-colors"
            >
              <span className="font-dinish text-[length:var(--text-numeral)] leading-none">{c.num}</span>
              <div className="flex items-end justify-between">
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
