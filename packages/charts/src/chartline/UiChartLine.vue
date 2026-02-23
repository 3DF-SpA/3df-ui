<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import UiChartContainer from '../shared/UiChartContainer.vue';
import UiChartLegend from '../shared/UiChartLegend.vue';
import UiChartTooltip from '../shared/UiChartTooltip.vue';
import type { ChartConfig, ChartDataRow } from '../shared/chart-types';
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
import { computeSeriesData } from './line-curves';
import {
  type LineParams,
  type StackMode,
  computeLineGrid,
  computeLineHoverRegions,
  computeStackedData,
} from './line-geometry';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    index: string;
    curveType?: 'monotone' | 'linear' | 'step';
    mode?: StackMode;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showDots?: boolean;
    showArea?: boolean;
    showLine?: boolean;
    fillOpacity?: number;
    tickCount?: number;
    valueFormatter?: (value: number) => string;
    categoryFormatter?: (value: string | number) => string;
    strokeWidth?: number;
    dotRadius?: number;
    minHeight?: number;
    class?: string;
    tooltipFormatter?: (value: number, key: string) => string;
    animate?: boolean;
  }>(),
  {
    curveType: 'monotone',
    mode: 'none',
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    showXAxis: true,
    showYAxis: true,
    showDots: false,
    showArea: true,
    showLine: true,
    fillOpacity: 0.25,
    tickCount: 5,
    strokeWidth: 2.5,
    dotRadius: 4,
    minHeight: 350,
    animate: true,
  },
);

const attrs = useAttrs();
const rootRef = ref<HTMLDivElement>();

const { chartUid } = useChartContext(
  computed(() => props.config),
  rootRef,
  'line',
);
const filtGlow = computed(() => `${chartUid}-glow`);

const { hiddenSeries, onToggleSeries } = useChartLegendToggle();
const animProgress = useChartAnimation(props.animate);
const { tooltipData, tooltipX, tooltipY, positionTooltip, hideTooltip } = useChartTooltip();

const visibleSeriesKeys = computed(() =>
  getSeriesKeys(props.config).filter((k) => !hiddenSeries.value.has(k)),
);

const isStacked = computed(() => props.mode !== 'none');

const stackedData = computed(() =>
  computeStackedData(props.data, visibleSeriesKeys.value, props.mode),
);

const extent = computed(() => {
  if (props.mode === 'expanded') return { min: 0, max: 1 };
  if (props.mode === 'stacked') {
    let max = 0;
    for (let di = 0; di < props.data.length; di++) {
      let sum = 0;
      for (const key of visibleSeriesKeys.value) sum += Number(props.data[di]![key]) || 0;
      if (sum > max) max = sum;
    }
    return { min: 0, max };
  }
  return getDataExtent(props.data, visibleSeriesKeys.value, false);
});

const scale = computed(() =>
  props.mode === 'expanded'
    ? { min: 0, max: 1, step: 0.25, ticks: [0, 0.25, 0.5, 0.75, 1] }
    : niceScale(extent.value.min, extent.value.max, props.tickCount),
);

const fmtValue = computed(() => {
  if (props.mode === 'expanded') return (v: number) => `${Math.round(v * 100)}%`;
  return props.valueFormatter ?? formatNumber;
});
const fmtCategory = computed(() => props.categoryFormatter ?? ((v: string | number) => String(v)));

const PADDING = computed(() => ({ top: 20, right: 24, bottom: 48, left: 60 }));

const hoveredIndex = ref<number | null>(null);
const crosshairX = ref<number | null>(null);

const lineParams = computed<LineParams>(() => ({
  data: props.data,
  index: props.index,
  config: props.config,
  curveType: props.curveType,
  mode: props.mode,
  visibleSeriesKeys: visibleSeriesKeys.value,
  scale: scale.value,
  animProgress: animProgress.value,
  padding: PADDING.value,
  showGrid: props.showGrid,
  showXAxis: props.showXAxis,
  showYAxis: props.showYAxis,
  showArea: props.showArea,
  fmtValue: fmtValue.value,
  fmtCategory: fmtCategory.value,
}));

function onPointHover(dataIndex: number, centerX: number, event: MouseEvent) {
  if (!props.showTooltip) return;
  hoveredIndex.value = dataIndex;
  crosshairX.value = centerX;

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

function onPointLeave() {
  hoveredIndex.value = null;
  crosshairX.value = null;
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
              series: computeSeriesData(w, h, stackedData, lineParams),
              grid: computeLineGrid(w, h, lineParams),
              hover: computeLineHoverRegions(w, h, lineParams),
            },
          ]"
          :key="0"
        >
          <defs>
            <linearGradient
              v-for="series in c.series"
              :id="series.gradientId"
              :key="`grad-${series.key}`"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" :stop-color="series.color" :stop-opacity="fillOpacity" />
              <stop offset="85%" :stop-color="series.color" stop-opacity="0.02" />
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
            v-if="crosshairX !== null"
            :x1="crosshairX"
            :y1="PADDING.top"
            :x2="crosshairX"
            :y2="h - PADDING.bottom"
            class="stroke-foreground"
            stroke-width="1"
            opacity="0.08"
            stroke-dasharray="3 3"
            shape-rendering="crispEdges"
          />

          <path
            v-for="series in showArea ? [...c.series].reverse() : []"
            :key="`area-${series.key}`"
            :d="series.areaPath"
            :fill="`url(#${series.gradientId})`"
            :opacity="hoveredIndex !== null ? (isStacked ? 0.7 : 0.6) : 1"
            :style="{ transition: 'opacity 300ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }"
          />

          <template v-for="series in c.series" :key="series.key">
            <path
              v-if="showLine"
              :d="series.linePath"
              fill="none"
              :stroke="series.color"
              :stroke-width="strokeWidth"
              stroke-linecap="round"
              stroke-linejoin="round"
              :opacity="hiddenSeries.has(series.key) ? 0 : 1"
              :filter="hoveredIndex !== null ? `url(#${filtGlow})` : undefined"
              :style="{
                transition: 'opacity 300ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }"
            />

            <circle
              v-for="pt in showDots ? series.points : []"
              :key="`sdot-${series.key}-${pt.dataIndex}`"
              :cx="pt.x"
              :cy="pt.yTop"
              :r="dotRadius * 0.6"
              :fill="series.color"
              :opacity="hoveredIndex === pt.dataIndex ? 0 : 0.6"
              :style="{
                transition: 'opacity 200ms ease, cy 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }"
            />

            <circle
              v-for="pt in series.points"
              v-show="hoveredIndex === pt.dataIndex"
              :key="`hdot-${series.key}-${pt.dataIndex}`"
              :cx="pt.x"
              :cy="pt.yTop"
              :r="dotRadius"
              fill="var(--color-background)"
              :stroke="series.color"
              :stroke-width="strokeWidth"
              :style="{
                filter: `drop-shadow(0 0 4px ${series.color})`,
                transition:
                  'r 200ms cubic-bezier(0.34, 1.56, 0.64, 1), cy 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }"
            />
          </template>

          <rect
            v-for="region in c.hover"
            :key="`hover-${region.dataIndex}`"
            :x="region.x"
            :y="region.y"
            :width="region.width"
            :height="region.height"
            fill="transparent"
            @mousemove="onPointHover(region.dataIndex, region.centerX, $event)"
            @mouseleave="onPointLeave"
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
