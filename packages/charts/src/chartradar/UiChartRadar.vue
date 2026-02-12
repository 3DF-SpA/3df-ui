<script setup lang="ts">
import { ref, computed, provide, useAttrs, onMounted, watch, nextTick } from 'vue';
import type {
  ChartConfig,
  ChartDataRow,
  ChartTooltipData,
  ChartContext,
} from '../shared/chart-types';
import { CHART_KEY } from '../shared/chart-types';
import {
  getSeriesKeys,
  resolveColor,
  resolveConfigColors,
} from '../shared/chart-utils';
import UiChartContainer from '../shared/UiChartContainer.vue';
import UiChartTooltip from '../shared/UiChartTooltip.vue';
import UiChartLegend from '../shared/UiChartLegend.vue';

defineOptions({ inheritAttrs: false });

export type RadarVariant = 'polygon' | 'circle';

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    /** Key used as axis labels (categories / dimensions) */
    index: string;
    /** Shape of the grid: polygon or circle */
    variant?: RadarVariant;
    /** Number of concentric grid levels */
    levels?: number;
    /** Show filled area inside the radar */
    showFill?: boolean;
    /** Area fill opacity */
    fillOpacity?: number;
    /** Show dots at data points */
    showDots?: boolean;
    /** Show value labels on axes */
    showAxisLabels?: boolean;
    /** Show tooltip on hover */
    showTooltip?: boolean;
    /** Show interactive legend */
    showLegend?: boolean;
    /** Line stroke width */
    strokeWidth?: number;
    /** Dot radius */
    dotRadius?: number;
    /** Min chart height */
    minHeight?: number;
    /** Custom value formatter */
    valueFormatter?: (value: number) => string;
    tooltipFormatter?: (value: number, key: string) => string;
    /** Enable entrance animation */
    animate?: boolean;
    class?: string;
  }>(),
  {
    variant: 'polygon',
    levels: 5,
    showFill: true,
    fillOpacity: 0.2,
    showDots: true,
    showAxisLabels: true,
    showTooltip: true,
    showLegend: true,
    strokeWidth: 2,
    dotRadius: 4,
    minHeight: 400,
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

const categories = computed(() => props.data.map((row) => String(row[props.index] ?? '')));

const maxValue = computed(() => {
  let max = 0;
  for (const row of props.data) {
    for (const key of visibleSeriesKeys.value) {
      const v = Number(row[key]) || 0;
      if (v > max) max = v;
    }
  }
  return max || 1;
});

/* ── Tooltip state ─────────────────────────────────────────── */

const tooltipData = ref<ChartTooltipData | null>(null);
const tooltipX = ref(0);
const tooltipY = ref(0);
const hoveredIndex = ref<number | null>(null);

/* ── Geometry helpers ──────────────────────────────────────── */

function polarToCartesian(cx: number, cy: number, radius: number, angleRad: number) {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function angleFor(index: number, total: number): number {
  // Start at top (-90°), go clockwise
  return ((2 * Math.PI) / total) * index - Math.PI / 2;
}

/* ── Grid paths ────────────────────────────────────────────── */

function computeGrid(cx: number, cy: number, radius: number) {
  const n = categories.value.length;
  if (n < 3) return { levelPaths: [], axisPaths: [] };

  const levelPaths: string[] = [];
  const axisPaths: string[] = [];

  // Concentric levels
  for (let lvl = 1; lvl <= props.levels; lvl++) {
    const r = (radius / props.levels) * lvl;

    if (props.variant === 'circle') {
      levelPaths.push(`M${cx - r},${cy}A${r},${r} 0 1,1 ${cx + r},${cy}A${r},${r} 0 1,1 ${cx - r},${cy}Z`);
    } else {
      let path = '';
      for (let i = 0; i < n; i++) {
        const a = angleFor(i, n);
        const pt = polarToCartesian(cx, cy, r, a);
        path += i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`;
      }
      path += 'Z';
      levelPaths.push(path);
    }
  }

  // Spokes from center to outer edge
  for (let i = 0; i < n; i++) {
    const a = angleFor(i, n);
    const pt = polarToCartesian(cx, cy, radius, a);
    axisPaths.push(`M${cx},${cy}L${pt.x},${pt.y}`);
  }

  return { levelPaths, axisPaths };
}

/* ── Series polygon paths ──────────────────────────────────── */

interface RadarSeriesData {
  key: string;
  color: string;
  path: string;
  points: Array<{ x: number; y: number; value: number; dataIndex: number }>;
}

function computeSeries(cx: number, cy: number, radius: number): RadarSeriesData[] {
  const n = categories.value.length;
  if (n < 3) return [];
  const max = maxValue.value;

  return visibleSeriesKeys.value.map((key) => {
    const points: RadarSeriesData['points'] = [];
    let path = '';

    for (let i = 0; i < n; i++) {
      const row = props.data[i]!;
      const v = Number(row[key]) || 0;
      const ratio = (v / max) * animProgress.value;
      const a = angleFor(i, n);
      const pt = polarToCartesian(cx, cy, radius * ratio, a);
      points.push({ x: pt.x, y: pt.y, value: v, dataIndex: i });
      path += i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`;
    }
    path += 'Z';

    return {
      key,
      color: props.config[key]!.color,
      path,
      points,
    };
  });
}

/* ── Axis labels (category names around the perimeter) ────── */

function computeAxisLabels(cx: number, cy: number, radius: number) {
  const n = categories.value.length;
  if (n < 3) return [];

  const labelRadius = radius + 18;

  return categories.value.map((cat, i) => {
    const a = angleFor(i, n);
    const pt = polarToCartesian(cx, cy, labelRadius, a);

    // Determine text-anchor based on position
    const deg = ((a * 180) / Math.PI + 360) % 360;
    let anchor = 'middle';
    if (deg > 20 && deg < 160) anchor = 'start';
    else if (deg > 200 && deg < 340) anchor = 'end';

    // Vertical offset
    let dy = '0.35em';
    if (deg > 250 && deg < 290) dy = '0em'; // top
    if (deg > 70 && deg < 110) dy = '0.8em'; // bottom

    return { x: pt.x, y: pt.y, text: cat, anchor, dy };
  });
}

/* ── Tooltip handlers ──────────────────────────────────────── */

function onDotHover(dataIndex: number, event: MouseEvent) {
  if (!props.showTooltip) return;

  hoveredIndex.value = dataIndex;

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
    if (tooltipX.value + 180 > rect.width) tooltipX.value = event.clientX - rect.left - 190;
    if (tooltipY.value < 0) tooltipY.value = 8;
  }
}

function onDotLeave() {
  hoveredIndex.value = null;
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
        <!-- Compute center & radius from available space -->
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <g v-if="categories.length >= 3"
          :transform="`translate(0,0)`"
        >
          <defs>
            <!-- Gradient fill per series -->
            <radialGradient
              v-for="key in visibleSeriesKeys"
              :id="`radar-fill-${key}`"
              :key="`grad-${key}`"
            >
              <stop offset="0%" :stop-color="config[key]!.color" :stop-opacity="fillOpacity * 1.5" />
              <stop offset="100%" :stop-color="config[key]!.color" :stop-opacity="fillOpacity * 0.5" />
            </radialGradient>

            <!-- Glow filter for hovered dots -->
            <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Grid levels -->
          <path
            v-for="(path, i) in computeGrid(w / 2, h / 2, Math.min(w, h) / 2 - 50).levelPaths"
            :key="`level-${i}`"
            :d="path"
            fill="none"
            class="stroke-border"
            :stroke-width="i === props.levels - 1 ? 1 : 0.5"
            :opacity="i === props.levels - 1 ? 0.6 : 0.3"
          />

          <!-- Spokes -->
          <path
            v-for="(path, i) in computeGrid(w / 2, h / 2, Math.min(w, h) / 2 - 50).axisPaths"
            :key="`spoke-${i}`"
            :d="path"
            fill="none"
            class="stroke-border"
            stroke-width="0.5"
            opacity="0.3"
          />

          <!-- Axis labels (category names) -->
          <template v-if="showAxisLabels">
          <text
            v-for="(label, i) in computeAxisLabels(w / 2, h / 2, Math.min(w, h) / 2 - 50)"
            :key="`axlabel-${i}`"
            :x="label.x"
            :y="label.y"
            :text-anchor="label.anchor"
            :dy="label.dy"
            class="fill-muted-foreground"
            font-size="12"
            font-weight="500"
          >
            {{ label.text }}
          </text>
          </template>

          <!-- Series polygons -->
          <template v-for="series in computeSeries(w / 2, h / 2, Math.min(w, h) / 2 - 50)" :key="series.key">
            <!-- Filled area -->
            <path
              v-if="showFill"
              :d="series.path"
              :fill="`url(#radar-fill-${series.key})`"
              :opacity="hoveredIndex !== null ? 0.5 : 1"
              :style="{
                transition: 'opacity 300ms ease, d 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }"
            />

            <!-- Outline -->
            <path
              :d="series.path"
              fill="none"
              :stroke="series.color"
              :stroke-width="strokeWidth"
              stroke-linejoin="round"
              :opacity="hoveredIndex !== null ? 0.7 : 1"
              :style="{
                transition: 'opacity 300ms ease, d 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }"
            />

            <!-- Data dots -->
            <template v-if="showDots">
              <circle
                v-for="pt in series.points"
                :key="`dot-${series.key}-${pt.dataIndex}`"
                :cx="pt.x"
                :cy="pt.y"
                :r="hoveredIndex === pt.dataIndex ? dotRadius * 1.4 : dotRadius * 0.7"
                :fill="hoveredIndex === pt.dataIndex ? 'var(--color-background)' : series.color"
                :stroke="series.color"
                :stroke-width="hoveredIndex === pt.dataIndex ? strokeWidth : 0"
                :filter="hoveredIndex === pt.dataIndex ? 'url(#radar-glow)' : undefined"
                :style="{
                  transition: 'r 200ms cubic-bezier(0.34, 1.56, 0.64, 1), cx 500ms ease, cy 500ms ease',
                  cursor: 'pointer',
                }"
                @mousemove="onDotHover(pt.dataIndex, $event)"
                @mouseleave="onDotLeave"
              />
            </template>
          </template>

          <!-- Invisible hover regions per axis if no dots -->
          <template v-if="!showDots">
            <circle
              v-for="(_, i) in categories"
              :key="`hover-${i}`"
              :cx="polarToCartesian(w / 2, h / 2, Math.min(w, h) / 2 - 50, angleFor(i, categories.length)).x"
              :cy="polarToCartesian(w / 2, h / 2, Math.min(w, h) / 2 - 50, angleFor(i, categories.length)).y"
              r="16"
              fill="transparent"
              style="cursor: pointer"
              @mousemove="onDotHover(i, $event)"
              @mouseleave="onDotLeave"
            />
          </template>
        </g>

        <!-- Fallback for < 3 dimensions -->
        <text
          v-else
          :x="w / 2"
          :y="h / 2"
          text-anchor="middle"
          class="fill-muted-foreground"
          font-size="14"
        >
          Radar chart requires at least 3 dimensions
        </text>
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
