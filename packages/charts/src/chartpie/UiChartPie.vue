<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import UiChartContainer from '../shared/UiChartContainer.vue';
import UiChartLegend from '../shared/UiChartLegend.vue';
import UiChartTooltip from '../shared/UiChartTooltip.vue';
import type { ChartConfig, ChartDataRow } from '../shared/chart-types';
import { resolveColor } from '../shared/chart-utils';
import { useChartAnimation } from '../shared/useChartAnimation';
import { useChartContext } from '../shared/useChartContext';
import { useChartLegendToggle } from '../shared/useChartLegendToggle';
import { useChartTooltip } from '../shared/useChartTooltip';
import { type ArcSlice, computeArcs, labelText, resolveSlices } from './pie-geometry';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    index: string;
    valueKey?: string;
    innerRadius?: number;
    radiusFraction?: number;
    padAngle?: number;
    cornerRadius?: number;
    showTooltip?: boolean;
    showLegend?: boolean;
    showLabels?: boolean;
    labelType?: 'percent' | 'value' | 'name';
    minHeight?: number;
    class?: string;
    tooltipFormatter?: (value: number, key: string) => string;
    valueFormatter?: (value: number) => string;
    animate?: boolean;
    startAngle?: number;
    totalLabel?: string;
  }>(),
  {
    innerRadius: 0,
    radiusFraction: 0.85,
    padAngle: 1.5,
    cornerRadius: 3,
    showTooltip: true,
    showLegend: true,
    showLabels: false,
    labelType: 'percent',
    minHeight: 350,
    animate: true,
    startAngle: -90,
    totalLabel: 'Total',
  },
);

const attrs = useAttrs();
const rootRef = ref<HTMLDivElement>();

const { chartUid } = useChartContext(
  computed(() => props.config),
  rootRef,
  'pie',
);
const filtGlow = computed(() => `${chartUid}-glow`);
const filtShadow = computed(() => `${chartUid}-shadow`);

const { hiddenSeries: hiddenSlices, onToggleSeries: onToggleSlice } = useChartLegendToggle();
const animProgress = useChartAnimation(props.animate);
const { tooltipData, tooltipX, tooltipY, positionTooltip, hideTooltip } = useChartTooltip();

const slices = computed(() => resolveSlices(props.data, props.index, props.config, props.valueKey));
const visibleSlices = computed(() => slices.value.filter((s) => !hiddenSlices.value.has(s.key)));
const total = computed(() => visibleSlices.value.reduce((sum, s) => sum + s.value, 0));

// Resolve CSS variable colors (e.g. var(--color-chart-1)) to concrete HSL values
// before they reach SVG gradient stop-color attributes, which don't support var() reliably.
const resolvedSlices = computed(() =>
  visibleSlices.value.map((s) => ({
    ...s,
    color: resolveColor(s.color, rootRef.value ?? undefined),
  })),
);

const hoveredKey = ref<string | null>(null);

const fmtValue = computed(
  () =>
    props.valueFormatter ??
    ((v: number) => {
      if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
      if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
      return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }),
);

function onSliceHover(slice: ArcSlice, event: MouseEvent) {
  if (!props.showTooltip) return;
  hoveredKey.value = slice.key;
  tooltipData.value = {
    label: slice.label,
    items: [
      { key: slice.key, label: slice.label, value: slice.value, color: resolveColor(slice.color) },
    ],
  };
  positionTooltip(event);
}

function onSliceLeave() {
  hoveredKey.value = null;
  hideTooltip();
}
</script>

<template>
  <div ref="rootRef" v-bind="attrs" :class="['flex flex-col gap-4', props.class]">
    <UiChartContainer :min-height="minHeight" class="w-full">
      <template #default="{ width: w, height: h }">
        <template
          v-for="(c, i) in [
            {
              arcs: computeArcs(
                w,
                h,
                resolvedSlices,
                total,
                animProgress,
                radiusFraction,
                innerRadius,
                padAngle,
                startAngle,
              ),
            },
          ]"
          :key="i"
        >
          <defs>
            <radialGradient
              v-for="arc in c.arcs"
              :id="arc.gradientId"
              :key="`grad-${arc.key}`"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" :stop-color="arc.color" stop-opacity="0.9" />
              <stop offset="100%" :stop-color="arc.color" stop-opacity="1" />
            </radialGradient>
            <filter :id="filtGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter :id="filtShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15" />
            </filter>
          </defs>

          <g
            v-for="arc in c.arcs"
            :key="arc.key"
            :style="{
              transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
              transformOrigin: `${w / 2}px ${h / 2}px`,
              transform:
                hoveredKey === arc.key
                  ? `translate(${Math.cos((arc.midAngle * Math.PI) / 180) * 6}px, ${Math.sin((arc.midAngle * Math.PI) / 180) * 6}px)`
                  : 'translate(0, 0)',
            }"
          >
            <path
              :d="arc.path"
              :fill="`url(#${arc.gradientId})`"
              :opacity="hoveredKey === null || hoveredKey === arc.key ? 1 : 0.35"
              :filter="hoveredKey === arc.key ? `url(#${filtShadow})` : undefined"
              :stroke="hoveredKey === arc.key ? arc.color : 'var(--color-background)'"
              :stroke-width="hoveredKey === arc.key ? 2 : 1"
              stroke-linejoin="round"
              class="cursor-pointer"
              :style="{
                transition:
                  'opacity 200ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1), stroke-width 200ms ease',
              }"
              @mousemove="onSliceHover(arc, $event)"
              @mouseleave="onSliceLeave"
            />
          </g>

          <text
            v-for="arc in showLabels ? c.arcs : []"
            :key="`lbl-${arc.key}`"
            :x="arc.labelX"
            :y="arc.labelY"
            text-anchor="middle"
            dominant-baseline="central"
            class="fill-background pointer-events-none font-semibold"
            :font-size="arc.percent < 8 ? 10 : 12"
            :opacity="arc.percent < 3 ? 0 : 1"
            :style="{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }"
          >
            {{ labelText(arc, labelType, fmtValue) }}
          </text>

          <template v-if="innerRadius > 0">
            <text
              :x="w / 2"
              :y="h / 2 - 6"
              text-anchor="middle"
              dominant-baseline="central"
              class="fill-foreground font-bold"
              font-size="22"
              >{{ fmtValue(total) }}</text
            >
            <text
              :x="w / 2"
              :y="h / 2 + 14"
              text-anchor="middle"
              dominant-baseline="central"
              class="fill-muted-foreground"
              font-size="11"
              font-weight="500"
              >{{ props.totalLabel }}</text
            >
          </template>
        </template>
      </template>

      <template #overlay>
        <UiChartTooltip
          :data="tooltipData"
          :x="tooltipX"
          :y="tooltipY"
          :formatter="tooltipFormatter"
        />
      </template>
    </UiChartContainer>

    <UiChartLegend
      v-if="showLegend"
      class="justify-center"
      :hidden-keys="hiddenSlices"
      @toggle="onToggleSlice"
    />
  </div>
</template>
