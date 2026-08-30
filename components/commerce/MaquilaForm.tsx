"use client";

import { useState } from "react";

import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import {
  SubscriptionFormModal,
  type SubscriptionFormData,
} from "@/components/commerce/SubscriptionFormModal";
import { getWhatsAppUrl, buildMaquilaMessage } from "@/lib/whatsapp";

export function MaquilaForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleSubmit(data: SubscriptionFormData) {
    const message = buildMaquilaMessage(data);
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setIsFormOpen(false);
  }

  return (
    <>
      <ButtonOutline as="button" type="button" onClick={() => setIsFormOpen(true)}>
        Maquila con Nosotros
      </ButtonOutline>

      <SubscriptionFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        ariaLabel="Datos para maquila"
        eyebrow="Maquila con nosotros"
        titulo="Cuéntanos de tu marca"
        submitLabel="Enviar solicitud"
      />
    </>
  );
}
