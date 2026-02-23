<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import UiChartContainer from '../shared/UiChartContainer.vue';
import UiChartLegend from '../shared/UiChartLegend.vue';
import UiChartTooltip from '../shared/UiChartTooltip.vue';
import type {
  ChartAxisConfig,
  ChartConfig,
  ChartDataRow,
  ChartOrientation,
  ChartStackMode,
} from '../shared/chart-types';
import {
  formatNumber,
  getDataExtent,
  getSeriesKeys,
  niceScale,
  resolveColor,
} from '../shared/chart-utils';
import { useChartAnimation } from '../shared/useChartAnimation';
import { useChartContext } from '../shared/useChartContext';
import { useChartLegendToggle } from '../shared/useChartLegendToggle';
import { useChartTooltip } from '../shared/useChartTooltip';
import { computeHorizontalBars, computeVerticalBars } from './bar-bars';
import { type BarParams, computeBarGrid, computeBarHoverRegions } from './bar-geometry';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    index: string;
    orientation?: ChartOrientation;
    mode?: ChartStackMode;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    tickCount?: number;
    valueFormatter?: (value: number) => string;
    categoryFormatter?: (value: string | number) => string;
    radius?: number;
    barGap?: number;
    categoryGap?: number;
    minHeight?: number;
    class?: string;
    xAxis?: ChartAxisConfig;
    yAxis?: ChartAxisConfig;
    tooltipFormatter?: (value: number, key: string) => string;
    animate?: boolean;
  }>(),
  {
    orientation: 'vertical',
    mode: 'grouped',
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    showXAxis: true,
    showYAxis: true,
    tickCount: 5,
    radius: 6,
    barGap: 0.15,
    categoryGap: 0.25,
    minHeight: 350,
    animate: true,
  },
);

const attrs = useAttrs();
const rootRef = ref<HTMLDivElement>();

const { chartUid } = useChartContext(
  computed(() => props.config),
  rootRef,
  'bar',
);
const filtGlow = computed(() => `${chartUid}-glow`);

const { hiddenSeries, onToggleSeries } = useChartLegendToggle();
const animProgress = useChartAnimation(props.animate);
const { tooltipData, tooltipX, tooltipY, positionTooltip, hideTooltip } = useChartTooltip();

const visibleSeriesKeys = computed(() =>
  getSeriesKeys(props.config).filter((k) => !hiddenSeries.value.has(k)),
);

const extent = computed(() =>
  getDataExtent(props.data, visibleSeriesKeys.value, props.mode === 'stacked'),
);
const scale = computed(() => niceScale(extent.value.min, extent.value.max, props.tickCount));
const fmtValue = computed(() => props.valueFormatter ?? formatNumber);
const fmtCategory = computed(() => props.categoryFormatter ?? ((v: string | number) => String(v)));

const PADDING = computed(() => {
  const isVert = props.orientation === 'vertical';
  return { top: 16, right: 20, bottom: isVert ? 48 : 20, left: isVert ? 60 : 72 };
});

const hoveredIndex = ref<number | null>(null);
const crosshairPos = ref<number | null>(null);

const gradientDefs = computed(() =>
  visibleSeriesKeys.value.map((key) => ({
    key,
    id: `bar-grad-${key}`,
    color: props.config[key]!.color,
  })),
);

const barParams = computed<BarParams>(() => ({
  data: props.data,
  index: props.index,
  config: props.config,
  orientation: props.orientation,
  mode: props.mode,
  visibleSeriesKeys: visibleSeriesKeys.value,
  scale: scale.value,
  animProgress: animProgress.value,
  padding: PADDING.value,
  radius: props.radius,
  barGap: props.barGap,
  categoryGap: props.categoryGap,
  showGrid: props.showGrid,
  showXAxis: props.showXAxis,
  showYAxis: props.showYAxis,
  fmtValue: fmtValue.value,
  fmtCategory: fmtCategory.value,
}));

function onCategoryHover(dataIndex: number, center: number, event: MouseEvent) {
  if (!props.showTooltip) return;
  hoveredIndex.value = dataIndex;
  crosshairPos.value = center;

  const row = props.data[dataIndex]!;
  const label = String(row[props.index] ?? '');
  const items = visibleSeriesKeys.value.map((key) => ({
    key,
    label: props.config[key]!.label,
    value: Number(row[key]) || 0,
    color: resolveColor(props.config[key]!.color),
  }));
  tooltipData.value = { label, items };
  positionTooltip(event);
}

function onCategoryLeave() {
  hoveredIndex.value = null;
  crosshairPos.value = null;
  hideTooltip();
}
</script>

<template>
  <div ref="rootRef" v-bind="attrs" :class="['flex flex-col gap-4', props.class]">
    <UiChartContainer :min-height="minHeight" class="w-full">
      <template #default="{ width: w, height: h }">
        <template
          v-for="c in [
            {
              grid: computeBarGrid(w, h, barParams),
              hover: computeBarHoverRegions(w, h, barParams),
              bars:
                orientation === 'vertical'
                  ? computeVerticalBars(w, h, barParams)
                  : computeHorizontalBars(w, h, barParams),
            },
          ]"
          :key="0"
        >
          <defs>
            <linearGradient
              v-for="grad in gradientDefs"
              :id="grad.id"
              :key="grad.key"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" :stop-color="grad.color" stop-opacity="1" />
              <stop offset="100%" :stop-color="grad.color" stop-opacity="0.6" />
            </linearGradient>
            <filter :id="filtGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle
            v-for="(dot, i) in c.grid.gridDots"
            :key="`dot-${i}`"
            :cx="dot.cx"
            :cy="dot.cy"
            r="1.5"
            class="fill-border"
            opacity="0.5"
          />

          <text
            v-for="(label, i) in c.grid.valueLabels"
            :key="`val-${i}`"
            :x="label.x"
            :y="label.y"
            :text-anchor="label.anchor"
            class="fill-muted-foreground"
            font-size="11"
            font-weight="500"
            >{{ label.text }}</text
          >

          <text
            v-for="(label, i) in c.grid.categoryLabels"
            :key="`cat-${i}`"
            :x="label.x"
            :y="label.y"
            :text-anchor="label.anchor"
            class="fill-muted-foreground"
            font-size="12"
            font-weight="500"
            >{{ label.text }}</text
          >

          <line
            v-if="orientation === 'vertical'"
            :x1="PADDING.left"
            :y1="h - PADDING.bottom"
            :x2="w - PADDING.right"
            :y2="h - PADDING.bottom"
            class="stroke-border"
            stroke-width="1"
            opacity="0.6"
            shape-rendering="crispEdges"
          />

          <line
            v-if="crosshairPos !== null && orientation === 'vertical'"
            :x1="crosshairPos"
            :y1="PADDING.top"
            :x2="crosshairPos"
            :y2="h - PADDING.bottom"
            class="stroke-foreground"
            stroke-width="1"
            opacity="0.08"
            stroke-dasharray="3 3"
            shape-rendering="crispEdges"
          />
          <line
            v-if="crosshairPos !== null && orientation === 'horizontal'"
            :x1="PADDING.left"
            :y1="crosshairPos"
            :x2="w - PADDING.right"
            :y2="crosshairPos"
            class="stroke-foreground"
            stroke-width="1"
            opacity="0.08"
            stroke-dasharray="3 3"
            shape-rendering="crispEdges"
          />

          <rect
            v-for="region in c.hover"
            v-show="hoveredIndex === region.dataIndex"
            :key="`bg-${region.dataIndex}`"
            :x="region.x"
            :y="region.y"
            :width="region.width"
            :height="region.height"
            class="fill-foreground"
            opacity="0.03"
            rx="4"
          />

          <rect
            v-for="(bar, i) in c.bars"
            :key="`bar-${i}`"
            :x="bar.x"
            :y="bar.y"
            :width="bar.width"
            :height="bar.height"
            :rx="bar.rx"
            :fill="`url(#${bar.gradientId})`"
            :opacity="hoveredIndex === null || hoveredIndex === bar.dataIndex ? 1 : 0.25"
            :filter="hoveredIndex === bar.dataIndex ? `url(#${filtGlow})` : undefined"
            :style="{
              transition:
                'opacity 200ms ease, filter 200ms ease, y 600ms cubic-bezier(0.34, 1.56, 0.64, 1), height 600ms cubic-bezier(0.34, 1.56, 0.64, 1), width 600ms cubic-bezier(0.34, 1.56, 0.64, 1), x 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }"
          />

          <rect
            v-for="region in c.hover"
            :key="`hover-${region.dataIndex}`"
            :x="region.x"
            :y="region.y"
            :width="region.width"
            :height="region.height"
            fill="transparent"
            @mousemove="onCategoryHover(region.dataIndex, region.center, $event)"
            @mouseleave="onCategoryLeave"
          />
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
      :hidden-keys="hiddenSeries"
      @toggle="onToggleSeries"
    />
  </div>
</template>
