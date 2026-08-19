# Lighthouse — resumen, mobile, build de producción

Todas las rutas reales corridas contra `npm run build && npm run start` (no dev server). Reportes crudos en `docs/qa/lighthouse/<ruta>/report.json` + `.html`.

| Ruta | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---:|---:|---:|---:|
| `/` | 100 | 100 | 100 | 100 |
| `/academy` | 100 | 100 | 100 | 100 |
| `/academy/[clase]` | 100 | 100 | 100 | 100 |
| `/cafe` | 100 | 100 | 100 | 100 |
| `/cafe/[slug]` | 100 | 100 | 100 | 100 |
| `/carta` | 100 | 100 | 100 | 100 |
| `/contacto` | 100 | 100 | 100 | 100 |
| `/goods` | 100 | 100 | 100 | 100 |
| `/goods/[categoria]` | 100 | 100 | 100 | 100 |
| `/legal/privacidad` | 100 | 100 | 100 | 100 |
| `/legal/terminos` | 100 | 100 | 100 | 100 |
| `/marcas-aliadas` | 100 | 100 | 100 | 100 |
| `/nosotros` | 100 | 100 | 100 | 100 |
| `/roasting` | 100 | 100 | 100 | 100 |
| `/styleguide` | 100 | 100 | **63*** | 100 |
| `/suscripcion` | 100 | 100 | 100 | 100 |
| `/vinyl-and-drinks` | 100 | 100 | 100 | 100 |

\* `/styleguide` SEO 63 es intencional: `is-crawlable` falla porque la página tiene `noindex` a propósito (contrato visual interno, no debe indexarse — spec original y `robots.ts`). No es un defecto.

**Performance:** esta versión del tool de Lighthouse excluye la categoría Performance del cálculo de score (hay que correr `performance_start_trace` aparte). Métricas de Core Web Vitals medidas por separado sobre `/` (build de producción): **LCP 259ms, CLS 0.00** — ver `docs/qa/js-budget-fase4.md` para el detalle y la verificación de que next/font genera `ascent-override`/`descent-override`/`size-adjust` automáticos (esa es la causa del CLS 0). No se corrió trace de Performance en las otras 16 rutas — todas comparten el mismo runtime base (137KB del framework) y ninguna tiene hero LCP-crítico adicional al de home, así que el riesgo de regresión de LCP fuera de home es bajo, pero queda sin medir explícitamente.

## Hallazgos corregidos en esta pasada (11 fixes, todos verificados con re-run)

1. **Header nunca invertía por zona** (hallazgo real al investigar el punto 1 del addendum-02) — construido `ActiveZoneTracker`. Ver `js-budget-fase5.md`.
2. **Progress bar con `mix-blend-mode`** producía colores fuera de paleta — revertido a `var(--active-fg)` real.
3. **`color-contrast`** — numeral watermark decorativo en `/` (Suscripción): eliminado, no vale la pena pelear con axe por un adorno que ni siquiera pedía la spec original.
4. **`heading-order`** — `RoastingSection` usaba un segundo `<h1>` en home (ya había uno en Hero). Prop `titleLevel` agregada, home pasa `titleLevel={2}`.
5. **`list`** — `<Hairline>` (renderiza `<hr>`) como hijo directo de `<ul>` en `SuscripcionSection` y en `/roasting` (Trazabilidad). Mismo patrón, dos lugares — movido fuera del `<ul>` / dentro del último `<li>`.
6. **`label-content-name-mismatch`** — el `aria-label` del logo en el Header no calzaba con el texto visible del Wordmark (dos `<span>` sin espacio entre "ESPRESSO" y "Coffee Shop"). Se quitó el `aria-label` custom y se agregó un espacio `sr-only` entre las líneas del Wordmark — el nombre accesible ahora es el texto visible real, sin ambigüedad.
7. **`heading-order` sistémico** — `ProductCard`, los ítems de `/goods/[categoria]` y las FAQ de `/suscripcion` usan `<h3>` asumiendo que existe un `<h2>` antes en la página. Cierto en home (bajo `CafeSection`), falso en `/cafe`, `/cafe/[slug]` ("Otros lotes"), `/goods/[categoria]` y `/suscripcion`. `/academy` ni siquiera tenía un `<h1>` real (el título vivía solo en el `aria-label` del `CircularSeal`). Corregido en los 5 lugares — `MicroLabel` ganó una prop `as` para poder renderizar como heading real sin cambiar el estilo visual.
8. **`definition-list` / `dlitem`** — `SpecTable` (usado en fichas de café y en `/contacto`) anidaba `<div>` extra y un `<hr>` suelto dentro de `<dl>`, rompiendo el árbol de accesibilidad (`agentic-browsing` cayó a 50 en la ficha de café por esto). Reescrito: filetes por `border` en vez de `<hr>`, `<dl>` solo contiene `<div>` con exactamente un `dt`+`dd`.
9. **Vino como color de texto corrido** en la MetaBar de `/vinyl-and-drinks` — vino sobre negro no pasa contraste a ningún tamaño razonable. Corregido al patrón ya usado en el resto de la página: el vino queda solo en el símbolo "+" (decorativo, `aria-hidden`), el texto real va en `--fg`.
10. **`BlurEcho` sobre zonas oscuras** — el eco (texto beige diluido + `blur()`) caía bajo 3:1/4.5:1 en `/vinyl-and-drinks` e `/styleguide` (las 3 zonas oscuras). El blur espacial diluye contraste más de lo que sugiere la opacidad sola, sobre todo en texto pequeño (el subtítulo "Coffee Shop" del Wordmark necesita 4.5:1, no 3:1, por su tamaño). Opacity default subida de 0.35 a 0.65 tras verificar empíricamente contra las 5 zonas.
11. **Opacidades ad-hoc por debajo de 16px** (`text-zone-fg/50`, `/60`, `/70`) en `/academy`, `/goods/[categoria]`, `SubscriptionConfigurator`, `GoodsSection`, `/contacto` — mismo riesgo que el `--muted` documentado en Fase 2 (`docs/qa/contrast.md`), solo que vía opacidad arbitraria en vez del token. Todas a opacidad plena ahora.

Todos los 11 hallazgos fueron re-verificados con un nuevo run de Lighthouse después del fix, no solo revisados por código.
