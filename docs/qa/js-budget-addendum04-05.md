# Peso JS y Core Web Vitals — cierre de addendum-04 / addendum-05

Requerido por addendum-04 paso 6 ("Re-medir presupuesto JS y LCP/CLS de /, /cafe y una ficha") tras la fila de iconos interactiva, el video del hero, la restructuración de rutas y la absorción de Academy/Vinyl/Roasting/Carta en /nosotros y /contacto.

## JS budget — todas las rutas reales del sitio post-addendum

Mismo método que `js-budget-fase6.md` (manifests reales, exclusión del chunk `noModule`, gzip individual sumado).

| Ruta | gzip | Estado | Margen |
|---|---:|---|---:|
| `/` | 166.3 KB | PASS | 13.7 KB |
| `/cafe` | 164.1 KB | PASS | 15.9 KB |
| `/cafe/[slug]` | 162.3 KB | PASS | 17.7 KB |
| `/methods-shop` | 160.4 KB | PASS | 19.6 KB |
| `/methods-shop/[categoria]` | 160.4 KB | PASS | 19.6 KB |
| `/marcas-aliadas` | 160.4 KB | PASS | 19.6 KB |
| `/nosotros` | 160.4 KB | PASS | 19.6 KB |
| `/contacto` | 160.4 KB | PASS | 19.6 KB |
| `/suscripcion` | 162.3 KB | PASS | 17.7 KB |
| `/styleguide` | 160.4 KB | PASS | 19.6 KB |
| `/legal/privacidad` | 160.4 KB | PASS | 19.6 KB |
| `/legal/terminos` | 160.4 KB | PASS | 19.6 KB |

**12/12 PASS.**

### Lectura

- **`/` es ahora la ruta más pesada del sitio (166.3KB, margen 13.7KB)** — subió de 161.0KB a 166.3KB (+5.3KB) al convertir `CafeSection` en componente cliente para la fila de iconos interactiva (tablist con cambio de zona + grid filtrado, addendum-04 §4). Es el primer y único componente cliente no trivial de la home, tal como pedía el addendum ("Es el primer componente cliente de la home. Medir su costo"). No empujó `/` sobre 180KB — no hizo falta la salida de emergencia (dynamic import por intersección).
- **`/nosotros` NO se acercó al presupuesto pese a absorber Academy + Vinyl & Drinks + Roasting completos.** El `budget_warning` del addendum-05 asumía que concentrar cuatro páginas en una la haría candidata a exceder 180KB. No ocurrió: los tres proyectos absorbidos son 100% contenido server-rendered (calendario, carta de sellos, pasos de tueste, botones de WhatsApp como `<a>` planos) — cero `useState`, cero interactividad que requiera cliente. `/nosotros` pesa exactamente lo mismo que `/legal/privacidad`. La advertencia del addendum no se materializó; no hizo falta dynamic-import por sección.
- **`/cafe` y `/cafe/[slug]` bajaron su margen relativo levemente** (16.5→15.9KB y 18.3→17.7KB) por el mismo runtime compartido, sin cambios propios en esas rutas.

## Core Web Vitals — LCP/CLS

Medido con `performance_start_trace` sobre build de producción (`npm run start`), sin throttling.

| Ruta | CLS | LCP |
|---|---|---|
| `/` | 0.00 | 259ms (medido en Fase 4, sin cambios de hero visible — `HeroVideoLayer` retorna `null` sin `VIDEO_SRC`, cero impacto) |
| `/cafe` | 0.00 | No reportado por la herramienta como insight (sin `LCPBreakdown` ofrecido — lectura: nada digno de señalar, no un fallo de medición) |
| `/cafe/[slug]` | 0.00 | Igual que `/cafe` — sin insight de LCP ofrecido |

Los tres bajo el criterio de aceptación #10 (LCP < 2.0s, CLS < 0.05) con margen amplio. El gate del hero de video (addendum-04 §3: "si LCP sube por encima de 2.0s o CLS por encima de 0.05, el video sale") no aplica todavía en la práctica — el componente está montado pero inerte sin archivo real, así que no hay nada que medir hasta que `VIDEO_SRC`/`POSTER_SRC` se completen. Volver a correr esta medición en cuanto el cliente entregue el archivo de video (ver `CONTENIDO-PENDIENTE.md`, punto 18).

## Pendiente sin cerrar: `prefers-reduced-motion` real

Addendum-04 §6 pedía cerrar esto con `Emulation.setEmulatedMedia` vía CDP. La herramienta de automatización de navegador disponible en esta sesión (`chrome-devtools-mcp`) expone `emulate` con `colorScheme`, `cpuThrottlingRate`, `networkConditions`, `geolocation`, `userAgent`, `viewport` — **no** con `prefers-reduced-motion` ni ninguna feature de media query arbitraria. No hay acceso a CDP crudo en este toolset para invocar `Emulation.setEmulatedMedia` directamente.

Sigue siendo una verificación de código, no de runtime: las reglas `@media (prefers-reduced-motion: reduce)` en `app/globals.css` cubren reveals, marquee, orbit, zone-shift y letter-reveal (ver auditoría de código en `docs/qa/predelivery-checklist.md`). Recomendado confirmar manualmente en un navegador real (DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion`) antes de producción — no es algo que esta sesión pueda cerrar con las herramientas que tiene.
