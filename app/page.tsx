import { Hero } from "@/components/sections/Hero";
import { CafeSection } from "@/components/sections/CafeSection";
import { SuscripcionSection } from "@/components/sections/SuscripcionSection";
import { MethodsShopSection } from "@/components/sections/MethodsShopSection";
import { MarcasAliadasSection } from "@/components/sections/MarcasAliadasSection";
import { RoastingSection } from "@/components/sections/RoastingSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ProgressBar } from "@/components/motion/ProgressBar";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ProgressBar />
      <Hero />
      <CafeSection />
      <SuscripcionSection />
      <MethodsShopSection />
      <MarcasAliadasSection />
      {/* <RoastingSection titleLevel={2} /> */}
      <ReviewsSection />
    </>
  );
}
