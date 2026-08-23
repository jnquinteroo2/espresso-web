import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { MetaBar } from "@/components/layout/MetaBar";
import { HeroWordmark } from "@/components/brand/HeroWordmark";

import { HeroVideoLayer } from "@/components/sections/HeroVideoLayer";

export function Hero() {
  return (
    <ThemeZone theme="paper" as="section" track aria-labelledby="hero-heading" className="relative overflow-hidden">
      <HeroVideoLayer />

      <Section minHeight className="relative z-10 !py-0 flex flex-col justify-between">
        {}
        <MetaBar left="Mosquera · Cundinamarca" />

        <Container className="flex flex-1 items-center justify-center gap-6 md:gap-12">
          <div className="hidden md:flex flex-1 items-center gap-4 justify-end">
            {}
            <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] whitespace-nowrap">
              Crow Brew
            </span>
            <Hairline className="flex-1" />
          </div>

          {}
          <h1 id="hero-heading" className="shrink-0">
            <HeroWordmark />
          </h1>

          <a
            href="/nosotros#academy"
            className="hidden md:flex flex-1 items-center gap-4 hover:opacity-60 transition-opacity"
          >
            <Hairline className="flex-1" />
            <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em] whitespace-nowrap">
              Academy
            </span>
          </a>
        </Container>

        <div className="flex flex-col items-center gap-6 pb-12">
          <span
            aria-hidden="true"
            className="h-10 w-px bg-zone-fg/40 [animation:scroll-hint_1.8s_ease-in-out_infinite]"
          />
        </div>
      </Section>
    </ThemeZone>
  );
}
