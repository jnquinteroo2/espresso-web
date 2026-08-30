import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Hairline } from "@/components/primitives/Hairline";
import { Wordmark } from "@/components/brand/Wordmark";
import { IconRow } from "@/components/brand/IconRow";
import { SocialIcon, type SocialIconName } from "@/components/brand/SocialIcon";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";

const SOCIALES: { name: SocialIconName; label: string; href: string }[] = [
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/niko.carde_?igsi=ZmxzdTNoOWI0cnEz&utm_source=qr" },
  { name: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@espresso_coffeeshop?_r=1&_t=ZS-99Inl45L0B2" },
  { name: "whatsapp", label: "WhatsApp", href: "https://wa.me/573134047822" },
];

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Tienda",
    links: [
      { label: "Café", href: "/cafe" },
      { label: "Insumos", href: "/methods-shop" },
      { label: "Métodos", href: "/methods-shop/drips" },
      { label: "Accesorios", href: "/methods-shop/accesorios" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Carta", href: "/carta" },
      { label: "Contáctanos", href: "/contacto" },
      { label: "Ubicación", href: "/contacto" },
      { label: "Reserve", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/legal/privacidad" },
      { label: "Términos y condiciones", href: "/legal/terminos" },
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
          <Link
            href="/"
            aria-label="Espresso Coffee Shop — inicio"
            className="self-start hover:opacity-60 transition-opacity"
          >
            <Wordmark size="lg" />
          </Link>
          <div className="flex w-full max-w-md flex-col gap-2 md:items-end">
            <p className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em] text-zone-fg">
              Contáctanos mediante correo
            </p>
            <div className="flex w-full items-end justify-between gap-4 border-b border-zone-rule pb-2">
              <a
                href="mailto:espresso@espresso.com"
                className="font-source-sans text-[length:var(--text-body)] hover:opacity-60 transition-opacity"
              >
                espresso@espresso.com
              </a>
              <ButtonOutline as="a" href="mailto:espresso@espresso.com" size="sm">
                Enviar
              </ButtonOutline>
            </div>
          </div>
        </div>

        <Hairline />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em] text-zone-fg">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={`${l.label}-${l.href}`}>
                    <Link
                      href={l.href}
                      className="font-source-sans text-[length:var(--text-body)] hover:opacity-60 transition-opacity"
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

        <div className="flex flex-col gap-6 font-source-sans text-[length:var(--text-body)] text-zone-fg md:flex-row md:items-center md:justify-between">
          <p>Mosquera, Cundinamarca, Colombia</p>
          <p>Lunes a domingo, 10:00 a.m. – 8:00 p.m.</p>
          <p>WhatsApp: +57 313 4047 822</p>
          <div className="flex items-center gap-6">
            {SOCIALES.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:opacity-60 transition-opacity"
              >
                <SocialIcon name={s.name} decorative={false} label={s.label} />
              </a>
            ))}
          </div>
        </div>

        <IconRow withSeal={false} gap="gap-14 md:gap-24" />

        <p className="text-center font-source-sans text-[length:var(--text-micro)] tracking-[0.18em] uppercase text-zone-fg">
          © {new Date().getFullYear()} Espresso Coffee Shop. Mosquera, Colombia.
        </p>
      </Container>
    </ThemeZone>
  );
}