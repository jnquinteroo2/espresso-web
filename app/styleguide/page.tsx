import type { Metadata } from "next";
import { ThemeZone, type Theme } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { RibbonTag } from "@/components/primitives/RibbonTag";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { IconRow } from "@/components/brand/IconRow";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { BlurEcho } from "@/components/brand/BlurEcho";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const ZONES: Theme[] = ["paper", "beige", "blue", "green", "ink"];
const ICONS: BrandIconName[] = ["arco", "asterisco", "reloj", "estrella"];

function ZoneBlock({ theme }: { theme: Theme }) {
  return (
    <ThemeZone theme={theme} as="div" className="border border-zone-rule">
      <Container className="py-16 flex flex-col gap-12">
        <MicroLabel numeral="01">{`Zona — ${theme}`}</MicroLabel>

        <div className="flex flex-col gap-2">
          <DisplayTitle level={1}>Aa Ee Mosquera</DisplayTitle>
          <DisplayTitle level={2}>Título de sección</DisplayTitle>
          <DisplayTitle level={3}>Título de tarjeta</DisplayTitle>
          <p className="font-source-sans text-[length:var(--text-lead)] max-w-prose">
            Bajada de sección en fs-lead. Tostamos en pequeños lotes cada semana.
          </p>
          <p className="font-source-sans text-[length:var(--text-body)] max-w-prose">
            Cuerpo de texto en fs-body. Precisión sobre poesía: origen, altura, variedad, proceso, fecha de tueste.
          </p>
          <p className="font-dinish text-[length:var(--text-numeral)]">02</p>
        </div>

        <Hairline />

        <div className="flex flex-wrap items-center gap-4">
          <ButtonOutline size="md">Pedir aquí</ButtonOutline>
          <ButtonOutline size="sm">Ver el lote</ButtonOutline>
        </div>

        <IconRow size={26} />

        <div className="flex flex-wrap gap-8 items-end">
          {ICONS.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <BrandIcon name={name} size={20} decorative={false} label={name} />
              <BrandIcon name={name} size={28} decorative={false} label={name} />
              <BrandIcon name={name} size={40} decorative={false} label={name} />
              <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-12">
          <Monogram size={72} decorative={false} label={`Espresso · ${theme}`} />
          <div className="relative">
            <RibbonTag text="Edición limitada" />
            <div className="w-40 h-48 bg-zone-fg/5 border border-zone-rule flex items-end p-4">
              <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em]">Producto</span>
            </div>
          </div>
        </div>

        <BlurEcho>
          <Wordmark size="md" />
        </BlurEcho>
      </Container>
    </ThemeZone>
  );
}

export default function StyleguidePage() {
  return (
    <div>
      <Section className="!py-12 border-b border-zone-rule">
        <Container>
          <MicroLabel>Guía de estilo — contrato visual interno</MicroLabel>
          <DisplayTitle level={1}>Styleguide</DisplayTitle>
        </Container>
      </Section>
      {ZONES.map((theme) => (
        <ZoneBlock key={theme} theme={theme} />
      ))}
    </div>
  );
}
