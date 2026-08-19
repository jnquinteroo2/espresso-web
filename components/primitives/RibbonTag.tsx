import { cn } from "@/lib/utils";

type RibbonTagProps = {
  text: string;
  rotation?: number;
  className?: string;
};

/** Cinta vino rotada — solo estado de producto y Vinyl & Drinks. Presupuesto: máx 2% del área visible. */
export function RibbonTag({ text, rotation = -7, className }: RibbonTagProps) {
  return (
    <span
      className={cn(
        "absolute top-3 right-[-8px] z-10 select-none",
        "bg-wine text-beige font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] font-medium",
        "px-3 py-1.5 shadow-none",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {text}
    </span>
  );
}
