<script setup lang="ts">
import { type ChartConfig, type ChartDataRow, UiChartRadar } from '@3df/charts';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const skillsData: ChartDataRow[] = [
  { skill: 'Frontend', alice: 90, bob: 70 },
  { skill: 'Backend', alice: 65, bob: 85 },
  { skill: 'DevOps', alice: 50, bob: 80 },
  { skill: 'Design', alice: 85, bob: 40 },
  { skill: 'Testing', alice: 70, bob: 75 },
  { skill: 'Security', alice: 55, bob: 90 },
];

const skillsConfig: ChartConfig = {
  alice: { label: 'Alice', color: 'var(--color-chart-1)' },
  bob: { label: 'Bob', color: 'var(--color-chart-4)' },
};

const productData: ChartDataRow[] = [
  { metric: 'Performance', ours: 92, competitor: 78 },
  { metric: 'Reliability', ours: 88, competitor: 82 },
  { metric: 'Usability', ours: 95, competitor: 70 },
  { metric: 'Features', ours: 75, competitor: 90 },
  { metric: 'Support', ours: 85, competitor: 60 },
  { metric: 'Price', ours: 70, competitor: 85 },
  { metric: 'Docs', ours: 90, competitor: 55 },
];

const productConfig: ChartConfig = {
  ours: { label: 'Our Product', color: 'var(--color-chart-3)' },
  competitor: { label: 'Competitor', color: 'var(--color-chart-5)' },
};

const fitnessData: ChartDataRow[] = [
  { area: 'Strength', score: 80 },
  { area: 'Endurance', score: 65 },
  { area: 'Flexibility', score: 50 },
  { area: 'Speed', score: 70 },
  { area: 'Balance', score: 85 },
];

const fitnessConfig: ChartConfig = {
  score: { label: 'Score', color: 'var(--color-chart-1)' },
};

const teamData: ChartDataRow[] = [
  { quarter: 'Q1', engineering: 78, marketing: 65, sales: 82 },
  { quarter: 'Q2', engineering: 85, marketing: 72, sales: 75 },
  { quarter: 'Q3', engineering: 90, marketing: 80, sales: 88 },
  { quarter: 'Q4', engineering: 82, marketing: 88, sales: 92 },
  { quarter: 'Q5', engineering: 88, marketing: 75, sales: 80 },
];

const teamConfig: ChartConfig = {
  engineering: { label: 'Engineering', color: 'var(--color-chart-1)' },
  marketing: { label: 'Marketing', color: 'var(--color-chart-3)' },
  sales: { label: 'Sales', color: 'var(--color-chart-5)' },
};

const polygonCode = `<UiChartRadar :config="config" :data="data" index="skill" />`;

const circleCode = `<UiChartRadar
  :config="config"
  :data="data"
  index="metric"
  variant="circle"
  :fill-opacity="0.3"
/>`;

const noFillCode = `<UiChartRadar
  :config="config"
  :data="data"
  index="area"
  :show-fill="false"
  :stroke-width="3"
  :dot-radius="5"
  :show-legend="false"
/>`;

const multiCode = `<UiChartRadar
  :config="config"
  :data="data"
  index="quarter"
  variant="circle"
  :animate="false"
  :levels="4"
/>`;

const radarProps: PropItem[] = [
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
    description: 'Key del eje dimensional (ej. "skill").',
  },
  {
    name: 'variant',
    type: "'polygon' | 'circle'",
    default: "'polygon'",
    description: 'Forma de la grilla: polígono o círculos concéntricos.',
  },
  {
    name: 'showFill',
    type: 'boolean',
    default: 'true',
    description: 'Muestra el relleno del área de cada serie.',
  },
  {
    name: 'fillOpacity',
    type: 'number',
    default: '0.15',
    description: 'Opacidad del relleno (0-1).',
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '2',
    description: 'Grosor de la línea en píxeles.',
  },
  {
    name: 'dotRadius',
    type: 'number',
    default: '3',
    description: 'Radio de los puntos en cada vértice.',
  },
  {
    name: 'levels',
    type: 'number',
    default: '5',
    description: 'Cantidad de niveles concéntricos en la grilla.',
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
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Radar Chart"
      description="Comparación multidimensional — grillas de polígono y círculo, áreas rellenas, leyenda interactiva. 100% SVG, sin dependencias."
      import-code="import { UiChartRadar } from '@3df/charts'"
    />

    <DocShowcase
      title="Grilla de polígono"
      description="Compara dos perfiles en múltiples dimensiones. Hover en puntos para ver valores."
      :code="polygonCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartRadar :config="skillsConfig" :data="skillsData" index="skill" />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Grilla circular"
      description="Grilla circular con 7 ejes y mayor opacidad de relleno."
      :code="circleCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartRadar
          :config="productConfig"
          :data="productData"
          index="metric"
          variant="circle"
          :fill-opacity="0.3"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Serie única — Sin relleno"
      description="Solo contorno con puntos más grandes y línea más gruesa."
      :code="noFillCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartRadar
          :config="fitnessConfig"
          :data="fitnessData"
          index="area"
          :show-fill="false"
          :stroke-width="3"
          :dot-radius="5"
          :show-legend="false"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Multi-serie — Tres equipos"
      description="Variante circular con 3 series superpuestas. Sin animación."
      :code="multiCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartRadar
          :config="teamConfig"
          :data="teamData"
          index="quarter"
          variant="circle"
          :animate="false"
          :levels="4"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="radarProps" />
  </div>
</template>
