import type { CSSProperties } from "react";
import { BrandIcon, type BrandIconName } from "./BrandIcon";
import { Monogram } from "./Monogram";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ORDER: { name: BrandIconName; label: string }[] = [
  { name: "arco", label: "Espacio" },
  { name: "asterisco", label: "Especialidad" },
  { name: "reloj", label: "Método" },
  { name: "estrella", label: "Academia" },
];

export function IconRow({
  size = 26,
  interactive = false,
  hrefs,
  withSeal = true,
  className,
  style,
}: {
  size?: number;
  interactive?: boolean;
  hrefs?: Partial<Record<BrandIconName, string>>;
  /** Fila de 5 elementos (4 iconos + monograma central, no interactivo) — regla de marca. */
  withSeal?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const items = ORDER.map(({ name, label }) => {
    const icon = <BrandIcon name={name} size={size} decorative={!interactive} label={label} />;
    const href = hrefs?.[name];
    if (interactive && href) {
      return (
        <Link
          key={name}
          href={href}
          aria-label={label}
          className="transition-opacity duration-[var(--dur-fast)] hover:opacity-60"
        >
          {icon}
        </Link>
      );
    }
    return <span key={name}>{icon}</span>;
  });

  if (withSeal) {
    items.splice(
      2,
      0,
      <Monogram
        key="seal"
        size={Math.round(size * 1.3)}
        className="pointer-events-none select-none"
      />,
    );
  }

  return (
    <div className={cn("flex items-center justify-center gap-8 md:gap-12", className)} style={style}>
      {items}
    </div>
  );
}
