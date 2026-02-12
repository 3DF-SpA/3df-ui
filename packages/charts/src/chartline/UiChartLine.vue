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
export type StackMode = 'none' | 'stacked' | 'expanded';

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    index: string;
    /** Curve interpolation type */
    curveType?: CurveType;
    /** Stack mode: none = independent lines, stacked = additive, expanded = 100% */
    mode?: StackMode;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    /** Show dots at data points */
    showDots?: boolean;
    /** Show gradient area fill under lines */
    showArea?: boolean;
    /** Show line stroke on top of area */
    showLine?: boolean;
    /** Area fill top opacity (gradient goes from this value → near 0) */
    fillOpacity?: number;
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

/* ── Stacking computation ──────────────────────────────────── */

interface StackedPoint {
  dataIndex: number;
  rawValue: number;
  y0: number; // bottom boundary (value domain)
  y1: number; // top boundary (value domain)
}

const isStacked = computed(() => props.mode !== 'none');

const stackedData = computed(() => {
  const keys = visibleSeriesKeys.value;
  const result: Record<string, StackedPoint[]> = {};

  for (const key of keys) result[key] = [];

  for (let di = 0; di < props.data.length; di++) {
    const row = props.data[di]!;

    if (props.mode === 'stacked') {
      let cumulative = 0;
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        result[key]!.push({ dataIndex: di, rawValue: v, y0: cumulative, y1: cumulative + v });
        cumulative += v;
      }
    } else if (props.mode === 'expanded') {
      const total = keys.reduce((sum, k) => sum + (Number(row[k]) || 0), 0) || 1;
      let cumulative = 0;
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        const frac = v / total;
        result[key]!.push({ dataIndex: di, rawValue: v, y0: cumulative, y1: cumulative + frac });
        cumulative += frac;
      }
    } else {
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        result[key]!.push({ dataIndex: di, rawValue: v, y0: 0, y1: v });
      }
    }
  }

  return result;
});

/* ── Derived data ──────────────────────────────────────────── */

const extent = computed(() => {
  if (props.mode === 'expanded') return { min: 0, max: 1 };
  if (props.mode === 'stacked') {
    let max = 0;
    for (let di = 0; di < props.data.length; di++) {
      let sum = 0;
      for (const key of visibleSeriesKeys.value) {
        sum += Number(props.data[di]![key]) || 0;
      }
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

/* ── Coordinate helpers ────────────────────────────────────── */

function xPos(w: number, di: number): number {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const count = props.data.length;
  return count === 1 ? pad.left + plotW / 2 : pad.left + (di / (count - 1)) * plotW;
}

function yPos(h: number, value: number): number {
  const pad = PADDING.value;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale.value;
  const range = sMax - sMin || 1;
  const targetY = pad.top + ((sMax - value) / range) * plotH;
  const baseY = pad.top + (sMax / range) * plotH;
  return baseY + (targetY - baseY) * animProgress.value;
}

/* ── Path generation ───────────────────────────────────────── */

interface Pt { x: number; y: number }

/**
 * Monotone cubic Hermite spline (Catmull-Rom → cubic bezier segments)
 */
function monotonePath(pts: Pt[]): string {
  if (pts.length < 2) return pts.length === 1 ? `M${pts[0]!.x},${pts[0]!.y}` : '';
  if (pts.length === 2) return `M${pts[0]!.x},${pts[0]!.y}L${pts[1]!.x},${pts[1]!.y}`;

  const n = pts.length;
  const slopes: number[] = [];

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      slopes.push((pts[1]!.y - pts[0]!.y) / (pts[1]!.x - pts[0]!.x));
    } else if (i === n - 1) {
      slopes.push((pts[n - 1]!.y - pts[n - 2]!.y) / (pts[n - 1]!.x - pts[n - 2]!.x));
    } else {
      const s1 = (pts[i]!.y - pts[i - 1]!.y) / (pts[i]!.x - pts[i - 1]!.x);
      const s2 = (pts[i + 1]!.y - pts[i]!.y) / (pts[i + 1]!.x - pts[i]!.x);
      slopes.push(s1 * s2 <= 0 ? 0 : (s1 + s2) / 2);
    }
  }

  let d = `M${pts[0]!.x},${pts[0]!.y}`;

  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i]!;
    const p1 = pts[i + 1]!;
    const dx = (p1.x - p0.x) / 3;
    d += `C${p0.x + dx},${p0.y + slopes[i]! * dx},${p1.x - dx},${p1.y - slopes[i + 1]! * dx},${p1.x},${p1.y}`;
  }

  return d;
}

function linearPath(pts: Pt[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) d += `L${pts[i]!.x},${pts[i]!.y}`;
  return d;
}

function stepPath(pts: Pt[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    const midX = (pts[i - 1]!.x + pts[i]!.x) / 2;
    d += `H${midX}V${pts[i]!.y}H${pts[i]!.x}`;
  }
  return d;
}

function buildCurve(pts: Pt[]): string {
  switch (props.curveType) {
    case 'linear': return linearPath(pts);
    case 'step': return stepPath(pts);
    default: return monotonePath(pts);
  }
}

/* ── Series geometry ───────────────────────────────────────── */

interface SeriesPointData {
  x: number;
  yTop: number;
  yBottom: number;
  value: number;
  dataIndex: number;
}

interface SeriesData {
  key: string;
  points: SeriesPointData[];
  linePath: string;
  areaPath: string;
  color: string;
  gradientId: string;
}

function computeSeriesData(w: number, h: number): SeriesData[] {
  const keys = visibleSeriesKeys.value;
  const stacked = stackedData.value;

  return keys.map((key) => {
    const stackPts = stacked[key] ?? [];
    const topPts: Pt[] = [];
    const bottomPts: Pt[] = [];
    const points: SeriesPointData[] = [];

    for (const sp of stackPts) {
      const x = xPos(w, sp.dataIndex);
      const yTop = yPos(h, sp.y1);
      const yBottom = yPos(h, sp.y0);
      topPts.push({ x, y: yTop });
      bottomPts.push({ x, y: yBottom });
      points.push({ x, yTop, yBottom, value: sp.rawValue, dataIndex: sp.dataIndex });
    }

    const linePath = buildCurve(topPts);

    // Area path: stacked modes close between top and bottom curves;
    // non-stacked closes to baseline (y0 = 0 → same pixel for all)
    let areaPath = '';
    if (props.showArea && topPts.length >= 2) {
      if (isStacked.value) {
        const bottomReversed = [...bottomPts].reverse();
        const bottomLine = buildCurve(bottomReversed);
        const lastTop = topPts[topPts.length - 1]!;
        const firstBottom = bottomReversed[0]!;
        areaPath = `${linePath}L${lastTop.x},${firstBottom.y}${bottomLine.replace('M', 'L')}Z`;
      } else {
        const pad = PADDING.value;
        const plotH = h - pad.top - pad.bottom;
        const { min: sMin, max: sMax } = scale.value;
        const range = sMax - sMin || 1;
        const baseY = pad.top + (sMax / range) * plotH;
        const last = topPts[topPts.length - 1]!;
        const first = topPts[0]!;
        areaPath = `${linePath}L${last.x},${baseY}L${first.x},${baseY}Z`;
      }
    }

    return {
      key,
      points,
      linePath,
      areaPath,
      color: props.config[key]!.color,
      gradientId: `line-area-${key}`,
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

    const step = count <= 1 ? plotW : plotW / (count - 1);
    const left = i === 0 ? pad.left : cx - step / 2;
    const right = i === count - 1 ? pad.left + plotW : cx + step / 2;

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
            <stop offset="0%" :stop-color="series.color" :stop-opacity="fillOpacity" />
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

        <!-- Area fills (render in reverse so first series stays on top) -->
        <path
          v-for="series in (showArea ? [...computeSeriesData(w, h)].reverse() : [])"
          :key="`area-${series.key}`"
          :d="series.areaPath"
          :fill="`url(#${series.gradientId})`"
          :opacity="hoveredIndex !== null ? (isStacked ? 0.7 : 0.6) : 1"
          :style="{ transition: 'opacity 300ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }"
        />

        <!-- Series: line + dots -->
        <template v-for="series in computeSeriesData(w, h)" :key="series.key">
          <!-- Line path -->
          <path
            v-if="showLine"
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
            :cy="pt.yTop"
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
            :cy="pt.yTop"
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
