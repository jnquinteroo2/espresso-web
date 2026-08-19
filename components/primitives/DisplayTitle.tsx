import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type DisplayTitleProps = ComponentPropsWithoutRef<"h1"> & {
  level?: 1 | 2 | 3;
  font?: "garet" | "din";
};

const levelStyles: Record<1 | 2 | 3, string> = {
  1: "text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)] tracking-[-0.01em] font-semibold",
  2: "text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)] tracking-[0.005em] font-medium",
  3: "text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)] tracking-[0.01em] font-medium",
};

const levelTag: Record<1 | 2 | 3, ElementType> = { 1: "h1", 2: "h2", 3: "h3" };

export function DisplayTitle({
  level = 2,
  font = "garet",
  className,
  children,
  ...props
}: DisplayTitleProps) {
  const Comp = levelTag[level];
  return (
    <Comp
      className={cn(
        font === "din" ? "font-dinish" : "font-garet",
        levelStyles[level],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
