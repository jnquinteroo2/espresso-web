"use client";

import { useEffect, useRef, useState } from "react";

export type LogoOrbitItem = { nombre: string; src: string };

/** Grados por segundo del giro automático. */
const DEG_PER_SEC = 14;
/** Cuánto gira cada pulsación de flecha. */
const PASO_TECLADO = 30;

/**
 * Carrusel circular de logos: se reparten sobre un anillo en 3D
 * (rotateY + translateZ) y el anillo gira solo, sin parar. Se puede arrastrar
 * con el mouse o el dedo y girar con las flechas del teclado.
 *
 * Al pasar el mouse o tocar un logo se abre ampliado encima, mientras el
 * anillo sigue girando detrás.
 *
 * No usa librerías: es el patrón CSS 3D de BrandOrbit, con el fallback de
 * globals.css (data-orbit-*) para "prefers-reduced-motion" y para los
 * navegadores sin preserve-3d, que muestran la grilla estática.
 */
export function LogoOrbit({ logos }: { logos: LogoOrbitItem[] }) {
  const [rotacion, setRotacion] = useState(0);
  const [radio, setRadio] = useState(280);
  const [abierto, setAbierto] = useState<LogoOrbitItem | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const arrastrandoRef = useRef(false);
  const ultimoXRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  // El radio del anillo se ajusta al ancho disponible.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const ancho = entries[0].contentRect.width;
      setRadio(Math.round(Math.max(170, Math.min(380, ancho * 0.4))));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Giro automático: nunca se detiene, ni con el logo abierto.
  useEffect(() => {
    let anterior = performance.now();
    function tick(ahora: number) {
      const dt = (ahora - anterior) / 1000;
      anterior = ahora;
      if (!arrastrandoRef.current) {
        setRotacion((r) => (r + DEG_PER_SEC * dt) % 360);
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Escape cierra el logo ampliado.
  useEffect(() => {
    if (!abierto) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [abierto]);

  const paso = 360 / logos.length;
  const logo = Math.round(radio * 0.9);
  const ampliado = Math.round(radio * 1.5);

  function onPointerDown(e: React.PointerEvent) {
    arrastrandoRef.current = true;
    ultimoXRef.current = e.clientX;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!arrastrandoRef.current) return;
    const dx = e.clientX - ultimoXRef.current;
    ultimoXRef.current = e.clientX;
    setRotacion((r) => r + dx * 0.35);
  }
  function onPointerUp() {
    arrastrandoRef.current = false;
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setRotacion((r) => r - PASO_TECLADO);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setRotacion((r) => r + PASO_TECLADO);
    }
  }

  return (
    <>
      <div
        ref={viewportRef}
        data-orbit-3d
        data-orbit-viewport
        className="relative w-full select-none touch-pan-y"
        style={{ height: logo + 80 }}
        onPointerLeave={() => {
          arrastrandoRef.current = false;
          setAbierto(null);
        }}
      >
        <div
          role="group"
          tabIndex={0}
          aria-label="Marcas que maquilamos — carrusel giratorio; usa las flechas izquierda y derecha para girarlo"
          data-orbit-stage
          className="relative mx-auto h-full w-full cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ transform: `rotateY(${rotacion}deg)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          {logos.map((item, i) => (
            <button
              key={item.nombre}
              type="button"
              aria-label={`Ver el logo de ${item.nombre}`}
              onPointerEnter={() => setAbierto(item)}
              onPointerDown={() => setAbierto(item)}
              onFocus={() => setAbierto(item)}
              className="absolute left-1/2 top-1/2 flex items-center justify-center [backface-visibility:hidden]"
              style={{
                width: logo,
                height: logo,
                marginLeft: -logo / 2,
                marginTop: -logo / 2,
                transform: `rotateY(${i * paso}deg) translateZ(${radio}px)`,
              }}
            >
              {}
              <img
                src={item.src}
                alt={item.nombre}
                loading="lazy"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </button>
          ))}
        </div>

        {}
        <div
          aria-hidden={!abierto}
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-zone-bg/75 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] ${
            abierto ? "opacity-100" : "opacity-0"
          }`}
        >
          {abierto && (
            <img
              src={abierto.src}
              alt={abierto.nombre}
              className="object-contain"
              style={{ width: ampliado, height: ampliado }}
              draggable={false}
            />
          )}
        </div>
      </div>

      {}
      <div data-orbit-fallback className="grid-cols-2 gap-8 md:grid-cols-3 md:gap-10">
        {logos.map((item) => (
          <div key={item.nombre} className="flex aspect-square items-center justify-center">
            {}
            <img
              src={item.src}
              alt={item.nombre}
              loading="lazy"
              className="h-full w-full object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </>
  );
}
