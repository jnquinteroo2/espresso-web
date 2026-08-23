import localFont from "next/font/local";
import { Outfit, Archivo, Source_Sans_3 } from "next/font/google";

export const fontGaret = Outfit({
  variable: "--font-garet",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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

export const fontSourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontArchivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const fontVariables = `${fontGaret.variable} ${fontDinish.variable} ${fontSourceSans.variable} ${fontArchivo.variable}`;
