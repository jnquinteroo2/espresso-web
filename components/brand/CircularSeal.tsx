import { useId, type ReactNode } from "react";
import { BrandIcon, type BrandIconName } from "./BrandIcon";
import { cn } from "@/lib/utils";

type CircularSealProps = {
  text: string;
  icon?: BrandIconName;
  /** Icono no propietario (ej. carta de Vinyl & Drinks) — reemplaza `icon`. Debe ser un SVG stroke=currentColor del mismo tamaño que BrandIcon para verse consistente. */
  iconNode?: ReactNode;
  size?: number;
  rotateOnScroll?: boolean;
  opacity?: number;
  className?: string;
};

/** Bajo este tamaño el texto en trayectoria es ilegible — addendum-06 fix 2. */
const TEXT_MIN_SIZE = 120;

/**
 * Sello circular — texto en trayectoria vía SVG textPath. Rota ligado al
 * scroll leyendo la custom property global --scroll-progress (un único
 * ScrollTrigger la escribe; N sellos la consumen sin JS adicional). El
 * icono central se contra-rota para permanecer legible, salvo el
 * asterisco, que gira con el sello.
 *
 * Por debajo de 120px el texto en trayectoria se vuelve ilegible (se leía
 * como un arco punteado roto, no como un sello) — en ese rango se renderiza
 * solo la Ē centrada dentro de un círculo de filete limpio, sin texto ni
 * icono. El aria-label con el texto completo se mantiene siempre, en los
 * dos casos.
 */
export function CircularSeal({
  text,
  icon,
  iconNode,
  size = 200,
  rotateOnScroll = true,
  opacity = 1,
  className,
}: CircularSealProps) {
  const id = useId().replace(/:/g, "");
  const r = size / 2 - size * 0.12;
  const cx = size / 2;
  const cy = size / 2;
  const counterRotate = icon !== "asterisco";
  const compact = size < TEXT_MIN_SIZE;

  const rotateStyle = rotateOnScroll
    ? { transform: "rotate(calc(var(--scroll-progress, 0) * 360deg))", transformOrigin: "50% 50%" }
    : undefined;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size, opacity }}
      role="img"
      aria-label={text}
    >
      {compact ? (
        <>
          <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="absolute inset-0" style={rotateStyle} aria-hidden="true">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={Math.max(1, size * 0.012)} />
          </svg>
          <span
            aria-hidden="true"
            className="relative font-garet font-semibold"
            style={{ fontSize: size * 0.34 }}
          >
            <span className="relative inline-block">
              <span
                className="absolute left-1/2 -translate-x-1/2 bg-current"
                style={{ top: "-0.08em", width: "0.62em", height: Math.max(1, size * 0.014) }}
              />
              E
            </span>
          </span>
        </>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className="absolute inset-0"
            style={rotateStyle}
            aria-hidden="true"
          >
            <defs>
              <path
                id={`seal-path-${id}`}
                d={`M ${cx}, ${cy} m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
                fill="none"
              />
            </defs>
            <text
              fill="currentColor"
              className="font-source-sans uppercase"
              style={{
                fontSize: size * 0.052,
                letterSpacing: "0.22em",
              }}
            >
              <textPath href={`#seal-path-${id}`} startOffset="0%">
                {text}
              </textPath>
            </text>
          </svg>
          {(icon || iconNode) && (
            <div
              className="relative"
              style={
                rotateOnScroll && counterRotate
                  ? {
                      transform: "rotate(calc(var(--scroll-progress, 0) * -360deg))",
                      transformOrigin: "50% 50%",
                    }
                  : undefined
              }
            >
              {iconNode ?? (icon && <BrandIcon name={icon} size={Math.round(size * 0.18)} decorative />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
