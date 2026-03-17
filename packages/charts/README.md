# @3df/charts

> Charts SVG para Vue 3 · Zero dependencias · TypeScript

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)
[![Zero deps](https://img.shields.io/badge/dependencies-0-brightgreen)](package.json)

## Instalación

```bash
pnpm add @3df/charts
# Solo peer: vue ^3.0.0
```

## Uso básico

```vue
<script setup lang="ts">
import { UiChartBar } from '@3df/charts';

const data = [
  { mes: 'Ene', ventas: 186, gastos: 80 },
  { mes: 'Feb', ventas: 305, gastos: 200 },
];

const config = {
  ventas: { label: 'Ventas', color: 'hsl(var(--color-chart-1))' },
  gastos: { label: 'Gastos', color: 'hsl(var(--color-chart-2))' },
};
</script>

<template>
  <UiChartBar :data="data" :config="config" index="mes" />
</template>
```

## Charts disponibles

| Componente | Descripción |
|---|---|
| `UiChartBar` | Barras verticales/horizontales, agrupadas/apiladas |
| `UiChartLine` | Líneas con curvas, áreas, apiladas |
| `UiChartPie` | Torta/donut con labels |
| `UiChartRadar` | Radar en polígono o círculo |
| `UiChartScatter` | Dispersión / burbujas |
| `UiChartGauge` | Gauge semicircular/completo con segmentos |

## Props comunes

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `data` | `ChartDataRow[]` | — | Filas de datos |
| `config` | `ChartConfig` | — | Series y colores |
| `index` | `string` | — | Key del eje X |
| `showTooltip` | `boolean` | `true` | Tooltip interactivo |
| `showLegend` | `boolean` | `true` | Leyenda con toggle |
| `animate` | `boolean` | `true` | Animación de entrada |

## Arquitectura

- **SVG puro** — sin canvas ni WebGL
- **Zero dependencias** — solo `vue` como peer
- **ResizeObserver** integrado — responsive automático
- **IDs deterministas** — safe para SSR

## Licencia

MIT © 2026 [3DF Space](https://github.com/3df-space)
