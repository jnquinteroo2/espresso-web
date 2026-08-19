# Checklist pre-entrega — Fase 6

Contra `<acceptance_criteria>` del prompt original + `<forbidden>` (anti-patrones). Estado real, verificado (código + Lighthouse + captura), no autoevaluado a ojo.

## Acceptance criteria

| # | Criterio | Estado | Evidencia |
|---|---|---|---|
| 1 | Partitura cromática exacta paper→beige→blue→paper→green→ink en home | PASS | `app/page.tsx`, capturas en `docs/qa/capturas/home-*.png` |
| 2 | CircularSeal en ≥5 lugares, rota con scroll | PASS | Home (suscripción, roasting), `/academy`, `/vinyl-and-drinks` (×N cartas), `/cafe/[slug]`, `/roasting`, `/suscripcion`, footer — 8+ instancias reales, no solo 5. `ScrollProgress` confirmado escribiendo `--scroll-progress` en vivo |
| 3 | Fila de 4 iconos en hero, café, overlay de nav, footer | PASS | `IconRow` presente en los 4 lugares — verificado por código y captura |
| 4 | ThemeZone invierte sin props de color | PASS | Mecanismo CSS var por `data-theme`, confirmado visualmente en 5 zonas + `ActiveZoneTracker` para header |
| 5 | `/academy` se lee como el afiche de calendario | PASS | Captura `docs/qa/capturas/academy.png` — numeral DIN gigante, mes en minúscula, filetes, RibbonTag rotada |
| 6 | Ficha de café: tabla de transparencia con 10 campos | PASS | `SpecTable` en `/cafe/[slug]` — país, región, finca, productor, altura, variedad, proceso, puntaje SCA, fecha de tueste, nivel de tueste (10/10) |
| 7 | Filtros de `/cafe` en URL, compartibles/recuperables | PASS | Verificado en vivo: filtrar por Origen=Etiopía → URL `/cafe?origen=Etiopía` → reload → mismo resultado filtrado |
| 8 | Pedido por WhatsApp desde tarjeta, ficha, suscripción, academy, vinyl | PASS | `lib/whatsapp.ts` con 4 variantes de mensaje, botones conectados en cada contexto |
| 9 | `prefers-reduced-motion` desactiva todo | PASS — verificado visualmente | La herramienta de esta sesión no expone `Emulation.setEmulatedMedia` (solo `colorScheme`/`cpuThrottlingRate`/`networkConditions`/`geolocation`/`userAgent`/`viewport`, sin acceso a CDP crudo), así que no se emuló la preferencia real del sistema. En su lugar se inyectaron directamente las mismas reglas que `@media (prefers-reduced-motion: reduce)` define en `globals.css` (mismos selectores exactos) y se capturó el resultado — ver `docs/qa/capturas/home--1440.png` y el resto del set en modo reducido: marquee detenido, `BrandOrbit` en grid de fallback, reveals en estado final, cero movimiento. Confirma que el código funciona; no confirma que el navegador dispare esas reglas correctamente ante la preferencia real del SO (eso sí requeriría CDP real o prueba manual) |
| 10 | Lighthouse móvil: Performance≥90, Accessibility=100, Best Practices≥95, SEO≥95 en home/`/cafe`/ficha | **Accessibility 100, Best Practices 100, SEO 100 — confirmado en las 17 rutas.** Performance: esta versión del tool no lo calcula en el mismo run (categoría excluida); medido aparte solo en home vía trace: LCP 259ms, CLS 0.00 (evidencia fuerte de buen performance, pero no es un score Lighthouse Performance formal) | `docs/qa/lighthouse-summary.md` |
| 11 | `/styleguide` sin fallos de contraste en las 5 zonas | PASS | Accessibility 100 tras fix de `BlurEcho` (ver hallazgo #10 en lighthouse-summary.md) |
| 12 | Cero paleta default de Tailwind | PASS | `app/globals.css` — todos los tokens de color son custom (`--ink/--paper/--beige/--blue/--green/--wine/--seal`), `@theme inline` no reexpone la paleta default |
| 13 | `predelivery-checklist.md` con validación anti-patrones, sin FAIL sin justificar | Este documento — ver sección siguiente |
| 14 | `graphify-out/` + `docs/ARQUITECTURA.md` | PASS | `graphify-out/graph.json` (1924 nodos/3238 aristas/184 comunidades, ~64% ruido de skills bundleadas — ver nota de honestidad en `docs/ARQUITECTURA.md`), `graph.html`, `GRAPH_REPORT.md`, `wiki/`; `docs/ARQUITECTURA.md` con mapa de rutas, árbol de componentes, flujo de pedido WhatsApp (incluye hallazgo real: botón "Ver pedido" del header sin `onClick`), puntos de acoplamiento pre-e-commerce, 3 queries útiles |
| 15 | `CONTENIDO-PENDIENTE.md` con inventario de contenido inventado | PASS | Reestructurado en dos categorías (bloqueado por cliente / decisión de alcance) a pedido explícito |
| 16 | Al lado de los afiches, misma marca; al lado de Onyx, no se parece | Evaluación subjetiva — capturas en `docs/qa/capturas/` para que Nicolás/cliente lo juzguen directamente |

## Anti-patrones (`<forbidden>`) — validación

| Anti-patrón prohibido | Estado |
|---|---|
| Esquinas redondeadas intermedias | PASS — `* { border-radius: var(--r-none) !important }` global, solo `.rounded-pill` como excepción explícita |
| Sombras, degradados, glassmorphism, neumorfismo | PASS — cero `box-shadow`/`gradient` en el CSS del proyecto (auditado por grep) |
| Azul y verde coexistiendo en una pantalla | PASS — partitura cromática nunca los pone juntos, verificado por código de cada página (una sola `theme=` por ThemeZone de nivel de página) |
| Texto beige sobre blanco | PASS — nunca se usa `--beige` como color de texto, solo como fondo |
| Blanco puro como texto sobre azul/verde | PASS — zonas blue/green/ink usan `--beige` como `--fg`, no blanco puro |
| Video de fondo en hero | PASS — hero 100% tipográfico, sin `<video>` en el proyecto |
| Fotografía de banco de imágenes genérica | PASS — no hay fotografía ninguna todavía (bloqueada por cliente, ver CONTENIDO-PENDIENTE.md); los placeholders son bloques de color plano, no fotos genéricas |
| Mezclar familias de iconos en un grupo | PASS — los 4 iconos propietarios (`BrandIcon`) nunca se mezclan con Lucide ni con `DrinkIcon` (carta de Vinyl & Drinks) dentro del mismo grupo visual |
| Rellenar/colorear los 4 iconos propietarios | PASS — siempre `fill="none" stroke="currentColor"` |
| Más de 1 `BlurEcho` por página | PASS — un solo `<BlurEcho>` por página en las 17 rutas (auditado por grep) |
| Vino fuera de Vinyl & Drinks / RibbonTag | PASS tras fix — ver hallazgo #9 (MetaBar de vinyl-and-drinks tenía texto corrido en vino, corregido). Auditado: `text-wine`/`bg-wine` solo aparecen en `RibbonTag.tsx` y `app/vinyl-and-drinks/page.tsx` |
| Animaciones con rebote/escala exagerada | PASS — sin GSAP, sin Framer Motion; únicas animaciones son fade/translateY sutil, marquee lineal, letter-reveal sin escala |
| Carruseles automáticos sin controles | PASS — `BrandOrbit` es arrastrable + teclado, no auto-avanza de forma no controlable (rota lento pero se pausa con cualquier interacción) |
| Modal de newsletter al entrar | PASS — formulario de newsletter vive en el footer, nunca como modal/interrupción |
| Scroll hijacking | PASS — sin `scroll-snap` forzado ni interceptación de scroll nativo |
| Texto sobre imagen sin contraste garantizado | PASS — no hay fotografía todavía; los bloques de color de `ProductCard` fueron corregidos en Fase 4 específicamente por este motivo (colorBloque restringido a ink/blue/green con texto beige garantizado) |

**Cero FAIL abiertos.** Los 11 hallazgos reales de esta fase (heading-order, listas mal formadas, dl mal formado, contraste de color, aria-label) fueron corregidos y re-verificados con Lighthouse, no solo documentados.

## Limitaciones de esta verificación

- **Performance Lighthouse formal no medido** (herramienta del entorno excluye esa categoría del audit combinado). Sustituido por medición de Core Web Vitals vía trace (LCP/CLS) solo en home.
- **`prefers-reduced-motion` verificado por inyección de las mismas reglas CSS, no por emulación real de la preferencia del SO** — ver `docs/qa/capturas/index.md` para el detalle técnico exacto de la diferencia y qué se puede/no se puede concluir de ella.
- **Fase 7 (graphify/ARQUITECTURA.md) ejecutada** — ver `docs/ARQUITECTURA.md`. Un chunk de extracción (18 subagentes en paralelo) tardó sensiblemente más que el resto sin afectar el resultado final; el health-check del grafo reporta aristas con endpoint colgante (esperable al fusionar 18 extracciones paralelas con IDs no sincronizados entre sí, no invalida el grafo).
