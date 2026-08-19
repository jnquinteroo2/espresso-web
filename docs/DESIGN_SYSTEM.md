# ESPRESSO COFFEE SHOP — Design System

Fuente: `<design_system>` del prompt original + `addendum-01` (correcciones 2 y 4: motion recortado, duraciones/stagger ajustados). Patrones/UX/motion validados contra `docs/research/uiux-pro-max.md`.

## Grid

- 12 columnas (fijado por addendum-01, no 12–16).
- Max width 1440px. Gutter 24px.
- Márgenes: desktop 64px / tablet 40px / mobile 20px.
- Baseline 8px. Section padding-y: `clamp(80px, 11vh, 176px)`.
- Secciones narrativas de home: min-height 85vh.
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280 / xxl 1536.

## Spacing scale

4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 176 (px)

## Radii

- `--r-none`: 0px — default de TODO.
- `--r-pill`: 999px — exclusivo de sellos circulares y cintas de estado redondeadas.
- Prohibidos radios intermedios (4/8/12px).

## Bordes / elevación

- Filete estándar: 1px sólido en `--rule` de la zona activa.
- Botón outline: 1px sólido en `--fg` de la zona, sin relleno en reposo.
- Tarjetas: sin borde ni sombra, separadas por espacio + filete inferior.
- Cero `box-shadow` en todo el proyecto, salvo focus ring.

## Zonas de tema (CSS vars por `data-theme`)

```css
[data-theme="paper"] { --bg:#FFFFFF; --fg:#000000; --muted:rgba(0,0,0,.55); --rule:rgba(0,0,0,.14); }
[data-theme="beige"] { --bg:#FFF7E6; --fg:#000000; --muted:rgba(0,0,0,.55); --rule:rgba(0,0,0,.16); }
[data-theme="blue"]  { --bg:#072230; --fg:#FFF7E6; --muted:rgba(255,247,230,.62); --rule:rgba(255,247,230,.22); }
[data-theme="green"] { --bg:#0A302B; --fg:#FFF7E6; --muted:rgba(255,247,230,.62); --rule:rgba(255,247,230,.22); }
[data-theme="ink"]   { --bg:#000000; --fg:#FFF7E6; --muted:rgba(255,247,230,.60); --rule:rgba(255,247,230,.20); }
```

Cualquier componente dentro de `ThemeZone` consume `--bg/--fg/--muted/--rule` — invierte sin props de color (criterio de aceptación #4).

**Regla — `--muted` nunca por debajo de 16px.** El contraste medido de `--muted` es 4.69:1 en su peor caso (beige, ver `docs/qa/contrast.md`) — pasa AA normal (4.5:1) por un margen delgado, no pasa AA "enhanced" (7:1) y no tiene colchón para variación de renderizado de fuente. Con `--fs-micro` (10-11px) o `--fs-label` (12-13px) ese margen delgado es un riesgo real de legibilidad, no solo de checklist. Regla: `--muted` solo se usa en texto ≥16px (`--fs-lead` en adelante). Todo texto secundario en `--fs-micro`/`--fs-label`/`--fs-body` (min. 15px) usa `--fg` a opacidad plena. En la práctica esto cubre casi todos los usos actuales de `--muted` en texto — MicroLabel, MetaBar, numerales de NavOverlay y los bloques de contacto del footer pasaron de `--muted` a `--fg` por esta regla. `--muted` queda disponible para placeholders no-textuales o texto ≥16px que lo necesite en el futuro.

## Tipografía — escala fluida (baseline 8px)

| Token | Size | Tracking | Transform | Weight | LH | Uso |
|---|---|---|---|---|---|---|
| `--fs-micro` | clamp(10px,0.68vw,11px) | 0.26em | uppercase | 500 | 1.4 | Meta superior, etiquetas, horarios |
| `--fs-label` | clamp(12px,0.8vw,13px) | 0.18em | uppercase | 500 | 1.5 | Nav, botones, filtros, categorías |
| `--fs-body` | clamp(15px,1.05vw,17px) | 0.005em | none | 400 | 1.75 | Párrafos, máx 68 car/línea |
| `--fs-lead` | clamp(18px,1.4vw,21px) | 0 | none | 400 | 1.6 | Bajada de sección |
| `--fs-h3` | clamp(22px,2.0vw,30px) | 0.01em | none | 500 | 1.25 | Título de tarjeta |
| `--fs-h2` | clamp(34px,4.2vw,60px) | 0.005em | none | 500 | 1.08 | Título de sección |
| `--fs-h1` | clamp(48px,8.5vw,132px) | -0.01em | none | 600 | 0.95 | Hero, portadas |
| `--fs-numeral` | clamp(40px,6vw,92px) | 0.02em | none | 700 | 0.9 | DINish — códigos, fechas, precios |

Fuentes: `--font-garet` (principal), `--font-dinish` (display/dato), `--font-source-sans` (auxiliar). Ver `docs/BRAND.md` para stack final y licencias.

## Motion (RECORTADO — addendum-01 corrección 2, SIN GSAP desde addendum-02)

**Decisión de stack final:** NO se instala Framer Motion NI GSAP — cero dependencias de motion en todo el proyecto. Radix (shadcn/ui) anima NavOverlay/Dialog/Sheet vía `data-state` + CSS. Reveals de scroll = 1 `IntersectionObserver` compartido + transición CSS (`data-revealed="true"`), <1KB. Los tres usos que se habían reservado para GSAP en addendum-01 (seal-spin, marquee, letter-reveal del hero) se resolvieron sin dependencia — ver abajo. GSAP sigue siendo gratis desde abril 2025 si algo en Fase 6+ lo justifica de verdad, pero no hizo falta.

| Token | Valor |
|---|---|
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) |
| `--ease-inout` | cubic-bezier(0.65, 0, 0.35, 1) |
| `--dur-fast` | 180ms |
| `--dur-base` | 420ms |
| `--dur-slow` | **420ms** (revisado — antes 720ms, adoptado 300-400ms de la skill, redondeado a 420ms por INP) |

**Patrones:**
- `reveal`: opacity 0→1 + translateY 12px→0 (no 24px — skill: "y offset pequeño 8-16px, lee como fade no slide"), `--dur-slow` `power1.out`/`--ease-out`, dispara 1 vez vía IntersectionObserver (no GSAP en catálogo).
- `stagger`: 0.02–0.04s/ítem en listas largas (hairline-lists, grid de productos); 70ms reservado solo para grupos ≤4 (fila de iconos).
- `zone-shift` / **active-zone tracking** (implementado Fase 5): `components/motion/ActiveZoneTracker.tsx` — un IntersectionObserver detecta qué `[data-zone-track]` (prop `track` de `ThemeZone`) cruza la línea de 72px bajo el header y copia sus `--bg`/`--fg` a `--active-bg`/`--active-fg` en `:root`. Header y ProgressBar leen esas variables (`bg-active-bg`, `text-active-fg`) con transición de 600ms `--ease-inout`. Sin esto el header no invertía — quedaba fijo en la zona `paper` del `<body>` sin importar qué sección había debajo; se detectó y corrigió en Fase 5.
- `seal-spin`: **retirado en `addendum-07`** junto con el sello circular — ningún elemento de marca rota ya. `components/motion/ScrollProgress.tsx` sigue en pie porque `ProgressBar.tsx` (el filete de progreso de scroll, ver `progress-indicator` abajo) también lee `--scroll-progress`; solo se quitó el consumidor que hacía `rotate: calc(var(--scroll-progress) * 360deg)`.
- `marquee`: **removido** (addendum-06 fix 4) — vivía como cinta de notas de cata en la sección Café de home, competía visualmente con la fila de iconos interactiva (el mecanismo de filtrado firmante de esa sección) y se quitó. `components/motion/Marquee.tsx` se borró por quedar sin uso; el patrón CSS (`@keyframes marquee-scroll`, pausa en `:hover`, colapso a lista bajo `prefers-reduced-motion`) sigue documentado acá si hace falta reconstruirlo para notas de marcas u otro contexto donde no compita con nada.
- `letter-reveal` (hero): `components/brand/HeroWordmark.tsx` — spans por carácter con `animation-delay` indexado (40ms/carácter), sin rotación/escala, sin SplitText/GSAP. Contenedor con `aria-label` del texto completo, spans `aria-hidden="true"` — el DOM accesible nunca se fragmentó, así que no hace falta el equivalente a `split.revert()`.
- `brand-orbit`: cilindro CSS 3D (`transform-style:preserve-3d`), rotateY 0.15 rad/s, arrastrable + flechas teclado (30°/pulsación). Fallback grid estático (`BrandOrbitFallback`) siempre en el DOM, visible vía `prefers-reduced-motion` **y** `@supports not (transform-style: preserve-3d)` — doble cobertura.
- `progress-indicator`: filete 1px fijo en borde superior de ventana (`ProgressBar.tsx`), `scaleX(var(--scroll-progress))`, color `bg-active-fg` (variable real de zona activa — la primera versión usaba `mix-blend-mode: difference`, que producía colores fuera de paleta contra fondos de color; corregido en Fase 5).

**Reduced motion:** con `prefers-reduced-motion: reduce` TODO se desactiva — reveals en estado final, orbit → grid estático, marquee → lista estática. No opcional.

## Presupuesto de motion — sin GSAP

Todo el motion de scroll/hero/marquee/orbit es CSS + ~2KB de JS vainilla (ScrollProgress + ActiveZoneTracker + BrandOrbit). Cero dependencias de animación en `package.json`. Rutas de catálogo (`/cafe`, `/cafe/[slug]`, `/methods-shop`) no cargan nada adicional de motion — ver `docs/qa/js-budget-fase4.md` y `docs/qa/js-budget-fase5.md` para los números reales por ruta.

## Focus state

Outline 2px sólido en `--fg` de la zona, offset 3px. Visible siempre, nunca se elimina.

## Componentes (ver prompt original §9 para specs completas)

ThemeZone, Container, Section, MicroLabel, DisplayTitle, Monogram (reemplaza a CircularSeal desde `addendum-07`, ver BRAND.md), BrandIcon (stroke-width por tramo, ver BRAND.md), IconRow, Hairline, HairlineList, RibbonTag, ButtonOutline, ProductCard, RoastScale, SpecTable, FilterBar, OrderPanel, BrandOrbit, BlurEcho, MetaBar, NavOverlay.

`CircularSeal.tsx` queda en el repo sin uso (no se borró) — ver `addendum-07` en `docs/BRAND.md`.

## Performance / a11y ganchos técnicos (addendum-01 #4)

- `React.cache()` para dedup de getters en `lib/data/`.
- BrandIcon anima un `<div>` wrapper, nunca el `<svg>` directamente.
- `inputmode="numeric"` en campos de cantidad de OrderPanel.
- CSS crítico inline donde aplique.
