
import type { CartaItem, CartaFiltrado } from "./types";

export const cartaFiltrado: CartaFiltrado = {
  pasos: [
    {
      num: "01",
      texto: "¡Pregunta por nuestros cafés de temporada y elige el que más te guste!",
    },
    {
      num: "02",
      texto: "Elige el método de filtrado en el que prepararemos tu café",
      opciones: ["Origami", "Orea", "V4", "Chemex", "Aeropress"],
    },
    {
      num: "03",
      texto: "Por último, ¿cuántas tazas deseas disfrutar?",
    },
  ],
  tamanos: [
    { nombre: "1 taza", precio: 12000 },
    { nombre: "2 tazas", precio: 22000 },
    { nombre: "3 tazas", precio: 30000 },
  ],
};

export const CARTA_NOTA_LECHE =
  "Recuerda que en todas nuestras bebidas puedes elegir leche animal o leche vegetal.";

export const carta: CartaItem[] = [

  { nombre: "Espresso", seccion: "con-cafe", precio: 5000 },
  { nombre: "Americano", seccion: "con-cafe", precio: 6000 },
  { nombre: "Campesino", seccion: "con-cafe", precio: 7000 },
  { nombre: "Macchiato", seccion: "con-cafe", precio: 7000 },
  { nombre: "Cortado", seccion: "con-cafe", precio: 7000 },
  { nombre: "Flat white", seccion: "con-cafe", precio: 8000 },
  { nombre: "Latte", seccion: "con-cafe", precio: 9000 },
  { nombre: "Capuccino", seccion: "con-cafe", precio: 9000 },
  { nombre: "Mocaccino", seccion: "con-cafe", precio: 10000 },

  { nombre: "Americano frío", seccion: "frias", precio: 8000 },
  { nombre: "Aerocano", seccion: "frias", precio: 8000 },
  { nombre: "Latte frío", seccion: "frias", precio: 15000 },
  { nombre: "Frappuccino", seccion: "frias", precio: 15000 },
  { nombre: "Cold Brew", seccion: "frias", precio: 15000 },
  { nombre: "Affogato", seccion: "frias", precio: 16000 },

  { nombre: "Cacao espumoso", seccion: "sin-cafe", precio: 9000 },
  { nombre: "Milo caliente", seccion: "sin-cafe", precio: 9000 },
  { nombre: "Té de temporada", seccion: "sin-cafe", precio: 9000 },
  { nombre: "Infusiones de frutos o tisanas", seccion: "sin-cafe", precio: 9000 },
  { nombre: "Massala chai", seccion: "sin-cafe", precio: 9000 },
  { nombre: "Massala chai latte", seccion: "sin-cafe", precio: 12000 },
  { nombre: "Matcha latte", seccion: "sin-cafe", precio: 15000 },
  { nombre: "Butterfly pea | matcha azul", seccion: "sin-cafe", precio: 15000, finDeGrupo: true },
  { nombre: "Matcha latte frío", seccion: "sin-cafe", precio: 17000 },
  { nombre: "Affogato matcha", seccion: "sin-cafe", precio: 17000 },
  { nombre: "Massala chai latte frío", seccion: "sin-cafe", precio: 17000, finDeGrupo: true },
  { nombre: "Adicional de syrope", seccion: "sin-cafe", precio: 4000 },
];
