import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { BackLink } from "@/components/primitives/BackLink";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { MethodsShopCategoriaGrid } from "@/components/commerce/MethodsShopCategoriaGrid";
import { getMethodsShopItemsByCategoria } from "@/lib/data/methods-shop";
import type { CategoriaMethodsShop } from "@/content/types";

const CATEGORIAS: Record<CategoriaMethodsShop, string> = {
  molinos: "Molinos",
  drips: "Drips",
  accesorios: "Accesorios",
  merch: "Merch",
  tazas: "Tazas",
  filtros: "Filtros",
};

export function generateStaticParams() {
  return Object.keys(CATEGORIAS).map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const nombre = CATEGORIAS[categoria as CategoriaMethodsShop];
  return nombre ? { title: nombre } : {};
}

export default async function MethodsShopCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  if (!(categoria in CATEGORIAS)) notFound();

  const items = getMethodsShopItemsByCategoria(categoria as CategoriaMethodsShop);

  return (
    <ThemeZone theme="paper" as="div" track>
      <Container className="pt-12 pb-8 flex flex-col gap-4">
        <BackLink href="/methods-shop">Volver a methods shop</BackLink>
        <MicroLabel className="pt-4">Methods shop</MicroLabel>
        <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
          {CATEGORIAS[categoria as CategoriaMethodsShop]}
        </DisplayTitle>
      </Container>

      <Section className="!pt-0">
        <Suspense>
          <MethodsShopCategoriaGrid items={items} />
        </Suspense>
      </Section>
    </ThemeZone>
  );
}
