import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Hairline } from "@/components/primitives/Hairline";
import { Wordmark } from "@/components/brand/Wordmark";
import { IconRow } from "@/components/brand/IconRow";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Tienda",
    links: [
      { label: "Coffee", href: "/cafe" },
      { label: "Methods shop", href: "/methods-shop" },
      { label: "Suscripción", href: "/suscripcion" },
      { label: "Carta", href: "/contacto#carta" },
    ],
  },
  {
    title: "Aprender",
    links: [
      { label: "Espresso Academy", href: "/nosotros#academy" },
      { label: "Roasting", href: "/nosotros#roasting" },
      { label: "Marcas aliadas", href: "/marcas-aliadas" },
    ],
  },
  {
    title: "Lugar",
    links: [
      { label: "Vinyl & Drinks", href: "/nosotros#vinyl" },
      { label: "Quiénes somos", href: "/nosotros" },
      { label: "Contáctanos", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/legal/privacidad" },
      { label: "Términos", href: "/legal/terminos" },
    ],
  },
];

export function Footer() {
  return (
    <ThemeZone theme="ink" as="footer" track aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      <Container className="py-16 md:py-24 flex flex-col gap-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Wordmark size="lg" />
          <form className="flex w-full max-w-md flex-col gap-2 md:items-end">
            <label
              htmlFor="footer-email"
              className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em] text-zone-fg"
            >
              Recibe los lotes nuevos
            </label>
            <div className="flex w-full items-end gap-4">
              <input
                id="footer-email"
                type="email"
                required
                placeholder="tu@correo.com"
                className="w-full bg-transparent border-0 border-b border-zone-rule pb-2 font-source-sans text-[length:var(--text-body)] placeholder:text-zone-fg focus-visible:outline-none focus-visible:border-zone-fg"
              />
              <ButtonOutline as="button" type="submit" size="sm">
                Enviar
              </ButtonOutline>
            </div>
          </form>
        </div>

        <Hairline />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em] text-zone-fg">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-source-sans text-[length:var(--text-label)] hover:opacity-60 transition-opacity"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Hairline />

        <div className="flex flex-col gap-6 font-source-sans text-[length:var(--text-body)] text-zone-fg md:flex-row md:justify-between">
          <p>Mosquera, Cundinamarca, Colombia</p>
          <p>Mar–dom, 7:00 a.m. – 8:00 p.m.</p>
          <p>WhatsApp: +57 313 404 7822</p>
          <a href="https://instagram.com" className="hover:opacity-60 transition-opacity">
            @espressocoffeeshop
          </a>
        </div>

        <IconRow />

        <p className="text-center font-source-sans text-[length:var(--text-micro)] tracking-[0.18em] uppercase text-zone-fg">
          © {new Date().getFullYear()} Espresso Coffee Shop. Mosquera, Colombia.
        </p>
      </Container>
    </ThemeZone>
  );
}
