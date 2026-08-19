# Peso JS — checkpoint de cierre de Fase 2

Requerido por `phase_2_gate`: reportar el peso real de JS de `/` antes de pasar a Fase 3. `/styleguide` queda fuera del juicio (ruta interna, `noindex`).

## Método (corregido)

Turbopack en esta versión de Next no imprime la tabla clásica `Route / Size / First Load JS`, así que el número se reconstruyó directamente de los artefactos de build, no de una suma cruda de `.next/static/chunks/*`:

1. `.next/server/app/page/build-manifest.json` → archivos raíz (`polyfillFiles` + `rootMainFiles`) que carga `/`.
2. `.next/server/app/page_client-reference-manifest.js` → chunks propios de la ruta (Header, cliente).
3. `.next/server/app/index.html` (HTML pre-renderizado) → qué `<script>` tags son reales. Aquí apareció el error del primer intento: uno de los archivos del manifest (`0cz1d0mv5g_q7.js`, el polyfill core-js, 39KB gzip) se sirve como `<script noModule>` — **ningún navegador evergreen (Chrome/Firefox/Safari/Edge) lo descarga**, es fallback IE/legacy puro. Sumarlo infla el número sin representar el costo real para un visitante real. Se excluyó de la cuenta final.
4. Peso real = suma de gzip **individual** de cada chunk que sí se sirve como `<script async>` sin `noModule` (no gzip del concatenado — eso es optimista, un CDN no funde archivos en un solo stream).

De paso: se instaló `NavOverlay` vía `next/dynamic({ssr:false})` y montaje diferido (`hasOpened`) en `Header.tsx`, porque el menú a pantalla completa no debe pagarse en el load inicial de nadie que no lo abra. También se agregó `browserslist` (evergreen only) en `package.json` — no cambió el peso (el polyfill nomodule es un asset fijo de Next, no depende de browserslist), pero es buena práctica igual y se queda.

## Resultado — `/` (home)

| Chunk | raw | gzip |
|---|---:|---:|
| 3y4lkfs1_2v7o.js | 5,448 B | 1,976 B |
| 1p-8wm2dz0ou9.js | 31,189 B | 8,115 B |
| 2frmb4raf3fof.js (react-dom) | 233,496 B | 72,389 B |
| 1zvzy_j0c09zi.js (next router runtime) | 191,466 B | 52,580 B |
| turbopack-1hzqtas8oyvui.js | 17,076 B | 5,220 B |
| 336bateks3i0c.js (Header, code-split de NavOverlay) | 36,482 B | 10,663 B |
| 2lkap0nixvqzb.js | 31,727 B | 9,702 B |
| **Total** | **534.1 KB** | **156.9 KB** |

Excluido de la cuenta (no se descarga en navegadores evergreen): `0cz1d0mv5g_q7.js`, `noModule`, 112,594 B raw / 39,373 B gzip.

**`/` vs presupuesto 180KB gzip: PASS — 156.9KB, margen de 23.1KB.**

## Lectura

~155KB de eso es runtime fijo de Next 16 + React 19 (react-dom + router), no hay mucho más que recortar ahí sin tocar el framework. El margen real disponible antes de tocar el techo es de ~23KB — hay que vigilarlo de cerca en Fase 4, que es donde entra GSAP (core + ScrollTrigger + SplitText, addendum-01 estimó ~40KB gzip) a esta misma ruta para seal-spin/marquee/SplitText del hero. Con ese número, `/` **excedería el presupuesto en ~17KB** si GSAP se carga de forma estática. La partitura de motion del addendum ya contempla esto (dynamic import, sin SSR, cargado solo tras interacción o entrada en viewport de la sección que lo necesita) — hay que ejecutarla al pie de la letra en Fase 4 y volver a medir con este mismo método antes de dar la sección por cerrada, no esperar a Fase 6.
