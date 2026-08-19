import type { Clase, EventoVinyl } from "@/content/types";
import type { OrderItem } from "@/lib/store/order";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "";

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Construye la URL wa.me — aislado del resto de la lógica para poder cambiar de adaptador de checkout en el futuro sin tocar UI. */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildOrderMessage(items: OrderItem[]): string {
  const lines = items.map((item) => {
    const subtotal = item.precioUnitario * item.cantidad;
    const detalle = item.detalle ? ` — ${item.detalle}` : "";
    return `• ${item.nombre}${detalle} × ${item.cantidad} — ${formatCOP(subtotal)}`;
  });
  const total = items.reduce((sum, i) => sum + i.precioUnitario * i.cantidad, 0);

  return [
    "Hola ESPRESSO ☕ quiero hacer un pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCOP(total)}`,
    "",
    "Mi nombre:",
    "Dirección de entrega:",
    "",
    "(Pedido generado desde espressocoffeeshop.co)",
  ].join("\n");
}

export function buildSubscriptionMessage(config: {
  metodo: string;
  perfil: string;
  frecuencia: string;
  precio: number;
}): string {
  return [
    "Hola ESPRESSO ☕ quiero suscribirme a Coffee Magazine:",
    "",
    `• Preparo en: ${config.metodo}`,
    `• Perfil: ${config.perfil}`,
    `• Frecuencia: ${config.frecuencia}`,
    `• Precio: ${formatCOP(config.precio)}`,
    "",
    "Mi nombre:",
    "Dirección de entrega:",
    "",
    "(Suscripción generada desde espressocoffeeshop.co)",
  ].join("\n");
}

export function buildAcademyMessage(clase: Clase, cupos = 1): string {
  return [
    "Hola ESPRESSO ☕ quiero reservar cupo en Espresso Academy:",
    "",
    `• Clase: ${clase.titulo}`,
    `• Fecha: ${clase.dia} de ${clase.mes}`,
    `• Cupos: ${cupos}`,
    `• Precio: ${formatCOP(clase.precio * cupos)}`,
    "",
    "Mi nombre:",
    "",
    "(Reserva generada desde espressocoffeeshop.co)",
  ].join("\n");
}

export function buildVinylMessage(evento: EventoVinyl, personas = 2): string {
  return [
    "Hola ESPRESSO ☕ quiero reservar mesa en Vinyl & Drinks:",
    "",
    `• Edición: ${evento.titulo}`,
    `• Fecha: ${evento.fecha}`,
    `• Personas: ${personas}`,
    "",
    "Mi nombre:",
    "",
    "(Reserva generada desde espressocoffeeshop.co)",
  ].join("\n");
}
