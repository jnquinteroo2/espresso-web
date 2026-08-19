import { cn } from "@/lib/utils";

export function Hairline({
  inset = false,
  className,
}: {
  inset?: boolean;
  className?: string;
}) {
  return (
    <hr
      className={cn(
        "border-0 border-t h-px border-zone-rule",
        inset && "mx-5 md:mx-10 lg:mx-16",
        className,
      )}
    />
  );
}
