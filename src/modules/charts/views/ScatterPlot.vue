<script setup lang="ts">
import { type ScatterConfig, UiChartScatter } from '@3df/charts';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const bodyData = [
  { height: 160, weight: 55, bmi: 21.5 },
  { height: 165, weight: 62, bmi: 22.8 },
  { height: 170, weight: 70, bmi: 24.2 },
  { height: 175, weight: 78, bmi: 25.5 },
  { height: 180, weight: 82, bmi: 25.3 },
  { height: 155, weight: 48, bmi: 20.0 },
  { height: 168, weight: 65, bmi: 23.0 },
  { height: 172, weight: 73, bmi: 24.7 },
  { height: 178, weight: 85, bmi: 26.8 },
  { height: 163, weight: 58, bmi: 21.8 },
  { height: 185, weight: 90, bmi: 26.3 },
  { height: 158, weight: 52, bmi: 20.8 },
];

const bodyConfig: ScatterConfig = {
  people: {
    label: 'People',
    color: 'var(--color-chart-1)',
    xKey: 'height',
    yKey: 'weight',
  },
};

const salesData = [
  { adSpend: 500, revenue: 2200, region: 'NA' },
  { adSpend: 800, revenue: 3800, region: 'NA' },
  { adSpend: 1200, revenue: 5500, region: 'NA' },
  { adSpend: 1800, revenue: 7200, region: 'NA' },
  { adSpend: 2500, revenue: 9000, region: 'NA' },
  { adSpend: 400, revenue: 1800, region: 'EU' },
  { adSpend: 700, revenue: 2800, region: 'EU' },
  { adSpend: 1100, revenue: 4200, region: 'EU' },
  { adSpend: 1600, revenue: 5800, region: 'EU' },
  { adSpend: 2200, revenue: 7500, region: 'EU' },
];

const salesConfig: ScatterConfig = {
  NA: {
    label: 'North America',
    color: 'var(--color-chart-1)',
    xKey: 'adSpend',
    yKey: 'revenue',
  },
  EU: {
    label: 'Europe',
    color: 'var(--color-chart-4)',
    xKey: 'adSpend',
    yKey: 'revenue',
    shape: 'diamond',
  },
};

const projectData = [
  { complexity: 3, duration: 12, budget: 50 },
  { complexity: 5, duration: 24, budget: 120 },
  { complexity: 2, duration: 6, budget: 25 },
  { complexity: 7, duration: 36, budget: 200 },
  { complexity: 4, duration: 18, budget: 80 },
  { complexity: 8, duration: 48, budget: 350 },
  { complexity: 1, duration: 4, budget: 15 },
  { complexity: 6, duration: 30, budget: 150 },
  { complexity: 9, duration: 52, budget: 500 },
];

const bubbleConfig: ScatterConfig = {
  projects: {
    label: 'Projects',
    color: 'var(--color-chart-3)',
    xKey: 'complexity',
    yKey: 'duration',
    sizeKey: 'budget',
  },
};

const cpuData = [
  { threads: 2, throughput: 1200 },
  { threads: 4, throughput: 2100 },
  { threads: 8, throughput: 3800 },
  { threads: 16, throughput: 5200 },
  { threads: 32, throughput: 6800 },
  { threads: 64, throughput: 7200 },
];

const cpuConfig: ScatterConfig = {
  benchmark: {
    label: 'Benchmark',
    color: 'var(--color-chart-5)',
    xKey: 'threads',
    yKey: 'throughput',
    shape: 'square',
  },
};

const basicCode = `<UiChartScatter
  :config="config"
  :data="data"
  :x-formatter="(v) => \`\${v} cm\`"
  :y-formatter="(v) => \`\${v} kg\`"
/>`;

const multiCode = `<UiChartScatter
  :config="config"
  :data="data"
  :x-formatter="(v) => \`$\${v}\`"
  :y-formatter="(v) => \`$\${(v / 1000).toFixed(1)}K\`"
/>`;

const bubbleCode = `<UiChartScatter
  :config="config"
  :data="data"
  :x-formatter="(v) => \`\${v}/10\`"
  :y-formatter="(v) => \`\${v} wks\`"
  :min-dot-radius="6"
  :max-dot-radius="30"
/>`;

const squareCode = `<UiChartScatter
  :config="config"
  :data="data"
  :dot-radius="8"
  :animate="false"
  :show-legend="false"
/>`;

const scatterProps: PropItem[] = [
  {
    name: 'data',
    type: 'Record<string, unknown>[]',
    default: '-',
    description: 'Array de objetos con los datos del gráfico.',
  },
  {
    name: 'config',
    type: 'ScatterConfig',
    default: '-',
    description: 'Configuración de series con xKey, yKey, sizeKey, shape y color.',
  },
  {
    name: 'dotRadius',
    type: 'number',
    default: '5',
    description: 'Radio base de los puntos en px.',
  },
  {
    name: 'minDotRadius',
    type: 'number',
    default: '4',
    description: 'Radio mínimo en modo bubble (con sizeKey).',
  },
  {
    name: 'maxDotRadius',
    type: 'number',
    default: '20',
    description: 'Radio máximo en modo bubble (con sizeKey).',
  },
  {
    name: 'xFormatter',
    type: '(v: number) => string',
    default: '-',
    description: 'Formateador del eje X en el tooltip.',
  },
  {
    name: 'yFormatter',
    type: '(v: number) => string',
    default: '-',
    description: 'Formateador del eje Y en el tooltip.',
  },
  {
    name: 'showLegend',
    type: 'boolean',
    default: 'true',
    description: 'Muestra la leyenda interactiva.',
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: 'Habilita la animación de entrada.',
  },
  {
    name: 'ScatterSeriesConfig: xKey',
    type: 'string',
    default: '-',
    description: 'Key numérica para el eje X.',
  },
  {
    name: 'ScatterSeriesConfig: yKey',
    type: 'string',
    default: '-',
    description: 'Key numérica para el eje Y.',
  },
  {
    name: 'ScatterSeriesConfig: sizeKey',
    type: 'string',
    default: '-',
    description: 'Key numérica para mapear el tamaño del punto (modo bubble).',
  },
  {
    name: 'ScatterSeriesConfig: shape',
    type: "'circle' | 'square' | 'diamond'",
    default: "'circle'",
    description: 'Forma del marcador.',
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Scatter Plot"
      description="Correlación, clusters y burbujas — formas circle/square/diamond, mapeo de tamaño, leyenda interactiva. 100% SVG, sin dependencias."
      import-code="import { UiChartScatter, type ScatterConfig } from '@3df/charts'"
    />

    <DocShowcase
      title="Scatter básico"
      description="Gráfico de correlación simple. Hover en los puntos para ver valores de ambos ejes."
      :code="basicCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartScatter
          :config="bodyConfig"
          :data="bodyData"
          :x-formatter="(v: number) => `${v} cm`"
          :y-formatter="(v: number) => `${v} kg`"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Multi-serie — Formas diferentes"
      description="Dos regiones con formas circle y diamond. Alternar series en la leyenda."
      :code="multiCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartScatter
          :config="salesConfig"
          :data="salesData"
          :x-formatter="(v: number) => `$${v}`"
          :y-formatter="(v: number) => `$${(v / 1000).toFixed(1)}K`"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Bubble chart"
      description="Tamaño del punto mapeado a presupuesto. Tres variables en un solo gráfico."
      :code="bubbleCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartScatter
          :config="bubbleConfig"
          :data="projectData"
          :x-formatter="(v: number) => `${v}/10`"
          :y-formatter="(v: number) => `${v} wks`"
          :min-dot-radius="6"
          :max-dot-radius="30"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Forma square — Sin animación"
      description="Marcadores cuadrados con mayor tamaño, sin animación de entrada."
      :code="squareCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartScatter
          :config="cpuConfig"
          :data="cpuData"
          :dot-radius="8"
          :animate="false"
          :show-legend="false"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="scatterProps" />
  </div>
</template>
