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
