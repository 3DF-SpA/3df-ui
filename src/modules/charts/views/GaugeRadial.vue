<script setup lang="ts">
import { type GaugeSegment, UiChartGauge } from '@3df/charts';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

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

const gaugeProps: PropItem[] = [
  {
    name: 'value',
    type: 'number',
    default: '-',
    description: 'Valor actual del gauge (requerido).',
  },
  { name: 'min', type: 'number', default: '0', description: 'Valor mínimo de la escala.' },
  { name: 'max', type: 'number', default: '100', description: 'Valor máximo de la escala.' },
  {
    name: 'variant',
    type: "'semicircle' | 'arc' | 'full'",
    default: "'semicircle'",
    description: 'Forma del arco: 180°, 270° o 360°.',
  },
  {
    name: 'segments',
    type: 'GaugeSegment[]',
    default: '-',
    description: 'Segmentos de color con max, color y label.',
  },
  {
    name: 'showSegmentLabels',
    type: 'boolean',
    default: 'false',
    description: 'Muestra las etiquetas de cada segmento.',
  },
  {
    name: 'showNeedle',
    type: 'boolean',
    default: 'true',
    description: 'Muestra la aguja indicadora.',
  },
  {
    name: 'color',
    type: 'string',
    default: '-',
    description: 'Color del arco de valor (sin segmentos).',
  },
  {
    name: 'label',
    type: 'string',
    default: '-',
    description: 'Etiqueta descriptiva debajo del valor.',
  },
  {
    name: 'valueFormatter',
    type: '(v: number) => string',
    default: '-',
    description: 'Formateador personalizado para el valor mostrado.',
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: 'Habilita la animación de entrada.',
  },
  {
    name: 'GaugeSegment: max',
    type: 'number',
    default: '-',
    description: 'Valor máximo del segmento.',
  },
  {
    name: 'GaugeSegment: color',
    type: 'string',
    default: '-',
    description: 'Color del segmento.',
  },
  {
    name: 'GaugeSegment: label',
    type: 'string',
    default: '-',
    description: 'Etiqueta del segmento (visible con showSegmentLabels).',
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Gauge / Radial"
      description="Gauges radiales con aguja, segmentos de color y 3 formas de arco — semicírculo, arco 270° y círculo completo. 100% SVG, sin dependencias."
      import-code="import { UiChartGauge, type GaugeSegment } from '@3df/charts'"
    />

    <DocShowcase
      title="Semicírculo — Default"
      description="Gauge clásico de medio círculo con aguja. Arco de un solo color."
      :code="semicircleCode"
    >
      <div class="border-border bg-card rounded-xl border p-6">
        <UiChartGauge :value="72" label="Performance" :value-formatter="(v: number) => `${v}%`" />
      </div>
    </DocShowcase>

    <DocShowcase
      title="Arco 270° — Zonas de velocidad"
      description="Cuatro segmentos de color con etiquetas. La aguja apunta a la velocidad actual."
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
      title="Círculo completo — Temperatura"
      description="Gauge 360° con color personalizado. Sin aguja."
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
      title="Health score — Sin animación"
      description="Semicírculo con zonas de salud. Estático (sin animación de entrada)."
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
