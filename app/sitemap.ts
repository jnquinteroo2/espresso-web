import type { MetadataRoute } from "next";
import { getCafes } from "@/lib/data/cafes";

const BASE_URL = "https://espressocoffeeshop.co";

// 1 home + 6 subpáginas + detalle de café/methods-shop + legales. Nada más
// (addendum-05): Academy, Vinyl & Drinks y Roasting viven como anclas dentro
// de /nosotros, Carta como ancla dentro de /contacto — no tienen URL propia.
const STATIC_ROUTES = [
  "/",
  "/nosotros",
  "/cafe",
  "/suscripcion",
  "/methods-shop",
  "/methods-shop/metodos",
  "/methods-shop/molinos",
  "/methods-shop/tazas",
  "/methods-shop/accesorios",
  "/marcas-aliadas",
  "/contacto",
  "/legal/privacidad",
  "/legal/terminos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const cafeEntries = getCafes().map((cafe) => ({
    url: `${BASE_URL}/cafe/${cafe.slug}`,
    lastModified: cafe.fechaTueste,
  }));

  return [...staticEntries, ...cafeEntries];
}
