import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { getMethodsShopItemsByCategoria } from "@/lib/data/methods-shop";
import { formatCOP } from "@/lib/whatsapp";
import type { CategoriaMethodsShop } from "@/content/types";

const CATEGORIAS: Record<CategoriaMethodsShop, string> = {
  metodos: "Métodos",
  molinos: "Molinos",
  tazas: "Tazas",
  accesorios: "Accesorios",
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
  searchParams,
}: {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<{ marca?: string }>;
}) {
  const { categoria } = await params;
  if (!(categoria in CATEGORIAS)) notFound();

  const { marca: marcaParam } = await searchParams;
  const activeMarcas = marcaParam ? marcaParam.split(",").filter(Boolean) : [];

  const items = getMethodsShopItemsByCategoria(categoria as CategoriaMethodsShop);
  const marcas = Array.from(new Set(items.map((item) => item.marca))).sort();
  const filtered = activeMarcas.length > 0 ? items.filter((item) => activeMarcas.includes(item.marca)) : items;

  function hrefFor(marca: string) {
    const next = activeMarcas.includes(marca)
      ? activeMarcas.filter((m) => m !== marca)
      : [...activeMarcas, marca];
    return next.length > 0 ? `/methods-shop/${categoria}?marca=${next.join(",")}` : `/methods-shop/${categoria}`;
  }

  return (
    <ThemeZone theme="paper" as="div" track>
      <Container className="pt-12 pb-8 flex flex-col gap-4">
        <MicroLabel>Methods shop</MicroLabel>
        <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
          {CATEGORIAS[categoria as CategoriaMethodsShop]}
        </DisplayTitle>
      </Container>

      {marcas.length > 1 && (
        <Container className="flex flex-wrap gap-2 pb-8">
          {marcas.map((marca) => (
            <Link
              key={marca}
              href={hrefFor(marca)}
              className={`min-h-9 px-3 flex items-center border font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] transition-colors ${
                activeMarcas.includes(marca)
                  ? "border-zone-fg bg-zone-fg text-zone-bg"
                  : "border-zone-rule hover:border-zone-fg"
              }`}
            >
              {marca}
            </Link>
          ))}
        </Container>
      )}

      <Section className="!pt-0">
        <Container>
          <h2 className="sr-only">Productos</h2>
          {filtered.length === 0 ? (
            <p className="font-source-sans text-[length:var(--text-lead)] py-16 text-center">
              Ningún producto con esa marca todavía.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <div key={item.slug} className="flex flex-col gap-3">
                  <div className="aspect-3/4 bg-zone-fg/[0.04] flex items-end p-4">
                    {!item.stock && (
                      <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg">
                        Agotado
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg">
                      {item.marca}
                    </span>
                    <h3 className="font-garet text-[length:var(--text-h3)]">{item.nombre}</h3>
                    <p className="font-source-sans text-[length:var(--text-body)] text-zone-fg/70">
                      {item.descripcion}
                    </p>
                    <span className="font-dinish text-[length:var(--text-label)] tabular-nums pt-1">
                      {formatCOP(item.precio)}
                    </span>
                  </div>
                  <AddToCartButton
                    slug={item.slug}
                    nombre={item.nombre}
                    detalle={item.marca}
                    href={`/methods-shop/${item.categoria}`}
                    precio={item.precio}
                    disabled={!item.stock}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </ThemeZone>
  );
}
