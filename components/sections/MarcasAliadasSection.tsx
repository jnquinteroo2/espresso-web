import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { LogoOrbit } from "@/components/motion/LogoOrbit";
import { Reveal } from "@/components/motion/Reveal";
import { MaquilaForm } from "@/components/commerce/MaquilaForm";
import { MAQUILA_LOGOS } from "@/content/brand-assets";

export function MarcasAliadasSection() {
  return (
    <ThemeZone theme="green" as="section" track aria-labelledby="marcas-heading">
      <Section minHeight className="flex flex-col items-center justify-center gap-12 text-center">
        <Reveal as="div">
          <Container className="flex flex-col items-center gap-4">
            <MicroLabel numeral="04">Marcas aliadas</MicroLabel>
            {}
            <DisplayTitle level={2} id="marcas-heading" className="!text-[clamp(28px,3.5vw,35px)]">
              MARCAS ALIADAS Y MAQUILA
            </DisplayTitle>
          </Container>
        </Reveal>

        {}
        <Reveal as="div" delay={80}>
          <Container>
            <LogoOrbit logos={MAQUILA_LOGOS} />
          </Container>
        </Reveal>

        {}
        <Reveal as="div" delay={120}>
          <Container className="flex flex-col items-center gap-6 text-center">
            <MaquilaForm />
          </Container>
        </Reveal>

        <Link
          href="/marcas-aliadas"
          className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Galería marcas y maquila →
        </Link>
      </Section>
    </ThemeZone>
  );
}
