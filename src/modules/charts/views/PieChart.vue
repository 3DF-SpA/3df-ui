<script setup lang="ts">
import { computed } from 'vue';

import { type ChartConfig, type ChartDataRow, UiChartPie } from '@3df/charts';

import { useDocPage } from '@/i18n/composables/useDocPage';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('pieChart');

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

const pieProps = computed<PropItem[]>(() => [
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
    name: 'valueKey',
    type: 'string',
    default: '-',
    description: propDesc('valueKey'),
  },
  {
    name: 'innerRadius',
    type: 'number',
    default: '0',
    description: propDesc('innerRadius'),
  },
  {
    name: 'showLabels',
    type: 'boolean',
    default: 'false',
    description: propDesc('showLabels'),
  },
  {
    name: 'labelType',
    type: "'percent' | 'value' | 'name'",
    default: "'percent'",
    description: propDesc('labelType'),
  },
  {
    name: 'padAngle',
    type: 'number',
    default: '0',
    description: propDesc('padAngle'),
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
]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Pie Chart"
      :description="description"
      import-code="import { UiChartPie } from '@3df/charts'"
    />

    <DocShowcase
      :title="showcaseTitle('fullPie')"
      :description="showcaseDesc('fullPie')"
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
      :title="showcaseTitle('donut')"
      :description="showcaseDesc('donut')"
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
      :title="showcaseTitle('taskStatus')"
      :description="showcaseDesc('taskStatus')"
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
      :title="showcaseTitle('minimal')"
      :description="showcaseDesc('minimal')"
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
