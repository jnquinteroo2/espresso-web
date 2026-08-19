import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Duplicado desenfocado detrás de un titular. Máximo una instancia por
 * página (regla de marca). `children` se renderiza dos veces: eco + real.
 * Default opacity 0.5: por debajo de eso (probado a 0.3/0.35) el eco falla
 * color-contrast en zonas oscuras — texto beige diluido sobre fondo negro
 * cae bajo 3:1 aun siendo aria-hidden (axe no exime contraste por
 * aria-hidden). Sobre zonas claras 0.5 sigue leyendo como eco sutil.
 */
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
