import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type MicroLabelProps = ComponentPropsWithoutRef<"p"> & {
  numeral?: string;

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

        "font-source-sans text-[length:var(--text-kicker)] leading-[1.4] uppercase tracking-[0.26em] font-medium text-zone-fg",
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
