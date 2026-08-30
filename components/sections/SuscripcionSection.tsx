import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { Reveal } from "@/components/motion/Reveal";
import { PLACEHOLDER_ASSETS } from "@/content/brand-assets";

export function SuscripcionSection() {
  return (
    <ThemeZone theme="blue" as="section" track aria-labelledby="suscripcion-heading" className="relative overflow-hidden">
      <Section className="relative">
        <Container className="flex flex-col items-center gap-12 text-center">
          <Reveal as="div" className="flex flex-col items-center gap-6 max-w-prose">
            <MicroLabel numeral="02">Suscripción</MicroLabel>
            <DisplayTitle level={2} id="suscripcion-heading" className="!text-[clamp(28px,3.5vw,35px)]">
              COFFEE MAGAZINE
            </DisplayTitle>
            <p className="font-garet text-[length:var(--text-desc)] leading-[1.6] text-[#878787]">
              Cada mes recibe en tu casa una experiencia única de café con lotes especiales, accesorios seleccionados y contenido exclusivo.
            </p>
          </Reveal>

          <Hairline className="w-full max-w-md" />

          <Reveal as="div" className="flex flex-wrap items-center justify-center gap-20 md:gap-32">
            {PLACEHOLDER_ASSETS.suscripcionGaleria.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                className="h-64 w-64 md:h-80 md:w-80 max-w-full shrink-0 object-contain select-none pointer-events-none"
                draggable={false}
              />
            ))}
          </Reveal>

          <ButtonOutline as="a" href="/suscripcion" className="mt-2">
            Inscríbete aquí
          </ButtonOutline>
        </Container>
      </Section>
    </ThemeZone>
  );
}
