import { cn } from "@/lib/utils";

export function RoastScale({ tueste, className }: { tueste: 1 | 2 | 3 | 4 | 5; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`Tueste ${tueste} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className={cn("h-px w-4", n <= tueste ? "bg-zone-fg" : "bg-zone-rule")}
        />
      ))}
    </div>
  );
}
