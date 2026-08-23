
import type { CartaItem } from "./types";

export const carta: CartaItem[] = [

  { nombre: "Espresso sencillo", seccion: "espresso", precio: 5000 },
  { nombre: "Espresso doble", seccion: "espresso", precio: 7000 },
  { nombre: "Ristretto", seccion: "espresso", precio: 6000 },
  { nombre: "Macchiato", seccion: "espresso", precio: 8000 },

  { nombre: "V60", seccion: "metodos", precio: 12000, descripcion: "Café del lote de la semana" },
  { nombre: "Chemex", seccion: "metodos", precio: 14000 },
  { nombre: "Prensa francesa", seccion: "metodos", precio: 11000 },

  { nombre: "Cold Brew", seccion: "frios", precio: 12000 },
  { nombre: "Tonic Coffee", seccion: "frios", precio: 14000 },
  { nombre: "Affogato", seccion: "frios", precio: 13000 },
  { nombre: "Frappé Espresso", seccion: "frios", precio: 15000 },

  { nombre: "Cappuccino", seccion: "con-leche", precio: 9000 },
  { nombre: "Latte", seccion: "con-leche", precio: 10000 },
  { nombre: "Flat White", seccion: "con-leche", precio: 10000 },
  { nombre: "Mocha", seccion: "con-leche", precio: 12000 },
  { nombre: "Chai Latte", seccion: "con-leche", precio: 11000 },

  { nombre: "Croissant", seccion: "pasteleria", precio: 8000 },
  { nombre: "Brownie", seccion: "pasteleria", precio: 9000 },
  { nombre: "Torta de zanahoria", seccion: "pasteleria", precio: 10000 },
  { nombre: "Galleta de avena", seccion: "pasteleria", precio: 6000 },
];
