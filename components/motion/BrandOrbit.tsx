"use client";

import { useEffect, useRef, useState } from "react";
import type { Marca } from "@/content/types";
import { PLACEHOLDER_ASSETS } from "@/content/brand-assets";

const DEG_PER_SEC = (0.15 * 180) / Math.PI; 
const RADIUS = 320;

export function BrandOrbit({ marcas }: { marcas: Marca[] }) {
  const [rotation, setRotation] = useState(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      const idle = now - lastInteractionRef.current > 1500;
      if (!draggingRef.current && idle) {
        setRotation((r) => r + DEG_PER_SEC * dt);
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const angleStep = 360 / marcas.length;

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    lastInteractionRef.current = performance.now();
    (e.target as Element).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    lastInteractionRef.current = performance.now();
    setRotation((r) => r + dx * 0.4);
  }
  function onPointerUp() {
    draggingRef.current = false;
    lastInteractionRef.current = performance.now();
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      setRotation((r) => r - 30);
      lastInteractionRef.current = performance.now();
    } else if (e.key === "ArrowRight") {
      setRotation((r) => r + 30);
      lastInteractionRef.current = performance.now();
    }
  }

  return (
    <div
      data-orbit-3d
      data-orbit-viewport
      className="relative h-64 w-full select-none touch-pan-y"
    >
      <div
        role="group"
        aria-label="Marcas aliadas — carrusel, usa las flechas izquierda y derecha para rotar"
        tabIndex={0}
        data-orbit-stage
        className="relative mx-auto h-full w-full cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ transform: `rotateY(${rotation}deg)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {marcas.map((marca, i) => (
          <div
            key={marca.nombre}
            className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]"
            style={{
              transform: `rotateY(${i * angleStep}deg) translateZ(${RADIUS}px)`,
            }}
          >
            {}
            <img
              src={PLACEHOLDER_ASSETS.marcaLogoTemp}
              alt={marca.nombre}
              className="h-9 w-auto max-w-32 object-contain select-none brand-invert-dark"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
