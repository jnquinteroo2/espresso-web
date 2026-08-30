import type { CategoriaMethodsShop } from "./types";

function trimmed(url: string) {
  return url.replace("/image/upload/", "/image/upload/e_trim/");
}

const RAW = {
  wordmarkNegro:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Web_ri48sc.png",
  wordmarkBlanco:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Mesa_de_trabajo_1_yyot1o.png",
  selloCircular:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Mesa_de_trabajo_2_icdij9.png",
  monograma:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Mesa_de_trabajo_2_copia_3_hiarzr.png",
  estrellaBlanco:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501073/Mesa_de_trabajo_1_copia_2_lrhvcp.png",
  estrellaNegro:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501073/Mesa_de_trabajo_1_copia_cae11c.png",
  relojBlanco:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501073/Mesa_de_trabajo_3_copia_gjuoww.png",
  relojNegro:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Mesa_de_trabajo_3_ffimmf.png",
  arcoBlanco:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501073/Web_copia_2_fwweog.png",
  arcoNegro:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501073/Web_copia_xcwuiq.png",
  asteriscoBlanco:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Mesa_de_trabajo_2_copia_2_bmtvwa.png",
  asteriscoNegro:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787501072/Mesa_de_trabajo_2_copia_un3l0a.png",
} as const;

export const BRAND_ASSETS = {
  wordmarkNegro: trimmed(RAW.wordmarkNegro),
  wordmarkBlanco: trimmed(RAW.wordmarkBlanco),
  selloCircular: trimmed(RAW.selloCircular),
  monograma: RAW.monograma,
  iconos: {
    estrella: { blanco: trimmed(RAW.estrellaBlanco), negro: trimmed(RAW.estrellaNegro) },
    reloj: { blanco: trimmed(RAW.relojBlanco), negro: trimmed(RAW.relojNegro) },
    arco: { blanco: trimmed(RAW.arcoBlanco), negro: trimmed(RAW.arcoNegro) },
    asterisco: { blanco: trimmed(RAW.asteriscoBlanco), negro: trimmed(RAW.asteriscoNegro) },
  },
} as const;

export type BrandIconAssetName = keyof typeof BRAND_ASSETS.iconos;

/**
 * Fotogramas de la intro del hero, en orden de aparición. Cada uno lleva su
 * propia duración en ms, así se puede alargar o acortar uno sin tocar el
 * resto. Al terminar la secuencia queda fijo el logo (PLACEHOLDER_ASSETS.heroLogo).
 */
export type HeroIntroFrame = { src: string; ms: number };

export const HERO_INTRO_FRAMES: HeroIntroFrame[] = [
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783367/Cupping_dvywcj.png", ms: 300 },
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783365/Water_edaebh.png", ms: 300 },
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783364/vinyls_bm88yb.png", ms: 300 },
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783362/Running_ywaz9l.png", ms: 300 },
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783360/Draw_au6u9r.png", ms: 300 },
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783357/academy_ghrtl6.png", ms: 300 },
  { src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787789638/Crow_t2q1hz.png", ms: 450 },
];

/**
 * Galería de /marcas-aliadas: fotos y clips de la maquila.
 *
 * Los originales pesan entre 3 y 29 MB, así que todo se pide a Cloudinary ya
 * recortado a cuadrado y optimizado (f_auto elige webp/avif o mp4 según el
 * navegador). Los .mov originales son HEVC, que Chrome no reproduce; por eso
 * los clips se piden como .mp4 y con una imagen de portada del primer cuadro.
 */
export type MediaGaleria = { tipo: "imagen" | "video"; src: string; poster?: string };

const CLOUDINARY = "https://res.cloudinary.com/dfkd8tzhs";
const RECORTE = "f_auto,q_auto,c_fill,w_800,h_800";

const foto = (id: string): MediaGaleria => ({
  tipo: "imagen",
  src: `${CLOUDINARY}/image/upload/${RECORTE}/${id}`,
});

const clip = (id: string): MediaGaleria => ({
  tipo: "video",
  src: `${CLOUDINARY}/video/upload/${RECORTE}/${id}.mp4`,
  poster: `${CLOUDINARY}/video/upload/${RECORTE},so_0/${id}.jpg`,
});

export const MAQUILA_GALERIA: MediaGaleria[] = [
  foto("v1788055823/1_kqqdhs.webp"),
  foto("v1788055822/15_lwifm5.webp"),
  clip("v1788055302/21_ohfdvg"),
  clip("v1788055301/25_zg22uh"),
  clip("v1788055299/22_tagxd4"),
  clip("v1788055298/23_ilio6o"),
  clip("v1788055296/7_kgs4zr"),
  clip("v1788055295/6_rr0quv"),
  clip("v1788055292/24_zcccjf"),
  clip("v1788055287/9_fsdmpa"),
  foto("v1788055283/11_l2vwbo.png"),
  foto("v1788055282/8_abwmpb.png"),
  foto("v1788055281/17_okm910.png"),
  foto("v1788055280/19_mulyqd.jpg"),
  foto("v1788055279/12_tg7t7f.png"),
  foto("v1788055279/13_gvjbqg.png"),
  foto("v1788055276/5_faxk1b.jpg"),
  foto("v1788055276/2_xjuftn.jpg"),
  foto("v1788055274/14_m4y2gz.jpg"),
  foto("v1788055274/18_lfja66.jpg"),
];

/**
 * Logos de las marcas que maquilamos, en el orden en que giran en el
 * carrusel de /marcas-aliadas. Para cambiar uno se reemplaza solo su línea.
 */
export const MAQUILA_LOGOS: { nombre: string; src: string }[] = [
  { nombre: "Willys", src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788051416/Willys_lmwoqz.png" },
  { nombre: "Molino Alto", src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788051413/Molino_Alto_k1ud94.png" },
  { nombre: "Mawhi", src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788051410/Mawhi_lypd0n.png" },
  { nombre: "La Grúa", src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788051407/La_grua_z1grws.png" },
  { nombre: "La Coffitería", src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788051404/La_coffiteria_sbef2i.png" },
  { nombre: "Koffe", src: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1788051393/Koffe_iygwqb.png" },
];

/** Imagen de reserva para las categorías de la tienda que todavía no tienen foto propia. */
const METHODS_SHOP_GENERICA =
  "https://images.unsplash.com/photo-1706037463912-d77e55b1ee50?w=1200&q=80&auto=format&fit=crop";

/**
 * Una imagen por categoría de la tienda. Para cambiar cualquiera, se
 * reemplaza solo su línea; las que siguen en METHODS_SHOP_GENERICA aún no
 * tienen foto propia.
 */
export const METHODS_SHOP_CATEGORIA_IMAGEN: Record<CategoriaMethodsShop, string> = {
  molinos: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787785532/Molinos_ywkjm6.jpg",
  drips: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787785531/Drips_tfkyvi.jpg",
  accesorios: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787785530/Accesorios_q0wcxy.jpg",
  tazas: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787785533/Tazas_x0npbw.jpg",
  merch: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787789862/Merch_nucv5r.jpg",
  filtros: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787785532/Filtros_gyem8f.jpg",
};

export const PLACEHOLDER_ASSETS = {
  heroLogo:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783132/shop_kpifj9.png",
  heroFondo:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787783080/Hero_Secci%C3%B3n_rovsji.png",
  productoLote:
    "https://images.unsplash.com/photo-1605711599412-775918dbe770?w=1200&q=80&auto=format&fit=crop",
  methodsShopBox: METHODS_SHOP_GENERICA,
  suscripcionFondo:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787505323/SCR-20260823-lawu_rifn60.png",
  marcaLogoTemp:
    "https://coffeemerch.co.uk/cdn/shop/files/timemore--Logo2.png?v=1771410246&width=2000",
  suscripcionGaleria: [
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787518611/Web_copia_3_o4wnwe.png",
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787518611/Mesa_de_trabajo_1_copia_3_bmalzz.png",
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787518611/Mesa_de_trabajo_2_copia_4_mrdba3.png",
  ],
  categoriaImagen: {
    terra: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787524527/Terra_lhk2me.png",
    snow: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787524527/Snow_rceeow.png",
    sand: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787524527/Sand_vnodx1.png",
    fire: "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787524527/Fire_qh2kfd.png",
  },
} as const;
