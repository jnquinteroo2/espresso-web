import type { MetadataRoute } from "next";
import { getCafes } from "@/lib/data/cafes";

const BASE_URL = "https:

const STATIC_ROUTES = [
  "/",
  "/nosotros",
  "/cafe",
  "/suscripcion",
  "/methods-shop",
  "/methods-shop/molinos",
  "/methods-shop/drips",
  "/methods-shop/accesorios",
  "/methods-shop/merch",
  "/methods-shop/tazas",
  "/methods-shop/bolsas",
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
