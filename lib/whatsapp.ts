import type { Clase, EventoVinyl } from "@/content/types";
import type { OrderItem } from "@/lib/store/order";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? "573134047822";

/** Dominio que se firma al pie de los mensajes de WhatsApp. */
const SITIO = "espressocol.com";

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildOrderMessage(
  items: OrderItem[],
  datos?: { nombre: string; direccion: string },
): string {
  const lines = items.map((item) => {
    const subtotal = item.precioUnitario * item.cantidad;
    const detalle = item.detalle ? ` - ${item.detalle}` : "";
    return `• ${item.nombre}${detalle} x ${item.cantidad} - ${formatCOP(subtotal)}`;
  });
  const total = items.reduce((sum, i) => sum + i.precioUnitario * i.cantidad, 0);

  return [
    "Hola ESPRESSO quiero hacer un pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCOP(total)}`,
    "",
    `Mi nombre: ${datos?.nombre ?? ""}`.trimEnd(),
    `Dirección de entrega: ${datos?.direccion ?? ""}`.trimEnd(),
    "",
    `(Pedido generado desde ${SITIO})`,
  ].join("\n");
}

export function buildSubscriptionMessage(config: {
  metodo: string;
  perfil: string;
  frecuencia: string;
  gramaje: string;
  precio: number;
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
}): string {
  return [
    "Hola ESPRESSO quiero suscribirme a Coffee Magazine:",
    "",
    `• Preparo en: ${config.metodo}`,
    `• Perfil: ${config.perfil}`,
    `• Frecuencia: ${config.frecuencia}`,
    `• Cantidad: ${config.gramaje}`,
    `• Precio: ${formatCOP(config.precio)}`,
    "",
    `Nombre: ${config.nombre}`,
    `Correo: ${config.correo}`,
    `Dirección de entrega: ${config.direccion}`,
    `Teléfono: ${config.telefono}`,
    "",
    `(Suscripción generada desde ${SITIO})`,
  ].join("\n");
}

export function buildMaquilaMessage(data: {
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
}): string {
  return [
    "Hola ESPRESSO quiero maquilar con ustedes:",
    "",
    `Nombre / marca: ${data.nombre}`,
    `Correo: ${data.correo}`,
    `Dirección: ${data.direccion}`,
    `Teléfono: ${data.telefono}`,
    "",
    `(Solicitud de maquila generada desde ${SITIO})`,
  ].join("\n");
}

export function buildAcademyMessage(clase: Clase, cupos = 1): string {
  return [
    "Hola ESPRESSO quiero reservar cupo en Espresso Academy:",
    "",
    `• Clase: ${clase.titulo}`,
    `• Fecha: ${clase.dia} de ${clase.mes}`,
    `• Cupos: ${cupos}`,
    `• Precio: ${formatCOP(clase.precio * cupos)}`,
    "",
    "Mi nombre:",
    "",
    `(Reserva generada desde ${SITIO})`,
  ].join("\n");
}

export function buildVinylMessage(evento: EventoVinyl, personas = 2): string {
  return [
    "Hola ESPRESSO quiero reservar mesa en Vinyl & Drinks:",
    "",
    `• Edición: ${evento.titulo}`,
    `• Fecha: ${evento.fecha}`,
    `• Personas: ${personas}`,
    "",
    "Mi nombre:",
    "",
    `(Reserva generada desde ${SITIO})`,
  ].join("\n");
}