import type { NextConfig } from "next";

/**
 * `npm run build:static` pone EXPORT=1 y genera la carpeta out/ para subir a
 * Hostinger. Fuera de ese modo el proyecto se comporta como siempre (next dev
 * y next build normales), así no se pierde la opción de desplegar en un
 * servidor Node más adelante.
 */
const exportEstatico = process.env.EXPORT === "1";

const nextConfig: NextConfig = {
  ...(exportEstatico
    ? {
        output: "export" as const,
        // Cada ruta queda como carpeta con index.html, que es lo que Apache
        // sirve sin necesidad de reescrituras.
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  // Orígenes permitidos para los recursos de /_next en desarrollo:
  // la IP de la red local y los túneles (ngrok) usados para probar en móvil.
  allowedDevOrigins: [
    "192.168.100.119",
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.trycloudflare.com",
  ],
  async redirects() {
    return [
      { source: "/academy", destination: "/nosotros#academy", permanent: true },
      { source: "/academy/:clase*", destination: "/nosotros#academy", permanent: true },
      { source: "/nosotros/academy", destination: "/nosotros#academy", permanent: true },
      { source: "/nosotros/academy/:clase*", destination: "/nosotros#academy", permanent: true },
      { source: "/vinyl-and-drinks", destination: "/nosotros#vinyl", permanent: true },
      { source: "/nosotros/vinyl-and-drinks", destination: "/nosotros#vinyl", permanent: true },
      { source: "/roasting", destination: "/nosotros#roasting", permanent: true },
      { source: "/contacto/carta", destination: "/carta", permanent: true },
      { source: "/methods-shop/bolsas", destination: "/methods-shop/filtros", permanent: true },
      { source: "/goods", destination: "/methods-shop", permanent: true },
      { source: "/goods/:categoria*", destination: "/methods-shop/:categoria*", permanent: true },
    ];
  },
};

export default nextConfig;
