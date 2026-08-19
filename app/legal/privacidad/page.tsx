import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";

export const metadata: Metadata = { title: "Privacidad" };

export default function PrivacidadPage() {
  return (
    <ThemeZone theme="paper" as="div" track>
      <Section>
        <Container className="max-w-2xl flex flex-col gap-6">
          <MicroLabel>Legal</MicroLabel>
          <DisplayTitle level={1} className="text-[clamp(32px,5vw,56px)]">
            Política de privacidad
          </DisplayTitle>
          {/* TODO: contenido de ejemplo — reemplazar con el texto legal real, revisado por el cliente/abogado antes de producción */}
          <div className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] flex flex-col gap-4 max-w-prose">
            <p>
              Espresso Coffee Shop recopila los datos que el usuario entrega voluntariamente al hacer un pedido por WhatsApp o al suscribirse al boletín de correo (nombre, dirección de entrega y correo electrónico). Estos datos se usan únicamente para procesar el pedido o el envío del boletín.
            </p>
            <p>
              No se comparten datos con terceros salvo obligación legal. El usuario puede solicitar la eliminación de sus datos escribiendo a nuestro WhatsApp o correo de contacto.
            </p>
            <p>Última actualización: agosto de 2026.</p>
          </div>
        </Container>
      </Section>
    </ThemeZone>
  );
}
