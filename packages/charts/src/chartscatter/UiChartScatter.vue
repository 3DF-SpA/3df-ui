<script setup lang="ts">
import { ref, computed, provide, useAttrs, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import type {
  ChartConfig,
  ChartTooltipData,
  ChartContext,
} from '../shared/chart-types';
import { CHART_KEY } from '../shared/chart-types';
import {
  niceScale,
  formatNumber,
  resolveColor,
} from '../shared/chart-utils';
import UiChartContainer from '../shared/UiChartContainer.vue';
import UiChartTooltip from '../shared/UiChartTooltip.vue';
import UiChartLegend from '../shared/UiChartLegend.vue';

defineOptions({ inheritAttrs: false });

export type ScatterShape = 'circle' | 'square' | 'diamond';

/**
 * Each scatter series config: x/y keys, optional size key, shape.
 */
export interface ScatterSeriesConfig {
  label: string;
  color: string;
  /** Key in data for X values */
  xKey: string;
  /** Key in data for Y values */
  yKey: string;
  /** Optional key for bubble size */
  sizeKey?: string;
  /** Dot shape */
  shape?: ScatterShape;
}

export type ScatterConfig = Record<string, ScatterSeriesConfig>;

const props = withDefaults(
  defineProps<{
    config: ScatterConfig;
    data: Record<string, string | number>[];
    showTooltip?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    tickCount?: number;
    xFormatter?: (value: number) => string;
    yFormatter?: (value: number) => string;
    tooltipFormatter?: (value: number, key: string) => string;
    /** Min / max dot radius for bubble sizing */
    minDotRadius?: number;
    maxDotRadius?: number;
    /** Default dot radius (when no sizeKey) */
    dotRadius?: number;
    minHeight?: number;
    animate?: boolean;
    class?: string;
  }>(),
  {
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    showXAxis: true,
    showYAxis: true,
    tickCount: 5,
    minDotRadius: 4,
    maxDotRadius: 24,
    dotRadius: 6,
    minHeight: 400,
    animate: true,
  },
);

const attrs = useAttrs();

/* ── Provide chart context (adapt ScatterConfig → ChartConfig for legend) ── */

const rootRef = ref<HTMLDivElement>();
const resolvedColors = ref<Record<string, string>>({});

const chartConfigForLegend = computed<ChartConfig>(() => {
  const cfg: ChartConfig = {};
  for (const [key, s] of Object.entries(props.config)) {
    cfg[key] = { label: s.label, color: s.color };
  }
  return cfg;
});

const configRefForLegend = computed(() => chartConfigForLegend.value);

function updateColors() {
  const resolved: Record<string, string> = {};
  for (const [key, s] of Object.entries(props.config)) {
    resolved[key] = resolveColor(s.color, rootRef.value ?? undefined);
  }
  resolvedColors.value = resolved;
}

onMounted(() => updateColors());
watch(() => props.config, updateColors, { deep: true });

provide<ChartContext>(CHART_KEY, {
  config: configRefForLegend,
  resolvedColors,
});

/* ── Hidden series (legend toggle) ─────────────────────────── */

const hiddenSeries = ref<Set<string>>(new Set());

function onToggleSeries(key: string) {
  const next = new Set(hiddenSeries.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  hiddenSeries.value = next;
}

const visibleSeriesKeys = computed(() =>
  Object.keys(props.config).filter((k) => !hiddenSeries.value.has(k)),
);

/* ── Entrance animation ───────────────────────────────────── */

const animProgress = ref(props.animate ? 0 : 1);
let rafId = 0;

onMounted(() => {
  if (props.animate) {
    nextTick(() => {
      rafId = requestAnimationFrame(() => {
        animProgress.value = 1;
      });
    });
  }
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

/* ── Derived scales ────────────────────────────────────────── */

function getExtent(accessor: (s: ScatterSeriesConfig) => string) {
  let min = Infinity;
  let max = -Infinity;
  for (const key of visibleSeriesKeys.value) {
    const s = props.config[key]!;
    const k = accessor(s);
    for (const row of props.data) {
      const v = Number(row[k]);
      if (!Number.isFinite(v)) continue;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (min === Infinity) { min = 0; max = 1; }
  return { min, max };
}

function getSizeExtent() {
  let min = Infinity;
  let max = -Infinity;
  for (const key of visibleSeriesKeys.value) {
    const sizeKey = props.config[key]!.sizeKey;
    if (!sizeKey) continue;
    for (const row of props.data) {
      const v = Number(row[sizeKey]);
      if (!Number.isFinite(v)) continue;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (min === Infinity) { min = 0; max = 1; }
  return { min, max };
}

const xExtent = computed(() => getExtent((s) => s.xKey));
const yExtent = computed(() => getExtent((s) => s.yKey));
const sizeExtent = computed(() => getSizeExtent());

const xScale = computed(() => niceScale(xExtent.value.min, xExtent.value.max, props.tickCount));
const yScale = computed(() => niceScale(yExtent.value.min, yExtent.value.max, props.tickCount));

const fmtX = computed(() => props.xFormatter ?? formatNumber);
const fmtY = computed(() => props.yFormatter ?? formatNumber);

/* ── Padding ───────────────────────────────────────────────── */

const PADDING = computed(() => ({
  top: 20,
  right: 24,
  bottom: 48,
  left: 60,
}));

/* ── Tooltip state ─────────────────────────────────────────── */

const tooltipData = ref<ChartTooltipData | null>(null);
const tooltipX = ref(0);
const tooltipY = ref(0);
const hoveredPoint = ref<{ seriesKey: string; dataIndex: number } | null>(null);

/* ── Point computation ─────────────────────────────────────── */

interface ScatterPoint {
  x: number;
  y: number;
  r: number;
  seriesKey: string;
  dataIndex: number;
  rawX: number;
  rawY: number;
  rawSize: number | null;
  color: string;
  shape: ScatterShape;
}

function computePoints(w: number, h: number): ScatterPoint[] {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: xMin, max: xMax } = xScale.value;
  const { min: yMin, max: yMax } = yScale.value;
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  const { min: sMin, max: sMax } = sizeExtent.value;
  const sRange = sMax - sMin || 1;

  const points: ScatterPoint[] = [];

  for (const seriesKey of visibleSeriesKeys.value) {
    const s = props.config[seriesKey]!;

    for (let di = 0; di < props.data.length; di++) {
      const row = props.data[di]!;
      const rawX = Number(row[s.xKey]);
      const rawY = Number(row[s.yKey]);
      if (!Number.isFinite(rawX) || !Number.isFinite(rawY)) continue;

      const px = pad.left + ((rawX - xMin) / xRange) * plotW;
      // Animate from center line toward target
      const targetPy = pad.top + ((yMax - rawY) / yRange) * plotH;
      const centerY = pad.top + plotH / 2;
      const py = centerY + (targetPy - centerY) * animProgress.value;

      let radius = props.dotRadius;
      let rawSize: number | null = null;
      if (s.sizeKey) {
        rawSize = Number(row[s.sizeKey]) || 0;
        const norm = sRange > 0 ? (rawSize - sMin) / sRange : 0.5;
        radius = props.minDotRadius + norm * (props.maxDotRadius - props.minDotRadius);
      }

      points.push({
        x: px,
        y: py,
        r: radius * animProgress.value,
        seriesKey,
        dataIndex: di,
        rawX,
        rawY,
        rawSize,
        color: s.color,
        shape: s.shape ?? 'circle',
      });
    }
  }

  return points;
}

/* ── Grid & Axes ───────────────────────────────────────────── */

function computeGridAndAxes(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: xMin, max: xMax, ticks: xTicks } = xScale.value;
  const { min: yMin, max: yMax, ticks: yTicks } = yScale.value;
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const gridDots: Array<{ cx: number; cy: number }> = [];
  const xLabels: Array<{ x: number; y: number; text: string }> = [];
  const yLabels: Array<{ x: number; y: number; text: string }> = [];

  if (props.showGrid) {
    for (const yt of yTicks) {
      const py = pad.top + ((yMax - yt) / yRange) * plotH;
      for (const xt of xTicks) {
        const px = pad.left + ((xt - xMin) / xRange) * plotW;
        gridDots.push({ cx: px, cy: py });
      }
    }
  }

  if (props.showXAxis) {
    for (const xt of xTicks) {
      const px = pad.left + ((xt - xMin) / xRange) * plotW;
      xLabels.push({ x: px, y: pad.top + plotH + 28, text: fmtX.value(xt) });
    }
  }

  if (props.showYAxis) {
    for (const yt of yTicks) {
      const py = pad.top + ((yMax - yt) / yRange) * plotH;
      yLabels.push({ x: pad.left - 12, y: py + 4, text: fmtY.value(yt) });
    }
  }

  return { gridDots, xLabels, yLabels };
}

/* ── Shape path helper ─────────────────────────────────────── */

function shapePath(shape: ScatterShape, cx: number, cy: number, r: number): string {
  switch (shape) {
    case 'square': {
      const s = r * 0.85;
      return `M${cx - s},${cy - s}h${s * 2}v${s * 2}h${-s * 2}Z`;
    }
    case 'diamond': {
      const d = r * 1.1;
      return `M${cx},${cy - d}L${cx + d},${cy}L${cx},${cy + d}L${cx - d},${cy}Z`;
    }
    default:
      return '';
  }
}

/* ── Tooltip handlers ──────────────────────────────────────── */

function onDotHover(pt: ScatterPoint, event: MouseEvent) {
  if (!props.showTooltip) return;

  hoveredPoint.value = { seriesKey: pt.seriesKey, dataIndex: pt.dataIndex };

  const s = props.config[pt.seriesKey]!;
  const label = s.label;

  const items = [
    { key: 'x', label: s.xKey, value: pt.rawX, color: resolveColor(pt.color) },
    { key: 'y', label: s.yKey, value: pt.rawY, color: resolveColor(pt.color) },
  ];
  if (pt.rawSize !== null && s.sizeKey) {
    items.push({ key: 'size', label: s.sizeKey, value: pt.rawSize, color: resolveColor(pt.color) });
  }

  tooltipData.value = { label, items };

  const container = (event.currentTarget as SVGElement).closest('div');
  if (container) {
    const rect = container.getBoundingClientRect();
    tooltipX.value = event.clientX - rect.left + 16;
    tooltipY.value = event.clientY - rect.top - 12;
    if (tooltipX.value + 180 > rect.width) tooltipX.value = event.clientX - rect.left - 190;
    if (tooltipY.value < 0) tooltipY.value = 8;
  }
}

function onDotLeave() {
  hoveredPoint.value = null;
  tooltipData.value = null;
}
</script>

<template>
  <div ref="rootRef" v-bind="attrs" :class="['flex flex-col gap-4', props.class]">
    <UiChartContainer
      :config="chartConfigForLegend"
      :min-height="minHeight"
      class="w-full"
    >
      <template #default="{ width: w, height: h }">
        <template v-for="c in [{ grid: computeGridAndAxes(w, h), points: computePoints(w, h) }]" :key="0">
        <defs>
          <!-- Glow filter -->
          <filter id="scatter-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Dot grid -->
        <circle
          v-for="(dot, i) in c.grid.gridDots"
          :key="`dot-${i}`"
          :cx="dot.cx"
          :cy="dot.cy"
          r="1.5"
          class="fill-border"
          opacity="0.5"
        />

        <!-- Y axis labels -->
        <text
          v-for="(label, i) in c.grid.yLabels"
          :key="`ylab-${i}`"
          :x="label.x"
          :y="label.y"
          text-anchor="end"
          class="fill-muted-foreground"
          font-size="11"
          font-weight="500"
        >
          {{ label.text }}
        </text>

        <!-- X axis labels -->
        <text
          v-for="(label, i) in c.grid.xLabels"
          :key="`xlab-${i}`"
          :x="label.x"
          :y="label.y"
          text-anchor="middle"
          class="fill-muted-foreground"
          font-size="12"
          font-weight="500"
        >
          {{ label.text }}
        </text>

        <!-- Zero baselines -->
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
          :x1="PADDING.left"
          :y1="PADDING.top"
          :x2="PADDING.left"
          :y2="h - PADDING.bottom"
          class="stroke-border"
          stroke-width="1"
          opacity="0.6"
          shape-rendering="crispEdges"
        />

        <!-- Data points -->
        <template v-for="pt in c.points"
          :key="`pt-${pt.seriesKey}-${pt.dataIndex}`"
        >
          <!-- Circle shape -->
          <circle
            v-if="pt.shape === 'circle'"
            :cx="pt.x"
            :cy="pt.y"
            :r="hoveredPoint?.seriesKey === pt.seriesKey && hoveredPoint?.dataIndex === pt.dataIndex
              ? pt.r * 1.3
              : pt.r"
            :fill="pt.color"
            :opacity="hoveredPoint !== null
              ? (hoveredPoint.seriesKey === pt.seriesKey && hoveredPoint.dataIndex === pt.dataIndex ? 1 : 0.35)
              : 0.75"
            :stroke="hoveredPoint?.seriesKey === pt.seriesKey && hoveredPoint?.dataIndex === pt.dataIndex
              ? 'var(--color-background)' : 'none'"
            :stroke-width="2"
            :filter="hoveredPoint?.seriesKey === pt.seriesKey && hoveredPoint?.dataIndex === pt.dataIndex
              ? 'url(#scatter-glow)' : undefined"
            :style="{
              transition: 'r 200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease, cy 500ms ease',
              cursor: 'pointer',
            }"
            @mousemove="onDotHover(pt, $event)"
            @mouseleave="onDotLeave"
          />

          <!-- Square / Diamond shape -->
          <path
            v-else
            :d="shapePath(pt.shape, pt.x, pt.y,
              hoveredPoint?.seriesKey === pt.seriesKey && hoveredPoint?.dataIndex === pt.dataIndex
                ? pt.r * 1.3 : pt.r)"
            :fill="pt.color"
            :opacity="hoveredPoint !== null
              ? (hoveredPoint.seriesKey === pt.seriesKey && hoveredPoint.dataIndex === pt.dataIndex ? 1 : 0.35)
              : 0.75"
            :stroke="hoveredPoint?.seriesKey === pt.seriesKey && hoveredPoint?.dataIndex === pt.dataIndex
              ? 'var(--color-background)' : 'none'"
            :stroke-width="2"
            :filter="hoveredPoint?.seriesKey === pt.seriesKey && hoveredPoint?.dataIndex === pt.dataIndex
              ? 'url(#scatter-glow)' : undefined"
            :style="{
              transition: 'opacity 200ms ease, d 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'pointer',
            }"
            @mousemove="onDotHover(pt, $event)"
            @mouseleave="onDotLeave"
          />
        </template>
        </template>
      </template>

      <!-- Tooltip overlay -->
      <template #overlay>
        <UiChartTooltip
          :data="tooltipData"
          :x="tooltipX"
          :y="tooltipY"
          :formatter="tooltipFormatter"
        />
      </template>
    </UiChartContainer>

    <!-- Legend -->
    <UiChartLegend
      v-if="showLegend"
      class="justify-center"
      :hidden-keys="hiddenSeries"
      @toggle="onToggleSeries"
    />
  </div>
</template>
