import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { CircularSeal } from "@/components/brand/CircularSeal";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND_ASSETS, PLACEHOLDER_ASSETS } from "@/content/brand-assets";

const SELLOS = [
  "Orígenes, recetas y guías impresas",
  "Un café diferente cada mes del año",
  "Cancélalo cuando quieras sin preguntas",
];

export function SuscripcionSection() {
  return (
    <ThemeZone theme="blue" as="section" track aria-labelledby="suscripcion-heading" className="relative overflow-hidden">
      <Section className="relative">
        <Container className="flex flex-col items-center gap-12 text-center">
          <Reveal as="div" className="flex flex-col items-center gap-6 max-w-prose">
            <MicroLabel numeral="02">Suscripción</MicroLabel>
            <DisplayTitle level={2} id="suscripcion-heading">
              Coffee Magazine
            </DisplayTitle>
            {}
            <p className="font-garet text-[length:var(--text-desc)] leading-[1.6] text-[#878787]">
              Cada mes, un café de especialidad distinto, accesorios, fichas técnicas, fotografías de las fincas aliadas, recetas e invitaciones. Todo a la puerta de tu casa.
            </p>
          </Reveal>

          <Hairline className="w-full max-w-md" />

          <div className="flex flex-wrap items-start justify-center gap-10 md:gap-16">
            {SELLOS.map((texto, i) => (
              <Reveal key={texto} delay={80 + i * 30}>
                <Link
                  href="/suscripcion"
                  aria-label={texto}
                  className="inline-flex hover:opacity-70 transition-opacity"
                >
                  <CircularSeal
                    text={texto}
                    size={168}
                    iconNode={
                      <img
                        src={BRAND_ASSETS.monograma}
                        alt=""
                        aria-hidden="true"
                        className="brand-invert-dark h-9 w-9 object-contain select-none pointer-events-none"
                        draggable={false}
                      />
                    }
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <ButtonOutline as="a" href="/suscripcion" className="mt-2">
            Inscríbete aquí
          </ButtonOutline>
        </Container>
      </Section>

      {}
      <div className="relative w-full aspect-[21/5] max-h-[280px] overflow-hidden">
        <img
          src={PLACEHOLDER_ASSETS.suscripcionFondo}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>
    </ThemeZone>
  );
}
