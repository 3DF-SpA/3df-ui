# @3df-spa/ui

## 1.5.1

### Patch Changes

- add

## 1.5.0

### Minor Changes

- Bordes configurables globalmente con CSS custom properties
  - Todos los componentes ahora usan `border-ui` (custom @utility) en vez de `border-2` hardcodeado
  - Nueva variable `--ui-border-width` (default: `2px`) controla el grosor de TODOS los bordes
  - Nueva variable `--ui-radius` (default: `0.625rem`) escala proporcionalmente `rounded-sm/md/lg/xl`
  - Utilidades direccionales: `border-t-ui`, `border-r-ui`, `border-b-ui`, `border-l-ui`
  - El consumidor personaliza todo el design system con solo 2 variables CSS:
    ```css
    :root {
      --ui-border-width: 1px;
      --ui-radius: 1rem;
    }
    ```

## 1.4.2

### Patch Changes

- Cambios importantes

## 1.3.2

### Patch Changes

- cambios en bordes y agegando el banner

## 1.3.1

### Patch Changes

- Diseño borderless: eliminados todos los bordes visibles (outline-1, outline-border) de todos los componentes.

  La separación visual ahora se logra mediante fondos elevados, rellenos translúcidos y sombras.
  Tokens de tema actualizados para background, card, popover y muted en dark mode.

## 1.3.0

### Minor Changes

- Diseño borderless: eliminados todos los bordes visibles (outline-1, outline-border) de todos los componentes.

  La separación visual ahora se logra mediante:
  - Fondos elevados: bg-card/bg-popover al 5% en dark mode vs bg-background al 0%
  - Rellenos translúcidos: bg-foreground/5 en form controls (Input, Textarea, Select, Combobox, DatePicker)
  - bg-foreground/[0.06] en variantes "outline" de Button, Badge y Toggle
  - Sombras (shadow-sm, shadow-md, shadow-lg) en paneles flotantes

  Tokens actualizados en theme.css:
  - Light: background → hsl(0 0% 98%) para que cards blancas destaquen
  - Dark: card/popover → hsl(0 0% 5%), muted → hsl(0 0% 10%)

  Documentación actualizada (README, llms.txt, AGENTS.md) con filosofía borderless y componente Banner.

## 1.2.1

### Patch Changes

- fix: incluir @source en [theme.css](http://_vscodecontentref_/1) para que consumidores no necesiten configurarlo manualmente

## 1.0.1

### Patch Changes

- fix: incluir estilos scoped en styles.css y corregir documentacion de @source

## 1.0.0

### Major Changes

- changes

## 0.2.0

### Minor Changes

- feat: generar styles.css pre-compilado con todas las utilidades Tailwind — consumidores solo necesitan `@import '@3df-spa/ui/styles.css'`

## 0.1.2

### Patch Changes

- fix: agregar safelist.html auto-generado para compatibilidad con Tailwind CSS v4 @source en consumidores

## 0.1.1

### Patch Changes

- fix: cambiar extensión de build de .mjs a .js para compatibilidad con Tailwind CSS v4 @source
