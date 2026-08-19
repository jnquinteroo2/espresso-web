# ARQUITECTURA — Espresso Coffee Shop

Fase 7 (`<skill id="graphify">` del prompt original). Generado a partir de `graphify-out/GRAPH_REPORT.md` (grafo de 1924 nodos / 3238 aristas / 184 comunidades sobre todo el repo) más lectura directa del código para las partes que el grafo no puede juzgar (flujo de negocio, deuda técnica intencional). Este documento es la síntesis curada — `graphify-out/` es la fuente consultable para todo lo que no cabe acá (`graphify query "…"`, `graphify explain "…"`, o abrir `graphify-out/graph.html`).

## Nota de honestidad sobre el corpus

`graphify` se corrió sobre `.` (todo el repo, tal como pedía el spec: `/graphify . --wiki`), no solo sobre el código del sitio. Eso significa que **1227 de los 1924 nodos (64%) son las skills genéricas de Claude Code que vienen empaquetadas en `.claude/skills/`** (banner-design, brand, design, design-system, slides, ui-styling, ui-ux-pro-max) — herramientas de autoría de terceros para generar banners, paletas, slides, etc., sin ninguna relación con Espresso Coffee Shop. Los 10 "God Nodes" del reporte (`TailwindConfigGenerator`, `DesignSystemGenerator`, `search()`, `ShadcnInstaller`...) son casi todos de ese ruido — son scripts Python internos de esas skills, no arquitectura del sitio. Los 184 "communities" del reporte incluyen esa mezcla; este documento filtra explícitamente por lo que sí es el proyecto (**697 nodos reales**: rutas, componentes, `lib/`, `content/`, docs y las 13 capturas QA). Si abrís `graph.html` vas a ver ese ruido — es fiel al repo, no un error de extracción.

## (a) Mapa de rutas

**6 subpáginas** (decisión de addendum-05, exactamente estas — Academy/Vinyl/Roasting/Carta se absorbieron como anclas):

| Ruta | Página | Zona(s) de tema | Notas |
|---|---|---|---|
| `/` | Home | paper → beige → blue/green/ink por sección (scroll) | Hero 100% tipográfico (sin `<video>`, ver gate de LCP/CLS bloqueado en `CONTENIDO-PENDIENTE.md`), secciones: café, suscripción, methods-shop, marcas aliadas, roasting |
| `/nosotros` | Quiénes somos | paper → beige → paper(#academy) → ink(#vinyl) → green(#roasting) → beige → paper | Long-scroll único que absorbe Academy, Vinyl & Drinks y Roasting como anclas (`#academy`, `#vinyl`, `#roasting`) |
| `/cafe` | Catálogo de café | beige | `FilterBar` con 8 facetas, grid de `ProductCard` |
| `/cafe/[slug]` | Ficha de café | según `colorBloque` del lote (con fix de contraste, ver §d) | `SpecTable` de transparencia, `CafePurchase` (pedido) |
| `/suscripcion` | Coffee Magazine | blue | `SubscriptionConfigurator` (3 pasos) + FAQ |
| `/methods-shop` | Equipos y accesorios | paper | Hub de 4 categorías |
| `/methods-shop/[categoria]` | Categoría | paper | Grid de productos |
| `/marcas-aliadas` | Marcas aliadas | paper | Grid agrupado por tipo |
| `/contacto` | Contacto | paper → beige(#carta) | Absorbe la carta de barra completa como ancla `#carta` |
| `/styleguide` | Style guide | las 5 zonas | No forma parte de las 6 subpáginas — utilitaria, para QA/onboarding |
| `/legal/privacidad`, `/legal/terminos` | Legal | paper | Placeholders de ejemplo, bloqueados por revisión legal real |

**Redirects 301/308** (`next.config.ts`, ver nota técnica: `permanent:true` de Next produce 308, no 301 literal): `/academy(/:clase*)`, `/nosotros/academy(/:clase*)` → `/nosotros#academy`; `/vinyl-and-drinks`, `/nosotros/vinyl-and-drinks` → `/nosotros#vinyl`; `/roasting` → `/nosotros#roasting`; `/carta` → `/contacto#carta`; `/goods(/:categoria*)` → `/methods-shop(/:categoria*)`.

## (b) Árbol de componentes y consumo de tokens

Todo lo que vive dentro de un `ThemeZone` (`components/primitives/ThemeZone.tsx`) consume `--bg/--fg/--muted/--rule` vía las utilities Tailwind `bg-zone-bg`/`text-zone-fg`/etc. — ningún componente hijo recibe props de color, la inversión de zona es automática por CSS custom properties (criterio de aceptación #4 del spec original).

```
app/layout.tsx (RootLayout)
├─ components/layout/Header.tsx          — lee --active-bg/--active-fg (no --bg/--fg de su propio ThemeZone: vive fixed, fuera de flujo)
│  └─ components/layout/NavOverlay.tsx   — dynamic import, ssr:false (no pesa en First Load JS)
├─ components/motion/ActiveZoneTracker.tsx — IntersectionObserver, escribe --active-bg/--active-fg en :root (sin esto Header no invierte, bug real de Fase 5)
├─ components/motion/ScrollProgress.tsx    — 1 listener rAF, escribe --scroll-progress en :root
├─ components/motion/ProgressBar.tsx       — lee --active-fg + --scroll-progress
├─ <main> (por página)
│  ├─ components/sections/Hero.tsx → HeroVideoLayer.tsx, HeroWordmark.tsx
│  ├─ components/sections/CafeSection.tsx (home) → CircularSeal, BrandIcon, commerce/ProductCard.tsx
│  ├─ components/sections/SuscripcionSection.tsx, MethodsShopSection.tsx, MarcasAliadasSection.tsx, RoastingSection.tsx
│  ├─ components/commerce/CafeCatalog.tsx (/cafe) → FilterBar.tsx, ProductCard.tsx
│  ├─ components/commerce/CafePurchase.tsx (/cafe/[slug]) → lib/store/order.ts, lib/whatsapp.ts
│  ├─ components/commerce/SpecTable.tsx, RoastScale.tsx (/cafe/[slug])
│  ├─ components/commerce/SubscriptionConfigurator.tsx (/suscripcion) → lib/whatsapp.ts
│  └─ primitives: Container, Section, MicroLabel, DisplayTitle, Hairline, RibbonTag, ButtonOutline — consumidos por casi todo lo de arriba
└─ components/layout/Footer.tsx
```

Componentes de marca (`components/brand/`) — `Wordmark`, `HeroWordmark`, `CircularSeal`, `BrandIcon`, `IconRow`, `BlurEcho`, `DrinkIcon` — son los únicos que dependen de `docs/BRAND.md` (paleta congelada, iconos propietarios) en vez de solo del sistema de zonas. `CircularSeal` es el único componente no trivial con lógica propia de tamaño (`TEXT_MIN_SIZE = 120`, fix de addendum-06 §2).

**Nota de nombres:** `docs/DESIGN_SYSTEM.md` lista `OrderPanel` como componente del sistema — en la implementación real ese rol lo cumple `components/commerce/CafePurchase.tsx`. Deriva del nombre original del spec; no hay dos componentes duplicados, es un desajuste de nombre entre doc y código que vale la pena corregir en la próxima pasada de docs.

## (c) Flujo de pedido por WhatsApp, de punta a punta

No hay pasarela de pago (decisión explícita del spec) — todo termina en un link `wa.me` con mensaje prellenado, vía `lib/whatsapp.ts`.

**Tres flujos distintos, con acoplamiento distinto al carrito:**

1. **Café (`/cafe/[slug]`, componente `CafePurchase.tsx`):** el único flujo con estado persistente. Al pulsar "Pedir por WhatsApp": (1) agrega el ítem a `useOrderStore` (zustand + `persist`, clave `espresso-order` en localStorage — sobrevive recargas y visitas futuras); (2) **en el mismo click** abre `wa.me` con `buildOrderMessage([item])` — el mensaje de WhatsApp incluye *solo ese ítem*, no el carrito acumulado.
2. **Suscripción (`/suscripcion`, `SubscriptionConfigurator.tsx`):** `buildSubscriptionMessage()` directo, sin tocar el store — no es un "producto" con cantidad, es una configuración de 3 pasos que genera un mensaje único.
3. **Reservas (Academy y Vinyl & Drinks, dentro de `/nosotros`):** `buildAcademyMessage()` / `buildVinylMessage()`, también directos, sin store — son reservas de cupo/mesa, no compras.

**Hallazgo real (no reportado antes, encontrado al trazar el grafo):** el ícono "Ver pedido" del `Header.tsx` lee `totalItems` del mismo store persistido y muestra un badge con el conteo — pero **el `<button>` no tiene `onClick`**. No hay panel, ruta ni modal que abra ese carrito. Resultado: cada "Pedir por WhatsApp" en `/cafe/[slug]` sí acumula en localStorage (el badge sube correctamente), pero no hay ninguna forma de ver, editar o enviar por WhatsApp el pedido acumulado completo — cada pedido real que sale por WhatsApp es de un solo ítem a la vez, y el resto queda huérfano en el store para siempre. No es un bug de accesibilidad (el botón tiene `aria-label` correcto, Lighthouse no lo detecta) — es una función a medio construir. Vale la pena decidir: o se construye el panel de revisión (enviar `buildOrderMessage(items)` con el store completo), o se quita el badge/contador para no prometer una función que no existe.

`NEXT_PUBLIC_WHATSAPP` sigue en placeholder (`573000000000`, `CONTENIDO-PENDIENTE.md` #7) — bloqueante de producción, todo el flujo de arriba apunta hoy a un número inexistente.

## (d) Puntos de acoplamiento — qué habría que romper para migrar a e-commerce con pasarela real

1. **`lib/whatsapp.ts` ya está aislado a propósito** (comentario en el código: "aislado del resto de la lógica para poder cambiar de adaptador de checkout en el futuro sin tocar UI"). `getWhatsAppUrl()` es el único punto que sabe que el checkout es un link `wa.me` — cambiarlo por un adaptador de pasarela (Stripe, Wompi, ePayco) es reemplazar esa función y los 4 `build*Message()`, sin tocar `CafePurchase.tsx`, `SubscriptionConfigurator.tsx` ni las páginas.
2. **`lib/store/order.ts` (zustand + `persist`) es un carrito de cliente puro, sin servidor.** Migrar a pasarela real necesita: (a) un endpoint que valide precios server-side (hoy `precioUnitario` viene del cliente, de `content/cafes.ts` vía props — cero validación de servidor, aceptable para "generar un mensaje de WhatsApp" pero no para cobrar), (b) resolver el hallazgo de §c antes que nada, porque hoy el carrito no tiene UI de revisión — construirla es prerrequisito para cualquier checkout real, con o sin pasarela.
3. **`content/*.ts` son arrays estáticos importados en build time** (`cafes.ts`, `carta.ts`, `clases.ts`, `eventos.ts`, `marcas.ts`, `methods-shop.ts`), no un CMS ni una base de datos. Migrar precios/inventario a algo dinámico (stock real, precios que cambian) requiere mover esto a un backend — hoy cualquier cambio de precio es un deploy.
4. **`ProductCard.tsx` resuelve color por `zone` vía `lib/cafe-card-color.ts`**, no por datos del producto — ese acoplamiento (visual, no de negocio) es sano y no bloquea nada de e-commerce.
5. **Cero validación de disponibilidad/stock** en ningún punto — todos los cafés se muestran siempre "disponibles" salvo el estado narrativo (`estado: "limitada" | "preventa"` en los datos), que es cosmético (ribbon), no un control de inventario real.

## (e) Tres consultas más útiles para retomar el proyecto

Corridas contra `graphify-out/graph.json` (`graphify query "…"` desde la raíz del repo):

1. `graphify query "qué componentes dependen de los tokens de tema (--bg/--fg/--muted/--rule)"` — para verificar que un componente nuevo invierte de zona correctamente antes de mergear.
2. `graphify path "components/commerce/CafePurchase.tsx" "lib/store/order.ts"` — para trazar el flujo de pedido completo (éste es el que hubiera hecho más rápido encontrar el hallazgo de §c).
3. `graphify explain "ThemeZone"` — punto de entrada rápido al sistema de 5 zonas para alguien nuevo en el proyecto.

## Estado del grafo (metadatos honestos)

- **1924 nodos / 3238 aristas / 184 comunidades** — de esos, ~697 nodos son del proyecto real (código del sitio + docs + capturas QA), el resto (~64%) es ruido de skills genéricas bundleadas en `.claude/skills/`.
- **Health check:** 317 aristas con endpoint colgante, 35 colapsadas (dirigido), 48 colapsadas (no dirigido) — esperable dado que 18 subagentes en paralelo extrajeron cada uno su fragmento sin ver los IDs que generaban los demás (mismatches de convención AST↔LLM). No invalida el grafo, pero significa que algunas aristas apuntan a nodos que no se resolvieron exactamente — usar `graphify diagnose multigraph` si hace falta profundizar.
- **13 capturas de `docs/qa/capturas/` extraídas por visión** (una por imagen, sin OCR simple) — sus nodos y relaciones inferidas están en el grafo, consultables igual que el código.
- Un chunk de extracción (docs/skills de marca — AGENTS.md, CLAUDE.md, README.md y las 4 skills genéricas de diseño) tardó sensiblemente más que los otros 17 durante esta corrida; no bloqueó el resto del pipeline al correr en paralelo, y terminó igual antes de que se cerrara el reporte final.
- Salidas completas en `graphify-out/`: `graph.html` (visualización interactiva), `graph.json` (grafo consultable), `GRAPH_REPORT.md` (reporte completo, incluye Ambiguous Edges y Knowledge Gaps que este doc no repite), `wiki/` (194 artículos navegables, `wiki/index.md` como entrada).

## Hallazgo adicional de QA (no relacionado con graphify, encontrado al medir presupuesto JS de addendum-06)

`/styleguide` tiene SEO 63/100 en Lighthouse (todas las demás rutas medidas están en 100) — el reporte no estaba en el chunk que lo cubría explícitamente pero apareció flaggeado en la extracción de `docs/qa/js-budget-fase6.md`. Como `/styleguide` es una ruta utilitaria (no listada en las 6 subpáginas ni pensada para tráfico de buscador), es plausible que sea intencional (falta `noindex` o similar) — vale confirmar antes de producción, no es necesariamente un bug.
