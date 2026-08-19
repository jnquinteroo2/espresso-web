# Peso JS — cierre de addendum-06

Requerido por addendum-06, closing_steps paso 4 ("re-medir presupuesto JS para / y /cafe") tras los 4 fixes: resolución de contraste `colorBloque`/zona (`lib/cafe-card-color.ts`, nuevo), umbral de legibilidad en `CircularSeal`, macron/subtítulo del wordmark, eliminación de `Marquee`.

## Método (distinto del usado en `js-budget-addendum04-05.md` — ver nota)

Build de producción fresco (`rm -rf .next && npm run build`), servido con `npm run start`. Se navegó a cada ruta con el navegador real y se leyó la lista de requests `script` que el propio Next dispara al cargar la página (`list_network_requests`, filtrado a `resourceTypes: ["script"]`). Para cada archivo se pidió con `curl -H "Accept-Encoding: gzip"` sin `--compressed`, midiendo `%{size_download}` — bytes tal como viajan por la red (el servidor responde con `content-encoding: gzip` en todos los chunks), no el tamaño descomprimido.

**Nota honesta:** el doc anterior (`js-budget-addendum04-05.md`) calculó esto sumando gzip de los archivos listados en manifests estáticos de build. Este build usa Turbopack (el manifest `app-build-manifest.json` de esta versión de Next ya no lista los chunks por ruta de la misma forma — `pages` sale vacío), así que ese método ya no aplica tal cual. Se cambió a medir bytes reales de red en carga real de página, que es una medición más directa de lo que el usuario final descarga. Los números de esta tabla y los del doc anterior **no son estrictamente comparables byte a byte** por el cambio de método — se reportan ambos, con esa salvedad explícita, en vez de forzar una comparación falsa.

## Resultado

| Ruta | Chunks JS | Bytes de red (gzip real) | KB | Presupuesto (180KB) | Margen |
|---|---:|---:|---:|---|---:|
| `/` | 10 | 174 645 | 170.6 KB | PASS | 9.4 KB |
| `/cafe` | 11 (10 compartidos + 1 propio) | 176 557 | 172.4 KB | PASS | 7.6 KB |

**2/2 PASS**, ambas rutas siguen por debajo del presupuesto de 180KB establecido en addendum-04, aunque con menos margen que en la medición anterior (166.3KB / 164.1KB) — la fila compartida de 10 chunks entre `/` y `/cafe` incluye el runtime de React/Next y el código cliente de `CafeSection`/`ProductCard`/`CircularSeal`, que creció con los 4 fixes (nuevo módulo `lib/cafe-card-color.ts`, lógica de umbral en `CircularSeal`, spans de macron en `Wordmark`/`HeroWordmark`). La eliminación de `Marquee.tsx` no compensó ese crecimiento — el componente era pequeño.

Si una fase futura vuelve a acercar alguna ruta al límite, el candidato a revisar primero es ese bloque de chunks compartidos (10 archivos, 170.6KB de los cuales `/cafe` solo añade 1.9KB propios).

## Rutas no re-medidas

Solo `/` y `/cafe` estaban en el alcance explícito de addendum-06 paso 4. El resto de rutas (`/cafe/[slug]`, `/methods-shop`, `/nosotros`, etc.) no se tocaron por los 4 fixes de este addendum de forma directa — los números de `js-budget-addendum04-05.md` siguen siendo la referencia vigente para ellas hasta la próxima medición completa.
