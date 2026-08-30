import Link from "next/link";

/**
 * Enlace de "volver" para la parte superior de una página de detalle.
 * El destino se pasa explícito (no usa history.back) para que también
 * funcione cuando se entra directo desde un buscador o un enlace compartido.
 */
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 font-source-sans text-[length:var(--text-kicker)] uppercase tracking-[0.26em] font-medium hover:opacity-60 transition-opacity"
    >
      <span
        aria-hidden="true"
        className="inline-block transition-transform group-hover:-translate-x-1"
      >
        &larr;
      </span>
      {children}
    </Link>
  );
}
