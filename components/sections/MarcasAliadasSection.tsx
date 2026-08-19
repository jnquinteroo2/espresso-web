import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { BrandOrbit } from "@/components/motion/BrandOrbit";
import { BrandOrbitFallback } from "@/components/motion/BrandOrbitFallback";
import { Reveal } from "@/components/motion/Reveal";
import { getMarcas } from "@/lib/data/marcas";

export function MarcasAliadasSection() {
  const marcas = getMarcas();

  return (
    <ThemeZone theme="green" as="section" track aria-labelledby="marcas-heading">
      <Section minHeight className="flex flex-col items-center justify-center gap-12 text-center">
        <Reveal as="div">
          <Container className="flex flex-col items-center gap-4">
            <MicroLabel numeral="04">Marcas aliadas</MicroLabel>
            <DisplayTitle level={2} id="marcas-heading">
              Con quién trabajamos
            </DisplayTitle>
          </Container>
        </Reveal>

        <Reveal as="div" delay={80}>
          <Container>
            <BrandOrbit marcas={marcas} />
            <BrandOrbitFallback marcas={marcas} />
          </Container>
        </Reveal>

        <Link
          href="/marcas-aliadas"
          className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Ver todas las marcas →
        </Link>
      </Section>
    </ThemeZone>
  );
}
