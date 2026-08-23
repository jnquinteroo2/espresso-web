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
  gap = "gap-4 md:gap-6",
  className,
  style,
}: {
  size?: number;
  interactive?: boolean;
  hrefs?: Partial<Record<BrandIconName, string>>;

  withSeal?: boolean;

  gap?: string;
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
    <div className={cn("flex items-center justify-center", gap, className)} style={style}>
      {items}
    </div>
  );
}
