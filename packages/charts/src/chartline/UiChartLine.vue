<script setup lang="ts">
import { ref, computed, provide, useAttrs, onMounted, watch, nextTick } from 'vue';
import type {
  ChartConfig,
  ChartDataRow,
  ChartAxisConfig,
  ChartTooltipData,
  ChartContext,
} from '../shared/chart-types';
import { CHART_KEY } from '../shared/chart-types';
import {
  niceScale,
  getSeriesKeys,
  getDataExtent,
  formatNumber,
  resolveColor,
  resolveConfigColors,
} from '../shared/chart-utils';
import UiChartContainer from '../shared/UiChartContainer.vue';
import UiChartTooltip from '../shared/UiChartTooltip.vue';
import UiChartLegend from '../shared/UiChartLegend.vue';

defineOptions({ inheritAttrs: false });

export type CurveType = 'monotone' | 'linear' | 'step';

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    index: string;
    /** Curve interpolation type */
    curveType?: CurveType;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    /** Show dots at data points */
    showDots?: boolean;
    /** Show gradient area fill under lines */
    showArea?: boolean;
    tickCount?: number;
    valueFormatter?: (value: number) => string;
    categoryFormatter?: (value: string | number) => string;
    /** Line stroke width */
    strokeWidth?: number;
    /** Dot radius */
    dotRadius?: number;
    minHeight?: number;
    class?: string;
    xAxis?: ChartAxisConfig;
    yAxis?: ChartAxisConfig;
    tooltipFormatter?: (value: number, key: string) => string;
    /** Enable entrance animation */
    animate?: boolean;
  }>(),
  {
    curveType: 'monotone',
    showTooltip: true,
    showLegend: true,
    showGrid: true,
    showXAxis: true,
    showYAxis: true,
    showDots: false,
    showArea: true,
    tickCount: 5,
    strokeWidth: 2.5,
    dotRadius: 4,
    minHeight: 350,
    animate: true,
  },
);

const attrs = useAttrs();

/* ── Provide chart context ─────────────────────────────────── */

const rootRef = ref<HTMLDivElement>();
const resolvedColors = ref<Record<string, string>>({});
const configRef = computed(() => props.config);

function updateColors() {
  resolvedColors.value = resolveConfigColors(props.config, rootRef.value ?? undefined);
}

onMounted(() => updateColors());
watch(() => props.config, updateColors, { deep: true });

provide<ChartContext>(CHART_KEY, {
  config: configRef,
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
  getSeriesKeys(props.config).filter((k) => !hiddenSeries.value.has(k)),
);

/* ── Entrance animation ───────────────────────────────────── */

const animProgress = ref(props.animate ? 0 : 1);

onMounted(() => {
  if (props.animate) {
    nextTick(() => {
      requestAnimationFrame(() => {
        animProgress.value = 1;
      });
    });
  }
});

/* ── Derived data ──────────────────────────────────────────── */

const extent = computed(() =>
  getDataExtent(props.data, visibleSeriesKeys.value, false),
);

const scale = computed(() =>
  niceScale(extent.value.min, extent.value.max, props.tickCount),
);

const fmtValue = computed(() => props.valueFormatter ?? formatNumber);
const fmtCategory = computed(
  () => props.categoryFormatter ?? ((v: string | number) => String(v)),
);

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
const hoveredIndex = ref<number | null>(null);
const crosshairX = ref<number | null>(null);

/* ── Point computation ─────────────────────────────────────── */

interface DataPoint {
  x: number;
  y: number;
  value: number;
  dataIndex: number;
}

function computePoints(w: number, h: number, seriesKey: string): DataPoint[] {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale.value;
  const range = sMax - sMin || 1;
  const count = props.data.length;

  const points: DataPoint[] = [];

  for (let i = 0; i < count; i++) {
    const row = props.data[i]!;
    const v = Number(row[seriesKey]) || 0;

    const x = count === 1
      ? pad.left + plotW / 2
      : pad.left + (i / (count - 1)) * plotW;

    const targetY = pad.top + ((sMax - v) / range) * plotH;
    // Animate from baseline
    const baseY = pad.top + (sMax / range) * plotH;
    const y = baseY + (targetY - baseY) * animProgress.value;

    points.push({ x, y, value: v, dataIndex: i });
  }

  return points;
}

/* ── Path generation ───────────────────────────────────────── */

/**
 * Monotone cubic Hermite spline (Catmull-Rom → cubic bezier segments)
 * Produces smooth curves that pass through each data point
 */
function monotonePath(pts: DataPoint[]): string {
  if (pts.length < 2) return pts.length === 1 ? `M${pts[0]!.x},${pts[0]!.y}` : '';
  if (pts.length === 2) return `M${pts[0]!.x},${pts[0]!.y}L${pts[1]!.x},${pts[1]!.y}`;

  const n = pts.length;

  // Compute tangent slopes (finite difference)
  const slopes: number[] = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      slopes.push((pts[1]!.y - pts[0]!.y) / (pts[1]!.x - pts[0]!.x));
    } else if (i === n - 1) {
      slopes.push((pts[n - 1]!.y - pts[n - 2]!.y) / (pts[n - 1]!.x - pts[n - 2]!.x));
    } else {
      const s1 = (pts[i]!.y - pts[i - 1]!.y) / (pts[i]!.x - pts[i - 1]!.x);
      const s2 = (pts[i + 1]!.y - pts[i]!.y) / (pts[i + 1]!.x - pts[i]!.x);
      // Monotone adjustment: if signs differ, slope is 0
      if (s1 * s2 <= 0) slopes.push(0);
      else slopes.push((s1 + s2) / 2);
    }
  }

  let d = `M${pts[0]!.x},${pts[0]!.y}`;

  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i]!;
    const p1 = pts[i + 1]!;
    const dx = (p1.x - p0.x) / 3;

    const cp1x = p0.x + dx;
    const cp1y = p0.y + slopes[i]! * dx;
    const cp2x = p1.x - dx;
    const cp2y = p1.y - slopes[i + 1]! * dx;

    d += `C${cp1x},${cp1y},${cp2x},${cp2y},${p1.x},${p1.y}`;
  }

  return d;
}

function linearPath(pts: DataPoint[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    d += `L${pts[i]!.x},${pts[i]!.y}`;
  }
  return d;
}

function stepPath(pts: DataPoint[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    const midX = (pts[i - 1]!.x + pts[i]!.x) / 2;
    d += `H${midX}V${pts[i]!.y}H${pts[i]!.x}`;
  }
  return d;
}

function buildPath(pts: DataPoint[]): string {
  switch (props.curveType) {
    case 'linear':
      return linearPath(pts);
    case 'step':
      return stepPath(pts);
    case 'monotone':
    default:
      return monotonePath(pts);
  }
}

/**
 * Build an area path: line path + close down to baseline
 */
function buildAreaPath(pts: DataPoint[], h: number): string {
  if (pts.length === 0) return '';
  const pad = PADDING.value;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale.value;
  const range = sMax - sMin || 1;
  const baseY = pad.top + (sMax / range) * plotH;

  const line = buildPath(pts);
  const lastPt = pts[pts.length - 1]!;
  const firstPt = pts[0]!;

  return `${line}L${lastPt.x},${baseY}L${firstPt.x},${baseY}Z`;
}

/* ── Series data for template ──────────────────────────────── */

function computeSeriesData(w: number, h: number) {
  return visibleSeriesKeys.value.map((key) => {
    const points = computePoints(w, h, key);
    const linePath = buildPath(points);
    const areaPath = props.showArea ? buildAreaPath(points, h) : '';
    return {
      key,
      points,
      linePath,
      areaPath,
      color: props.config[key]!.color,
      gradientId: `line-area-${key}`,
      glowId: `line-glow-${key}`,
    };
  });
}

/* ── Grid & Axes ───────────────────────────────────────────── */

function computeGridAndAxes(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { max: sMax, ticks } = scale.value;
  const range = sMax - scale.value.min || 1;

  const gridDots: Array<{ cx: number; cy: number }> = [];
  const valueLabels: Array<{ x: number; y: number; text: string; anchor: string }> = [];
  const categoryLabels: Array<{ x: number; y: number; text: string; anchor: string }> = [];

  const categoryCount = props.data.length;

  // Value axis ticks + dot grid
  for (const tick of ticks) {
    const y = pad.top + ((sMax - tick) / range) * plotH;

    if (props.showGrid) {
      for (let ci = 0; ci < categoryCount; ci++) {
        const x = categoryCount === 1
          ? pad.left + plotW / 2
          : pad.left + (ci / (categoryCount - 1)) * plotW;
        gridDots.push({ cx: x, cy: y });
      }
    }

    if (props.showYAxis) {
      valueLabels.push({
        x: pad.left - 12,
        y: y + 4,
        text: fmtValue.value(tick),
        anchor: 'end',
      });
    }
  }

  // Category labels along x-axis
  if (props.showXAxis) {
    for (let i = 0; i < categoryCount; i++) {
      const x = categoryCount === 1
        ? pad.left + plotW / 2
        : pad.left + (i / (categoryCount - 1)) * plotW;
      categoryLabels.push({
        x,
        y: pad.top + plotH + 28,
        text: fmtCategory.value(props.data[i]![props.index] as string),
        anchor: 'middle',
      });
    }
  }

  return { gridDots, valueLabels, categoryLabels };
}

/* ── Hover regions ─────────────────────────────────────────── */

function computeHoverRegions(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const count = props.data.length;

  const regions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    dataIndex: number;
    centerX: number;
  }> = [];

  for (let i = 0; i < count; i++) {
    const cx = count === 1
      ? pad.left + plotW / 2
      : pad.left + (i / (count - 1)) * plotW;

    // Each region spans half the distance to neighbors
    let left: number;
    let right: number;
    if (count === 1) {
      left = pad.left;
      right = pad.left + plotW;
    } else {
      const step = plotW / (count - 1);
      left = i === 0 ? pad.left : cx - step / 2;
      right = i === count - 1 ? pad.left + plotW : cx + step / 2;
    }

    regions.push({
      x: left,
      y: pad.top,
      width: right - left,
      height: plotH,
      dataIndex: i,
      centerX: cx,
    });
  }

  return regions;
}

/* ── Tooltip handlers ──────────────────────────────────────── */

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

  const container = (event.currentTarget as SVGElement).closest('div');
  if (container) {
    const rect = container.getBoundingClientRect();
    tooltipX.value = event.clientX - rect.left + 16;
    tooltipY.value = event.clientY - rect.top - 12;

    if (tooltipX.value + 180 > rect.width) {
      tooltipX.value = event.clientX - rect.left - 190;
    }
    if (tooltipY.value < 0) {
      tooltipY.value = 8;
    }
  }
}

function onPointLeave() {
  hoveredIndex.value = null;
  crosshairX.value = null;
  tooltipData.value = null;
}
</script>

<template>
  <div ref="rootRef" v-bind="attrs" :class="['flex flex-col gap-4', props.class]">
    <UiChartContainer
      :config="config"
      :min-height="minHeight"
      class="w-full"
    >
      <template #default="{ width: w, height: h }">
        <defs>
          <!-- Area gradient for each series -->
          <linearGradient
            v-for="series in computeSeriesData(w, h)"
            :id="series.gradientId"
            :key="`grad-${series.key}`"
            x1="0" y1="0" x2="0" y2="1"
          >
            <stop offset="0%" :stop-color="series.color" stop-opacity="0.25" />
            <stop offset="85%" :stop-color="series.color" stop-opacity="0.02" />
          </linearGradient>

          <!-- Glow filter for hovered line -->
          <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Dot grid -->
        <circle
          v-for="(dot, i) in computeGridAndAxes(w, h).gridDots"
          :key="`dot-${i}`"
          :cx="dot.cx"
          :cy="dot.cy"
          r="1.5"
          class="fill-border"
          opacity="0.5"
        />

        <!-- Value axis labels -->
        <text
          v-for="(label, i) in computeGridAndAxes(w, h).valueLabels"
          :key="`val-${i}`"
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          class="fill-muted-foreground"
          font-size="11"
          font-weight="500"
        >
          {{ label.text }}
        </text>

        <!-- Category axis labels -->
        <text
          v-for="(label, i) in computeGridAndAxes(w, h).categoryLabels"
          :key="`cat-${i}`"
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          class="fill-muted-foreground"
          font-size="12"
          font-weight="500"
        >
          {{ label.text }}
        </text>

        <!-- Zero baseline -->
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

        <!-- Crosshair vertical line on hover -->
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

        <!-- Series: area fill + line + dots -->
        <template v-for="series in computeSeriesData(w, h)" :key="series.key">
          <!-- Area gradient fill -->
          <path
            v-if="showArea && series.areaPath"
            :d="series.areaPath"
            :fill="`url(#${series.gradientId})`"
            :opacity="hoveredIndex !== null ? 0.6 : 1"
            :style="{ transition: 'opacity 300ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }"
          />

          <!-- Line path -->
          <path
            :d="series.linePath"
            fill="none"
            :stroke="series.color"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            :opacity="hiddenSeries.has(series.key) ? 0 : 1"
            :filter="hoveredIndex !== null ? 'url(#line-glow)' : undefined"
            :style="{
              transition: 'opacity 300ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }"
          />

          <!-- Always-visible small dots (optional) -->
          <circle
            v-for="pt in (showDots ? series.points : [])"
            :key="`sdot-${series.key}-${pt.dataIndex}`"
            :cx="pt.x"
            :cy="pt.y"
            :r="dotRadius * 0.6"
            :fill="series.color"
            :opacity="hoveredIndex === pt.dataIndex ? 0 : 0.6"
            :style="{ transition: 'opacity 200ms ease, cy 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }"
          />

          <!-- Hover dot (larger, with glow) -->
          <circle
            v-for="pt in series.points"
            v-show="hoveredIndex === pt.dataIndex"
            :key="`hdot-${series.key}-${pt.dataIndex}`"
            :cx="pt.x"
            :cy="pt.y"
            :r="dotRadius"
            fill="var(--color-background)"
            :stroke="series.color"
            :stroke-width="strokeWidth"
            :style="{
              filter: `drop-shadow(0 0 4px ${series.color})`,
              transition: 'r 200ms cubic-bezier(0.34, 1.56, 0.64, 1), cy 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }"
          />
        </template>

        <!-- Hover regions (invisible) -->
        <rect
          v-for="region in computeHoverRegions(w, h)"
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
