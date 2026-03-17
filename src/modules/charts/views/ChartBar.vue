<script setup lang="ts">
import { computed } from 'vue';

import { type ChartConfig, type ChartDataRow, UiChartBar } from '@3df-spa/charts';

import { useDocPage } from '@/i18n/composables/useDocPage';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('chartBar');

const monthlyData: ChartDataRow[] = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
  { month: 'Mar', revenue: 5100, expenses: 3400 },
  { month: 'Apr', revenue: 4600, expenses: 3100 },
  { month: 'May', revenue: 6200, expenses: 3900 },
  { month: 'Jun', revenue: 5800, expenses: 4200 },
];

const monthlyConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: 'var(--color-chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--color-chart-2)' },
};

const browserData: ChartDataRow[] = [
  { browser: 'Chrome', users: 4500 },
  { browser: 'Safari', users: 2200 },
  { browser: 'Firefox', users: 1800 },
  { browser: 'Edge', users: 1200 },
  { browser: 'Opera', users: 600 },
];

const browserConfig: ChartConfig = {
  users: { label: 'Users', color: 'var(--color-chart-3)' },
};

const stackedData: ChartDataRow[] = [
  { quarter: 'Q1', desktop: 3200, mobile: 1800, tablet: 900 },
  { quarter: 'Q2', desktop: 3600, mobile: 2100, tablet: 1100 },
  { quarter: 'Q3', desktop: 3100, mobile: 2500, tablet: 1300 },
  { quarter: 'Q4', desktop: 4200, mobile: 2800, tablet: 1500 },
];

const stackedConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--color-chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--color-chart-4)' },
  tablet: { label: 'Tablet', color: 'var(--color-chart-5)' },
};

const performanceData: ChartDataRow[] = [
  { team: 'Alpha', frontend: 92, backend: 78, devops: 65 },
  { team: 'Beta', frontend: 68, backend: 88, devops: 82 },
  { team: 'Gamma', frontend: 85, backend: 72, devops: 91 },
  { team: 'Delta', frontend: 76, backend: 95, devops: 70 },
];

const performanceConfig: ChartConfig = {
  frontend: { label: 'Frontend', color: 'var(--color-chart-1)' },
  backend: { label: 'Backend', color: 'var(--color-chart-4)' },
  devops: { label: 'DevOps', color: 'var(--color-chart-5)' },
};

const verticalCode = `<UiChartBar :config="config" :data="data" index="month" />`;

const horizontalCode = `<UiChartBar
  :config="config"
  :data="data"
  index="browser"
  orientation="horizontal"
  :show-legend="false"
/>`;

const stackedCode = `<UiChartBar :config="config" :data="data" index="quarter" mode="stacked" />`;

const legendCode = `<UiChartBar :config="config" :data="data" index="team" :radius="8" />`;

const formatterCode = `<UiChartBar
  :config="config"
  :data="data"
  index="month"
  :show-grid="false"
  :animate="false"
  :value-formatter="(v) => \`$\${(v / 1000).toFixed(1)}K\`"
  :radius="10"
/>`;

const barProps = computed<PropItem[]>(() => [
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
    name: 'orientation',
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
    description: propDesc('orientation'),
  },
  {
    name: 'mode',
    type: "'grouped' | 'stacked'",
    default: "'grouped'",
    description: propDesc('mode'),
  },
  {
    name: 'showLegend',
    type: 'boolean',
    default: 'true',
    description: propDesc('showLegend'),
  },
  {
    name: 'showGrid',
    type: 'boolean',
    default: 'true',
    description: propDesc('showGrid'),
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: propDesc('animate'),
  },
  {
    name: 'valueFormatter',
    type: '(v: number) => string',
    default: '-',
    description: propDesc('valueFormatter'),
  },
  {
    name: 'radius',
    type: 'number',
    default: '4',
    description: propDesc('radius'),
  },
]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Bar Chart"
      :description="description"
      import-code="import { UiChartBar } from '@3df-spa/charts'"
    />

    <DocShowcase
      :title="showcaseTitle('vertical')"
      :description="showcaseDesc('vertical')"
      :code="verticalCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartBar :config="monthlyConfig" :data="monthlyData" index="month" />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('horizontal')"
      :description="showcaseDesc('horizontal')"
      :code="horizontalCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartBar
          :config="browserConfig"
          :data="browserData"
          index="browser"
          orientation="horizontal"
          :show-legend="false"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('stacked')"
      :description="showcaseDesc('stacked')"
      :code="stackedCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartBar :config="stackedConfig" :data="stackedData" index="quarter" mode="stacked" />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('interactive')"
      :description="showcaseDesc('interactive')"
      :code="legendCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartBar :config="performanceConfig" :data="performanceData" index="team" :radius="8" />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('customFormatter')"
      :description="showcaseDesc('customFormatter')"
      :code="formatterCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartBar
          :config="monthlyConfig"
          :data="monthlyData"
          index="month"
          :show-grid="false"
          :animate="false"
          :value-formatter="(v: number) => `$${(v / 1000).toFixed(1)}K`"
          :radius="10"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="barProps" />
  </div>
</template>
