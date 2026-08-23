import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { Reveal } from "@/components/motion/Reveal";
import { cafes } from "@/content/cafes";

const ICONS: BrandIconName[] = ["arco", "asterisco", "reloj", "estrella"];

export function CafeSection() {
  const destacados = cafes.slice(0, 3);

  return (
    <section
      data-theme="beige"
      data-zone-track="true"
      className="bg-zone-bg text-zone-fg"
      aria-labelledby="cafe-heading"
    >
      <Section>
        <Container className="flex flex-col gap-12">
          {}
          <Reveal as="div" className="flex items-center justify-center gap-14 md:gap-24">
            {ICONS.map((name) => (
              <BrandIcon key={name} name={name} size={28} />
            ))}
          </Reveal>

          <Reveal as="div" delay={40} className="flex flex-col items-center gap-4 text-center">
            <MicroLabel numeral="01">El café</MicroLabel>
            {}
            <DisplayTitle level={2} id="cafe-heading">
              Lotes de temporada Espresso
            </DisplayTitle>
            {}
            <p className="font-garet text-[length:var(--text-desc)] leading-[1.6] max-w-prose text-[#878787]">
              Cada lote que llega a nuestra casa ha sido debidamente curado, tostado y catado desde la finca hasta la taza. Un trabajo hecho en familia para familia.
            </p>
            {}
            <ButtonOutline
              type="button"
              disabled
              size="md"
              className="mt-2 rounded-pill border-[0.5px] border-[#878787] text-[#878787]"
            >
              Más variedades
            </ButtonOutline>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
            {destacados.map((cafe, i) => (
              <Reveal key={cafe.slug} delay={80 + i * 30}>
                <ProductCard cafe={cafe} icon={ICONS[i]} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </section>
  );
}
