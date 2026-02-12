<script setup lang="ts">
import { ref, computed, provide, useAttrs, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
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

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    data: ChartDataRow[];
    /** Key in data that holds the category label */
    index: string;
    /** Key in data that holds the numeric value (if single-value mode) */
    valueKey?: string;
    /** Inner radius for donut mode (0 = full pie) */
    innerRadius?: number;
    /** Outer radius as fraction of available space (0-1) */
    radiusFraction?: number;
    /** Pad angle between slices in degrees */
    padAngle?: number;
    /** Corner radius on slice edges */
    cornerRadius?: number;
    showTooltip?: boolean;
    showLegend?: boolean;
    /** Show value labels on slices */
    showLabels?: boolean;
    /** Label type */
    labelType?: 'percent' | 'value' | 'name';
    minHeight?: number;
    class?: string;
    tooltipFormatter?: (value: number, key: string) => string;
    valueFormatter?: (value: number) => string;
    /** Enable entrance animation */
    animate?: boolean;
    /** Start angle in degrees (0 = 12 o'clock) */
    startAngle?: number;
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

/* ── Hidden slices (legend toggle) ─────────────────────────── */

const hiddenSlices = ref<Set<string>>(new Set());

function onToggleSlice(key: string) {
  const next = new Set(hiddenSlices.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  hiddenSlices.value = next;
}

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

/* ── Resolve data model ───────────────────────────────────── */

/**
 * Pie chart supports two data shapes:
 * 1. Multiple keys in config → each key is a slice (like bar chart config)
 * 2. Single valueKey → each row is a slice, config maps row[index] values
 *
 * We normalize to: Array<{ key, label, value, color }>
 */

interface SliceData {
  key: string;
  label: string;
  value: number;
  color: string;
}

const slices = computed<SliceData[]>(() => {
  const configKeys = getSeriesKeys(props.config);

  // Mode 1: valueKey provided → each row is a slice keyed by index value
  if (props.valueKey) {
    return props.data
      .map((row) => {
        const catValue = String(row[props.index] ?? '');
        const cfg = props.config[catValue];
        if (!cfg) return null;
        return {
          key: catValue,
          label: cfg.label,
          value: Math.abs(Number(row[props.valueKey!]) || 0),
          color: cfg.color,
        };
      })
      .filter((s): s is SliceData => s !== null);
  }

  // Mode 2: multiple config keys → aggregate all rows per key
  // (typical: single row with multiple numeric fields, or sum across rows)
  if (props.data.length === 1) {
    const row = props.data[0]!;
    return configKeys.map((key) => ({
      key,
      label: props.config[key]!.label,
      value: Math.abs(Number(row[key]) || 0),
      color: props.config[key]!.color,
    }));
  }

  // Multiple rows + multiple keys → sum each key
  return configKeys.map((key) => ({
    key,
    label: props.config[key]!.label,
    value: props.data.reduce((sum, row) => sum + Math.abs(Number(row[key]) || 0), 0),
    color: props.config[key]!.color,
  }));
});

const visibleSlices = computed(() =>
  slices.value.filter((s) => !hiddenSlices.value.has(s.key)),
);

const total = computed(() =>
  visibleSlices.value.reduce((sum, s) => sum + s.value, 0),
);

/* ── Tooltip state ─────────────────────────────────────────── */

const tooltipData = ref<ChartTooltipData | null>(null);
const tooltipX = ref(0);
const tooltipY = ref(0);
const hoveredKey = ref<string | null>(null);

/* ── SVG arc path helpers ──────────────────────────────────── */

const DEG2RAD = Math.PI / 180;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = angleDeg * DEG2RAD;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

/**
 * Generate an SVG arc path (with optional inner radius for donut).
 * Handles corner radius by rounding the start/end of the arc.
 */
function arcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startDeg: number,
  endDeg: number,
): string {
  const sweep = endDeg - startDeg;
  const largeArc = sweep > 180 ? 1 : 0;

  const outerStart = polarToCartesian(cx, cy, outerR, startDeg);
  const outerEnd = polarToCartesian(cx, cy, outerR, endDeg);

  if (innerR <= 0) {
    // Full pie slice (wedge)
    if (sweep >= 359.99) {
      // Full circle
      const mid = polarToCartesian(cx, cy, outerR, startDeg + 180);
      return [
        `M${outerStart.x},${outerStart.y}`,
        `A${outerR},${outerR},0,1,1,${mid.x},${mid.y}`,
        `A${outerR},${outerR},0,1,1,${outerStart.x},${outerStart.y}`,
        'Z',
      ].join(' ');
    }
    return [
      `M${cx},${cy}`,
      `L${outerStart.x},${outerStart.y}`,
      `A${outerR},${outerR},0,${largeArc},1,${outerEnd.x},${outerEnd.y}`,
      'Z',
    ].join(' ');
  }

  // Donut slice
  const innerStart = polarToCartesian(cx, cy, innerR, endDeg);
  const innerEnd = polarToCartesian(cx, cy, innerR, startDeg);

  if (sweep >= 359.99) {
    const outerMid = polarToCartesian(cx, cy, outerR, startDeg + 180);
    const innerMid = polarToCartesian(cx, cy, innerR, startDeg + 180);
    return [
      `M${outerStart.x},${outerStart.y}`,
      `A${outerR},${outerR},0,1,1,${outerMid.x},${outerMid.y}`,
      `A${outerR},${outerR},0,1,1,${outerStart.x},${outerStart.y}`,
      `Z`,
      `M${innerEnd.x},${innerEnd.y}`,
      `A${innerR},${innerR},0,1,0,${innerMid.x},${innerMid.y}`,
      `A${innerR},${innerR},0,1,0,${innerEnd.x},${innerEnd.y}`,
      `Z`,
    ].join(' ');
  }

  return [
    `M${outerStart.x},${outerStart.y}`,
    `A${outerR},${outerR},0,${largeArc},1,${outerEnd.x},${outerEnd.y}`,
    `L${innerStart.x},${innerStart.y}`,
    `A${innerR},${innerR},0,${largeArc},0,${innerEnd.x},${innerEnd.y}`,
    'Z',
  ].join(' ');
}

/* ── Compute slices geometry ───────────────────────────────── */

interface ArcSlice {
  key: string;
  label: string;
  value: number;
  percent: number;
  color: string;
  path: string;
  /** Mid-point angle for label positioning */
  midAngle: number;
  /** Centroid position for labels */
  labelX: number;
  labelY: number;
  gradientId: string;
}

function computeArcs(w: number, h: number): ArcSlice[] {
  const size = Math.min(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const outerR = (size / 2) * props.radiusFraction;
  const innerR = props.innerRadius;
  const padDeg = props.padAngle;
  const items = visibleSlices.value;
  const totalVal = total.value || 1;

  const arcs: ArcSlice[] = [];
  let currentAngle = props.startAngle;

  for (const slice of items) {
    const fraction = slice.value / totalVal;
    const sweepDeg = fraction * 360 * animProgress.value;

    // Account for padding
    const actualPad = items.length > 1 ? padDeg : 0;
    const startDeg = currentAngle + actualPad / 2;
    const endDeg = currentAngle + sweepDeg - actualPad / 2;

    if (endDeg > startDeg + 0.1) {
      const midAngle = (startDeg + endDeg) / 2;
      const labelR = innerR > 0 ? (outerR + innerR) / 2 : outerR * 0.65;
      const labelPos = polarToCartesian(cx, cy, labelR, midAngle);

      arcs.push({
        key: slice.key,
        label: slice.label,
        value: slice.value,
        percent: fraction * 100,
        color: slice.color,
        path: arcPath(cx, cy, outerR, innerR, startDeg, endDeg),
        midAngle,
        labelX: labelPos.x,
        labelY: labelPos.y,
        gradientId: `pie-grad-${slice.key}`,
      });
    }

    currentAngle += sweepDeg;
  }

  return arcs;
}

/* ── Center label (donut total) ────────────────────────────── */

const fmtValue = computed(() => props.valueFormatter ?? ((v: number) => {
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
}));

/* ── Tooltip handlers ──────────────────────────────────────── */

function onSliceHover(slice: ArcSlice, event: MouseEvent) {
  if (!props.showTooltip) return;

  hoveredKey.value = slice.key;

  tooltipData.value = {
    label: slice.label,
    items: [
      {
        key: slice.key,
        label: slice.label,
        value: slice.value,
        color: resolveColor(slice.color),
      },
    ],
  };

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

function onSliceLeave() {
  hoveredKey.value = null;
  tooltipData.value = null;
}

/* ── Label text helper ─────────────────────────────────────── */

function labelText(slice: ArcSlice): string {
  switch (props.labelType) {
    case 'value':
      return fmtValue.value(slice.value);
    case 'name':
      return slice.label;
    case 'percent':
    default:
      return `${slice.percent.toFixed(0)}%`;
  }
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
        <template v-for="c in [{ arcs: computeArcs(w, h) }]" :key="0">
        <defs>
          <!-- Radial gradient per slice for depth effect -->
          <radialGradient
            v-for="arc in c.arcs"
            :id="arc.gradientId"
            :key="`grad-${arc.key}`"
            cx="50%" cy="50%" r="50%"
          >
            <stop offset="0%" :stop-color="arc.color" stop-opacity="0.9" />
            <stop offset="100%" :stop-color="arc.color" stop-opacity="1" />
          </radialGradient>

          <!-- Glow filter for hovered slice -->
          <filter id="pie-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <!-- Drop shadow for lifted slice -->
          <filter id="pie-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15" />
          </filter>
        </defs>

        <!-- Slices -->
        <g
          v-for="arc in c.arcs"
          :key="arc.key"
          :style="{
            transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
            transformOrigin: `${w / 2}px ${h / 2}px`,
            transform: hoveredKey === arc.key
              ? `translate(${Math.cos(arc.midAngle * Math.PI / 180) * 6}px, ${Math.sin(arc.midAngle * Math.PI / 180) * 6}px)`
              : 'translate(0, 0)',
          }"
        >
          <path
            :d="arc.path"
            :fill="`url(#${arc.gradientId})`"
            :opacity="hoveredKey === null || hoveredKey === arc.key ? 1 : 0.35"
            :filter="hoveredKey === arc.key ? 'url(#pie-shadow)' : undefined"
            :stroke="hoveredKey === arc.key ? arc.color : 'var(--color-background)'"
            :stroke-width="hoveredKey === arc.key ? 2 : 1"
            stroke-linejoin="round"
            class="cursor-pointer"
            :style="{
              transition: 'opacity 200ms ease, d 600ms cubic-bezier(0.34, 1.56, 0.64, 1), stroke-width 200ms ease',
            }"
            @mousemove="onSliceHover(arc, $event)"
            @mouseleave="onSliceLeave"
          />
        </g>

        <!-- Slice labels -->
        <text
          v-for="arc in (showLabels ? c.arcs : [])"
          :key="`lbl-${arc.key}`"
          :x="arc.labelX"
          :y="arc.labelY"
          text-anchor="middle"
          dominant-baseline="central"
          class="pointer-events-none fill-background font-semibold"
          :font-size="arc.percent < 8 ? 10 : 12"
          :opacity="arc.percent < 3 ? 0 : 1"
          :style="{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }"
        >
          {{ labelText(arc) }}
        </text>

        <!-- Donut center total -->
        <template v-if="innerRadius > 0">
          <text
            :x="w / 2"
            :y="h / 2 - 6"
            text-anchor="middle"
            dominant-baseline="central"
            class="fill-foreground font-bold"
            font-size="22"
          >
            {{ fmtValue(total) }}
          </text>
          <text
            :x="w / 2"
            :y="h / 2 + 14"
            text-anchor="middle"
            dominant-baseline="central"
            class="fill-muted-foreground"
            font-size="11"
            font-weight="500"
          >
            Total
          </text>
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
      :hidden-keys="hiddenSlices"
      @toggle="onToggleSlice"
    />
  </div>
</template>
