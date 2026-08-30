import type { MetadataRoute } from "next";

// Requerido por `output: export`: sin esto el build estático falla.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide"],
    },
    sitemap: "https://espressocol.com/sitemap.xml",
  };
}
