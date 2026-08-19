import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

export type Theme = "paper" | "beige" | "blue" | "green" | "ink";

type ThemeZoneProps<T extends ElementType> = {
  theme: Theme;
  as?: T;
  className?: string;
  /** Marca esta zona como sección de scroll rastreable por ActiveZoneTracker (Header/ProgressBar la leen vía --active-bg/--active-fg). Usar en las zonas de nivel de página, no en overlays fijos (NavOverlay). */
  track?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Aplica data-theme y redefine --bg/--fg/--muted/--rule para todo el
 * subárbol (ver app/globals.css). Cualquier primitiva colocada dentro
 * invierte de color sin recibir props.
 */
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
