# Índice de capturas

Set regenerado: 2026-08-18 (addendum-06). Commit: sin commits todavía en este repo (git inicializado en Fase 2, working tree sin historial — ver nota abajo).

## Qué cambió respecto al set anterior (2026-08-17)

Este set reemplaza por completo el generado para addendum-05. Se recapturaron las 13 imágenes tras aplicar los 4 fixes de addendum-06:

1. **Colisión de contraste `colorBloque`/zona** (`lib/cafe-card-color.ts`) — en zonas oscuras (`blue`/`green`/`ink`) las tarjetas de café ya no usan su `colorBloque` original (los tres valores son casi negros entre sí, ~1.0–1.5:1 de contraste); caen a fondo beige + texto ink (13.4–19.7:1 verificado). Visible en `home-icono-activo--1440.png` (tab "Perfil", zona blue): las tarjetas usan beige/ink, no el azul/negro original de cada lote.
2. **`CircularSeal` ilegible en tamaños chicos** (`components/brand/CircularSeal.tsx`) — por debajo de 120px ya no intenta poner texto en trayectoria (se leía como arco roto); renderiza un círculo de filete limpio con una "Ē" centrada. El sello de 56px en el centro de la fila de tabs de café (`home--1440.png`, `home-icono-activo--1440.png`) usa este modo compacto.
3. **Macron + subtítulo "COFFEE SHOP" invisible** — bug real de herencia de unidad `em` (el span del subtítulo heredaba el tamaño del ancestro compartido, no del hermano, y renderizaba en ~5px). Corregido en `Wordmark.tsx` y `HeroWordmark.tsx` con `--text-micro` y una barra de macron explícita. Visible en `home--1440.png`/`home--390.png` (hero) y en el header de cualquier captura.
4. **Marquee de notas de cata eliminado** de la sección Café de home (competía visualmente con la fila de iconos interactiva). `home--1440.png` ya no muestra cinta de notas bajo el grid de lotes — `components/motion/Marquee.tsx` se borró por quedar sin uso.

También incorpora el ajuste no bloqueante de addendum-06 (numerales de `NavOverlay` más grandes, `clamp(28px,4vw,48px)`) — visible en `home-menu-abierto--1440.png`.

## Método

12 de las 13 capturas se tomaron con **motion forzado a estado reducido**, no con `Emulation.setEmulatedMedia` real de CDP: la herramienta de automatización disponible en esta sesión (`chrome-devtools-mcp`) expone `emulate` con `colorScheme` / `cpuThrottlingRate` / `networkConditions` / `geolocation` / `userAgent` / `viewport` — **no** con `prefers-reduced-motion` ni ninguna media feature arbitraria, y no hay acceso a CDP crudo en este toolset.

En su lugar, antes de cada captura se inyectó vía `evaluate_script` una hoja de estilos con las mismas reglas exactas que `app/globals.css` define dentro de `@media (prefers-reduced-motion: reduce)` (mismos selectores: `[data-reveal]`, `[data-orbit-3d]`/`[data-orbit-fallback]`, el `*` global de duración de animación). Produce el mismo resultado visual que la media query real — verificado en las capturas: `BrandOrbit` colapsado a su grid de fallback, reveals en su estado final, cero movimiento — pero es una réplica dirigida del código, no una emulación de la preferencia del sistema operativo. Diferencia técnica real, documentada para que quede clara.

**Build servido:** regenerado con `rm -rf .next && npm run build && npm run start` antes de esta pasada, para evitar el problema de build viejo detectado en el set anterior (servidor `next start` de larga duración sirviendo `.next/` desactualizado tras rebuilds repetidos). Todas las capturas de este índice son del build con los 4 fixes de addendum-06 aplicados.

## Set — motion reducido (simulado por CSS, ver método arriba)

| Archivo | Ruta | Qué muestra |
|---|---|---|
| `home--1440.png` | `/` | Página completa, desktop. Hero con macron + subtítulo "COFFEE SHOP" visibles (fix 3). Sección café sin marquee (fix 4), sello central de 56px en modo compacto (fix 2). `BrandOrbit` en grid de fallback. Tab "Origen" preseleccionado (zona beige). |
| `home--390.png` | `/` | Página completa, mobile (390px). Mismo estado de motion reducido, mismos fixes visibles. |
| `cafe--1440.png` | `/cafe` | Catálogo completo con FilterBar, 8 facetas, grid de 8 lotes. |
| `cafe-titan--1440.png` | `/cafe/titan` | Ficha de café — tabla de transparencia de 10 campos, selector de presentación/molienda, "Otros lotes". |
| `nosotros--1440.png` | `/nosotros` | Página larga completa: historia → índice "Nuestros proyectos" → Academy (calendario completo) → Vinyl & Drinks (carta de sellos) → Roasting (pasos + trazabilidad) → Valores → Equipo. Las tres secciones absorbidas por addendum-05, en una sola captura. |
| `methods-shop--1440.png` | `/methods-shop` | Hub de las 4 categorías. |
| `suscripcion--1440.png` | `/suscripcion` | Configurador de 3 pasos + FAQ. |
| `marcas-aliadas--1440.png` | `/marcas-aliadas` | Grid agrupado por tipo (máquinas/molinos/métodos/insumos). |
| `contacto--1440.png` | `/contacto` | Dirección/horario/mapa placeholder + sección `#carta` completa absorbida (addendum-05). |
| `styleguide--1440.png` | `/styleguide` | Las 5 zonas con todos los componentes. |
| `home-menu-abierto--1440.png` | `/` | Viewport, `NavOverlay` abierto — las 6 entradas exactas de addendum-05 (Quiénes somos/Coffee/Suscripción/Methods shop/Marcas aliadas/Contáctanos), numeral DINish más grande (`clamp(28px,4vw,48px)`, design_note addendum-06), sublabel "Nuestros proyectos" bajo la primera. |
| `home-icono-activo--1440.png` | `/` | Viewport, tab "Perfil" (arco) activo — zona cambiada a blue, grid filtrado a `perfil=moderno` (3 lotes: Obsidiana/Altiplano/Nómada), tarjetas en beige/ink por el fix de contraste (fix 1, ya no colorBloque original sobre fondo oscuro), filete de 2px bajo el símbolo activo, header también invertido a blue. |

## Set — motion normal (real, sin inyección)

| Archivo | Ruta | Qué muestra |
|---|---|---|
| `home-marcas-aliadas-orbit--1440.png` | `/` | Viewport (no página completa), sección Marcas Aliadas. `BrandOrbit` en su estado real: cilindro 3D en rotación, marcas a distinto tamaño/perspectiva según su posición en el arco — confirma que el fallback estático de las otras capturas es específico del modo reducido, no el comportamiento por defecto. |

## Nota sobre git

El repo se inicializó en Fase 2 (`git init`) pero no tiene commits — instrucción explícita del proyecto es no commitear sin pedido directo del usuario. La fecha de este índice es la fecha real de generación; no hay hash de commit que referenciar todavía.
