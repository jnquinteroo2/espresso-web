# Contraste WCAG 2.2 AA — cinco zonas de tema

Calculado programáticamente (luminancia relativa WCAG, `(L1+0.05)/(L2+0.05)`). Script: ver historial de sesión, reproducible con cualquier script Python/Node estándar de contraste WCAG sobre los hex de `docs/BRAND.md`.

## Texto principal (`--fg` sobre `--bg`)

| Zona | bg | fg | Ratio | AA normal (4.5:1) | AA large (3:1) |
|---|---|---|---|---|---|
| paper | #FFFFFF | #000000 | 21.00 | PASS | PASS |
| beige | #FFF7E6 | #000000 | 19.70 | PASS | PASS |
| blue | #072230 | #FFF7E6 | 15.38 | PASS | PASS |
| green | #0A302B | #FFF7E6 | 13.40 | PASS | PASS |
| ink | #000000 | #FFF7E6 | 19.70 | PASS | PASS |

## Texto muted (`--muted`, usado en MicroLabel/labels secundarios)

| Zona | Ratio | AA normal (4.5:1) |
|---|---|---|
| paper (rgba(0,0,0,.55)) | 4.76 | PASS |
| beige (rgba(0,0,0,.55)) | 4.69 | PASS |
| blue (rgba(255,247,230,.62)) | 6.62 | PASS |
| green (rgba(255,247,230,.62)) | 6.04 | PASS |
| ink (rgba(255,247,230,.60)) | 6.97 | PASS |

## RibbonTag (vino)

| Par | Ratio | AA normal |
|---|---|---|
| Beige texto / fondo vino #5C1A2B | 12.03 | PASS |

## Resultado

Las 5 zonas y sus variantes muted cumplen AA (4.5:1) en texto normal — margen amplio en todos los casos, el más ajustado es beige-muted a 4.69:1. Ningún hallazgo abierto.

**Nota de mantenimiento:** si en Fase 5 se introducen combinaciones no cubiertas aquí (p. ej. `--rule` como texto, o vino sobre zona `ink`), recalcular antes de usarlas — el presupuesto de vino está limitado a RibbonTag/Vinyl & Drinks por regla de marca, no a texto corrido.
