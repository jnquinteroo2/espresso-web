import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { Reveal } from "@/components/motion/Reveal";
import { getMethodsShopCategoriaCount } from "@/lib/data/methods-shop";

const CATEGORIAS = [
  { num: "01", nombre: "Métodos", href: "/methods-shop/metodos", categoria: "metodos" as const },
  { num: "02", nombre: "Molinos", href: "/methods-shop/molinos", categoria: "molinos" as const },
  { num: "03", nombre: "Tazas", href: "/methods-shop/tazas", categoria: "tazas" as const },
  { num: "04", nombre: "Accesorios", href: "/methods-shop/accesorios", categoria: "accesorios" as const },
];

const DESTACADOS = [
  { label: "Molinos", href: "/methods-shop/molinos" },
  { label: "Métodos", href: "/methods-shop/metodos" },
  { label: "Accesorios", href: "/methods-shop/accesorios" },
];

export function MethodsShopSection() {
  return (
    <ThemeZone theme="paper" as="section" track aria-labelledby="methods-shop-heading">
      <Section>
        <Container className="flex flex-col gap-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal as="div" className="lg:col-span-6 flex flex-col gap-4">
              <MicroLabel numeral="04">Methods shop</MicroLabel>
              <DisplayTitle level={2} id="methods-shop-heading">
                Lo que usamos en la barra
              </DisplayTitle>
              <p className="font-source-sans text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)] max-w-prose">
                No vendemos lo que no probamos. Todo lo de esta sección está en uso diario en Mosquera.
              </p>
            </Reveal>

            <div className="lg:col-span-5 lg:col-start-8 flex flex-col">
              <Hairline />
              {CATEGORIAS.map((c, i) => (
                <Reveal key={c.href} as="div" delay={60 + i * 30}>
                  <Link
                    href={c.href}
                    className="group flex items-center justify-between py-4 hover:opacity-60 transition-opacity"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-dinish text-[length:var(--text-label)] text-zone-fg">{c.num}</span>
                      <span className="font-garet text-[length:var(--text-h3)]">{c.nombre}</span>
                    </span>
                    <span className="font-source-sans text-[length:var(--text-label)]" aria-hidden="true">
                      {getMethodsShopCategoriaCount(c.categoria)} ítems →
                    </span>
                  </Link>
                  <Hairline />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {DESTACADOS.map((d, i) => (
              <Reveal key={d.href} delay={i * 30}>
                <Link href={d.href} className="group relative aspect-3/4 flex items-end justify-center bg-zone-fg/[0.04] p-6">
                  <span className="border border-zone-fg text-zone-fg px-6 py-3 font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] transition-colors group-hover:bg-zone-fg group-hover:text-zone-bg">
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
