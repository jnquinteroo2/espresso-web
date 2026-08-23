import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { SpecTable } from "@/components/commerce/SpecTable";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { getWhatsAppUrl, formatCOP } from "@/lib/whatsapp";
import { getCartaBySeccion } from "@/lib/data/carta";
import type { CartaSeccion } from "@/content/types";

export const metadata: Metadata = {
  title: "Contáctanos",
  description: "Dirección, horarios, WhatsApp y carta de barra de Espresso Coffee Shop en Mosquera, Cundinamarca.",
};

const SECCIONES_CARTA: { seccion: CartaSeccion; label: string }[] = [
  { seccion: "espresso", label: "Espresso" },
  { seccion: "metodos", label: "Métodos" },
  { seccion: "frios", label: "Fríos" },
  { seccion: "con-leche", label: "Con leche" },
  { seccion: "pasteleria", label: "Pastelería" },
];

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
              href={getWhatsAppUrl("Hola ESPRESSO ☕ tengo una pregunta:")}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start"
            >
              Escribir al WhatsApp
            </ButtonOutline>

            <a
              href="#carta"
              className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] underline underline-offset-4 hover:opacity-60 transition-opacity self-start"
            >
              Ver la carta ↓
            </a>
          </div>

          <div className="lg:col-span-6">
            {}
            <div className="aspect-square w-full bg-zone-fg/[0.04] flex items-center justify-center">
              <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
                Mapa — pendiente de dirección exacta
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="carta" className="scroll-mt-[72px] !pt-0">
        <Container className="max-w-2xl mx-auto flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <MicroLabel numeral="02">Carta</MicroLabel>
            <h2 className="font-garet text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
              Carta de barra
            </h2>
          </div>
          {SECCIONES_CARTA.map(({ seccion, label }) => {
            const items = getCartaBySeccion(seccion);
            if (items.length === 0) return null;
            return (
              <div key={seccion} className="flex flex-col gap-4">
                <h3 className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em] font-medium text-zone-fg">
                  {label}
                </h3>
                <div className="flex flex-col">
                  <Hairline />
                  {items.map((item) => (
                    <div key={item.nombre}>
                      <div className="flex items-baseline justify-between gap-4 py-3">
                        <span className="font-garet text-[length:var(--text-h3)]">{item.nombre}</span>
                        <span className="font-dinish text-[length:var(--text-label)] tabular-nums shrink-0">
                          {formatCOP(item.precio)}
                        </span>
                      </div>
                      <Hairline />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
    </ThemeZone>
  );
}
