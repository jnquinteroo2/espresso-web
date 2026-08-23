import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function BlurEcho({
  children,
  blur = 18,
  offset = 10,
  opacity = 0.65,
  className,
}: {
  children: ReactNode;
  blur?: number;
  offset?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 select-none pointer-events-none"
        style={{
          filter: `blur(${blur}px)`,
          opacity,
          transform: `translate(${offset}px, ${offset}px)`,
        }}
      >
        {children}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
