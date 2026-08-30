"use client";

import { useState } from "react";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { Hairline } from "@/components/primitives/Hairline";
import { getWhatsAppUrl, buildSubscriptionMessage, formatCOP } from "@/lib/whatsapp";
import { SubscriptionFormModal, type SubscriptionFormData } from "@/components/commerce/SubscriptionFormModal";

const METODOS = ["En grano", "Molido - Espresso", "Molido - Filtrado", "Molido - Prensa"];

const PERFILES: { label: string; precio: number }[] = [
  { label: "Tradicional", precio: 55000 },
  { label: "Moderno", precio: 80000 },
  { label: "Sorpréndeme", precio: 80000 },
];

const FRECUENCIAS: { label: string; factor: number }[] = [
  { label: "Mensual", factor: 1 },
  { label: "Quincenal", factor: 2 },
];
const GRAMAJES: { label: string; factor: number }[] = [
  { label: "250 g", factor: 1 },
  { label: "500 g", factor: 2 },
];

function StepButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (

    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-11 w-full items-center justify-center whitespace-nowrap border px-4 font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-colors ${
        active ? "border-zone-fg bg-zone-fg text-zone-bg" : "border-zone-rule hover:border-zone-fg"
      }`}
    >
      {children}
    </button>
  );
}

export function SubscriptionConfigurator() {
  const [metodo, setMetodo] = useState(METODOS[0]);
  const [perfil, setPerfil] = useState(PERFILES[0]);
  const [frecuencia, setFrecuencia] = useState(FRECUENCIAS[0]);
  const [gramaje, setGramaje] = useState(GRAMAJES[0]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const precio = perfil.precio * frecuencia.factor * gramaje.factor;

  function handleSuscribir(data: SubscriptionFormData) {
    const message = buildSubscriptionMessage({
      metodo,
      perfil: perfil.label,
      frecuencia: frecuencia.label,
      gramaje: gramaje.label,
      precio,
      ...data,
    });
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setIsFormOpen(false);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(max-content,1fr))]">
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <span className="font-dinish text-[length:var(--text-h3)] leading-none">01</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Cómo preparas?
          </span>
          <div className="flex w-full flex-col items-stretch gap-2">
            {METODOS.map((m) => (
              <StepButton key={m} active={metodo === m} onClick={() => setMetodo(m)}>
                {m}
              </StepButton>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3 text-center">
          <span className="font-dinish text-[length:var(--text-h3)] leading-none">02</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Qué perfil?
          </span>
          <div className="flex w-full flex-col items-stretch gap-2">
            {PERFILES.map((p) => (
              <StepButton key={p.label} active={perfil.label === p.label} onClick={() => setPerfil(p)}>
                {p.label}
              </StepButton>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3 text-center">
          <span className="font-dinish text-[length:var(--text-h3)] leading-none">03</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Cada cuánto?
          </span>
          <div className="flex w-full flex-col items-stretch gap-2">
            {FRECUENCIAS.map((f) => (
              <StepButton key={f.label} active={frecuencia.label === f.label} onClick={() => setFrecuencia(f)}>
                {f.label}
              </StepButton>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3 text-center">
          <span className="font-dinish text-[length:var(--text-h3)] leading-none">04</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Qué cantidad?
          </span>
          <div className="flex w-full flex-col items-stretch gap-2">
            {GRAMAJES.map((g) => (
              <StepButton key={g.label} active={gramaje.label === g.label} onClick={() => setGramaje(g)}>
                {g.label}
              </StepButton>
            ))}
          </div>
        </div>
      </div>

      <Hairline />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
            Precio {frecuencia.label.toLowerCase()} · {gramaje.label}
          </span>
          <span className="font-dinish text-[length:var(--text-h3)] leading-none tabular-nums">
            {formatCOP(precio)}
          </span>
        </div>

        <div className="flex items-center justify-between font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg/70">
          <span>Envío</span>
          <span className="font-dinish tabular-nums">$0</span>
        </div>

        <div className="flex items-center justify-between font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-zone-fg/70">
          <span>Empaque</span>
          <span className="font-dinish tabular-nums">$0</span>
        </div>
      </div>

      <ButtonOutline
        as="button"
        type="button"
        onClick={() => setIsFormOpen(true)}
        fullWidth
      >
        Suscribirme
      </ButtonOutline>

      <SubscriptionFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSuscribir}
      />
    </div>
  );
}