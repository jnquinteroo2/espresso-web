import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { CafeCatalog } from "@/components/commerce/CafeCatalog";
import { getCafes } from "@/lib/data/cafes";

export const metadata: Metadata = {
  title: "Café",
  description: "Catálogo de café de especialidad tostado por Espresso Coffee Shop en Mosquera, Cundinamarca.",
};

export default function CafeCatalogPage() {
  const cafes = getCafes();

  return (
    <ThemeZone theme="beige" as="div" track>
      <Container className="pt-12 pb-8 flex flex-col gap-4">
        <MicroLabel>Catálogo</MicroLabel>
        <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
          Café
        </DisplayTitle>
        <p className="font-source-sans text-[length:var(--text-lead)] max-w-prose">
          Tostamos en pequeños lotes cada semana. Filtra por origen, proceso, perfil o método.
        </p>
      </Container>

      <CafeCatalog cafes={cafes} />
    </ThemeZone>
  );
}
