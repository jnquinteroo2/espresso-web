import { BRAND_ASSETS } from "@/content/brand-assets";

export function HeroWordmark() {
  return (
    <img
      src={BRAND_ASSETS.wordmarkNegro}
      alt="Espresso Coffee Shop"
      className="h-[clamp(64px,10vw,168px)] w-auto max-w-full object-contain select-none"
      draggable={false}
    />
  );
}
