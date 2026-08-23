import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/content/brand-assets";

const sizeToHeight = { sm: 20, md: 32, lg: 48 };

export function Wordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const height = sizeToHeight[size];
  return (
    <span
      role="img"
      aria-label="Espresso Coffee Shop"
      className={cn("relative inline-block select-none", className)}
      style={{ height, width: height * 3.6 }}
    >
      <img
        src={BRAND_ASSETS.wordmarkNegro}
        alt=""
        aria-hidden="true"
        className="brand-asset-negro h-full w-full object-contain object-left select-none pointer-events-none"
        draggable={false}
      />
      <img
        src={BRAND_ASSETS.wordmarkBlanco}
        alt=""
        aria-hidden="true"
        className="brand-asset-blanco h-full w-full object-contain object-left select-none pointer-events-none"
        draggable={false}
      />
    </span>
  );
}
