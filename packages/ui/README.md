# @3df-spa/ui

> **199 Vue 3 components** — TypeScript strict · Tailwind CSS v4 · Dark mode · Accessible · Zero `!important`

[![npm version](https://img.shields.io/npm/v/@3df-spa/ui)](https://www.npmjs.com/package/@3df-spa/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883)](https://vuejs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org)

A private design system built for internal 3DF projects. Every component uses `<script setup lang="ts">`, CVA variants, and `cn()` (clsx + tailwind-merge) — no scoped styles, no `!important`, full `class` override support out of the box.

---

## Installation

```bash
pnpm add @3df-spa/ui
```

**Optional peer dependencies** (only install what you need):

```bash
pnpm add date-fns          # Calendar, DatePicker, DateRangePicker
pnpm add embla-carousel    # Carousel
```

---

## Setup

Add these two imports to your global CSS entry point:

```css
@import "tailwindcss";
@import "@3df-spa/ui/theme.css";
```

That's it. The theme file registers all design tokens, dark mode variant, the `border-ui` utility, and the `@source` directive so Tailwind v4 scans the compiled components automatically — no extra configuration needed.

---

## Quick start

```vue
<script setup lang="ts">
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from '@3df-spa/ui'
</script>

<template>
  <Card class="w-80">
    <CardHeader>
      <CardTitle>Sign in</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <Button class="w-full">Continue</Button>
    </CardContent>
  </Card>
</template>
```

---

## Components

### 🖊 Forms

| Component | Description |
|-----------|-------------|
| `Button` | Action button — variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link` |
| `Input` | Single-line text field with size variants and error state |
| `Textarea` | Multi-line field with optional auto-resize and error state |
| `Label` | Accessible form label |
| `Select` / `SelectItem` | Native-accessible select with search and group support |
| `Checkbox` | Accessible checkbox with indeterminate state and size prop |
| `Radio` | Accessible radio button for single-selection groups |
| `Switch` | On/off toggle with CSS animation |
| `Toggle` | Active/inactive button for feature toggling |
| `Slider` | Numeric range slider |
| `InputOTP` | One-time password input with pattern validation |
| `Combobox` | Searchable filterable dropdown with keyboard navigation |

```vue
<script setup lang="ts">
import { Button, buttonVariants } from '@3df-spa/ui'
</script>

<template>
  <Button variant="outline" size="sm">Cancel</Button>
  <Button variant="destructive">Delete</Button>
  <!-- or use the variant helper directly on any element -->
  <a :class="buttonVariants({ variant: 'link' })" href="/docs">Docs</a>
</template>
```

---

### 📊 Data Display

| Component | Description |
|-----------|-------------|
| `Badge` | Status label — variants: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info` |
| `Card` / `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` | Structured content container |
| `Table` + sub-components | Accessible HTML table with sticky header and hover rows |
| `DataTable` + sub-components | Advanced table with sorting, skeleton, and shared context |
| `PanelTable` + sub-components | Panel table with color accents and animated rows |
| `Skeleton` | Animated loading placeholder |
| `Progress` | Animated progress bar with accessible `aria` value |
| `Separator` | Horizontal or vertical divider |
| `ScrollArea` | Custom scroll container without native scrollbar |
| `Kbd` | Keyboard shortcut display in monospace style |
| `Item` / `ItemLabel` / `ItemDescription` | Reusable row item with optional label and description |
| `EmptyState` | Empty state slot with icon, title, and description |
| `Avatar` / `AvatarImage` / `AvatarFallback` / `AvatarGroup` | Circular profile image with initials/icon fallback |
| `Alert` / `AlertTitle` / `AlertDescription` | Informational alert — variants: `default`, `destructive`, `success`, `warning`, `info` |

---

### 🧭 Navigation

| Component | Description |
|-----------|-------------|
| `Sidebar` + 17 sub-components | Full collapsible sidebar system with `useSidebar()` composable |
| `Pagination` + sub-components | Accessible pagination with ellipsis |
| `NavigationMenu` + sub-components | Horizontal navigation with flyout menus |
| `Menubar` + sub-components | Desktop-style menu bar (File · Edit · View…) |
| `Breadcrumb` + sub-components | Accessible breadcrumb trail |

---

### 🪟 Overlays

| Component | Description |
|-----------|-------------|
| `DropdownMenu` + sub-components | Accessible dropdown with keyboard navigation, checkboxes, radios, submenus |
| `Popover` / `PopoverTrigger` / `PopoverContent` | Anchored floating panel |
| `Tooltip` / `TooltipTrigger` / `TooltipContent` | Hover tooltip |
| `HoverCard` + sub-components | Rich hover preview card |
| `Dialog` + sub-components | Modal dialog with focus trap |
| `Drawer` + sub-components | Bottom/side drawer panel |
| `Sheet` + sub-components | Full-height sliding sheet (top, right, bottom, left) |
| `AlertDialog` + sub-components | Confirmation dialog with accessible action/cancel |
| `ContextMenu` + sub-components | Right-click context menu with keyboard support |
| `Command` / `CommandDialog` + sub-components | Command palette-style search |
| `CommandPalette` | Ready-made `⌘K` command palette component |
| `Toaster` + `toast()` | Toast notification system with position, variants, and promise support |

---

### 📂 Disclosure

| Component | Description |
|-----------|-------------|
| `Accordion` + sub-components | Single or multiple open panels |
| `Collapsible` + sub-components | Simple show/hide toggle |
| `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` | Tab navigation — variants: `underline`, `pill`, `card` |

---

### 🎨 Marketing

| Component | Description |
|-----------|-------------|
| `HeroSimple`, `HeroSplit`, `HeroImage`, `HeroGradient`, `HeroCentered`, `HeroMinimal`, `HeroVideo` | 7 hero section layouts |
| `LogoCloud` | Responsive logo grid |
| `LogoMarquee` | Continuous scrolling logo strip |
| `Banner` | Announcement banner with variants |

---

## Subpath imports

Calendar and Carousel are shipped as optional subpaths to avoid loading their peer dependencies when you don't use them:

```ts
// Calendar, DatePicker, DateRangePicker — requires: pnpm add date-fns
import { Calendar, DatePicker, DateRangePicker } from '@3df-spa/ui/calendar'

// Carousel and sub-components — requires: pnpm add embla-carousel
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@3df-spa/ui/carousel'
```

---

## Theming

### Design tokens

All colors, radius, and spacing are driven by CSS custom properties defined in `theme.css`. Override them in your own CSS to adapt the library to your brand:

```css
:root {
  --primary: hsl(240 5.9% 10%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(240 4.8% 95.9%);
  --destructive: hsl(0 84.2% 60.2%);
  --success: hsl(142 76% 36%);
  --warning: hsl(38 92% 50%);
  --info: hsl(217 91% 60%);
  --border-hsl: 240 5.9% 50%;
  --radius: 0.625rem;
}
```

### Dark mode

Dark mode is activated via the `.dark` class on any ancestor element (typically `<html>`):

```html
<html class="dark">
```

All tokens have dark-mode overrides already defined in `theme.css`. No additional setup needed.

### 3DF Forest Green theme

The library ships a second built-in theme. Apply it by adding the `theme-3df` class:

```html
<html class="theme-3df">
<!-- combine with dark mode -->
<html class="theme-3df dark">
```

### Runtime theme configurator

Use the built-in `Ui3df` component to let users switch theme presets, radius, border width, fonts, and letter spacing at runtime without page reload:

```vue
<script setup lang="ts">
import { Ui3df } from '@3df-spa/ui'
</script>

<template>
  <Ui3df />
</template>
```

---

## Global border & radius customization

Every border in the library reads `--ui-border-width` (default `2px`) and every radius reads `--ui-radius` (default `0.625rem`). Override them once to restyle the entire library:

```css
:root {
  --ui-border-width: 1px;    /* thinner borders */
  --ui-radius: 1rem;          /* rounder corners */
  /* --ui-border-width: 0px;  borderless mode */
}
```

Directional variants (`border-t-ui`, `border-r-ui`, `border-b-ui`, `border-l-ui`) are also available for components like `Sheet`.

---

## TypeScript

All components ship with full TypeScript declarations. Context types and injection keys are exported for consumers who build compound component patterns on top of the library:

```ts
import type {
  ButtonVariants,
  BadgeVariants,
  SheetSide,
  TabsTriggerVariant,
  ToastVariant,
  ChartConfig,        // if using @3df-spa/charts
} from '@3df-spa/ui'
```

---

## Repository

- **Source:** [github.com/3DF-SpA/3df-ui](https://github.com/3DF-SpA/3df-ui)
- **Issues:** [github.com/3DF-SpA/3df-ui/issues](https://github.com/3DF-SpA/3df-ui/issues)
- **Charts package:** [`@3df-spa/charts`](https://www.npmjs.com/package/@3df-spa/charts)

---

## License

MIT © 3DF SpA
