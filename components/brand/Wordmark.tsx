import { cn } from "@/lib/utils";

/**
 * Wordmark tipográfico: "ESPRESSO" (con macrón sobre la E) + "COFFEE SHOP"
 * debajo, en menor tamaño y tracking más abierto. Renderizado en CSS/SVG,
 * no como imagen — invierte de color heredando currentColor de la zona.
 */
export function Wordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const scale = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" }[size];
  return (
    <div className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-garet font-semibold uppercase tracking-[0.14em] relative inline-block",
          scale,
        )}
      >
        <span className="relative">
          <span aria-hidden="true" className="absolute left-[0.02em] -top-[0.16em] w-[0.62em] h-[2px] bg-current" />
          ESPRESSO
        </span>
      </span>
      <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.32em] font-medium mt-1.5">
        <span className="sr-only"> </span>
        Coffee Shop
      </span>
    </div>
  );
}
