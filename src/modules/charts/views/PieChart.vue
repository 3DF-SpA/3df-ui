<script setup lang="ts">
import { type ChartConfig, type ChartDataRow, UiChartPie } from '@3df-spa/charts';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const browserData: ChartDataRow[] = [
  { browser: 'Chrome', share: 63 },
  { browser: 'Safari', share: 19 },
  { browser: 'Firefox', share: 7 },
  { browser: 'Edge', share: 6 },
  { browser: 'Other', share: 5 },
];

const browserConfig: ChartConfig = {
  Chrome: { label: 'Chrome', color: 'var(--color-chart-1)' },
  Safari: { label: 'Safari', color: 'var(--color-chart-2)' },
  Firefox: { label: 'Firefox', color: 'var(--color-chart-3)' },
  Edge: { label: 'Edge', color: 'var(--color-chart-4)' },
  Other: { label: 'Other', color: 'var(--color-chart-5)' },
};

const revenueData: ChartDataRow[] = [
  { label: 'Revenue', website: 42000, app: 28000, wholesale: 15000 },
];

const revenueConfig: ChartConfig = {
  website: { label: 'Website', color: 'var(--color-chart-1)' },
  app: { label: 'App', color: 'var(--color-chart-3)' },
  wholesale: { label: 'Wholesale', color: 'var(--color-chart-5)' },
};

const tasksData: ChartDataRow[] = [
  { status: 'Done', count: 45 },
  { status: 'In Progress', count: 22 },
  { status: 'Todo', count: 18 },
  { status: 'Blocked', count: 8 },
];

const tasksConfig: ChartConfig = {
  Done: { label: 'Done', color: 'var(--color-chart-3)' },
  'In Progress': { label: 'In Progress', color: 'var(--color-chart-1)' },
  Todo: { label: 'Todo', color: 'var(--color-chart-2)' },
  Blocked: { label: 'Blocked', color: 'var(--color-chart-4)' },
};

const storageData: ChartDataRow[] = [
  { type: 'Photos', used: 48 },
  { type: 'Videos', used: 32 },
  { type: 'Docs', used: 12 },
  { type: 'Free', used: 8 },
];

const storageConfig: ChartConfig = {
  Photos: { label: 'Photos', color: 'var(--color-chart-1)' },
  Videos: { label: 'Videos', color: 'var(--color-chart-4)' },
  Docs: { label: 'Docs', color: 'var(--color-chart-3)' },
  Free: { label: 'Free', color: 'var(--color-chart-2)' },
};

const fullPieCode = `<UiChartPie
  :config="config"
  :data="data"
  index="browser"
  value-key="share"
  :show-labels="true"
  label-type="percent"
/>`;

const donutCode = `<UiChartPie
  :config="config"
  :data="data"
  index="label"
  :inner-radius="70"
  :show-labels="true"
  label-type="value"
  :value-formatter="(v) => \`$\${(v / 1000).toFixed(0)}K\`"
/>`;

const taskCode = `<UiChartPie
  :config="config"
  :data="data"
  index="status"
  value-key="count"
  :inner-radius="60"
  :show-labels="true"
  label-type="name"
/>`;

const minimalCode = `<UiChartPie
  :config="config"
  :data="data"
  index="type"
  value-key="used"
  :inner-radius="50"
  :animate="false"
  :pad-angle="2"
  :value-formatter="(v) => \`\${v} GB\`"
/>`;

const pieProps: PropItem[] = [
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
  {
    name: 'index',
    type: 'string',
    default: '-',
    description: 'Key de categoría que identifica cada fila/segmento.',
  },
  {
    name: 'valueKey',
    type: 'string',
    default: '-',
    description: 'Key numérica para el valor de cada slice (modo fila por slice).',
  },
  {
    name: 'innerRadius',
    type: 'number',
    default: '0',
    description: 'Radio interior en px. Valores > 0 crean un donut.',
  },
  {
    name: 'showLabels',
    type: 'boolean',
    default: 'false',
    description: 'Muestra etiquetas en cada slice.',
  },
  {
    name: 'labelType',
    type: "'percent' | 'value' | 'name'",
    default: "'percent'",
    description: 'Tipo de etiqueta a mostrar.',
  },
  {
    name: 'padAngle',
    type: 'number',
    default: '0',
    description: 'Ángulo de separación entre slices en grados.',
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
    description: 'Formateador personalizado para valores.',
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Pie Chart"
      description="Pie y donut — hover para expandir slices, click en leyenda para alternar. 100% SVG, sin dependencias."
      import-code="import { UiChartPie } from '@3df-spa/charts'"
    />

    <DocShowcase
      title="Pie completo"
      description="Hover para expandir slices hacia afuera. Click en leyenda para ocultar/mostrar."
      :code="fullPieCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartPie
          :config="browserConfig"
          :data="browserData"
          index="browser"
          value-key="share"
          :show-labels="true"
          label-type="percent"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Donut"
      description="Radio interior crea un donut con total centrado. Datos multi-key en una sola fila."
      :code="donutCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartPie
          :config="revenueConfig"
          :data="revenueData"
          index="label"
          :inner-radius="70"
          :show-labels="true"
          label-type="value"
          :value-formatter="(v: number) => `$${(v / 1000).toFixed(0)}K`"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Estado de tareas"
      description="Donut con etiquetas de nombre. Modo valueKey — cada fila es un slice."
      :code="taskCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartPie
          :config="tasksConfig"
          :data="tasksData"
          index="status"
          value-key="count"
          :inner-radius="60"
          :show-labels="true"
          label-type="name"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Minimal — Sin animación"
      description="Aspecto limpio sin etiquetas. Animación deshabilitada."
      :code="minimalCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartPie
          :config="storageConfig"
          :data="storageData"
          index="type"
          value-key="used"
          :inner-radius="50"
          :animate="false"
          :pad-angle="2"
          :value-formatter="(v: number) => `${v} GB`"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="pieProps" />
  </div>
</template>
