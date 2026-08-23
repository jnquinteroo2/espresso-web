# ESPRESSO COFFEE SHOP — Manual de marca aplicado a web

Fuente: bloque `<brand>` del prompt original + `addendum-01` (correcciones de fuentes) + `addendum-07` (retiro del sello circular, 2026-08-19, ver abajo). Este documento es la referencia congelada — no se toca sin aprobación explícita del cliente.

## Identidad

- **Nombre:** ESPRESSO COFFEE SHOP
- **Ubicación:** Mosquera, Cundinamarca, Colombia
- **Líneas de negocio:** café tostado propio (grano/molido), cafetería/barra, Espresso Academy (Master Class sábados 8:00–10:30 a.m.), Vinyl & Drinks (noches de vinilo), Methods shop (equipos/accesorios), roasting/tostión propia.

## Logos

- **Wordmark primario** (`/brand/espresso-wordmark.svg`): "ESPRESSO" versalitas espaciadas con macrón sobre la E, "COFFEE SHOP" debajo en tamaño menor. Negro sobre blanco o invertido. Nunca en beige/azul/verde/gris. Resguardo mínimo = altura de la E.
- **Monograma** (`components/brand/Monogram.tsx`): la Ē sola, con el mismo macrón que el wordmark, sin círculo ni anillo de texto. Es la firma de marca en el header, el centro de las filas de 4 íconos (`IconRow`, tabs de "El café") y el footer. Invierte de color heredando `currentColor` de la zona, igual que el resto de la marca.
- **`addendum-07` (2026-08-19) — retiro del sello circular, decisión explícita del cliente:** el sello circular con texto en trayectoria (`espresso-seal.svg` / `components/brand/CircularSeal.tsx`) se retiró de todo el sitio — la marca no vuelve a mostrar la Ē (ni ningún otro elemento) dentro de un círculo, en ningún tamaño ni contexto. `CircularSeal.tsx` queda en el repo sin uso, sin borrar, por si hace falta revertir. Donde el sello mostraba el monograma (header, filas de íconos, footer) ahora va `Monogram`, más grande que antes. Donde mostraba un ícono propietario de sección (asterisco en suscripción, reloj en roasting, estrella en academy, el ícono de cada trago en Vinyl & Drinks) ahora va ese mismo `BrandIcon`/`DrinkIcon` suelto, sin anillo, a mayor tamaño (~64–80px) para conservar peso visual sin el aro. La regla "nunca rotar salvo asterisco en animación de sello" queda sin efecto práctico: ningún elemento de marca rota ya. — **Revertido parcialmente por `addendum-08`, ver abajo.**
- **`addendum-08` (2026-08-23) — vuelve el sello circular, solo en el header; llegó el arte real.** Corrección del cliente (`Correcciones.pdf`): "eliminar sombra y agregar logo correcto" sobre la marca circular del header. El cliente entregó el arte real de los 4 íconos, el monograma, el wordmark y el sello circular como archivos (Cloudinary, ver `content/brand-assets.ts`) — resuelve los puntos 1-3 de "Bloqueado por el cliente" en `docs/CONTENIDO-PENDIENTE.md`. Con el arte real disponible, el header (`components/layout/Header.tsx`) vuelve a mostrar el sello circular completo (antes solo `Monogram`) usando el PNG entregado, no `CircularSeal.tsx` generado — arte fijo en gris de marca (`--seal`), sin sombra, se lee igual en cualquier fondo. El resto de `addendum-07` sigue vigente: en filas de íconos (`IconRow`, tabs de "El café") y footer sigue `Monogram`, ahora también con el archivo real del cliente en vez de la versión dibujada en CSS. `BrandIcon` (arco/asterisco/reloj/estrella) también pasa de paths de placeholder a los 4 pares de PNG reales (blanco/negro, uno por zona clara/oscura). Ninguno de estos assets vive en `/public`: son URLs de Cloudinary centralizadas en `content/brand-assets.ts`, para que un cambio de arte futuro sea editar ese archivo, no tocar componentes.
- Sin sombra, degradado, contorno ni deformación en ningún logo. ® solo en piezas de campaña, no en el header.

## Sistema de color

Base blanco/negro. El color es BLOQUE de sección, no acento decorativo.

| Token | Hex/valor | Nombre | Rol |
|---|---|---|---|
| `--ink` | #000000 | Black | Texto principal, wordmark, fondos de máximo peso |
| `--paper` | #FFFFFF | White | Fondo por defecto |
| `--beige` | #FFF7E6 | Beige | Fondo cálido / texto sobre azul-verde-negro |
| `--blue` | #072230 | Blue | Fondo profundo, marino casi negro |
| `--green` | #0A302B | Green | Fondo profundo, verde bosque casi negro |
| `--seal` | #808080 | Seal Gray | Sin uso activo desde `addendum-07` (era exclusivo del sello circular, retirado) — token queda definido por si se reutiliza |
| `--wine` | #5C1A2B | Wine | Acento editorial restringido — solo Vinyl & Drinks y RibbonTag, máx 2% de área visible |
| `--hairline-light` | rgba(0,0,0,0.14) | — | Filetes sobre fondo claro |
| `--hairline-dark` | rgba(255,247,230,0.22) | — | Filetes sobre fondo oscuro |

**Zonas de tema** (`data-theme`): paper, beige, blue, green, ink — cada una redefine bg/fg/muted/rule vía CSS vars (ver DESIGN_SYSTEM.md).

**Reglas de uso:**
- Beige nunca es texto sobre blanco (sin contraste).
- Azul y verde nunca coexisten en una misma pantalla; se separan por zona clara.
- Sobre azul/verde el texto va en beige, nunca blanco puro.
- Máx. 2 zonas oscuras consecutivas en un scroll.
- Prohibido degradado, sombra de color, glassmorphism, neumorfismo.
- Vino: presupuesto máx 2% del área visible de la página donde aparece.

## Tipografía — STACK FINAL (post addendum-01)

Bloqueo de licencia resuelto: DIN Alternate Bold (Apple/Monotype) y Myriad Pro (Adobe CDN-only) no son self-hosteables. Sustituidas por equivalentes de licencia abierta, uso idéntico:

| Rol | Fuente original (impreso) | Fuente web (final) | Licencia | Fallback |
|---|---|---|---|---|
| PRINCIPAL (80% del sitio) | Garet Book | **Garet** | Free For Commercial Use (Type Forward) | Outfit → Hanken Grotesk → system-ui |
| DISPLAY / DATO | DIN Alternate Bold | **DINish Bold** (playbeing/dinish) | SIL OFL 1.1 | Archivo → Barlow → Helvetica Neue |
| AUXILIAR | Myriad Pro | **Source Sans 3** | SIL OFL 1.1 | system-ui |

Self-host los tres vía `next/font/local`. Copia de texto de licencia en `/public/fonts/LICENSES/`. Nota para cliente en `docs/CONTENIDO-PENDIENTE.md`: el material impreso puede seguir en DIN Alternate/Myriad Pro; la web usa los equivalentes abiertos, diferencia imperceptible en los usos definidos.

**Escala** (clamp fluido, baseline 8px, ver tokens completos en DESIGN_SYSTEM.md): `--fs-micro` a `--fs-numeral`. DINish Bold ocupa el rol de `--fs-numeral` (números grandes, códigos de producto, precios).

**Reglas:**
- Tracking 0.26em nunca en titulares grandes (>60px).
- Todo bloque de contenido lleva una MicroLabel encima.
- Prohibida cursiva. Prohibido subrayado salvo foco de teclado y enlaces en párrafo.
- Máx 3 tamaños tipográficos por sección.
- Cifras tabulares (`font-variant-numeric: tabular-nums`) en tablas y precios.

## Iconografía

4 iconos de línea propietarios (arco, asterisco, reloj, estrella) — SVG `stroke="currentColor"`, sin relleno, peso uniforme. Ya existen como SVG terminados en la marca del cliente (implementar, no diseñar).

**Corrección addendum-01:** se descarta `vector-effect="non-scaling-stroke"`. Grosor por tramo de tamaño con corrección óptica, como prop derivado de `size`:

| size | stroke-width |
|---|---|
| 20px (tarjeta) | 1.25 |
| 24–28px (firma) | 1.5 |
| 32–40px (sello) | 1.75 |
| >40px | 2 |

Nunca rellenar, colorear con vino, ni rotar. Iconos de interfaz sin equivalente propietario (carrito, buscar, cerrar, flechas): Lucide, stroke-width 1.5. Nunca mezclar familias en un mismo grupo visual.

## Lenguaje gráfico obligatorio

micro-caps-meta · plus-highlight (+beneficios en vino/acento de zona) · editorial-numeral (DINish) · hairline-list · ribbon-tag (vino, rotación -6° a -9°) · blur-echo (máx 1 por página) · inverted-edition (zona ink) · extreme-whitespace (min-height 85vh, densidad baja).

`circular-seal-text` se retiró de este listado en `addendum-07` — ver nota en Logos arriba.

## Voz

Español de Colombia, tuteo neutro. Precisión sobre poesía — datos concretos (altura, variedad, proceso, fecha, gramos, temperatura, precio). Frases cortas. Labels en versalitas, sustantivos secos. CTA en infinitivo/imperativo. Prohibido registro Onyx ("pilgrimage", "journey", "viaje sensorial", etc.).

Ejemplo correcto: "ORIGEN — Huila, Colombia. 1.750 msnm. Caturra. Lavado. Tueste del 12 de agosto."
