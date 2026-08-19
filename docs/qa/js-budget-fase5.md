# Fase 5 — progress bar, header, y gate de JS en /cafe y /cafe/[slug]

## Punto 1 — Barra de progreso revertida a var(--fg) real (no mix-blend)

`mix-blend-mode: difference` producía colores fuera de paleta contra fondos de color (verde → rosa #F5CFD4, azul → durazno #F8DDCF — ninguno es beige #FFF7E6). Corregido.

**Hallazgo al revisar esto:** no existía ningún mecanismo de "zona activa" que alimentara al header — se verificó en vivo (screenshot con scroll dentro de la sección Roasting/ink) que el header se quedaba blanco/negro (paper) sin importar qué zona había debajo. El requisito original del header ("hereda la zona bajo ella") tampoco estaba implementado. Se construyó `components/motion/ActiveZoneTracker.tsx`: un IntersectionObserver que detecta qué `[data-zone-track]` cruza la línea de 72px bajo el header y copia sus `--bg`/`--fg` a `--active-bg`/`--active-fg` en `:root`. Header y ProgressBar ahora leen esas variables (`bg-active-bg`, `text-active-fg`, `bg-active-fg`) con transición de 600ms. `ThemeZone` ganó una prop `track` para marcar qué secciones participan del rastreo — todas las zonas de nivel de página (6 secciones de home, Footer, y el `ThemeZone` raíz de cada subpágina) la usan.

Verificado en vivo: header y progress bar invierten correctamente a ink/green/etc. al cruzar cada sección.

## Punto 2 — /cafe y /cafe/[slug] contra el gate de 180KB

Mismo método que Fase 2/4 (manifests reales, exclusión del chunk `noModule`, suma de gzip individual).

| Ruta | Total gzip | Resultado | Margen |
|---|---:|---|---:|
| `/` (home) | 160.6 KB | PASS | 19.4 KB |
| `/cafe` (catálogo + FilterBar) | 163.3 KB | PASS | 16.7 KB |
| `/cafe/[slug]` (ficha + CafePurchase) | 161.6 KB | PASS | 18.4 KB |

Ninguna excede el presupuesto. El margen se va cerrando a medida que se agregan componentes cliente (FilterBar+CafeCatalog añaden ~26KB gzip sobre el runtime base de 137KB) — vigilar en /suscripcion (configurador de 3 pasos) y /goods/[categoria] (filtros de marca/precio), que son las próximas rutas con estado de cliente no trivial.

FilterBar/CafeCatalog probados en vivo: 8 facetas derivadas dinámicamente del catálogo (ninguna vacía — Origen solo muestra Colombia/Etiopía porque son los únicos países presentes), filtro por Origen=Etiopía reduce a 1 resultado (Nómada), URL queda en `/cafe?origen=Etiopía`, recargar la página recupera el mismo resultado filtrado (criterio de aceptación #7), conteo con `aria-live="polite"`. Sin errores de consola.

## Punto 4 — recordatorios verificados

- Vino: usado únicamente en RibbonTag y en `/vinyl-and-drinks` (extras `+`, MetaBar). Ningún RibbonTag se colocó sobre fondo vino — verificado en `/vinyl-and-drinks` (RibbonTag "Próxima edición" está sobre fondo ink, no vino) y en `/cafe` (los 8 `colorBloque` son ink/blue/green, wine excluido por el tipo desde el fix de Fase 4).
- FilterBar usa exactamente la taxonomía del addendum-02: tueste, origen, proceso, perfil, cafeína, variedad + estado + método (8 facetas). Ninguna se lista vacía — se derivan de los valores reales presentes en `content/cafes.ts` (`lib/cafe-facets.ts::getFacetOptions`).
- JSON-LD: `Product` en `/cafe/[slug]`, `Event` en `/vinyl-and-drinks` (vía `ItemList`), `Course` en `/academy` (vía `ItemList`) y en cada `/academy/[clase]`.
