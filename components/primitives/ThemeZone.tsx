import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

export type Theme = "paper" | "beige" | "blue" | "green" | "ink";

type ThemeZoneProps<T extends ElementType> = {
  theme: Theme;
  as?: T;
  className?: string;

  track?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function ThemeZone<T extends ElementType = "div">({
  theme,
  as,
  className,
  track,
  children,
  ...props
}: ThemeZoneProps<T>) {
  const Comp = as || "div";
  return (
    <Comp
      data-theme={theme}
      data-zone-track={track ? "true" : undefined}
      className={cn("bg-zone-bg text-zone-fg", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
