export type SocialIconName = "facebook" | "instagram" | "tiktok" | "whatsapp";

function Shape({ name }: { name: SocialIconName }) {
  switch (name) {
    case "facebook":
      return <path d="M14 21 V13 H17 L17.5 10 H14 V8 C14 7 14.5 6.5 15.5 6.5 H17.5 V4 C17.5 4 16.5 3.8 15.3 3.8 C12.8 3.8 11 5.3 11 8 V10 H8.5 V13 H11 V21" />;
    case "instagram":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
        </>
      );
    case "tiktok":
      return (
        <path d="M13 3 V15.2 C13 16.9 11.6 18.3 9.9 18.3 C8.2 18.3 6.8 16.9 6.8 15.2 C6.8 13.5 8.2 12.1 9.9 12.1 C10.2 12.1 10.5 12.1 10.8 12.2 V9.1 C10.5 9.1 10.2 9 9.9 9 C6.5 9 3.7 11.8 3.7 15.2 C3.7 18.6 6.5 21.4 9.9 21.4 C13.3 21.4 16.1 18.6 16.1 15.2 V9.1 C17.1 9.9 18.3 10.3 19.6 10.3 V7.2 C17.6 7.2 16 5.6 15.9 3.6 L13 3.6 Z" />
      );
    case "whatsapp":
      return (
        <>
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </>
      );
  }
}

export function SocialIcon({
  name,
  size = 20,
  decorative = true,
  label,
}: {
  name: SocialIconName;
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
      strokeWidth={1.5}
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
