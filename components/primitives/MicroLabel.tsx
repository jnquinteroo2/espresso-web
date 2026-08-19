import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type MicroLabelProps = ComponentPropsWithoutRef<"p"> & {
  numeral?: string;
  /** Renderiza como heading (h2/h3/...) cuando hace falta uno real en el orden de la página, sin cambiar el estilo visual. Default "p". */
  as?: ElementType;
};

export function MicroLabel({
  numeral,
  className,
  children,
  as,
  ...props
}: MicroLabelProps) {
  const Comp = as || "p";
  return (
    <Comp
      className={cn(
        "font-source-sans text-[length:var(--text-micro)] leading-[var(--text-micro--line-height)] uppercase tracking-[0.26em] font-medium text-zone-fg",
        className,
      )}
      {...props}
    >
      {numeral && (
        <span className="font-dinish tracking-normal text-zone-fg mr-2">
          {numeral}
        </span>
      )}
      {children}
    </Comp>
  );
}
