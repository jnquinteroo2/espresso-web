import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Reveal } from "@/components/motion/Reveal";

const PASOS = [
  {
    num: "01",
    title: "Verde",
    desc: "Compramos por lote y guardamos la trazabilidad completa: finca, altura, variedad, proceso y fecha de compra.",
  },
  {
    num: "02",
    title: "Perfil",
    desc: "Cada lote se perfila y se cata antes de salir. Registramos curva, temperatura de carga y de descarga, y tiempo total.",
  },
  {
    num: "03",
    title: "Control",
    desc: "Catación de control por lote. Lo que no llega al puntaje no sale a la venta.",
  },
];

export function RoastingSection({ titleLevel = 1 }: { titleLevel?: 1 | 2 }) {
  const stepLevel = titleLevel === 1 ? 2 : 3;
  return (
    <ThemeZone theme="ink" as="section" track aria-labelledby="roasting-heading">
      <Section className="flex flex-col items-center gap-12">
        <Reveal as="div">
          <BrandIcon name="reloj" size={72} decorative={false} label="Roasting — Espresso Coffee Shop" />
        </Reveal>

        <Reveal as="div" delay={80}>
          <Container className="flex flex-col items-center gap-6 text-center">
            <MicroLabel numeral="05">Roasting</MicroLabel>
            <DisplayTitle level={titleLevel} id="roasting-heading">
              Tostamos acá
            </DisplayTitle>
          </Container>
        </Reveal>

        <Container className="w-full max-w-3xl">
          <Hairline />
          {PASOS.map((paso, i) => (
            <Reveal key={paso.num} as="div" delay={i * 30} className="grid grid-cols-[auto_1fr] gap-6 py-8">
              <span className="font-dinish text-[length:var(--text-numeral)] leading-none">{paso.num}</span>
              <div className="flex flex-col gap-2 pt-2">
                <DisplayTitle level={stepLevel} className="!text-[length:var(--text-h3)]">
                  {paso.title}
                </DisplayTitle>
                <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] max-w-prose">
                  {paso.desc}
                </p>
              </div>
              <Hairline className="col-span-2" />
            </Reveal>
          ))}
        </Container>

        <ButtonOutline as="a" href="/nosotros#roasting">
          Ver el proceso
        </ButtonOutline>
      </Section>
    </ThemeZone>
  );
}
