import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { getMarcasByTipo } from "@/lib/data/marcas";
import type { TipoMarca } from "@/content/types";

export const metadata: Metadata = {
  title: "Marcas aliadas",
  description: "Máquinas, molinos, métodos e insumos que usamos a diario en Espresso Coffee Shop.",
};

const TIPOS: { tipo: TipoMarca; label: string }[] = [
  { tipo: "maquinas", label: "Máquinas" },
  { tipo: "molinos", label: "Molinos" },
  { tipo: "metodos", label: "Métodos" },
  { tipo: "insumos", label: "Insumos" },
];

export default function MarcasAliadasPage() {
  return (
    <ThemeZone theme="green" as="div" track>
      <Section className="flex flex-col items-center gap-4 text-center !pb-12">
        <Container className="flex flex-col items-center gap-4">
          <MicroLabel numeral="04">Marcas aliadas</MicroLabel>
          <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
            Con quién trabajamos
          </DisplayTitle>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container className="flex flex-col gap-16">
          {TIPOS.map(({ tipo, label }) => {
            const marcas = getMarcasByTipo(tipo);
            if (marcas.length === 0) return null;
            return (
              <div key={tipo} className="flex flex-col gap-6">
                <MicroLabel>{label}</MicroLabel>
                <div className="flex flex-col">
                  <Hairline />
                  {marcas.map((marca) => (
                    <div key={marca.nombre}>
                      <div className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between md:gap-6">
                        <span className="font-garet text-[length:var(--text-h3)]">{marca.nombre}</span>
                        <span className="font-source-sans text-[length:var(--text-body)] text-zone-fg/70">
                          {marca.porQue}
                        </span>
                      </div>
                      <Hairline />
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
