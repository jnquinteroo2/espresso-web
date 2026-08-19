import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  minHeight?: boolean;
  "aria-labelledby"?: string;
};

export function Section({
  className,
  minHeight = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-[clamp(80px,11vh,176px)]",
        minHeight && "min-h-[85svh] flex flex-col justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
