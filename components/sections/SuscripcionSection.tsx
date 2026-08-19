import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Reveal } from "@/components/motion/Reveal";

const BENEFICIOS = [
  "Un café diferente cada mes, nunca repetido",
  "Ficha de origen y guía de preparación impresas",
  "Precio fijo, sin sorpresas",
  "Cancelas cuando quieras, sin llamadas",
];

/**
 * Sin foto de empaque todavía (ver CONTENIDO-PENDIENTE.md) — se deja el
 * fondo plano de zona en vez de una imagen rota o de un watermark
 * decorativo (un numeral gigante a opacidad baja fallaba color-contrast
 * en Lighthouse pese a aria-hidden: WCAG 1.4.3 exime texto puramente
 * decorativo, pero no vale la pena pelear con el checker por un adorno).
 */
export function SuscripcionSection() {
  return (
    <ThemeZone theme="blue" as="section" track aria-labelledby="suscripcion-heading" className="relative overflow-hidden">
      <Section className="relative">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal as="div" className="lg:col-start-1 lg:col-span-7 flex flex-col gap-6">
            <MicroLabel numeral="02">Suscripción</MicroLabel>
            <DisplayTitle level={2} id="suscripcion-heading">
              Coffee Magazine
            </DisplayTitle>
            <p className="font-source-sans text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)] max-w-prose">
              Un lote distinto cada mes, elegido por nosotros, con su ficha impresa y las notas de preparación.
            </p>

            <Hairline />
            <ul className="flex flex-col">
              {BENEFICIOS.map((b, i) => (
                <Reveal key={b} as="li" delay={80 + i * 30}>
                  <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] py-4">
                    <span aria-hidden="true" className="text-wine mr-2">+</span>
                    {b}
                  </p>
                  <Hairline />
                </Reveal>
              ))}
            </ul>

            <ButtonOutline as="a" href="/suscripcion" className="self-start mt-2">
              Pedir aquí
            </ButtonOutline>
          </Reveal>
        </Container>

        <Reveal
          as="div"
          delay={160}
          className="absolute bottom-8 right-5 md:right-10 lg:right-16"
        >
          <BrandIcon name="asterisco" size={72} decorative={false} label="Suscripción mensual — Coffee Magazine" />
        </Reveal>
      </Section>
    </ThemeZone>
  );
}
