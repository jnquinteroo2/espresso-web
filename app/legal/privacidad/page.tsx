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

          <div className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] flex flex-col gap-4 max-w-prose">
            <p>
              Espresso Coffee Shop recopila los datos que el usuario entrega voluntariamente al hacer un pedido por WhatsApp o al suscribirse al boletín de correo (nombre, dirección de entrega y correo electrónico). Estos datos se usan únicamente para procesar el pedido o el envío del boletín.
            </p>

            <MicroLabel as="h2" className="mt-6">
              Analítica y grabación de sesión
            </MicroLabel>
            <p>
              Para entender cómo se usa el sitio y detectar errores, espressocol.com usa PostHog, una herramienta de analítica de producto. PostHog registra las páginas visitadas, el tipo de dispositivo y navegador, la ubicación aproximada deducida de la dirección IP (país y ciudad), y ciertas interacciones con la tienda: agregar un producto al carrito, iniciar un pedido o abrir el formulario de suscripción.
            </p>
            <p>
              PostHog también graba la sesión de navegación: los movimientos, clics y desplazamientos dentro del sitio, para poder revisar después qué falló cuando algo no funciona. Los campos de los formularios se enmascaran automáticamente, de modo que lo que el usuario escribe en ellos —nombre, teléfono, dirección— no queda registrado en la grabación. Tampoco se graban las conversaciones de WhatsApp, que ocurren fuera del sitio.
            </p>
            <p>
              Para reconocer visitas sucesivas del mismo navegador, PostHog guarda un identificador anónimo en el almacenamiento local del dispositivo. Ese identificador no contiene datos personales y puede borrarse limpiando los datos del sitio desde el navegador.
            </p>
            <p>
              La información recogida por PostHog se procesa en servidores ubicados en Estados Unidos. Al navegar el sitio, el usuario acepta esa transferencia internacional de datos.
            </p>

            <MicroLabel as="h2" className="mt-6">
              Terceros y derechos del titular
            </MicroLabel>
            <p>
              Además de PostHog, los datos entregados voluntariamente pueden pasar por los servicios necesarios para atender un pedido —WhatsApp para la conversación y el proveedor de correo para el boletín—. Fuera de esos casos y de una obligación legal, no se comparten datos con terceros ni se venden a nadie.
            </p>
            <p>
              El usuario puede solicitar conocer, actualizar, rectificar o eliminar sus datos, incluidas las grabaciones de sesión asociadas a su navegación, escribiendo a nuestro WhatsApp o correo de contacto.
            </p>

            <p>Última actualización: agosto de 2026.</p>
          </div>
        </Container>
      </Section>
    </ThemeZone>
  );
}
