import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
// Producción es una exportación estática (output: "export"), donde los rewrites
// de Next no existen: pegarle a "/ingest" daría 404. Por eso apuntamos directo
// al host de PostHog.
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (!token) {
  if (process.env.NODE_ENV !== "production") {
    console.error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, " +
        "this causes events to be silently missed. " +
        "This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured"
    );
  }
} else {
  posthog.init(token, {
    api_host: host,
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
