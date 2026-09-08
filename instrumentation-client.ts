import posthog, { type CaptureResult } from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
// Producción es una exportación estática (output: "export"), donde los rewrites
// de Next no existen: pegarle a "/ingest" daría 404. Por eso apuntamos directo
// al host de PostHog.
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

// "ResizeObserver loop" es un aviso benigno del navegador: salta cuando una
// callback de ResizeObserver redimensiona el elemento que observa. No rompe
// nada para el usuario, así que lo descartamos para que no abra incidencias en
// error tracking.
function dropResizeObserverLoop(event: CaptureResult | null): CaptureResult | null {
  if (event?.event === "$exception") {
    const excepciones = event.properties?.$exception_list;
    const esRuidoResizeObserver =
      Array.isArray(excepciones) &&
      excepciones.some(
        (ex) => typeof ex?.value === "string" && ex.value.includes("ResizeObserver loop")
      );
    if (esRuidoResizeObserver) return null;
  }
  return event;
}

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
    before_send: dropResizeObserverLoop,
    debug: process.env.NODE_ENV === "development",
  });
}
