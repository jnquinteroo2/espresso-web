import type { Metadata } from "next";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { Hairline } from "@/components/primitives/Hairline";

export const metadata: Metadata = { 
  title: "404 · Lote no encontrado",
};

export default function NotFound() {
  return (
    <ThemeZone theme="paper" as="div" track>
      <Section className="min-h-[75vh] flex flex-col items-center justify-center text-center py-16">
        <Container className="flex flex-col items-center gap-6 max-w-lg">
          
          <div className="relative flex items-center justify-center my-2">
            <img
              src="https://i.pinimg.com/1200x/d5/e4/f1/d5e4f112fb93cac9b9937630a4affa25.jpg"
              alt=""
              aria-hidden="true"
              className="h-28 w-28 object-contain md:h-36 md:w-36 mix-blend-multiply opacity-90"
              draggable={false}
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-dinish text-[clamp(48px,8vw,80px)] leading-none font-light tracking-tight">
              404
            </span>
            <MicroLabel>Lote no encontrado</MicroLabel>
          </div>

          <DisplayTitle level={1} className="font-garet !text-[clamp(32px,4.5vw,52px)] leading-[1.05]">
            ESTA TAZA ESTÁ VACÍA.
          </DisplayTitle>

          <Hairline className="w-16 my-1" />

          <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-zone-fg/75 max-w-prose">
            El enlace que buscabas cambió de dirección, no superó el control de calidad o nunca existió. Revisa nuestros cafés de temporada o regresa a la barra principal.
          </p>

          <ButtonOutline as="a" href="/#cafe-heading" size="md" className="mt-4">
            Llena tu taza
          </ButtonOutline>

        </Container>
      </Section>
    </ThemeZone>
  );
}