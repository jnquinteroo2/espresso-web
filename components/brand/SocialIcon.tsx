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
          <path d="M6.2 20.5 L7.3 16.5 C6.4 15 5.9 13.3 5.9 11.5 C5.9 6.5 10 3 12.8 3 C17.2 3 20.1 6.4 20.1 10.6 C20.1 14.8 16.9 18.3 12.9 18.3 C11.4 18.3 10 18 8.7 17.3 Z" />
          <path d="M9.7 8.4 C9.9 8 10.2 8 10.4 8 C10.6 8 10.8 8 11 8.4 C11.2 8.9 11.6 9.9 11.6 10 C11.7 10.1 11.7 10.3 11.6 10.5 C11.4 10.8 11.2 11 11 11.2 C10.9 11.4 10.7 11.6 10.9 11.9 C11.1 12.3 11.7 13.2 12.6 13.9 C13.7 14.8 14.6 15.1 15 15.2 C15.3 15.3 15.5 15.3 15.7 15.1 C15.9 14.9 16.2 14.5 16.5 14.1 C16.7 13.8 16.9 13.8 17.2 13.9 C17.5 14 18.5 14.5 18.8 14.7 C19.1 14.9 19.3 15 19.4 15.1 C19.4 15.4 19.4 15.9 19.1 16.4 C18.8 17 17.7 17.6 17.2 17.6 C16.1 17.7 15 17.5 12.9 16.6 C10.4 15.5 8.7 13.1 8.5 12.8 C8.3 12.5 7.4 11.2 7.4 9.9 C7.4 8.6 8.1 8 8.3 7.7 C8.5 7.5 8.7 7.4 8.9 7.4 C9.1 7.4 9.3 7.4 9.4 7.4 C9.5 7.4 9.6 7.3 9.7 8.4 Z" fill="currentColor" stroke="none" />
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
