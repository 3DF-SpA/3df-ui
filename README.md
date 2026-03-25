<p align="center">
  <img src="./public/icons/logo-3df.svg" alt="3DF UI" width="100%" />
</p>

<h1 align="center">3DF UI</h1>

<p align="center">
  A production-ready Vue 3 component library and zero-dependency SVG chart suite.<br/>
  Built with TypeScript strict, Tailwind CSS v4, and CVA — designed to scale.
</p>

<p align="center">
  <a href="https://github.com/3DF-SpA/3df-ui/packages"><img src="https://img.shields.io/badge/%403df--spa%2Fui-v1.3.0-black?style=flat-square" alt="@3df-spa/ui version" /></a>
  <a href="https://github.com/3DF-SpA/3df-ui/packages"><img src="https://img.shields.io/badge/%403df--spa%2Fcharts-v1.3.0-black?style=flat-square" alt="@3df-spa/charts version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-3.5-42B883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3" /></a>
</p>

---

## Overview

**3DF UI** is a monorepo housing two tightly integrated packages: a comprehensive Vue 3 component library (`@3df-spa/ui`) and a pure SVG chart suite (`@3df-spa/charts`). Both are built for teams that need a consistent, themeable, and fully type-safe design system without sacrificing performance or bundle size. Every component is tree-shakeable, ships with strict TypeScript types, and is styled exclusively through Tailwind CSS v4 design tokens — no inline styles, no `!important`, no runtime overhead.

---

## ✦ Features

- **199 Vue 3 components** — forms, layout, navigation, overlays, feedback, and more
- **6 SVG chart types** — Bar, Line, Pie, Radar, Scatter, Gauge; rendered natively, no canvas
- **Zero dependencies** in `@3df-spa/charts` — only `vue` as a peer dep
- **Tailwind CSS v4** with `@theme` design tokens and full dark mode support via `.dark`
- **3DF Customizer** — runtime UI component (`<Ui3df />`) to let users tweak radius, border width, letter spacing, color presets, and font families
- **TypeScript-first** — strict mode, typed props, typed provide/inject contexts, typed CVA variants
- **CVA variants** — all variant logic is co-located in `[name]-variants.ts` files, never inline
- **Tree-shakeable** — each component and chart is individually exported; import only what you use
- **Fully composable** — compound components use typed `provide`/`inject` contexts

---

## 📦 Packages

| Package | Version | Description |
|---|---|---|
| [`@3df-spa/ui`](packages/ui) | `1.3.0` | 199 Vue 3 components — forms, layout, navigation, overlays, feedback |
| [`@3df-spa/charts`](packages/charts) | `1.3.0` | 6 pure SVG chart types — zero runtime dependencies |

Both packages are published to **GitHub Packages** under the `@3df-spa` scope.

---

## 📥 Installation

> **Prerequisite:** configure your `.npmrc` to resolve `@3df-spa` packages from GitHub Packages.
>
> ```
> @3df-spa:registry=https://npm.pkg.github.com
> ```

**pnpm**
```bash
pnpm add @3df-spa/ui
pnpm add @3df-spa/charts        # optional — charts package

# Optional peer dependencies
pnpm add date-fns               # required by Calendar / DatePicker
pnpm add embla-carousel         # required by Carousel
```

**npm**
```bash
npm install @3df-spa/ui
npm install @3df-spa/charts     # optional

npm install date-fns            # Calendar / DatePicker
npm install embla-carousel      # Carousel
```

**yarn**
```bash
yarn add @3df-spa/ui
yarn add @3df-spa/charts        # optional

yarn add date-fns               # Calendar / DatePicker
yarn add embla-carousel         # Carousel
```

---

## ⚙️ Setup

### 1. Import the theme

In your global CSS entry point (e.g., `src/assets/main.css`), import Tailwind and the 3DF theme tokens:

```css
@import "tailwindcss";
@import "@3df-spa/ui/theme.css";
```

`theme.css` registers all design tokens (`--color-*`, `--radius-*`, `--ui-border-width`, etc.) for both light and dark modes.

### 2. Register in your Vue app

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

createApp(App).mount('#app')
```

Components are **not** globally registered — import them individually for optimal tree-shaking:

```vue
<script setup lang="ts">
import { Button, Badge } from '@3df-spa/ui'
</script>
```

### 3. Add the 3DF Customizer (optional)

Mount `<Ui3df />` anywhere in your app shell to expose the runtime theme customizer panel:

```vue
<script setup lang="ts">
import { Ui3df } from '@3df-spa/ui'
</script>

<template>
  <RouterView />
  <Ui3df />
</template>
```

---

## 🎨 3DF Customizer

`<Ui3df />` is a floating panel that lets end users personalize the UI in real time. Changes are persisted to `localStorage` and applied via CSS custom property overrides on `:root`.

| Control | What it changes | CSS variable |
|---|---|---|
| **Border radius** | Corner roundness of all components | `--ui-radius` |
| **Border width** | Stroke thickness of `border-ui` | `--ui-border-width` |
| **Letter spacing** | Global tracking | `--ui-letter-spacing` |
| **Color preset** (9 options) | Primary + accent hue | `--color-primary`, `--color-accent` |
| **Font picker** (7 fonts) | Body and heading typeface | `--font-sans` |

Setting `--ui-border-width: 0px` produces a completely borderless style; `--ui-radius: 0` produces sharp corners. All components inherit changes immediately with no rebuild required.

---

## 🧩 Component Usage

```vue
<script setup lang="ts">
import { Button, Badge } from '@3df-spa/ui'
</script>

<template>
  <div class="flex items-center gap-3">
    <Button variant="default" size="md" @click="handleSave">
      Save changes
    </Button>

    <Button variant="outline" size="sm">
      Cancel
    </Button>

    <Badge variant="secondary">Beta</Badge>
  </div>
</template>
```

All components forward unknown attributes and class merging through `useAttrs()` + `cn()` (clsx + tailwind-merge), so you can always pass extra Tailwind classes without conflicts:

```vue
<Button class="w-full mt-4" variant="default">Full-width button</Button>
```

---

## 📊 Charts Usage

Charts are pure SVG — no canvas, no external charting library. They respond to container size via `ResizeObserver` and animate via `requestAnimationFrame`.

```vue
<script setup lang="ts">
import { UiChartBar } from '@3df-spa/charts'

const data = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 5100, expenses: 3100 },
  { month: 'Mar', revenue: 4800, expenses: 2600 },
  { month: 'Apr', revenue: 6300, expenses: 3400 },
]

const config = {
  revenue:  { label: 'Revenue',  color: 'hsl(220 90% 56%)' },
  expenses: { label: 'Expenses', color: 'hsl(0 84% 50%)' },
}
</script>

<template>
  <UiChartBar
    :data="data"
    :config="config"
    index="month"
    class="h-64 w-full"
  />
</template>
```

Available chart components:

| Component | Description |
|---|---|
| `UiChartBar` | Grouped / stacked vertical bar chart |
| `UiChartLine` | Multi-series line / area chart |
| `UiChartPie` | Pie and donut chart |
| `UiChartRadar` | Spider / radar chart |
| `UiChartScatter` | X-Y scatter plot |
| `UiChartGauge` | Circular gauge / progress chart |

---

## 📖 Documentation

Interactive playground and per-component documentation is available at the development server:

```bash
pnpm dev   # → http://localhost:5173
```

Navigate to any component demo page via the sidebar. Each page shows live props, slot usage, and variant combinations.

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before opening a pull request. It covers project structure, component conventions, the CVA variant pattern, commit style, and the changeset release flow.

---

## 📄 License

MIT © 2026-present [3DF SpA](https://github.com/3DF-SpA)
