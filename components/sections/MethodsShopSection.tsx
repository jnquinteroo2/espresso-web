import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Reveal } from "@/components/motion/Reveal";
import { METHODS_SHOP_CATEGORIA_IMAGEN } from "@/content/brand-assets";
import type { CategoriaMethodsShop } from "@/content/types";

const DESTACADOS: { label: string; categoria: CategoriaMethodsShop }[] = [
  { label: "Molinos", categoria: "molinos" },
  { label: "Drips", categoria: "drips" },
  { label: "Accesorios", categoria: "accesorios" },
  { label: "Merch", categoria: "merch" },
  { label: "Tazas", categoria: "tazas" },
  { label: "Filtros", categoria: "filtros" },
];

export function MethodsShopSection() {
  return (
    <ThemeZone theme="paper" as="section" track aria-labelledby="methods-shop-heading">
      <Section>
        <Container className="flex flex-col gap-16">
          <Reveal as="div" className="flex flex-col items-center gap-4 text-center">
            <MicroLabel numeral="03">Tienda de accesorios</MicroLabel>
            <DisplayTitle level={2} id="methods-shop-heading" className="!text-[clamp(28px,3.5vw,35px)]">
              LO QUE USAMOS EN LA BARRA
            </DisplayTitle>
            {}
            <p className="font-garet text-[length:var(--text-desc)] leading-[1.6] max-w-prose text-[#878787]">
              Las herramientas pueden ser el mejor amigo o el peor enemigo de una barista, pero todo lo encuentas acá en nuestra tienda.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {DESTACADOS.map((d, i) => (
              <Reveal key={d.categoria} delay={i * 30}>
                <Link
                  href={`/methods-shop/${d.categoria}`}
                  className="group relative aspect-3/4 flex items-end justify-center overflow-hidden"
                >
                  <img
                    src={METHODS_SHOP_CATEGORIA_IMAGEN[d.categoria]}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                  <span className="relative mb-6 border border-zone-fg bg-paper text-zone-fg px-6 py-3 font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] transition-colors group-hover:bg-zone-fg group-hover:text-zone-bg">
                    {d.label}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </ThemeZone>
  );
}
