import type { Metadata } from "next";
import Link from "next/link";
import { ThemeZone } from "@/components/primitives/ThemeZone";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { MicroLabel } from "@/components/primitives/MicroLabel";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Hairline } from "@/components/primitives/Hairline";
import { ButtonOutline } from "@/components/primitives/ButtonOutline";
import { RibbonTag } from "@/components/primitives/RibbonTag";
import { DrinkIcon } from "@/components/brand/DrinkIcon";
import { BlurEcho } from "@/components/brand/BlurEcho";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { getClases } from "@/lib/data/clases";
import { getEventos } from "@/lib/data/eventos";
import { getWhatsAppUrl, buildAcademyMessage, buildVinylMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Espresso Coffee Shop — tostador y café de especialidad en Mosquera, Cundinamarca. Espresso Academy, Vinyl & Drinks y Roasting.",
};

const PROYECTOS = [
  { num: "01", nombre: "Espresso Academy", desc: "Master Class Mosquera, todos los sábados.", href: "#academy" },
  { num: "02", nombre: "Vinyl & Drinks", desc: "Noches de vinilo, coctelería de autor, vinos y pastelería.", href: "#vinyl" },
  { num: "03", nombre: "Roasting", desc: "Cómo tostamos: del verde a la taza.", href: "#roasting" },
];

const VALORES: { icon: BrandIconName; titulo: string; desc: string }[] = [
  {
    icon: "asterisco",
    titulo: "Trazabilidad",
    desc: "Cada lote lleva su origen, su altura y su fecha de tueste. Lo que no podemos rastrear, no lo vendemos.",
  },
  {
    icon: "reloj",
    titulo: "Proceso",
    desc: "Perfilamos y catamos cada tueste antes de venderlo. El puntaje es de catación de control, no de etiqueta.",
  },
  {
    icon: "arco",
    titulo: "Barrio",
    desc: "Un solo local en Mosquera. Preferimos hacerlo bien acá antes que abrir en otro lado.",
  },
];

const AREAS_ACADEMY: { area: string; icon: BrandIconName; label: string }[] = [
  { area: "barismo", icon: "reloj", label: "Barismo" },
  { area: "latte-art", icon: "asterisco", label: "Latte Art" },
  { area: "sensorial", icon: "estrella", label: "Sensory Skills" },
  { area: "filtrado", icon: "arco", label: "Métodos de filtrado" },
];

const PASOS_ROASTING = [
  {
    num: "01",
    title: "Recepción del verde",
    desc: "Compramos por lote y registramos finca, altura, variedad, proceso y fecha de compra antes de que entre a bodega.",
  },
  {
    num: "02",
    title: "Perfilado",
    desc: "Cada lote se perfila y se cata antes de salir a la venta. Registramos curva de tueste, temperatura de carga y de descarga, y tiempo total.",
  },
  {
    num: "03",
    title: "Control",
    desc: "Catación de control por lote contra un puntaje mínimo. Lo que no llega al puntaje no sale a la venta ni a la barra.",
  },
];

const TRAZABILIDAD = [
  "País, región, finca o asociación y productor de cada lote.",
  "Altura, variedad y proceso registrados desde la compra del verde.",
  "Fecha de tueste y nivel de tueste visibles en cada ficha de producto.",
  "Puntaje SCA de catación de control, no de marketing.",
];

function courseJsonLd(clase: ReturnType<typeof getClases>[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: clase.titulo,
    description: clase.descripcion,
    provider: { "@type": "Organization", name: "Espresso Coffee Shop", sameAs: "https://schema.org" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      startDate: clase.fecha,
      location: { "@type": "Place", name: "Espresso Coffee Shop", address: "Mosquera, Cundinamarca, Colombia" },
    },
    offers: {
      "@type": "Offer",
      price: clase.precio,
      priceCurrency: "COP",
      availability: "https://schema.org",
    },
  };
}

function eventJsonLd(evento: ReturnType<typeof getEventos>[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.titulo,
    startDate: evento.fecha,
    location: { "@type": "Place", name: "Espresso Coffee Shop", address: "Mosquera, Cundinamarca, Colombia" },
    eventAttendanceMode: "https://schema.org",
    eventStatus: "https://schema.org",
    organizer: { "@type": "Organization", name: "Espresso Coffee Shop" },
  };
}

export default function NosotrosPage() {
  const clases = getClases();
  const mesActual = clases[0]?.mes ?? "";
  const [proximoEvento, siguienteEvento] = getEventos();

  return (
    <ThemeZone theme="paper" as="div" track>
      {clases.map((clase) => (
        <script
          key={clase.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(clase)) }}
        />
      ))}
      {getEventos().map((evento) => (
        <script
          key={evento.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(evento)) }}
        />
      ))}

      <Section className="!pb-12">
        <Container className="max-w-3xl flex flex-col gap-6">
          <MicroLabel>Quiénes somos</MicroLabel>
          <DisplayTitle level={1} className="text-[clamp(40px,6vw,72px)]">
            Espresso Coffee Shop
          </DisplayTitle>
          <p className="font-source-sans text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)] max-w-prose">
            Empezamos como tostador en Mosquera, Cundinamarca. Tostamos, servimos y enseñamos café de especialidad en el mismo local — sin franquicias ni sucursales.
          </p>
          <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] max-w-prose">
            La barra, la Academy y Vinyl & Drinks funcionan bajo la misma idea: mostrar el proceso completo, del grano verde a la taza, y dejar que el dato hable en vez del adjetivo.
          </p>
        </Container>
      </Section>

      <ThemeZone theme="beige" as="section" track>
        <Section>
          <Container className="max-w-3xl mx-auto flex flex-col gap-8">
            <MicroLabel numeral="01">Nuestros proyectos</MicroLabel>
            <Hairline />
            {PROYECTOS.map((p) => (
              <div key={p.num}>
                <a href={p.href} className="group grid grid-cols-[auto_1fr] gap-6 py-6 hover:opacity-70 transition-opacity">
                  <span className="font-dinish text-[length:var(--text-numeral)] leading-none">{p.num}</span>
                  <div className="flex flex-col gap-2">
                    <span className="font-garet text-[length:var(--text-h3)]">{p.nombre}</span>
                    <span className="font-source-sans text-[length:var(--text-body)] text-zone-fg/80 max-w-prose">
                      {p.desc}
                    </span>
                  </div>
                </a>
                <Hairline />
              </div>
            ))}
          </Container>
        </Section>
      </ThemeZone>

      <Section id="academy" className="scroll-mt-[72px] flex flex-col items-center gap-8 text-center !pb-16">
        <BrandIcon name="estrella" size={80} decorative={false} label="Espresso Academy — Master Class Mosquera, todos los sábados" />
        <h2 className="sr-only">Espresso Academy</h2>
      </Section>

      <div className="border-y border-zone-rule">
        <Container className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:gap-6 font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em]">
          <span>Versión {mesActual}</span>
          <span>Cupos limitados con pre-inscripción</span>
          <span>Sábados de 8:00 a 10:30 a.m.</span>
          <span>Mosquera, Cundinamarca</span>
        </Container>
      </div>

      <Section>
        <Container className="max-w-4xl mx-auto">
          <h3 className="sr-only">Calendario de clases</h3>
          <Hairline />
          {clases.map((clase) => (
            <div key={clase.slug} className="relative grid grid-cols-[auto_1fr] gap-6 py-10 md:gap-10">
              {clase.invitadoEspecial && <RibbonTag text="Invitado especial" />}
              <div className="flex flex-col items-start">
                <span className="font-dinish text-[length:var(--text-numeral)] leading-none">{clase.dia}</span>
                <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg">
                  {clase.mes}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-garet text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)]">
                  {clase.titulo}
                </h4>
                <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] max-w-prose">
                  {clase.descripcion}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-1">
                  <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em] text-zone-fg">
                    {clase.cupos} cupos
                  </span>
                  <ButtonOutline
                    as="a"
                    href={getWhatsAppUrl(buildAcademyMessage(clase))}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Reservar cupo
                  </ButtonOutline>
                </div>
              </div>
              <Hairline className="col-span-2 absolute -bottom-px inset-x-0" />
            </div>
          ))}
        </Container>
      </Section>

      <ThemeZone theme="beige" as="div" track>
        <Section>
          <Container className="flex flex-col gap-12">
            <MicroLabel numeral="02">Áreas</MicroLabel>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {AREAS_ACADEMY.map((a) => (
                <div key={a.area} className="flex flex-col items-center gap-4 text-center">
                  <BrandIcon name={a.icon} size={32} decorative={false} label={a.label} />
                  <span className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
                    {a.label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </ThemeZone>

      <ThemeZone theme="ink" as="section" track id="vinyl" className="scroll-mt-[72px]">
        <Section minHeight className="flex flex-col items-center justify-center gap-8 text-center">
          <Container className="flex flex-col items-center gap-6">
            <h2 className="font-garet font-normal lowercase tracking-[-0.01em] text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)]">
              <BlurEcho blur={20} offset={10} opacity={0.5}>
                vinyl &amp; drinks<sup className="text-[0.3em] align-super ml-1">®</sup>
              </BlurEcho>
            </h2>
            <p className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.18em]">
              {proximoEvento.genero} — {proximoEvento.horario}
            </p>
          </Container>
        </Section>

        <div className="border-y border-zone-rule">
          <Container className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.26em]">
            <span>{proximoEvento.fecha}</span>
            <span>Reserva tu mesa al DM</span>
            <span>Cupos limitados</span>
            <span>
              <span aria-hidden="true" className="text-wine mr-1">+</span>
              {proximoEvento.extras[0].replace(/^\+/, "")}
            </span>
          </Container>
        </div>

        <Section>
          <Container className="flex flex-col gap-12">
            <div className="text-center flex flex-col items-center gap-3">
              <MicroLabel numeral="01">{proximoEvento.edicion}</MicroLabel>
              <h3 className="font-garet text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
                {proximoEvento.titulo}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
              {proximoEvento.carta.map((item) => (
                <div key={item.nombre} className="flex flex-col items-center gap-3 text-center">
                  <DrinkIcon name={item.icono} size={44} decorative={false} label={item.nombre} />
                  <span className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em]">
                    {item.nombre}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {proximoEvento.extras.map((extra) => (
                <span key={extra} className="font-source-sans text-[length:var(--text-label)] uppercase tracking-[0.14em]">
                  <span aria-hidden="true" className="text-wine mr-1">+</span>
                  {extra.replace(/^\+/, "")}
                </span>
              ))}
            </div>

            <ButtonOutline
              as="a"
              href={getWhatsAppUrl(buildVinylMessage(proximoEvento))}
              target="_blank"
              rel="noopener noreferrer"
              className="self-center"
            >
              Reservar por WhatsApp
            </ButtonOutline>
          </Container>
        </Section>

        {siguienteEvento && (
          <Section className="!pt-0">
            <Container>
              <div className="relative border border-zone-rule p-8 md:p-12 flex flex-col items-center gap-4 text-center">
                <RibbonTag text="Próxima edición" />
                <MicroLabel numeral="02">{siguienteEvento.edicion}</MicroLabel>
                <h4 className="font-garet text-[length:var(--text-h3)]">{siguienteEvento.titulo}</h4>
                <p className="font-source-sans text-[length:var(--text-body)] text-zone-fg/70">
                  {siguienteEvento.fecha} · {siguienteEvento.horario} · {siguienteEvento.genero}
                </p>
              </div>
            </Container>
          </Section>
        )}
      </ThemeZone>

      <ThemeZone theme="green" as="section" track id="roasting" className="scroll-mt-[72px]">
        <Section className="flex flex-col items-center gap-10 text-center !pb-12">
          <BrandIcon name="reloj" size={80} decorative={false} label="Roasting — Espresso Coffee Shop" />
          <Container className="flex flex-col items-center gap-4">
            <MicroLabel numeral="03">Roasting</MicroLabel>
            <h2 className="font-garet text-[length:var(--text-h1)] leading-[0.95] text-[clamp(40px,6vw,72px)]">
              Tostamos acá
            </h2>
          </Container>
        </Section>

        <Section className="!pt-0">
          <Container className="max-w-3xl mx-auto">
            <Hairline />
            {PASOS_ROASTING.map((paso) => (
              <div key={paso.num} className="grid grid-cols-[auto_1fr] gap-6 py-10">
                <span className="font-dinish text-[length:var(--text-numeral)] leading-none">{paso.num}</span>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="font-garet text-[length:var(--text-h3)]">{paso.title}</h3>
                  <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] max-w-prose">
                    {paso.desc}
                  </p>
                </div>
                <Hairline className="col-span-2" />
              </div>
            ))}
          </Container>
        </Section>

        <ThemeZone theme="beige" as="div" track>
          <Section>
            <Container className="max-w-2xl mx-auto flex flex-col gap-6">
              <MicroLabel numeral="04">Trazabilidad</MicroLabel>
              <p className="font-source-sans text-[length:var(--text-lead)] leading-[var(--text-lead--line-height)]">
                Qué publicamos de cada lote y por qué.
              </p>
              <Hairline />
              <ul className="flex flex-col">
                {TRAZABILIDAD.map((item) => (
                  <li key={item}>
                    <p className="font-source-sans text-[length:var(--text-body)] py-4">{item}</p>
                    <Hairline />
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        </ThemeZone>
      </ThemeZone>

      <ThemeZone theme="beige" as="section" track>
        <Section>
          <Container className="flex flex-col gap-12">
            <MicroLabel numeral="05">Valores</MicroLabel>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {VALORES.map((v) => (
                <div key={v.titulo} className="flex flex-col gap-4">
                  <BrandIcon name={v.icon} size={28} decorative={false} label={v.titulo} />
                  <h2 className="font-garet text-[length:var(--text-h3)]">{v.titulo}</h2>
                  <p className="font-source-sans text-[length:var(--text-body)] text-zone-fg/80">{v.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </ThemeZone>

      <Section>
        <Container className="max-w-2xl flex flex-col gap-4">
          <MicroLabel numeral="06">Equipo</MicroLabel>
          <p className="font-source-sans text-[length:var(--text-body)] leading-[var(--text-body--line-height)] max-w-prose">
            El equipo de barra, tueste y Academy trabaja desde el mismo local en Mosquera. Perfil de cada integrante pendiente de confirmar con el cliente.
          </p>
        </Container>
      </Section>
    </ThemeZone>
  );
}