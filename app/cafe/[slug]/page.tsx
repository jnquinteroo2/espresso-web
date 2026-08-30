import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { BackLink } from "@/components/primitives/BackLink";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { RoastScale } from "@/components/commerce/RoastScale";
import { SpecTable } from "@/components/commerce/SpecTable";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CafePurchase } from "@/components/commerce/CafePurchase";
import { CafeImageCarousel } from "@/components/commerce/CafeImageCarousel";
import { getCafeBySlug, getCafes, getOtrosLotes } from "@/lib/data/cafes";
import { PLACEHOLDER_ASSETS } from "@/content/brand-assets";

export function generateStaticParams() {
  return getCafes().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);
  if (!cafe) return {};
  return {
    title: `${cafe.nombre} — ${cafe.origen.region}, ${cafe.origen.pais}`,
    description: `${cafe.notas.join(", ")}. ${cafe.origen.altura} msnm, ${cafe.origen.variedad}, ${cafe.origen.proceso}.`,
  };
}

export default async function CafeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);
  if (!cafe) notFound();

  const otros = getOtrosLotes(cafe.slug);
  const precioMin = Math.min(...cafe.presentaciones.map((p) => p.precio));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cafe.nombre,
    description: `${cafe.notas.join(", ")} — ${cafe.origen.region}, ${cafe.origen.pais}`,
    brand: { "@type": "Brand", name: "Espresso Coffee Shop" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: precioMin,
      highPrice: Math.max(...cafe.presentaciones.map((p) => p.precio)),
      priceCurrency: "COP",
      availability:
        cafe.estado === "agotado"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <ThemeZone theme="paper" as="div" track>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <Container className="mb-10 md:mb-14">
          <BackLink href="/cafe">Volver a cafés</BackLink>
        </Container>

        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
            <CafeImageCarousel cafe={cafe} />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1 className="font-garet text-[length:var(--text-h1)] leading-[0.95] text-[clamp(32px,5vw,60px)]">
                {cafe.nombre}
              </h1>
              <p className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em]">
                {cafe.notas.join(" | ")}
              </p>
            </div>

            <CafePurchase cafe={cafe} />

            <Hairline />

            <div className="flex flex-col gap-4">
              <MicroLabel>Ficha Técnica</MicroLabel>
              <SpecTable
                rows={[
                  { label: "País", value: cafe.origen.pais },
                  { label: "Región", value: cafe.origen.region },
                  { label: "Finca / Asociación", value: cafe.origen.finca },
                  { label: "Productor", value: cafe.origen.productor },
                  { label: "Altura", value: `${cafe.origen.altura} msnm` },
                  { label: "Variedad", value: cafe.origen.variedad },
                  { label: "Proceso", value: cafe.origen.proceso },
                  { label: "Puntaje SCA", value: cafe.puntajeSCA },
                  { label: "Fecha de tueste", value: cafe.fechaTueste },
                  {
                    label: "Nivel de tueste",
                    value: (
                      <span className="inline-flex items-center gap-2">
                        {cafe.tuesteNombre} <RoastScale tueste={cafe.tueste} />
                      </span>
                    ),
                  },
                  { label: "Agtron", value: cafe.agtron },
                  { label: "Preparación recomendada", value: cafe.preparacionRecomendada },
                ]}
              />
            </div>

            <div className="flex justify-center py-6">
              <img
                src={PLACEHOLDER_ASSETS.categoriaImagen[cafe.categoria]}
                alt={`Línea especial ${cafe.categoria}`}
                className="h-60 w-60 object-contain"
                draggable={false}
              />
            </div>
          </div>
        </Container>
      </Section>

      {otros.length > 0 && (
        <ThemeZone theme="beige" as="section" track>
          <Section>
            <Container className="flex flex-col gap-10">
              <MicroLabel as="h2">Otros lotes</MicroLabel>
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
                {otros.map((c) => (
                  <ProductCard key={c.slug} cafe={c} />
                ))}
              </div>
            </Container>
          </Section>
        </ThemeZone>
      )}
    </ThemeZone>
  );
}
