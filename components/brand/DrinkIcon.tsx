export type DrinkIconName = "copa-martini" | "tiki" | "copa-spritz" | "copa-vino" | "pera" | "queso";

function Shape({ name }: { name: DrinkIconName }) {
  switch (name) {
    case "copa-martini":
      return <path d="M4 4 L20 4 L12 12 L12 19 M8 19 L16 19" />;
    case "copa-vino":
      return (
        <path d="M8 3 C8 9 8 11 12 11 C16 11 16 9 16 3 M8 3 H16 M12 11 V19 M8 19 H16" />
      );
    case "copa-spritz":
      return (
        <path d="M6 4 C6 12 8 14 12 14 C16 14 18 12 18 4 M6 4 H18 M12 14 V18 M9 18 H15" />
      );
    case "tiki":
      return (
        <>
          <path d="M7 4 H15 L14 18 H8 Z" />
          <path d="M15 7 C18 7 18 12 15 12" />
        </>
      );
    case "pera":
      return (
        <path d="M12 3 C13.2 3 13.2 4.6 12.4 5.4 C16 6.4 17.2 10.8 15 14.8 C13.4 17.8 10.6 17.8 9 14.8 C6.8 10.8 8 6.4 11.6 5.4 C10.8 4.6 10.8 3 12 3 Z" />
      );
    case "queso":
      return (
        <>
          <path d="M3 18 L10 4 L21 18 Z" />
          <circle cx="10" cy="13.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
        </>
      );
  }
}

export function DrinkIcon({
  name,
  size = 24,
  decorative = true,
  label,
}: {
  name: DrinkIconName;
  size?: number;
  decorative?: boolean;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label ?? name}
    >
      <Shape name={name} />
    </svg>
  );
}
