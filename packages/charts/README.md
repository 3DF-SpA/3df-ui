# @3df-spa/charts

> **6 chart types for Vue 3** — Pure SVG · Zero runtime dependencies · TypeScript · Responsive · Dark mode

[![npm version](https://img.shields.io/npm/v/@3df-spa/charts)](https://www.npmjs.com/package/@3df-spa/charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883)](https://vuejs.org)
[![Zero deps](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/@3df-spa/charts)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org)

Pure SVG chart components built from scratch for Vue 3. No Canvas, no D3, no heavy charting library — just clean SVG computed from your data, with responsive resize via `ResizeObserver`, smooth `requestAnimationFrame` animations, and full TypeScript types.

---

## Installation

```bash
pnpm add @3df-spa/charts
```

Requires Vue 3 as peer dependency:

```bash
pnpm add vue  # if not already installed
```

**Recommended:** pair with `@3df-spa/ui` to get the theme tokens used for chart colors:

```bash
pnpm add @3df-spa/ui
```

---

## Setup

If you're using `@3df-spa/ui`, the color tokens are already available after:

```css
@import "tailwindcss";
@import "@3df-spa/ui/theme.css";
```

If you're using `@3df-spa/charts` standalone, define the chart color tokens in your CSS:

```css
:root {
  --color-chart-1: hsl(145 55% 48%);
  --color-chart-2: hsl(200 80% 55%);
  --color-chart-3: hsl(38 92% 50%);
  --color-chart-4: hsl(280 65% 60%);
  --color-chart-5: hsl(0 72% 55%);
  --color-chart-6: hsl(170 60% 45%);
}
```

---

## Quick start

```vue
<script setup lang="ts">
import { UiChartBar } from '@3df-spa/charts'
import type { ChartConfig, ChartDataRow } from '@3df-spa/charts'

const data: ChartDataRow[] = [
  { month: 'Jan', revenue: 4200, expenses: 2100 },
  { month: 'Feb', revenue: 5800, expenses: 2400 },
  { month: 'Mar', revenue: 5100, expenses: 2800 },
  { month: 'Apr', revenue: 6300, expenses: 2200 },
  { month: 'May', revenue: 7100, expenses: 3100 },
]

const config: ChartConfig = {
  revenue: { label: 'Revenue', color: 'var(--color-chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--color-chart-2)' },
}
</script>

<template>
  <UiChartBar
    :data="data"
    :config="config"
    index="month"
    :categories="['revenue', 'expenses']"
    class="h-64 w-full"
  />
</template>
```

---

## Chart types

### 📊 Bar Chart — `UiChartBar`

Grouped or stacked vertical/horizontal bars with animated entry and grid lines.

```vue
<UiChartBar
  :data="data"
  :config="config"
  index="month"
  :categories="['revenue', 'expenses']"
  :stacked="false"
  :show-legend="true"
  :show-tooltip="true"
/>
```

---

### 📈 Line Chart — `UiChartLine`

Smooth or linear lines with optional area fill, dots, and multi-series support.

```vue
<UiChartLine
  :data="data"
  :config="config"
  index="month"
  :categories="['revenue', 'expenses']"
  curve="smooth"        <!-- 'linear' | 'smooth' | 'step' -->
  :show-dots="true"
  :show-area="false"
/>
```

---

### 🥧 Pie Chart — `UiChartPie`

Pie or donut chart with animated draw and radial gradient fills.

```vue
<UiChartPie
  :data="categoryData"
  :config="config"
  index="category"
  :categories="['value']"
  :donut="true"
  :donut-thickness="0.55"
/>
```

---

### 🕸 Radar Chart — `UiChartRadar`

Polygon or line radar chart for multi-axis comparisons.

```vue
<UiChartRadar
  :data="skillData"
  :config="config"
  index="skill"
  :categories="['teamA', 'teamB']"
  variant="polygon"    <!-- 'polygon' | 'line' -->
/>
```

---

### 🔵 Scatter Chart — `UiChartScatter`

X/Y scatter plot with configurable shapes and optional size encoding.

```vue
<UiChartScatter
  :data="pointData"
  :config="scatterConfig"
  x-key="x"
  y-key="y"
  series-key="group"
/>
```

`ScatterSeriesConfig` supports shapes: `circle`, `square`, `triangle`, `diamond`, `cross`.

---

### 🎯 Gauge Chart — `UiChartGauge`

Arc-based gauge for KPI display with threshold segments and animated needle or fill.

```vue
<UiChartGauge
  :value="72"
  :min="0"
  :max="100"
  :segments="[
    { to: 40, color: 'var(--color-chart-5)' },
    { to: 70, color: 'var(--color-chart-3)' },
    { to: 100, color: 'var(--color-chart-1)' },
  ]"
  variant="arc"        <!-- 'arc' | 'needle' -->
/>
```

---

## Configuration

### `ChartConfig`

Maps each series key to its label and color:

```ts
import type { ChartConfig } from '@3df-spa/charts'

const config: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--color-chart-1)',   // CSS variable or any valid color
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(200 80% 55%)',
  },
}
```

### `ChartDataRow`

A flat object where one key is the category index and the rest are numeric series values:

```ts
import type { ChartDataRow } from '@3df-spa/charts'

const data: ChartDataRow[] = [
  { month: 'Q1', revenue: 12000, expenses: 8000 },
  { month: 'Q2', revenue: 15000, expenses: 9500 },
]
```

---

## Shared components

| Component | Description |
|-----------|-------------|
| `UiChartContainer` | Responsive wrapper with `ResizeObserver`. Provides `{ width, height }` via slot props and `ChartContext` via `provide`. |
| `UiChartTooltip` | Positioned tooltip that follows the pointer, styled automatically with theme tokens. |
| `UiChartLegend` | Configurable legend with color swatches and labels. |

```vue
<!-- Custom chart layout using shared primitives -->
<UiChartContainer v-slot="{ width, height }">
  <svg :width="width" :height="height">
    <!-- your custom SVG -->
  </svg>
  <UiChartTooltip :data="tooltipData" />
  <UiChartLegend :config="config" />
</UiChartContainer>
```

---

## Colors

Charts resolve `var(--color-chart-N)` CSS variables at mount time using `getComputedStyle`. This ensures correct colors in both light and dark mode without any extra configuration.

Default palette (provided by `@3df-spa/ui/theme.css`):

| Token | Default |
|-------|---------|
| `--color-chart-1` | `hsl(145 55% 48%)` — green |
| `--color-chart-2` | `hsl(200 80% 55%)` — blue |
| `--color-chart-3` | `hsl(38 92% 50%)` — amber |
| `--color-chart-4` | `hsl(280 65% 60%)` — purple |
| `--color-chart-5` | `hsl(0 72% 55%)` — red |
| `--color-chart-6` | `hsl(170 60% 45%)` — teal |

Override any token in your CSS to change chart colors globally.

---

## TypeScript exports

```ts
import type {
  ChartConfig,
  ChartSeriesConfig,
  ChartDataRow,
  ChartOrientation,
  ChartStackMode,
  ChartAxisConfig,
  ChartTooltipData,
  ChartContext,
  NiceScale,
  CurveType,
  RadarVariant,
  ScatterShape,
  ScatterSeriesConfig,
  ScatterConfig,
  GaugeVariant,
  GaugeSegment,
} from '@3df-spa/charts'
```

---

## Repository

- **Source:** [github.com/3DF-SpA/3df-ui](https://github.com/3DF-SpA/3df-ui) (monorepo)
- **Issues:** [github.com/3DF-SpA/3df-ui/issues](https://github.com/3DF-SpA/3df-ui/issues)
- **UI components:** [`@3df-spa/ui`](https://www.npmjs.com/package/@3df-spa/ui)

---

## License

MIT © 3DF SpA
