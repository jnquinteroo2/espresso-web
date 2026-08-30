import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { SubscriptionConfigurator } from "@/components/commerce/SubscriptionConfigurator";

export const metadata: Metadata = {
  title: "Coffee Magazine — Suscripción",
  description: "Suscripción mensual de café de especialidad. Un lote distinto cada mes, elegido por nosotros.",
};

const FAQ = [
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, escríbenos por WhatsApp y cancelamos el siguiente envío, sin llamadas ni penalidades.",
  },
  {
    q: "¿Puedo cambiar la molienda cada mes?",
    a: "Sí, nos avisas por WhatsApp antes del envío qué método vas a usar ese mes.",
  },
  {
    q: "¿Qué pasa si un lote no me gusta?",
    a: "Nos cuentas y ajustamos el perfil del siguiente envío. La idea es que sigas suscrito.",
  },
  {
    q: "¿El envío tiene costo aparte?",
    a: "El precio de la suscripción incluye el envío dentro de Mosquera y alrededores.",
  },
];

export default function SuscripcionPage() {
  return (
    <ThemeZone theme="blue" as="div" track>
      <Section className="flex flex-col items-center text-center !pt-[clamp(40px,5.5vh,88px)] !pb-6">
        <Container className="flex flex-col items-center gap-6 max-w-prose">
          <MicroLabel numeral="02">Suscripción</MicroLabel>
          <DisplayTitle level={2} className="!text-[clamp(28px,3.5vw,35px)]">
            COFFEE MAGAZINE
          </DisplayTitle>
          <p className="font-garet text-[length:var(--text-desc)] leading-[1.6] text-[#878787]">
            Un lote distinto cada mes, elegido por nosotros, con su ficha impresa y las notas de preparación.
          </p>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container className="max-w-6xl mx-auto">
          <SubscriptionConfigurator />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-2xl mx-auto flex flex-col gap-8">
          <MicroLabel as="h2" numeral="03">Preguntas frecuentes</MicroLabel>
          <div className="flex flex-col">
            <Hairline />
            {FAQ.map((item) => (
              <div key={item.q}>
                <div className="py-6 flex flex-col gap-2">
                  <h3 className="font-garet text-[length:var(--text-h3)]">{item.q}</h3>
                  <p className="font-source-sans text-[length:var(--text-body)] text-zone-fg/80">{item.a}</p>
                </div>
                <Hairline />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </ThemeZone>
  );
}
