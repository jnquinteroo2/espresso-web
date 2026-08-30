import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";

export const metadata: Metadata = { title: "Términos" };

export default function TerminosPage() {
  return (
    <ThemeZone theme="paper" as="div" track>
      <Section>
        <Container className="max-w-2xl flex flex-col gap-6">
          <MicroLabel>Legal</MicroLabel>
          <DisplayTitle level={1} className="text-[clamp(32px,5vw,56px)]">
            Términos y condiciones
          </DisplayTitle>
          { }
          <div className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] flex flex-col gap-4 max-w-prose">
            <p>
              Los pedidos hechos a través de espressocol.com se confirman por WhatsApp. Los precios están expresados en pesos colombianos (COP) e incluyen IVA cuando aplique.
            </p>
            <p>
              La disponibilidad de los lotes de café está sujeta a existencias — un lote marcado como disponible en el sitio puede agotarse entre la visita y la confirmación del pedido.
            </p>
            <p>Última actualización: agosto de 2026.</p>
          </div>
        </Container>
      </Section>
    </ThemeZone>
  );
}
