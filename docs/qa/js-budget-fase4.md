# Peso JS — checkpoint de cierre de Fase 4

Mismo método que `docs/qa/js-budget-fase2.md`: archivos reales de `/` desde `.next/server/app/page/build-manifest.json` + `page_client-reference-manifest.js`, excluyendo el chunk `noModule` (core-js legacy, cero navegadores evergreen lo descargan — verificado en `.next/server/app/index.html`), suma de gzip **individual** por archivo (no del concatenado).

## Resultado — `/` (home completa, 6 secciones)

| Chunk | raw | gzip |
|---|---:|---:|
| react-dom + router + framework (5 chunks, sin cambios desde Fase 2) | 478.6 KB | 140.3 KB |
| Header (code-split, NavOverlay aparte) | ~25-32 KB | ~9-10 KB |
| BrandOrbit + resto de client components de home | ~17-19 KB | ~4-5 KB |
| **Total** | **542.5 KB** | **160.6 KB** |

**`/` vs presupuesto 180KB gzip: PASS — 160.6KB, margen de 19.4KB.**

## Cómo se llegó ahí (addendum-02, punto 1)

Se decidió NO instalar GSAP para la home. Los tres usos previstos se resolvieron sin dependencia:

- **seal-spin**: `components/motion/ScrollProgress.tsx` — un solo listener de scroll (rAF-throttled) que escribe `--scroll-progress` en `:root`. `CircularSeal` ya leía `rotate: calc(var(--scroll-progress) * 360deg)` desde Fase 2; ahora la variable se actualiza de verdad. ~35 líneas, sin dependencia.
- **marquee**: `components/motion/Marquee.tsx` — `@keyframes marquee-scroll` en CSS puro (globals.css), duplicado de contenido para loop continuo, pausa en `:hover`, colapsa a lista estática (oculta la copia duplicada) bajo `prefers-reduced-motion`. Cero JS.
- **letter-reveal**: `components/brand/HeroWordmark.tsx` — spans por carácter con `animation-delay` indexado (40ms/carácter), `aria-label` en el contenedor con el texto completo, spans `aria-hidden`. Sin SplitText, sin `split.revert()` — el problema de a11y que motivaba ese cleanup no existe aquí porque nunca se fragmentó el DOM accesible, solo una capa decorativa aparte.

Resultado: margen intacto (19.4KB vs los 23.1KB de Fase 2 — la diferencia son ~4KB de BrandOrbit + Header con más lógica, no motion), una dependencia menos, sin GSAP en el bundle de ninguna ruta todavía.

## CLS / LCP del hero (addendum-02, punto 2)

El hero es el elemento LCP (texto a 132px con webfont). Medido con Chrome DevTools Performance trace sobre build de producción:

- **LCP: 259ms** (TTFB 5ms + render delay 254ms)
- **CLS: 0.00**

Verificado que next/font genera automáticamente las métricas de fallback ajustadas — confirmado en el CSS de producción (`.next/static/chunks/*.css`):

```
ascent-override: 100.18% / 109.21% / 110.21% / 88.96%
descent-override: 21.28% / 26.03% / 26.05% / 42.66%
size-adjust: 93.76% / 98.7% / 99.82% / 100%
font-family: Outfit, Outfit Fallback / Archivo, Archivo Fallback / "Source Sans 3","Source Sans 3 Fallback"
```

Esto es lo que produce el CLS de 0.00 — el fallback local (Arial/system) se ajusta métricamente para ocupar el mismo espacio que Outfit antes de que la fuente cargue, así que no hay salto al hacer swap. DINish (local, vía `next/font/local`) recibe el mismo tratamiento automático.

## Fidelidad (addendum-02, punto 3) — verificado visual + código

- Partitura cromática exacta: paper (hero) → beige (café) → blue (suscripción) → paper (goods) → green (marcas aliadas) → ink (roasting) → ink (footer). Confirmado por captura de pantalla de la página completa.
- Hero sin fotografía ni video — solo tipografía, filetes-flecha (`← Cold Brew` / `Roasting →`) y fila de 4 iconos.
- `BlurEcho`: una sola instancia en toda la home (en `Hero.tsx`, envolviendo `HeroWordmark`), `aria-hidden="true"` en la capa decorativa.
- `BrandOrbit`: CSS `transform-style: preserve-3d` + fallback `BrandOrbitFallback` (grid estático) siempre en el DOM, visible vía `@media (prefers-reduced-motion: reduce)` y `@supports not (transform-style: preserve-3d)` — doble cobertura, no solo reduced-motion.
- Indicador de progreso: filete de 1px fijo arriba (`ProgressBar.tsx`). Implementación: `mix-blend-mode: difference` en vez de leer `--fg` de zona directamente — evita rastrear con JS qué zona hay bajo el filete (frágil, caro) y en cambio se invierte automáticamente contra cualquier fondo (blanco sobre negro/verde/azul, negro sobre blanco/beige), cumpliendo el mismo objetivo de legibilidad constante sin el costo. Si se prefiere la lectura literal de `--fg`, es un cambio de una línea — flagueado aquí para decisión explícita.

## Bug encontrado y corregido en esta pasada

`content/cafes.ts` asignaba `colorBloque` usando colores fuera de la paleta permitida para bloques de producto: dos cafés (`obsidiana`, `geisha-1750`) usaban **vino** (`#5C1A2B`) — color reservado por regla de marca solo a Vinyl & Drinks y RibbonTag — lo que además hacía el `RibbonTag` (también vino) invisible contra su propia tarjeta. Otros tres usaban el mismo beige de la sección (`#FFF7E6`), haciendo el bloque de imagen completamente invisible contra el fondo. Corregido: `colorBloque` se tipó como unión estricta `"#000000" | "#072230" | "#0A302B"` en `content/types.ts` (los tres únicos colores de la paleta con contraste garantizado contra una sección beige y contra el texto beige del código), y los 8 cafés se redistribuyeron entre esos tres. `ProductCard.tsx` se simplificó de paso — ya no necesita lógica condicional para decidir el color del texto del código.
