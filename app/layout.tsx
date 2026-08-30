import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ActiveZoneTracker } from "@/components/motion/ActiveZoneTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ESPRESSO COFFEE SHOP MOSQUERA",
    template: "%s · ESPRESSO COFFEE SHOP",
  },
  description:
    "Café de especialidad tostado propio en Mosquera, Cundinamarca. Café, goods, Espresso Academy, Vinyl & Drinks y roasting.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Espresso Coffee Shop",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Espresso Coffee Shop",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mosquera",
    addressRegion: "Cundinamarca",
    addressCountry: "CO",
  },
  servesCuisine: "Café de especialidad",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${fontVariables} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" data-theme="paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-zone-bg focus:text-zone-fg focus:px-4 focus:py-2 focus:border focus:border-zone-fg"
        >
          Saltar al contenido
        </a>
        <ActiveZoneTracker />
        <Header />
        <main id="main" className="flex-1 pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 