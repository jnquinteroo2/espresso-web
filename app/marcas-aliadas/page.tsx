import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { MAQUILA_GALERIA } from "@/content/brand-assets";
import { GaleriaMaquila } from "@/components/sections/GaleriaMaquila";

export const metadata: Metadata = {
  title: "Marcas aliadas y maquila",
  description:
    "Las marcas con las que trabajamos en Espresso Coffee Shop, y nuestro servicio de maquila.",
};

export default function MarcasAliadasPage() {
  return (
    <ThemeZone theme="green" as="div" track>
      <Section className="flex flex-col items-center gap-4 text-center !pb-12">
        <Container className="flex flex-col items-center gap-4">
          <MicroLabel numeral="04">Marcas aliadas</MicroLabel>
          <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
            Marcas aliadas y maquila
          </DisplayTitle>
        </Container>
      </Section>

      <Section className="!pt-0 !pb-12">
        <Container>
          <GaleriaMaquila items={MAQUILA_GALERIA} />
        </Container>
      </Section>
    </ThemeZone>
  );
}
