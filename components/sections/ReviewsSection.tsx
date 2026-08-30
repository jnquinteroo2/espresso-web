"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { cn } from "@/lib/utils";
import { getGoogleReviews, getGoogleReviewsStats } from "@/lib/data/reviews";
import type { GoogleReview } from "@/content/types";

const GOOGLE_REVIEWS_URL = "https://share.google/r9I5uk72kyoPrvzXN";
const AUTO_SCROLL_PX_PER_SEC = 32;

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? "text-zone-fg" : "text-zone-fg/25"}
    >
      <path
        fill="currentColor"
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-4.04-7.417 4.04 1.481-8.279-6.064-5.828 8.332-1.151z"
      />
    </svg>
  );
}

function Stars({ calificacion }: { calificacion: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Calificación: ${calificacion} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < calificacion} />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  onOpen,
}: {
  review: GoogleReview;
  onOpen: (review: GoogleReview) => void;
}) {
  const { nombre, calificacion, fecha, texto } = review;
  return (
    <button
      type="button"
      data-review-card
      onClick={() => onOpen(review)}
      aria-label={`Ver reseña completa de ${nombre}`}
      className="flex h-[220px] w-[85vw] shrink-0 flex-col justify-between gap-4 overflow-hidden border border-zone-rule bg-zone-fg/[0.03] p-6 text-left transition-colors hover:border-zone-fg sm:w-[360px]"
    >
      <div className="flex items-center justify-between gap-4">
        <Stars calificacion={calificacion} />
        {fecha && (
          <span className="shrink-0 font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg/60">
            {fecha}
          </span>
        )}
      </div>

      {texto && (
        <p className="line-clamp-4 font-garet text-[length:var(--text-body)] leading-[1.6] text-zone-fg/90">
          {texto}
        </p>
      )}

      <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] text-zone-fg">
        {nombre}
      </span>
    </button>
  );
}

function ReviewModal({
  review,
  onClose,
}: {
  review: GoogleReview | null;
  onClose: () => void;
}) {
  const open = review !== null;
  const [visible, setVisible] = useState(false);
  const [displayReview, setDisplayReview] = useState<GoogleReview | null>(review);

  if (review && review !== displayReview) {
    setDisplayReview(review);
  }

  if (!open && visible) {
    setVisible(false);
  }

  useEffect(() => {
    if (!open) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      {}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[45] bg-ink/40 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          visible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={displayReview ? `Reseña de ${displayReview.nombre}` : "Reseña"}
          className={cn(
            "flex max-h-[85vh] w-full max-w-lg flex-col gap-6 overflow-y-auto border border-zone-rule bg-zone-bg p-6 text-zone-fg md:p-8",
            "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          )}
        >
          {displayReview && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <Stars calificacion={displayReview.calificacion} />
                  {displayReview.fecha && (
                    <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg/60">
                      {displayReview.fecha}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="flex min-h-11 min-w-11 items-center justify-center transition-opacity duration-[var(--dur-fast)] hover:opacity-60"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 5 L19 19" />
                    <path d="M19 5 L5 19" />
                  </svg>
                </button>
              </div>

              {displayReview.texto && (
                <p className="font-garet text-[length:var(--text-body)] leading-[1.7] text-zone-fg/90">
                  {displayReview.texto}
                </p>
              )}

              <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] text-zone-fg">
                {displayReview.nombre}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const reviews = getGoogleReviews();
  const { total, promedio } = getGoogleReviewsStats();
  const loopReviews = [...reviews, ...reviews];

  const [activeReview, setActiveReview] = useState<GoogleReview | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reviews.length === 0) return;

    function measure() {
      if (!track) return;
      const cards = track.querySelectorAll<HTMLElement>("[data-review-card]");
      const first = cards[0];
      const secondSetFirst = cards[reviews.length];
      if (first && secondSetFirst) {
        singleSetWidthRef.current = secondSetFirst.offsetLeft - first.offsetLeft;
      }
    }
    measure();
    window.addEventListener("resize", measure);

    function step(time: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const singleWidth = singleSetWidthRef.current;
      if (singleWidth > 0) {
        offsetRef.current += AUTO_SCROLL_PX_PER_SEC * dt;
        if (offsetRef.current >= singleWidth) {
          offsetRef.current -= singleWidth;
        }
        if (track) {
          track.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", measure);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [reviews.length]);

  function nudge(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const amount = card ? card.getBoundingClientRect().width + 16 : 320;
    const singleWidth = singleSetWidthRef.current;
    let next = offsetRef.current + direction * amount;
    if (singleWidth > 0) {
      next = ((next % singleWidth) + singleWidth) % singleWidth;
    }
    offsetRef.current = next;
  }

  return (
    <ThemeZone theme="ink" as="section" track aria-labelledby="reviews-heading">
      <Section className="flex flex-col gap-12">
        <Container className="flex flex-col items-center gap-6 text-center">
          <MicroLabel numeral="05">Reseñas</MicroLabel>
          <DisplayTitle level={2} id="reviews-heading" className="!text-[clamp(28px,3.5vw,35px)]">
            LO QUE DICEN NUESTROS CLIENTES
          </DisplayTitle>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-dinish text-[length:var(--text-h3)] leading-none tabular-nums">
              {promedio.toFixed(1)}
            </span>
            <Stars calificacion={Math.round(promedio)} />
            <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] text-zone-fg/70">
              {total} opiniones en Google
            </span>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Ver todas en Google →
          </a>
        </Container>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4 px-6 will-change-transform sm:px-[max(24px,calc((100vw-1200px)/2))]"
            >
              {loopReviews.map((r, i) => (
                <ReviewCard key={`${r.nombre}-${i}`} review={r} onOpen={setActiveReview} />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Reseña anterior"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-zone-rule bg-zone-bg/90 text-zone-fg transition-colors hover:border-zone-fg sm:left-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M15 5 L8 12 L15 19" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Siguiente reseña"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-zone-rule bg-zone-bg/90 text-zone-fg transition-colors hover:border-zone-fg sm:right-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M9 5 L16 12 L9 19" />
            </svg>
          </button>
        </div>
      </Section>

      <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />
    </ThemeZone>
  );
}
