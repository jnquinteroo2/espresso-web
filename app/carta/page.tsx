import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { BackLink } from "@/components/primitives/BackLink";
import { Hairline } from "@/components/primitives/Hairline";
import { formatCOP } from "@/lib/whatsapp";
import { getCartaBySeccion, getCartaFiltrado } from "@/lib/data/carta";
import { CARTA_NOTA_LECHE } from "@/content/carta";
import type { CartaItem, CartaSeccion } from "@/content/types";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de barra de Espresso Coffee Shop: métodos de filtrado, bebidas con café, frías y alternativas sin café.",
};

const SECCIONES_CARTA: { seccion: CartaSeccion; label: string }[] = [
  { seccion: "con-cafe", label: "Bebidas con café" },
  { seccion: "frias", label: "Bebidas con café frías" },
  { seccion: "sin-cafe", label: "Bebidas alternativas sin café" },
];

function agruparItems(items: CartaItem[]): CartaItem[][] {
  const grupos: CartaItem[][] = [[]];
  for (const item of items) {
    grupos[grupos.length - 1].push(item);
    if (item.finDeGrupo) grupos.push([]);
  }
  return grupos.filter((grupo) => grupo.length > 0);
}

function PrecioRow({ nombre, precio }: { nombre: string; precio: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 py-3">
        <span className="font-garet text-[length:var(--text-lead)]">{nombre}</span>
        <span className="font-dinish text-[length:var(--text-lead)] tabular-nums shrink-0">
          {formatCOP(precio)}
        </span>
      </div>
      <Hairline />
    </div>
  );
}

export default function CartaPage() {
  const filtrado = getCartaFiltrado();

  return (
    <ThemeZone theme="beige" as="div" track>
      <Section className="!pb-12">
        <Container className="mb-10 md:mb-14">
          <BackLink href="/">Inicio</BackLink>
        </Container>

        <Container className="flex flex-col items-center gap-4 text-center">
          <MicroLabel>Carta</MicroLabel>
        </Container>
      </Section>

      <Section className="!pt-0 !pb-12" aria-labelledby="carta-filtrado">
        <Container className="max-w-2xl mx-auto flex flex-col gap-10">
          <DisplayTitle
            level={2}
            id="carta-filtrado"
            className="!text-[clamp(26px,2.8vw,38px)] !font-bold uppercase tracking-[0.04em]"
          >
            Métodos de filtrado para café
          </DisplayTitle>

          <ol className="flex flex-col">
            <Hairline />
            {filtrado.pasos.map((paso) => (
              <li key={paso.num}>
                <div className="grid grid-cols-[auto_1fr] gap-5 py-6 md:gap-8">
                  <span className="font-dinish text-[length:var(--text-h3)] leading-none text-zone-fg/70">
                    {paso.num}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] max-w-prose">
                      {paso.texto}
                    </p>
                    {paso.opciones && (
                      <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {paso.opciones.map((opcion) => (
                          <li
                            key={opcion}
                            className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] font-medium text-zone-fg"
                          >
                            {opcion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <Hairline />
              </li>
            ))}
          </ol>

          <div className="flex flex-col">
            <Hairline />
            {filtrado.tamanos.map((tamano) => (
              <PrecioRow key={tamano.nombre} nombre={tamano.nombre} precio={tamano.precio} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container className="max-w-2xl mx-auto">
          <p className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] leading-[1.6] text-zone-fg">
            {CARTA_NOTA_LECHE}
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-2xl mx-auto flex flex-col gap-14">
          {SECCIONES_CARTA.map(({ seccion, label }) => {
            const items = getCartaBySeccion(seccion);
            if (items.length === 0) return null;
            return (
              <div key={seccion} className="flex flex-col gap-4">
                <DisplayTitle
                  level={2}
                  className="!text-[clamp(26px,2.8vw,38px)] !font-bold uppercase tracking-[0.04em]"
                >
                  {label}
                </DisplayTitle>
                <div className="flex flex-col gap-10">
                  {agruparItems(items).map((grupo) => (
                    <div key={grupo[0].nombre} className="flex flex-col">
                      <Hairline />
                      {grupo.map((item) => (
                        <PrecioRow key={item.nombre} nombre={item.nombre} precio={item.precio} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
    </ThemeZone>
  );
}
