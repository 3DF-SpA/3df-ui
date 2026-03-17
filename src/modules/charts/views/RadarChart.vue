<script setup lang="ts">
import { computed } from 'vue';

import { type ChartConfig, type ChartDataRow, UiChartRadar } from '@3df-spa/charts';

import { useDocPage } from '@/i18n/composables/useDocPage';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('radarChart');

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

const radarProps = computed<PropItem[]>(() => [
  {
    name: 'data',
    type: 'ChartDataRow[]',
    default: '-',
    description: propDesc('data'),
  },
  {
    name: 'config',
    type: 'ChartConfig',
    default: '-',
    description: propDesc('config'),
  },
  {
    name: 'index',
    type: 'string',
    default: '-',
    description: propDesc('index'),
  },
  {
    name: 'variant',
    type: "'polygon' | 'circle'",
    default: "'polygon'",
    description: propDesc('variant'),
  },
  {
    name: 'showFill',
    type: 'boolean',
    default: 'true',
    description: propDesc('showFill'),
  },
  {
    name: 'fillOpacity',
    type: 'number',
    default: '0.15',
    description: propDesc('fillOpacity'),
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '2',
    description: propDesc('strokeWidth'),
  },
  {
    name: 'dotRadius',
    type: 'number',
    default: '3',
    description: propDesc('dotRadius'),
  },
  {
    name: 'levels',
    type: 'number',
    default: '5',
    description: propDesc('levels'),
  },
  {
    name: 'showLegend',
    type: 'boolean',
    default: 'true',
    description: propDesc('showLegend'),
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: propDesc('animate'),
  },
]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Radar Chart"
      :description="description"
      import-code="import { UiChartRadar } from '@3df-spa/charts'"
    />

    <DocShowcase
      :title="showcaseTitle('polygon')"
      :description="showcaseDesc('polygon')"
      :code="polygonCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartRadar :config="skillsConfig" :data="skillsData" index="skill" />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('circle')"
      :description="showcaseDesc('circle')"
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
      :title="showcaseTitle('noFill')"
      :description="showcaseDesc('noFill')"
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
      :title="showcaseTitle('multiSeries')"
      :description="showcaseDesc('multiSeries')"
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
