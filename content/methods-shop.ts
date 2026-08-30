
import type { MethodsShopItem } from "./types";

/**
 * Cada ítem lleva su propia foto en el campo `imagen`, así se reemplazan de a
 * una sin tocar el resto del catálogo. Las fotos son verticales 3:4, que es la
 * proporción de la tarjeta (aspect-3/4 en MethodsShopCard).
 */

export const methodsShopItems: MethodsShopItem[] = [

  {
    slug: "timemore-chestnut-s3",
    nombre: "Chestnut S3",
    marca: "Timemore",
    categoria: "molinos",
    precio: 675000,
    colores: ["Negro", "Verde militar"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057146/S3_sh8qv3.jpg",
    descripcion:
      "Diseñado alrededor de las muelas S2C890 de Timemore, el Chestnut S3 es sinónimo de precisión. Del anillo de ajuste externo —similar al de una lente— al nuevo sistema de muelas extraíbles, le aporta una claridad y una complejidad nuevas a tu café.",
    stock: true,
  },
  {
    slug: "timemore-chestnut-c3s",
    nombre: "Chestnut C3s",
    marca: "Timemore",
    categoria: "molinos",
    precio: 375000,
    colores: ["Negro", "Blanco"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057152/C3s_r8rkxf.jpg",
    descripcion:
      "Serie C3. Cuerpo unibody todo en metal y muelas de acero inoxidable de 38 mm. Compacto y listo para viajar, cubre todo el rango: de espresso a prensa francesa.",
    stock: true,
  },

  {
    slug: "origami-drip-air-s",
    nombre: "Origami Drip AIR S",
    marca: "Origami",
    categoria: "drips",
    precio: 150000,
    colores: ["Clear", "Matte Black", "Matte Green"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057147/Origami_qgmgue.jpg",
    descripcion:
      "Dripper en resina AS: liviano, resistente a los golpes y fácil de llevar. Sus 20 nervaduras dejan un espacio entre el dripper y el papel para que el agua fluya parejo, lo que permite controlar la velocidad de extracción con libertad. A diferencia de la porcelana, la resina no enfría el agua, así que sostiene mejor la temperatura durante la extracción. Para 1 o 2 tazas.",
    stock: true,
  },
  {
    slug: "chemex-6-tazas",
    nombre: "Cafetera Chemex 6 tazas",
    marca: "Chemex",
    categoria: "drips",
    precio: 300000,
    colores: ["Clear"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057151/Chemex_dspfma.jpg",
    descripcion: "Cafetera Chemex de 6 tazas.",
    stock: true,
  },
  {
    slug: "aeropress-clear-colors",
    nombre: "AeroPress Clear & Colors",
    marca: "AeroPress",
    categoria: "drips",
    precio: 150000,
    colores: ["Clear", "Black", "Azul", "Verde", "Rosa", "Púrpura"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057155/Aeropress_upkic2.jpg",
    descripcion:
      "Un nuevo estándar de sabor. Su método 3 en 1 acelera la extracción: menos amargor y una taza más suave y con más cuerpo.",
    stock: true,
  },
  {
    slug: "orea-drip-v4-black",
    nombre: "Orea Drip V4 Black",
    marca: "Orea",
    categoria: "drips",
    precio: 310000,
    colores: ["Black"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057148/Orea_V4_ol5nsr.jpg",
    descripcion:
      "Cafetera modular y versátil que prepara hasta dos tazas. Sus cuatro bases son compatibles con una gran variedad de filtros y accesorios, lo que abre muchísimas posibilidades de preparación. La mayoría de las guías de OREA se basan en sus papeles Wave, Flat o Sibarist.",
    stock: true,
  },
  {
    slug: "timemore-crystal-eye-turbo",
    nombre: "Crystal Eye Turbo Dripper",
    marca: "Timemore",
    categoria: "drips",
    precio: 80000,
    colores: ["Clean"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057156/Crystal_Eye_chkkcg.jpg",
    descripcion:
      "Un clásico redefinido, en tres capas: la de sellado maximiza el contacto con el filtro para un cierre firme, la de flujo garantiza un caudal parejo y constante, y la de café promueve una extracción uniforme. Suma canales de aire superiores y nervaduras inferiores cruzadas. En Tritan de grado alimenticio: transparente, liviano, resistente y con buena tolerancia al calor.",
    stock: true,
  },
  {
    slug: "timemore-crystal-eye-b75",
    nombre: "Crystal Eye B75 Dripper",
    marca: "Timemore",
    categoria: "drips",
    precio: 130000,
    colores: ["Clean"],
    imagen:
      "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788057154/B75_rwxsac.jpg",
    descripcion: "Información pendiente.",
    stock: true,
  },
];
