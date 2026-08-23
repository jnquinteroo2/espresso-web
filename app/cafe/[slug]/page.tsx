import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { RoastScale } from "@/components/commerce/RoastScale";
import { SpecTable } from "@/components/commerce/SpecTable";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CafePurchase } from "@/components/commerce/CafePurchase";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { getCafeBySlug, getCafes, getOtrosLotes } from "@/lib/data/cafes";

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
          ? "https://schema.org"
          : "https://schema.org"
    },
  };

  return (
    <ThemeZone theme="paper" as="div" track>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
            <div
              className="aspect-4/5 flex items-start p-6"
              style={{ backgroundColor: cafe.colorBloque }}
            >
              <span className="font-dinish text-[length:var(--text-numeral)] leading-none text-beige">
                {cafe.codigo}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-dinish text-[length:var(--text-numeral)] leading-none">{cafe.codigo}</span>
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
              <MicroLabel>Transparencia</MicroLabel>
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
                ]}
              />
            </div>

            <div className="flex flex-col gap-4">
              <MicroLabel>Preparación</MicroLabel>
              <SpecTable
                rows={cafe.preparacion.flatMap((p) => [
                  { label: `${p.metodo} — ratio`, value: p.ratio },
                  { label: `${p.metodo} — molienda`, value: p.molienda },
                  { label: `${p.metodo} — temperatura`, value: p.temperatura },
                  { label: `${p.metodo} — tiempo`, value: p.tiempo },
                ])}
              />
            </div>

            <div className="flex justify-center py-6">
              <BrandIcon
                name="asterisco"
                size={64}
                decorative={false}
                label={`Lote ${cafe.codigo} — ${cafe.origen.region}`}
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
