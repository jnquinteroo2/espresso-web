const LINE_1 = "ESPRESSO";
const LINE_2 = "COFFEE SHOP";

function CharSpans({ text, delayOffset = 0, stepMs = 40 }: { text: string; delayOffset?: number; stepMs?: number }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block opacity-0 [animation:letter-in_var(--dur-slow)_var(--ease-out)_forwards]"
          style={{ animationDelay: `${(delayOffset + i) * stepMs}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

/**
 * Wordmark del hero con entrada de letras escalonada (40ms/carácter, sin
 * rotación ni escala). Sin SplitText/GSAP: spans generados en build time,
 * animation-delay por índice. aria-label lleva el texto completo para
 * lectores de pantalla; los spans van aria-hidden. prefers-reduced-motion
 * los deja en su estado final vía globals.css (regla [data-reveal] no
 * aplica aquí — se cubre con la media query genérica sobre `animation`).
 */
export function HeroWordmark() {
  return (
    <div
      role="img"
      aria-label="Espresso Coffee Shop"
      className="inline-flex flex-col items-center leading-none"
    >
      <span className="relative font-garet font-semibold uppercase tracking-[0.01em] text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)]">
        <span
          aria-hidden="true"
          className="absolute left-[0.06em] -top-[0.05em] w-[0.56em] h-[3px] md:h-[4px] bg-current"
        />
        <CharSpans text={LINE_1} />
      </span>
      <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.32em] font-medium mt-4 md:mt-5">
        <CharSpans text={LINE_2} delayOffset={LINE_1.length + 2} />
      </span>
    </div>
  );
}
