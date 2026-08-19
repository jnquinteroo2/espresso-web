/**
 * Filete de 1px fijo arriba de la ventana, en --fg de la zona activa
 * (ActiveZoneTracker mantiene --active-fg al día). Transición de color
 * junto con el header cuando cambia de zona.
 */
export function ProgressBar() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-active-fg transition-colors duration-[600ms] ease-[var(--ease-inout)]"
      style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
    />
  );
}
