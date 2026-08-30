import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { SpecTable } from "@/components/commerce/SpecTable";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Dirección, horarios y WhatsApp de Espresso Coffee Shop en Mosquera, Cundinamarca.",
};

export default function ContactoPage() {
  return (
    <ThemeZone theme="beige" as="div" track>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <MicroLabel>Contáctanos</MicroLabel>
              <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
                Visítanos
              </DisplayTitle>
            </div>

            <SpecTable
              rows={[
                { label: "Dirección", value: "Mosquera, Cundinamarca, Colombia" },
                { label: "Horario", value: "Lunes a domingo, 10:00 a.m. – 8:00 p.m." },
                { label: "WhatsApp", value: "+57 313 4047 822" },
                { label: "Instagram", value: "@espressocoffeeshop" },
              ]}
            />

            <ButtonOutline
              as="a"
              href={getWhatsAppUrl("Hola ESPRESSO tengo una pregunta:")}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start"
            >
              Escribir al WhatsApp
            </ButtonOutline>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-square w-full overflow-hidden bg-zone-fg/[0.04]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.5225245712439!2d-74.23058967364534!3d4.707304675597511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f77bd4c406429%3A0x1fcc954bcbfa44b0!2sEspresso%20Coffee!5e0!3m2!1ses!2sco!4v1788048773974!5m2!1ses!2sco"
                title="Ubicación de Espresso Coffee Shop en Google Maps"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>
          </div>
        </Container>
      </Section>
    </ThemeZone>
  );
}
