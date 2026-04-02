# Changelog — Releases 1.5.7 · 1.5.8 / Charts 1.5.2

**Última actualización:** 2026-04-02

---

## @3df-spa/ui — v1.5.8

### Documentation

#### Fix: descripción del paquete corregida en README

**Problema:** La descripción introductoria del README publicado en npm decía `"A private design system built for internal 3DF projects"`. Esto es incorrecto — el paquete está publicado como público en npm (`"access": "public"`) y el repositorio es abierto en GitHub.

**Fix:** La línea fue reemplazada por:

> `Open source design system by 3DF SpA.`

**Archivo modificado:** `packages/ui/README.md`

**Versiones bumped:**

| Paquete | Versión anterior | Nueva versión |
|---------|-----------------|---------------|
| `@3df-spa/ui` (`packages/ui/package.json`) | `1.5.7` | `1.5.8` |
| Raíz workspace (`package.json`) | `1.5.7` | `1.5.8` |

---

## @3df-spa/ui — v1.5.7

### Documentation

#### README completamente reescrito para npm

**Problema previo:** El README publicado en npm era extremadamente escueto. Solo mostraba el título, dos badges, el comando de instalación, las peer dependencies opcionales y el bloque de CSS de setup. No reflejaba en absoluto la riqueza real del paquete.

**Cambios realizados:**

- **Hero section mejorada:** El subtítulo ahora indica de forma explícita la cantidad real de componentes (`199 Vue 3 components`) y los pilares técnicos del paquete (TypeScript strict, Tailwind CSS v4, dark mode, accessible, zero `!important`). Se agregaron 5 badges informativos (npm version, License, Vue 3, Tailwind v4, TypeScript).

- **Quick start:** Se añadió un ejemplo funcional completo que muestra cómo importar múltiples componentes y construir un formulario básico, para que el desarrollador pueda evaluar la API sin necesidad de abrir la documentación externa.

- **Tabla completa de componentes por categoría:**
  - **Forms (12 componentes):** `Button`, `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `Radio`, `Switch`, `Toggle`, `Slider`, `InputOTP`, `Combobox` — con descripción individual y ejemplo de uso de `buttonVariants`.
  - **Data Display (14+ componentes):** `Badge`, familia `Card`, `Table`, `DataTable`, `PanelTable`, `Skeleton`, `Progress`, `Separator`, `ScrollArea`, `Kbd`, `Item`, `EmptyState`, `Avatar`, `Alert`.
  - **Navigation (5 familias, 30+ componentes):** `Sidebar` (17 sub-componentes + `useSidebar()`), `Pagination`, `NavigationMenu`, `Menubar`, `Breadcrumb`.
  - **Overlays (12 familias, 60+ componentes):** `DropdownMenu`, `Popover`, `Tooltip`, `HoverCard`, `Dialog`, `Drawer`, `Sheet`, `AlertDialog`, `ContextMenu`, `Command`, `CommandPalette`, `Toaster`.
  - **Disclosure (3 familias):** `Accordion`, `Collapsible`, `Tabs` (variantes: underline, pill, card).
  - **Marketing (10 componentes):** 7 layouts de Hero, `LogoCloud`, `LogoMarquee`, `Banner`.

- **Subpath imports documentados:** Se explica claramente la separación de `@3df-spa/ui/calendar` y `@3df-spa/ui/carousel` como subpaths opcionales, junto con sus peer dependencies requeridas (`date-fns`, `embla-carousel`).

- **Guía de theming completa:**
  - Tokens CSS disponibles para override (primary, secondary, destructive, success, warning, info, border-hsl, radius).
  - Dark mode: activación via clase `.dark` en cualquier ancestro.
  - Tema 3DF Forest Green: activación via clase `.theme-3df`, combinable con `.dark`.
  - Runtime configurator: componente `Ui3df` para que el usuario final cambie tema, radio, border width, fuentes y letter spacing sin recargar.

- **Sección de customización global de bordes y radio:** Documenta las variables `--ui-border-width` y `--ui-radius` con ejemplos (borders delgados, modo sin bordes, esquinas más redondeadas) y menciona las utilidades direccionales (`border-t-ui`, `border-r-ui`, etc.).

- **TypeScript exports:** Lista los tipos exportados más relevantes para que los desarrolladores TypeScript puedan autocompletar sin revisar el código fuente.

- **Pie de página:** Links al repositorio, issues y al paquete hermano `@3df-spa/charts`.

**Archivo modificado:** `packages/ui/README.md`

---

## @3df-spa/charts — v1.5.2

### Documentation

#### README completamente reescrito para npm

**Problema previo:** El README publicado en npm era aún más escueto que el de ui. Solo contenía título, dos badges, el comando de instalación y una línea diciendo "Requires Vue 3 as peer dependency". No documentaba ningún chart, ningún ejemplo de uso, ni la arquitectura del paquete.

**Cambios realizados:**

- **Hero section mejorada:** El subtítulo ahora enumera las características clave: `6 chart types`, `Pure SVG`, `Zero runtime dependencies`, `TypeScript`, `Responsive`, `Dark mode`. Se añadieron 5 badges (npm version, License, Vue 3, Zero deps, TypeScript).

- **Descripción técnica:** Se explica la arquitectura (SVG puro, sin Canvas, sin D3, sin librerías pesadas, `ResizeObserver` para responsive, `requestAnimationFrame` para animaciones).

- **Setup standalone vs. integrado:** Se documenta el setup recomendado con `@3df-spa/ui/theme.css` y también el setup standalone para quienes no usan el paquete de UI, incluyendo los 6 tokens CSS de color que se deben definir.

- **Quick start completo:** Ejemplo funcional con `UiChartBar`, `ChartConfig` tipado y `ChartDataRow[]` tipado.

- **Documentación de los 6 tipos de charts:**
  - `UiChartBar` — barras agrupadas/apiladas, horizontal/vertical, animated.
  - `UiChartLine` — líneas suaves/lineales/step con área y dots.
  - `UiChartPie` — pie o donut con gradientes radiales.
  - `UiChartRadar` — radar polygon o line para comparaciones multi-eje.
  - `UiChartScatter` — scatter plot X/Y con shapes configurables (circle, square, triangle, diamond, cross).
  - `UiChartGauge` — gauge arco o aguja con segmentos de umbral.

- **Configuración de `ChartConfig` y `ChartDataRow`** con ejemplos TypeScript tipados.

- **Componentes compartidos documentados:** `UiChartContainer`, `UiChartTooltip`, `UiChartLegend` con ejemplo de uso directo para charts custom.

- **Tabla de colores:** Los 6 tokens `--color-chart-N` con sus valores HSL por defecto y descripción del mecanismo de resolución (`getComputedStyle` en mount para compatibilidad con dark mode).

- **TypeScript exports completos:** Lista todos los tipos exportados del paquete.

- **Pie de página:** Links al repositorio, issues y al paquete hermano `@3df-spa/ui`.

**Archivo modificado:** `packages/charts/README.md`

---

## Versiones bumped

| Paquete | Versión anterior | Nueva versión |
|---------|-----------------|---------------|
| `@3df-spa/ui` (`packages/ui/package.json`) | `1.5.6` | `1.5.7` |
| `@3df-spa/charts` (`packages/charts/package.json`) | `1.5.1` | `1.5.2` |
| Raíz workspace (`package.json`) | `1.5.6` | `1.5.7` |

---

## Consumer action

```bash
pnpm update @3df-spa/ui @3df-spa/charts
```

No se requieren cambios de código. Esta release es puramente de documentación y versioning.
