<script setup lang="ts">
import { computed } from 'vue';

import { type GaugeSegment, UiChartGauge } from '@3df-spa/charts';

import { useDocPage } from '@/i18n/composables/useDocPage';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('gaugeRadial');

const speedSegments: GaugeSegment[] = [
  { max: 60, color: 'var(--color-chart-3)', label: 'Safe' },
  { max: 100, color: 'var(--color-chart-1)', label: 'Normal' },
  { max: 140, color: 'oklch(0.65 0.18 45)', label: 'Fast' },
  { max: 200, color: 'oklch(0.60 0.22 25)', label: 'Danger' },
];

const healthSegments: GaugeSegment[] = [
  { max: 30, color: 'oklch(0.60 0.22 25)', label: 'Critical' },
  { max: 60, color: 'oklch(0.65 0.18 45)', label: 'Warning' },
  { max: 80, color: 'var(--color-chart-1)', label: 'Good' },
  { max: 100, color: 'var(--color-chart-3)', label: 'Excellent' },
];

const semicircleCode = `<UiChartGauge
  :value="72"
  label="Performance"
  :value-formatter="(v) => \`\${v}%\`"
/>`;

const arcCode = `<UiChartGauge
  :value="115"
  :max="200"
  variant="arc"
  :segments="speedSegments"
  :show-segment-labels="true"
  label="km/h"
/>`;

const fullCode = `<UiChartGauge
  :value="38.6"
  :min="35"
  :max="42"
  variant="full"
  color="oklch(0.65 0.18 45)"
  :show-needle="false"
  label="°C"
  :value-formatter="(v) => v.toFixed(1)"
/>`;

const healthCode = `<UiChartGauge
  :value="85"
  :segments="healthSegments"
  :show-segment-labels="true"
  :animate="false"
  label="Health"
  :value-formatter="(v) => \`\${v}/100\`"
/>`;

const gaugeProps = computed<PropItem[]>(() => [
  {
    name: 'value',
    type: 'number',
    default: '-',
    description: propDesc('value'),
  },
  { name: 'min', type: 'number', default: '0', description: propDesc('min') },
  { name: 'max', type: 'number', default: '100', description: propDesc('max') },
  {
    name: 'variant',
    type: "'semicircle' | 'arc' | 'full'",
    default: "'semicircle'",
    description: propDesc('variant'),
  },
  {
    name: 'segments',
    type: 'GaugeSegment[]',
    default: '-',
    description: propDesc('segments'),
  },
  {
    name: 'showSegmentLabels',
    type: 'boolean',
    default: 'false',
    description: propDesc('showSegmentLabels'),
  },
  {
    name: 'showNeedle',
    type: 'boolean',
    default: 'true',
    description: propDesc('showNeedle'),
  },
  {
    name: 'color',
    type: 'string',
    default: '-',
    description: propDesc('color'),
  },
  {
    name: 'label',
    type: 'string',
    default: '-',
    description: propDesc('label'),
  },
  {
    name: 'valueFormatter',
    type: '(v: number) => string',
    default: '-',
    description: propDesc('valueFormatter'),
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: propDesc('animate'),
  },
  {
    name: 'GaugeSegment: max',
    type: 'number',
    default: '-',
    description: propDesc('segmentMax'),
  },
  {
    name: 'GaugeSegment: color',
    type: 'string',
    default: '-',
    description: propDesc('segmentColor'),
  },
  {
    name: 'GaugeSegment: label',
    type: 'string',
    default: '-',
    description: propDesc('segmentLabel'),
  },
]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Gauge / Radial"
      :description="description"
      import-code="import { UiChartGauge, type GaugeSegment } from '@3df-spa/charts'"
    />

    <DocShowcase
      :title="showcaseTitle('semicircle')"
      :description="showcaseDesc('semicircle')"
      :code="semicircleCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartGauge :value="72" label="Performance" :value-formatter="(v: number) => `${v}%`" />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('arc270')"
      :description="showcaseDesc('arc270')"
      :code="arcCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartGauge
          :value="115"
          :max="200"
          variant="arc"
          :segments="speedSegments"
          :show-segment-labels="true"
          label="km/h"
          :value-formatter="(v: number) => `${v}`"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('fullCircle')"
      :description="showcaseDesc('fullCircle')"
      :code="fullCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartGauge
          :value="38.6"
          :min="35"
          :max="42"
          variant="full"
          color="oklch(0.65 0.18 45)"
          :show-needle="false"
          label="°C"
          :value-formatter="(v: number) => v.toFixed(1)"
        />
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('healthScore')"
      :description="showcaseDesc('healthScore')"
      :code="healthCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartGauge
          :value="85"
          :segments="healthSegments"
          :show-segment-labels="true"
          :animate="false"
          label="Health"
          :value-formatter="(v: number) => `${v}/100`"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="gaugeProps" />
  </div>
</template>
