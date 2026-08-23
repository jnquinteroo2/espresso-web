/**
 * Enlaces de marca — logos e íconos propietarios reales del cliente.
 *
 * Reemplazan los placeholders señalados en `docs/CONTENIDO-PENDIENTE.md`
 * (bloque "Marca / assets", puntos 1-3) a partir de las correcciones del
 * 2026-08-23 (`Correcciones.pdf`). Los archivos viven en Cloudinary, no en
 * `/public` — así el cliente puede reemplazar el arte subiendo una versión
 * nueva a la misma URL, o pegando una URL nueva acá, sin tocar componentes
 * ni pasar por un deploy.
 *
 * Si el cliente entrega una versión nueva de un logo o ícono, lo único que
 * cambia es el string correspondiente en este archivo.
 */

/**
 * Los archivos exportados vienen en un "Mesa de trabajo" (artboard) de
 * 1080×1080 con el arte centrado y mucho margen transparente alrededor —
 * a tamaño de ícono de interfaz (24-40px) esa espera lo deja diminuto.
 * `e_trim` es una transformación de Cloudinary (server-side, por URL, no
 * toca el archivo original) que recorta el margen transparente. Ver nota
 * en `monograma` — un archivo no la tolera bien y se sirve sin recortar.
 */
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
  /** Wordmark "ESPRESSO / COFFEE SHOP" — trazo negro, para fondos claros. */
  wordmarkNegro: trimmed(RAW.wordmarkNegro),
  /** Wordmark "ESPRESSO / COFFEE SHOP" — trazo blanco, para fondos oscuros (ink/blue/green). */
  wordmarkBlanco: trimmed(RAW.wordmarkBlanco),
  /**
   * Sello circular completo ("MOSQUERA · ESPRESSO COFFEE SHOP" en trayectoria
   * + Ē al centro) — arte fijo en gris de marca (`--seal`, #808080), pensado
   * para leerse igual sobre cualquier fondo. Reemplaza al sello generado en
   * `CircularSeal.tsx` en el header (corrección: "logo correcto, sin sombra").
   */
  selloCircular: trimmed(RAW.selloCircular),
  /**
   * Monograma "Ē" suelto — trazo negro. Sobre zonas oscuras se invierte con
   * CSS (filter: invert, ver `.brand-invert-dark` en app/globals.css).
   * Sin `e_trim`: a diferencia de los demás archivos, este trae un
   * rectángulo de fondo dentro del propio PNG (no transparencia real) que
   * confunde el recorte automático de Cloudinary y corta la letra — se
   * sirve completo, con más margen visual que el resto de la marca.
   */
  monograma: RAW.monograma,
  /**
   * Los 4 íconos de línea propietarios, en pares blanco/negro. Nombres del
   * cliente → nombre interno (`BrandIconName` en `BrandIcon.tsx`):
   *  - "Estrella"           → estrella  (estrella de 8 puntas, trazo fino)
   *  - "Reloj"              → reloj     (reloj de arena)
   *  - "Cuadro"             → arco      (arco/portal — el cliente lo llama "cuadro")
   *  - "Estrella de puntas" → asterisco (asterisco de 8 brazos, trazo grueso)
   */
  iconos: {
    estrella: { blanco: trimmed(RAW.estrellaBlanco), negro: trimmed(RAW.estrellaNegro) },
    reloj: { blanco: trimmed(RAW.relojBlanco), negro: trimmed(RAW.relojNegro) },
    arco: { blanco: trimmed(RAW.arcoBlanco), negro: trimmed(RAW.arcoNegro) },
    asterisco: { blanco: trimmed(RAW.asteriscoBlanco), negro: trimmed(RAW.asteriscoNegro) },
  },
} as const;

export type BrandIconAssetName = keyof typeof BRAND_ASSETS.iconos;

/**
 * Corrección 2026-08-23 (segunda tanda) — imágenes de referencia (Unsplash)
 * y de marca entregadas SOLO como placeholder temporal, hasta que el
 * cliente entregue las fotos/logos reales:
 *  - `productoLote`: foto de producto para las tarjetas de "Lotes de
 *    temporada" (referencia del cliente: unsplash.com/es/fotos/paquete-de-
 *    plastico-blanco-sobre-mesa-de-madera-marron-OnvwNl5iRcY).
 *  - `methodsShopBox`: foto para las 3 cajas de "Lo que usamos en la barra"
 *    (referencia: unsplash.com/es/fotos/una-mesa-de-madera-cubierta-con-un-
 *    jarron-de-vidrio-lleno-de-agua-B7TkCflH7a8).
 *  - `suscripcionFondo`: foto de flores para el fondo de "Coffee Magazine".
 *  - `marcaLogoTemp`: un único logo temporal para las 6 marcas aliadas,
 *    hasta que lleguen los logos reales de cada una.
 * Las URLs de Unsplash son las páginas de la foto, no el archivo — se
 * resolvieron a la URL directa de CDN (images.unsplash.com) para poder
 * usarlas como <img src>.
 */
export const PLACEHOLDER_ASSETS = {
  productoLote:
    "https://images.unsplash.com/photo-1605711599412-775918dbe770?w=1200&q=80&auto=format&fit=crop",
  methodsShopBox:
    "https://images.unsplash.com/photo-1706037463912-d77e55b1ee50?w=1200&q=80&auto=format&fit=crop",
  suscripcionFondo:
    "https://res.cloudinary.com/dfkd8tzhs/image/upload/v1787505323/SCR-20260823-lawu_rifn60.png",
  marcaLogoTemp:
    "https://coffeemerch.co.uk/cdn/shop/files/timemore--Logo2.png?v=1771410246&width=2000",
} as const;
