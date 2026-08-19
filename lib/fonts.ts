import localFont from "next/font/local";
import { Outfit, Archivo, Source_Sans_3 } from "next/font/google";

/**
 * PRINCIPAL — placeholder. Garet Book es Free For Commercial Use (Type
 * Forward), no hay bloqueo de licencia ni depende del cliente — falta
 * descargar el archivo. Swap: reemplazar este bloque por
 * localFont({ src: "../public/fonts/garet/Garet-Book.woff2", ... }) una vez
 * el archivo esté en /public/fonts/garet/. Ver docs/CONTENIDO-PENDIENTE.md.
 */
export const fontGaret = Outfit({
  variable: "--font-garet",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** DISPLAY / DATO — DINish Bold (SIL OFL 1.1), sustituye a DIN Alternate Bold. */
export const fontDinish = localFont({
  variable: "--font-dinish",
  display: "swap",
  src: [
    {
      path: "../public/fonts/dinish/DINish-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/dinish/DINish-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

/** AUXILIAR — Source Sans 3 (SIL OFL 1.1), sustituye a Myriad Pro. */
export const fontSourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Fallback de --fs-numeral cuando DINish no carga. */
export const fontArchivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const fontVariables = `${fontGaret.variable} ${fontDinish.variable} ${fontSourceSans.variable} ${fontArchivo.variable}`;
