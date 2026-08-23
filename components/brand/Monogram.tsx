import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/content/brand-assets";

export function Monogram({
  size = 32,
  decorative = true,
  label = "Espresso Coffee Shop",
  className,
}: {
  size?: number;
  decorative?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <span
      {...(decorative
        ? { "aria-hidden": "true" as const }
        : { role: "img", "aria-label": label })}
      className={cn("relative inline-flex shrink-0 select-none", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={BRAND_ASSETS.monograma}
        alt=""
        aria-hidden="true"
        className="brand-invert-dark h-full w-full object-contain select-none pointer-events-none"
        draggable={false}
      />
    </span>
  );
}
