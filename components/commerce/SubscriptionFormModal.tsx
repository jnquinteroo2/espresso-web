"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import type { Theme } from "@/components/primitives/ThemeZone";

export type SubscriptionFormData = {
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
};

const ETIQUETAS: Record<
  keyof SubscriptionFormData,
  { label: string; type?: string; autoComplete: string }
> = {
  nombre: { label: "Nombre", autoComplete: "name" },
  correo: { label: "Correo", type: "email", autoComplete: "email" },
  direccion: { label: "Dirección", autoComplete: "street-address" },
  telefono: { label: "Teléfono", type: "tel", autoComplete: "tel" },
};

const EMPTY_FORM: SubscriptionFormData = {
  nombre: "",
  correo: "",
  direccion: "",
  telefono: "",
};

function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  id: keyof SubscriptionFormData;
  label: ReactNode;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full border border-zone-rule bg-transparent px-4 font-source-sans text-[length:var(--text-body)] text-zone-fg placeholder:text-zone-fg/40 focus:outline-none focus:border-zone-fg transition-colors"
      />
    </div>
  );
}

export function SubscriptionFormModal({
  open,
  onClose,
  onSubmit,
  ariaLabel = "Datos de suscripción",
  eyebrow = "Un paso más",
  titulo = "Completa tus datos",
  submitLabel = "Completar mi suscripción",
  campos = ["nombre", "correo", "direccion", "telefono"],
  tema: temaForzado,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SubscriptionFormData) => void;
  ariaLabel?: string;
  eyebrow?: string;
  titulo?: string;
  submitLabel?: string;

  /** Qué campos pedir, en orden. Por defecto los cuatro. */
  campos?: (keyof SubscriptionFormData)[];

  /** Zona de color a forzar; si no se pasa, hereda la del botón que lo abre. */
  tema?: Theme;
}) {
  const [visible, setVisible] = useState(false);
  const [montado, setMontado] = useState(false);
  const [temaHeredado, setTemaHeredado] = useState<string | null>(null);
  const anclaRef = useRef<HTMLSpanElement>(null);
  const [form, setForm] = useState<SubscriptionFormData>(EMPTY_FORM);
  const [prevOpen, setPrevOpen] = useState(open);

  // El modal se monta en <body> con un portal: si se renderizara donde está el
  // botón, cualquier ancestro con transform (por ejemplo el wrapper de Reveal)
  // se vuelve el marco de referencia de position:fixed y el diálogo deja de
  // quedar centrado en la pantalla.
  useEffect(() => {
    // setTimeout y no requestAnimationFrame: rAF no corre en pestañas en
    // segundo plano, y el modal quedaría sin montar.
    const t = setTimeout(() => {
      setMontado(true);
      // Al salir a <body> el diálogo pierde la zona de color donde vive el
      // botón, así que se copia de ahí: verde en maquila, azul en suscripción.
      setTemaHeredado(
        anclaRef.current?.closest("[data-theme]")?.getAttribute("data-theme") ?? null,
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setForm(EMPTY_FORM);
    }
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(form);
  }

  const contenido = (
    <div data-theme={temaForzado ?? temaHeredado ?? undefined} className="contents">
      {}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[55] bg-ink/40 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex items-center justify-center p-4",
          visible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={cn(
            "w-full max-w-lg bg-zone-bg text-zone-fg border border-zone-rule p-6 md:p-8 flex flex-col gap-6",
            "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)]",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg/70">
                {eyebrow}
              </span>
              <h2 className="font-garet text-[length:var(--text-h3)] leading-tight">
                {titulo}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="min-h-11 min-w-11 flex items-center justify-center transition-opacity duration-[var(--dur-fast)] hover:opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 5 L19 19" />
                <path d="M19 5 L5 19" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {campos.map((campo) => (
              <FormField
                key={campo}
                id={campo}
                label={ETIQUETAS[campo].label}
                type={ETIQUETAS[campo].type}
                autoComplete={ETIQUETAS[campo].autoComplete}
                value={form[campo]}
                onChange={(v) => setForm((f) => ({ ...f, [campo]: v }))}
              />
            ))}

            <ButtonOutline as="button" type="submit" fullWidth className="mt-2">
              {submitLabel}
            </ButtonOutline>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {}
      <span ref={anclaRef} hidden aria-hidden="true" />
      {montado && createPortal(contenido, document.body)}
    </>
  );
}
