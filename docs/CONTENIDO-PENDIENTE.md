# Contenido pendiente y decisiones de alcance

Dos categorías, no se mezclan:

- **A. Bloqueado por el cliente** — falta un archivo, un dato o una confirmación que solo el cliente puede dar. Todo lo marcado en código con `// TODO: contenido de ejemplo — reemplazar con datos reales del cliente` cae acá.
- **B. Decisiones de alcance** — cosas que estaban en la especificación original y no se construyeron por decisión mía durante la sesión, no por falta de información del cliente. Quedan pendientes de que Nicolás decida si se hacen o se dejan fuera, no de que el cliente entregue algo.

Se actualiza en cada fase.

## A. Bloqueado por el cliente

### Marca / assets

1. ~~**Iconos propietarios (arco, asterisco, reloj, estrella) — placeholder explícito.**~~ **Resuelto 2026-08-23.** El cliente entregó el arte real (`Correcciones.pdf`) — `components/brand/BrandIcon.tsx` ahora renderiza los 4 pares de PNG (blanco/negro) desde `content/brand-assets.ts` en vez de los `<path>` dibujados a mano. Ver `docs/BRAND.md` addendum-08.
2. ~~**Sello circular (`espresso-seal.svg`).**~~ **Resuelto 2026-08-23,** solo en el header. El cliente entregó el sello real como PNG — `components/layout/Header.tsx` lo usa directo (`content/brand-assets.ts`, `selloCircular`). `CircularSeal.tsx` (generado, SVG + textPath) sigue en el repo sin uso, sin borrar. Ver `docs/BRAND.md` addendum-08.
3. ~~**Wordmark original (`/brand/espresso-wordmark.svg`).**~~ **Resuelto 2026-08-23.** El cliente entregó el wordmark real como PNG (par blanco/negro) — `components/brand/Wordmark.tsx` (footer) y ahora también `components/brand/HeroWordmark.tsx` (hero) renderizan `<img>` desde `content/brand-assets.ts` en vez de tipografía en CSS. Corrección explícita posterior ("en esta parte debe ir el logo que está en el enlace [...]Web_ri48sc.png") pidió el hero también — se pierde la animación de entrada letra por letra (no aplica a un raster) a cambio del arte real.
4. **Fuente Garet Book — falta el archivo, no la licencia.** Garet es *Free For Commercial Use* (Type Forward). `lib/fonts.ts` usa Outfit como placeholder de `--font-garet` porque no se descargó el archivo en esta sesión. El cliente ya la usa en Illustrator — es la fuente más simple de conseguir de todas. Colocar `.otf`/`.ttf`/`.woff2` en `/public/fonts/garet/`, reemplazar el bloque `fontGaret` en `lib/fonts.ts` por `localFont({ src: [...] })`.
5. **Logos SVG de las 12 marcas aliadas** (`/marcas-aliadas` y `BrandOrbit` de home). Ambos renderizan el nombre de la marca en texto — no hay archivo de logo real de ninguna. Sustituir por los SVG reales cuando estén disponibles, mismo layout.

### Datos de contacto

6. ~~**Datos de contacto placeholder.**~~ **Horario y WhatsApp resueltos 2026-08-23** (`Correcciones.pdf`): horario real "Lunes a domingo, 10:00 a.m. – 8:00 p.m.", WhatsApp real `+57 313 4047 822` — actualizados en Header/NavOverlay/Footer/`/contacto`. **Sigue pendiente:** confirmar si `@espressocoffeeshop` es el handle real de Instagram, y las URLs reales de Facebook y TikTok — el footer ya muestra los 4 íconos sociales (`components/brand/SocialIcon.tsx`) pero con URLs de perfil sin confirmar (`facebook.com/espressocoffeeshop`, `instagram.com/espressocoffeeshop`, `tiktok.com/@espressocoffeeshop`).
7. ~~**Número de WhatsApp para pedidos**~~ **Resuelto 2026-08-23.** `NEXT_PUBLIC_WHATSAPP` en `.env.example` ahora es `573134047822` (el número real) — sigue habiendo que confirmar que el `.env.local` real del proyecto tenga este mismo valor, `.env.example` no se lee en runtime.
8. **Mapa de `/contacto`** — placeholder de texto ("Mapa — pendiente de dirección exacta"). Falta dirección exacta confirmada + decisión de proveedor (Google Maps/Mapbox) para el embed monocromo.
9. **Equipo de `/nosotros`** — texto genérico, sin nombres ni fotos reales (no inventados, por regla de marca de no fabricar contenido).
10. **Textos legales de `/legal/privacidad` y `/legal/terminos`** — redactados como ejemplo razonable, no son términos legales reales. Deben ser revisados por el cliente o un abogado antes de producción.

### Contenido de catálogo (`content/*.ts`)

Todo marcado con `// TODO` al inicio de cada archivo. Inventado con criterio (nombres/registro de marca, datos de café verosímiles para Huila/Nariño/Cauca/Tolima/Caldas/Quindío), no es lorem ipsum, pero **nada es real** — precios, orígenes, fincas, puntajes SCA y fechas deben confirmarse uno por uno.

11. **8 cafés** (`content/cafes.ts`): TITAN, DARTH BLACK (nombres del boceto original) + OBSIDIANA, ALTIPLANO, CRÁTER, NÓMADA, SOLSTICIO, GEISHA 1750 (inventados en el mismo registro).
12. **16 productos de Methods shop** (`content/methods-shop.ts`), 4 por categoría. Usa marcas reales de equipos de especialidad (Hario, Chemex, Kalita, AeroPress, Comandante, Timemore, Baratza, 1Zpresso, Fellow) como referencia — confirmar cuáles maneja realmente el cliente y a qué precio.
13. **Calendario de Academy** (`content/clases.ts`): 5 sábados (sept–oct 2026) con los títulos reales del prompt de marca. Fechas, cupos y precios de ejemplo.
14. **12 marcas aliadas** (`content/marcas.ts`) — confirmar cuáles son alianzas reales.
15. **2 ediciones Vinyl & Drinks** (`content/eventos.ts`): las cartas sí son las reales del prompt de marca. Fechas, cupos y extras de ejemplo.
16. **Carta de barra, 20 ítems** (`content/carta.ts`). Precios de ejemplo en COP.
17. **Imágenes de producto** — todos los `imagen`/`logo` en `content/*.ts` apuntan a rutas que no existen como archivos. `/cafe`, `/cafe/[slug]` y `/methods-shop` usan bloques de color plano / gris como placeholder honesto en vez de `<img>` rotos.

18. **Video de fondo del hero (`/`) — bloqueado, componente listo.** Confirmado por el cliente: video en loop, silenciado, lavado con velo blanco 82-88% (la zona sigue en paper, el wordmark sigue en negro — nunca la alternativa oscura). `components/sections/HeroVideoLayer.tsx` implementa toda la lógica (gating por `prefers-reduced-motion`, `Save-Data`, conexión 2g/3g, y por viewport ≥768px; `preload="none"`; `muted loop playsInline autoPlay aria-hidden tabIndex={-1}`) pero `VIDEO_SRC`/`POSTER_SRC` están en `null` — ni el video ni el poster existen todavía. Sin ellos el componente retorna `null` y el hero se ve exactamente igual que antes (puramente tipográfico). Al recibir los archivos: completar las dos constantes, nada más.
    - Specs para el archivo de video: <2MB, 8-12s, loop limpio, sin pista de audio.
    - Specs para el poster: AVIF, <40KB, mismo lavado blanco aplicado (es lo que se ve permanentemente en mobile, reduced-motion, Save-Data y conexiones 2g/3g).
    - Gate no negociable: al activarlo, re-medir LCP/CLS de `/` (ver `docs/qa/js-budget-fase4.md` para el método). Si LCP > 2.0s o CLS > 0.05, el video sale y queda solo el poster — la métrica manda sobre el efecto.

## B. Decisiones de alcance — pendientes de que Nicolás decida

Estas dos cosas estaban en la especificación original y no se construyeron. No es que falte información del cliente — es que yo corté alcance durante la sesión sin preguntar antes. Quedan explícitas acá en vez de disfrazadas de "contenido pendiente":

1. **Herramienta "¿No sabes cuál pedir?" en `/cafe`.** Quiz de 3 preguntas (método/perfil/intensidad) que devuelve 2 lotes recomendados — estaba en la especificación de `/cafe` y en los patrones adoptados de Onyx (`<adopt>` del prompt original). El FilterBar y la navegación por facetas sí quedaron completos; el quiz no. Decisión: ¿se construye en la siguiente iteración o se deja fuera definitivamente?
2. **PDF descargable de `/carta`.** La especificación pide que la carta sea descargable en PDF. No se generó — implica decidir si se genera estático en build time o bajo demanda, y con qué herramienta. Decisión: ¿se prioriza, o la carta queda solo como página web?
