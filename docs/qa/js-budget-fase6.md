# Peso JS — TODAS las rutas, cierre de Fase 5 / apertura de Fase 6

Requerido explícitamente antes de Fase 6: medir todas las rutas restantes, no solo las tres medidas en Fase 5 (`/`, `/cafe`, `/cafe/[slug]`). Mismo método (manifests reales, `rootMainFiles` sin `polyfillFiles` — ese es siempre el chunk `noModule` legacy que ningún navegador evergreen descarga, ver `js-budget-fase4.md` — + chunks de `page_client-reference-manifest.js`, gzip individual sumado).

| Ruta | gzip | Estado | Margen |
|---|---:|---|---:|
| `/` | 161.0 KB | PASS | 19.0 KB |
| `/academy` | 159.8 KB | PASS | 20.2 KB |
| `/academy/[clase]` | 159.8 KB | PASS | 20.2 KB |
| `/cafe` | 163.5 KB | PASS | 16.5 KB |
| `/cafe/[slug]` | 161.7 KB | PASS | 18.3 KB |
| `/carta` | 159.8 KB | PASS | 20.2 KB |
| `/contacto` | 159.8 KB | PASS | 20.2 KB |
| `/goods` | 159.8 KB | PASS | 20.2 KB |
| `/goods/[categoria]` | 159.8 KB | PASS | 20.2 KB |
| `/legal/privacidad` | 159.8 KB | PASS | 20.2 KB |
| `/legal/terminos` | 159.8 KB | PASS | 20.2 KB |
| `/marcas-aliadas` | 159.8 KB | PASS | 20.2 KB |
| `/nosotros` | 159.8 KB | PASS | 20.2 KB |
| `/roasting` | 159.8 KB | PASS | 20.2 KB |
| `/styleguide` | 159.8 KB | PASS | 20.2 KB |
| `/suscripcion` | 161.7 KB | PASS | 18.3 KB |
| `/vinyl-and-drinks` | 159.8 KB | PASS | 20.2 KB |

**17/17 rutas PASS.** Ninguna excede 180KB gzip.

## Lectura

- **Piso compartido: 159.8KB** (framework Next 16 + React 19 + Header code-split, sin NavOverlay que se carga solo al abrir el menú). Es el costo mínimo de cualquier ruta del sitio — no hay mucho margen para bajarlo sin tocar el framework.
- **`/cafe` es la más pesada (163.5KB, margen 16.5KB)** — FilterBar + CafeCatalog (8 facetas, sync de URL, chips) es el componente cliente más pesado del proyecto, confirmando lo que se esperaba desde el addendum-02.
- **`/suscripcion` (161.7KB, margen 18.3KB)** — el configurador de 3 pasos pesa menos de lo temido (~1.9KB gzip sobre el piso compartido) porque es estado local simple (3 `useState`) sin sync de URL ni facetas dinámicas.
- **`/goods/[categoria]`** cae en el piso compartido (159.8KB) porque el filtro de marca es 100% server-rendered (Links con query params, sin componente cliente) — decisión tomada en Fase 5 justamente para no sumar una tercera pieza de UI pesada.
- El margen más ajustado del sitio es 16.5KB. Si una fase futura agrega motion o un componente cliente nuevo a `/cafe`, hay que remedir ahí primero.
