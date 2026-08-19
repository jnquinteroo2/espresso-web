import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/academy", destination: "/nosotros#academy", permanent: true },
      { source: "/academy/:clase*", destination: "/nosotros#academy", permanent: true },
      { source: "/nosotros/academy", destination: "/nosotros#academy", permanent: true },
      { source: "/nosotros/academy/:clase*", destination: "/nosotros#academy", permanent: true },
      { source: "/vinyl-and-drinks", destination: "/nosotros#vinyl", permanent: true },
      { source: "/nosotros/vinyl-and-drinks", destination: "/nosotros#vinyl", permanent: true },
      { source: "/roasting", destination: "/nosotros#roasting", permanent: true },
      { source: "/carta", destination: "/contacto#carta", permanent: true },
      { source: "/goods", destination: "/methods-shop", permanent: true },
      { source: "/goods/:categoria*", destination: "/methods-shop/:categoria*", permanent: true },
    ];
  },
};

export default nextConfig;
