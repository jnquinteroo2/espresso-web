import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";

export function MetaBar({
  left,
  right,
  className,
}: {
  left: string;
  right?: string;
  className?: string;
}) {
  return (

    <Container
      as="div"
      className={cn(
        "flex items-center justify-between py-3 font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em] font-medium text-zone-fg",
        className,
      )}
    >
      <span>{left}</span>
      {right && <span>{right}</span>}
    </Container>
  );
}
