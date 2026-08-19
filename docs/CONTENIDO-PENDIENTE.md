# Contenido pendiente y decisiones de alcance

Dos categorías, no se mezclan:

- **A. Bloqueado por el cliente** — falta un archivo, un dato o una confirmación que solo el cliente puede dar. Todo lo marcado en código con `// TODO: contenido de ejemplo — reemplazar con datos reales del cliente` cae acá.
- **B. Decisiones de alcance** — cosas que estaban en la especificación original y no se construyeron por decisión mía durante la sesión, no por falta de información del cliente. Quedan pendientes de que Nicolás decida si se hacen o se dejan fuera, no de que el cliente entregue algo.

Se actualiza en cada fase.

## A. Bloqueado por el cliente

### Marca / assets

1. **Iconos propietarios (arco, asterisco, reloj, estrella) — placeholder explícito.** `components/brand/BrandIcon.tsx` marca con `// TODO` que los 4 `<path>` son una interpretación propia dibujada a partir de la descripción del manual de marca — no son los SVG originales del cliente (no se tuvo acceso a los archivos fuente). Cuando lleguen los originales: reemplazar únicamente el atributo `d` de cada path, manteniendo `viewBox="0 0 24 24"`, `stroke="currentColor"` y el resto de la API del componente (props `name`/`size`, stroke-width por tramo).
2. **Sello circular (`espresso-seal.svg`).** Misma situación que los iconos — hoy el sello se genera en `components/brand/CircularSeal.tsx` (SVG + textPath, sin archivo estático). Si el cliente prefiere el asset original, se sustituye ahí.
3. **Wordmark original (`/brand/espresso-wordmark.svg`).** No se creó como archivo de imagen — se renderiza tipográficamente (`components/brand/Wordmark.tsx`), hereda color de zona. Si el cliente prefiere el SVG original del manual, se sustituye el componente por `<Image>`.
4. **Fuente Garet Book — falta el archivo, no la licencia.** Garet es *Free For Commercial Use* (Type Forward). `lib/fonts.ts` usa Outfit como placeholder de `--font-garet` porque no se descargó el archivo en esta sesión. El cliente ya la usa en Illustrator — es la fuente más simple de conseguir de todas. Colocar `.otf`/`.ttf`/`.woff2` en `/public/fonts/garet/`, reemplazar el bloque `fontGaret` en `lib/fonts.ts` por `localFont({ src: [...] })`.
5. **Logos SVG de las 12 marcas aliadas** (`/marcas-aliadas` y `BrandOrbit` de home). Ambos renderizan el nombre de la marca en texto — no hay archivo de logo real de ninguna. Sustituir por los SVG reales cuando estén disponibles, mismo layout.

### Datos de contacto

6. **Datos de contacto placeholder.** Header/NavOverlay/Footer/`/contacto` usan `+57 300 000 0000`, horario "Mar–dom, 7:00 a.m. – 8:00 p.m." y `@espressocoffeeshop`. Confirmar horario real, WhatsApp real e Instagram real — un cambio, se usa en todos lados.
7. **Número de WhatsApp para pedidos** (`NEXT_PUBLIC_WHATSAPP`, ver `.env.example`) — placeholder `573000000000`. Sin el número real, el botón de pedido en cada página apunta a un número inexistente. Bloqueante para producción.
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
