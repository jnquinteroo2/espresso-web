import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ButtonOutlineProps<T extends ElementType> = {
  as?: T;
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "size">;

const sizeStyles = {
  sm: "px-4 py-2 text-[length:var(--text-label)]",
  md: "px-6 py-3.5 text-[length:var(--text-label)]",
};

export function ButtonOutline<T extends ElementType = "button">({
  as,
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonOutlineProps<T>) {
  const Comp = as || "button";
  return (
    <Comp
      className={cn(
        "font-source-sans inline-flex items-center justify-center gap-2 uppercase tracking-[0.18em] font-medium",
        "border border-zone-fg text-zone-fg bg-transparent",
        "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
        "hover:bg-zone-fg hover:text-zone-bg",
        "disabled:opacity-40 disabled:pointer-events-none",
        "min-h-11 min-w-11",
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
