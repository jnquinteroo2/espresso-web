import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MetaBar } from "@/components/layout/MetaBar";
import { HeroWordmark } from "@/components/brand/HeroWordmark";

import { HeroVideoLayer } from "@/components/sections/HeroVideoLayer";

export function Hero() {
  return (
    <ThemeZone theme="ink" as="section" track aria-labelledby="hero-heading" className="relative overflow-hidden">
      <HeroVideoLayer />

      <Section className="relative z-10 !py-0 flex min-h-[calc(100svh-72px)] flex-col justify-between">
        {}
        <MetaBar left="Mosquera · Cundinamarca" />

        <Container className="flex flex-1 items-center justify-center">
          <h1 id="hero-heading" className="shrink-0">
            <Link href="/" aria-label="Espresso Coffee Shop — inicio" className="block">
              <HeroWordmark />
            </Link>
          </h1>
        </Container>

        {}
        <div aria-hidden="true" className="flex flex-col items-center gap-6 pb-12">
          <span className="h-10 w-px" />
        </div>

      </Section>
    </ThemeZone>
  );
}
