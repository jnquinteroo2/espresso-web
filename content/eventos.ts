
import type { EventoVinyl } from "./types";

export const eventos: EventoVinyl[] = [
  {
    slug: "vinyl-drinks-edicion-viche",
    fecha: "2026-09-11",
    titulo: "Vinyl & Drinks — Edición Viche",
    genero: "Salsa y son",
    horario: "8:00 p.m. – 12:00 a.m.",
    cupos: 40,
    extras: ["+Cóctel de bienvenida", "+DJ set en vivo de vinilo"],
    edicion: "EDICIÓN VICHE",
    carta: [
      { nombre: "Espresso Martini con Viche", icono: "copa-martini" },
      { nombre: "Tamarindo Spicy Intenso", icono: "tiki" },
      { nombre: "Fiero Spritz Elegante", icono: "copa-spritz" },
      { nombre: "Deli", icono: "queso" },
    ],
  },
  {
    slug: "vinyl-drinks-edicion-vinos",
    fecha: "2026-10-09",
    titulo: "Vinyl & Drinks — Edición Vinos",
    genero: "Soul, blues y jazz",
    horario: "8:00 p.m. – 12:00 a.m.",
    cupos: 40,
    extras: ["+Tapas de bienvenida", "+Cata dirigida"],
    edicion: "EDICIÓN VINOS",
    carta: [
      { nombre: "Focaccia pesto y parmesano", icono: "queso" },
      { nombre: "Tabla de quesos madurados", icono: "queso" },
      { nombre: "Peras al vino con crema y pistacho", icono: "pera" },
      { nombre: "Vino tinto — Chile / Argentina", icono: "copa-vino" },
      { nombre: "Vino blanco — Italia / Francia", icono: "copa-vino" },
      { nombre: "Vino sorpresa — Edición Espresso", icono: "copa-vino" },
    ],
  },
];
