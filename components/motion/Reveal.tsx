"use client";

import { useEffect, useRef } from "react";
import { observeReveal, unobserveReveal } from "@/lib/reveal-observer";
import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** Entrada al viewport vía IntersectionObserver compartido (sin Framer Motion). */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  className,
  children,
  ...props
}: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const Comp = (as || "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observeReveal(el);
    return () => unobserveReveal(el);
  }, []);

  return (
    <Comp
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
