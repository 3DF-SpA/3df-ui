# @3df/ui

> Librería de componentes Vue 3 · TypeScript strict · Tailwind CSS v4

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)

## Instalación

```bash
pnpm add @3df/ui
```

**Peer dependencies:**

```bash
pnpm add class-variance-authority clsx tailwind-merge vue
# Opcionales:
pnpm add date-fns          # Calendar / DatePicker
pnpm add embla-carousel    # Carousel
```

## Setup

En tu CSS principal:

```css
@import "tailwindcss";
@import "@3df/ui/theme.css";
```

## Uso básico

```vue
<script setup lang="ts">
import { Button, Card, CardContent } from '@3df/ui';
</script>

<template>
  <Card>
    <CardContent>
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
    </CardContent>
  </Card>
</template>
```

## Temas

| Clase CSS | Descripción |
|---|---|
| *(sin clase)* | Light default |
| `.dark` | Dark default |
| `.light-3df` | Light 3DF (verde/dorado) |
| `.dark-3df` | Dark 3DF |
| `.light-coffe` | Light café cálido |
| `.dark-coffe` | Dark café |

```html
<body class="dark-3df">...</body>
```

### Personalizar bordes

```css
:root {
  --ui-border-width: 1px;  /* default: 2px */
  --ui-radius: 1rem;       /* default: 0.625rem */
}
```

## Componentes

**Formularios** — `Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Switch` · `Toggle` · `Slider` · `Label` · `InputOTP` · `Calendar` · `DatePicker` · `DateRangePicker` · `Combobox`

**Layout** — `Card` · `Separator` · `ScrollArea` · `Table` · `Skeleton` · `Progress` · `Tabs` · `Accordion` · `Collapsible` · `Carousel` · `Banner` · `Item` · `EmptyState`

**Navegación** — `Sidebar` · `NavigationMenu` · `Menubar` · `Breadcrumb` · `Pagination` · `Command`

**Overlays** — `Dialog` · `Drawer` · `Sheet` · `AlertDialog` · `DropdownMenu` · `ContextMenu` · `Popover` · `HoverCard` · `Tooltip` · `Toaster`

**Feedback** — `Alert` · `Badge` · `Avatar`

**Marketing** — `Hero` (6 variantes) · `LogoCloud` · `LogoMarquee`

## Licencia

MIT © 2026 [3DF Space](https://github.com/3df-space)
