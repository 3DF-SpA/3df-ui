<script setup lang="ts">
import { type ChartConfig, type ChartDataRow, UiChartLine } from '@3df/charts';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const salesData: ChartDataRow[] = [
  { month: 'Jan', online: 3200, store: 1800 },
  { month: 'Feb', online: 2800, store: 2100 },
  { month: 'Mar', online: 4100, store: 2400 },
  { month: 'Apr', online: 3600, store: 2000 },
  { month: 'May', online: 5200, store: 2900 },
  { month: 'Jun', online: 4800, store: 3200 },
  { month: 'Jul', online: 5800, store: 3500 },
  { month: 'Aug', online: 5400, store: 3100 },
];

const salesConfig: ChartConfig = {
  online: { label: 'Online', color: 'var(--color-chart-1)' },
  store: { label: 'In-Store', color: 'var(--color-chart-2)' },
};

const latencyData: ChartDataRow[] = [
  { time: '00:00', p50: 42, p95: 120, p99: 280 },
  { time: '04:00', p50: 38, p95: 95, p99: 210 },
  { time: '08:00', p50: 55, p95: 180, p99: 420 },
  { time: '12:00', p50: 68, p95: 220, p99: 510 },
  { time: '16:00', p50: 72, p95: 240, p99: 580 },
  { time: '20:00', p50: 48, p95: 150, p99: 340 },
  { time: '23:59', p50: 40, p95: 110, p99: 260 },
];

const latencyConfig: ChartConfig = {
  p50: { label: 'p50', color: 'var(--color-chart-3)' },
  p95: { label: 'p95', color: 'var(--color-chart-4)' },
  p99: { label: 'p99', color: 'var(--color-chart-5)' },
};

const temperatureData: ChartDataRow[] = [
  { day: 'Mon', indoor: 22, outdoor: 14 },
  { day: 'Tue', indoor: 21, outdoor: 12 },
  { day: 'Wed', indoor: 23, outdoor: 18 },
  { day: 'Thu', indoor: 22, outdoor: 16 },
  { day: 'Fri', indoor: 24, outdoor: 20 },
  { day: 'Sat', indoor: 23, outdoor: 22 },
  { day: 'Sun', indoor: 22, outdoor: 19 },
];

const temperatureConfig: ChartConfig = {
  indoor: { label: 'Indoor', color: 'var(--color-chart-1)' },
  outdoor: { label: 'Outdoor', color: 'var(--color-chart-4)' },
};

const stepData: ChartDataRow[] = [
  { hour: '6am', users: 120 },
  { hour: '9am', users: 580 },
  { hour: '12pm', users: 430 },
  { hour: '3pm', users: 620 },
  { hour: '6pm', users: 380 },
  { hour: '9pm', users: 210 },
  { hour: '12am', users: 90 },
];

const stepConfig: ChartConfig = {
  users: { label: 'Active Users', color: 'var(--color-chart-5)' },
};

const monotoneCode = `<UiChartLine :config="config" :data="data" index="month" />`;

const multiLineCode = `<UiChartLine
  :config="config"
  :data="data"
  index="time"
  :show-dots="true"
  :value-formatter="(v) => \`\${v}ms\`"
/>`;

const linearCode = `<UiChartLine
  :config="config"
  :data="data"
  index="day"
  curve-type="linear"
  :show-area="false"
  :show-dots="true"
  :value-formatter="(v) => \`\${v}°C\`"
/>`;

const stepCode = `<UiChartLine
  :config="config"
  :data="data"
  index="hour"
  curve-type="step"
  :show-legend="false"
  :show-grid="false"
  :animate="false"
  :stroke-width="3"
/>`;

const lineProps: PropItem[] = [
  {
    name: 'data',
    type: 'ChartDataRow[]',
    default: '-',
    description: 'Array de objetos con los datos del gráfico.',
  },
  {
    name: 'config',
    type: 'ChartConfig',
    default: '-',
    description: 'Configuración de series: label y color por cada key.',
  },
  { name: 'index', type: 'string', default: '-', description: 'Key del eje de categorías.' },
  {
    name: 'curveType',
    type: "'monotone' | 'linear' | 'step'",
    default: "'monotone'",
    description: 'Tipo de interpolación de la curva.',
  },
  {
    name: 'showDots',
    type: 'boolean',
    default: 'false',
    description: 'Muestra puntos en cada dato.',
  },
  {
    name: 'showArea',
    type: 'boolean',
    default: 'true',
    description: 'Muestra relleno de área con gradiente.',
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '2',
    description: 'Grosor de la línea en píxeles.',
  },
  {
    name: 'showLegend',
    type: 'boolean',
    default: 'true',
    description: 'Muestra la leyenda interactiva.',
  },
  {
    name: 'showGrid',
    type: 'boolean',
    default: 'true',
    description: 'Muestra la grilla de puntos de fondo.',
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: 'Habilita la animación de entrada.',
  },
  {
    name: 'valueFormatter',
    type: '(v: number) => string',
    default: '-',
    description: 'Formateador personalizado para valores del tooltip.',
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Line Chart"
      description="Interpolación monotone, linear y step — relleno de área con gradiente, glow en hover, leyenda interactiva. 100% SVG, sin dependencias."
      import-code="import { UiChartLine } from '@3df/charts'"
    />

    <DocShowcase
      title="Monotone (suave)"
      description="Curva suave por defecto con relleno de área y crosshair en hover."
      :code="monotoneCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartLine :config="salesConfig" :data="salesData" index="month" />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Multi-línea — Percentiles de latencia"
      description="Tres series con puntos visibles y formatter personalizado."
      :code="multiLineCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartLine
          :config="latencyConfig"
          :data="latencyData"
          index="time"
          :show-dots="true"
          :value-formatter="(v: number) => `${v}ms`"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Linear — Sin área"
      description="Segmentos de línea recta sin relleno de área, con puntos visibles."
      :code="linearCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartLine
          :config="temperatureConfig"
          :data="temperatureData"
          index="day"
          curve-type="linear"
          :show-area="false"
          :show-dots="true"
          :value-formatter="(v: number) => `${v}°C`"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Step"
      description="Interpolación step para saltos discretos. Sin animación ni grilla."
      :code="stepCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartLine
          :config="stepConfig"
          :data="stepData"
          index="hour"
          curve-type="step"
          :show-legend="false"
          :show-grid="false"
          :animate="false"
          :stroke-width="3"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="lineProps" />
  </div>
</template>
