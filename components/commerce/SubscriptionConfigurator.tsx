"use client";

import { useState } from "react";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { Hairline } from "@/components/primitives/Hairline";
import { getWhatsAppUrl, buildSubscriptionMessage, formatCOP } from "@/lib/whatsapp";

const METODOS = ["Espresso", "Filtrado", "Los dos"];
const PERFILES = ["Tradicional", "Moderno", "Sorpréndeme"];
const FRECUENCIAS: { label: string; precio: number }[] = [
  { label: "Mensual", precio: 45000 },
  { label: "Quincenal", precio: 80000 },
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
      className={`min-h-11 px-4 border font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] transition-colors ${
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

  const message = buildSubscriptionMessage({
    metodo,
    perfil,
    frecuencia: frecuencia.label,
    precio: frecuencia.precio,
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <span className="font-dinish text-[length:var(--text-numeral)] leading-none">01</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Cómo preparas?
          </span>
          <div className="flex flex-wrap gap-2">
            {METODOS.map((m) => (
              <StepButton key={m} active={metodo === m} onClick={() => setMetodo(m)}>
                {m}
              </StepButton>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-dinish text-[length:var(--text-numeral)] leading-none">02</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Qué perfil?
          </span>
          <div className="flex flex-wrap gap-2">
            {PERFILES.map((p) => (
              <StepButton key={p} active={perfil === p} onClick={() => setPerfil(p)}>
                {p}
              </StepButton>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-dinish text-[length:var(--text-numeral)] leading-none">03</span>
          <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
            ¿Cada cuánto?
          </span>
          <div className="flex flex-wrap gap-2">
            {FRECUENCIAS.map((f) => (
              <StepButton key={f.label} active={frecuencia.label === f.label} onClick={() => setFrecuencia(f)}>
                {f.label}
              </StepButton>
            ))}
          </div>
        </div>
      </div>

      <Hairline />

      <div className="flex items-center justify-between">
        <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
          Precio {frecuencia.label.toLowerCase()}
        </span>
        <span className="font-dinish text-[length:var(--text-numeral)] leading-none tabular-nums">
          {formatCOP(frecuencia.precio)}
        </span>
      </div>

      <ButtonOutline
        as="a"
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
      >
        Suscribirme por WhatsApp
      </ButtonOutline>
    </div>
  );
}
