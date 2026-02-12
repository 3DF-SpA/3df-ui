<script setup lang="ts">
import { ref, computed, provide, useAttrs, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import type {
  ChartConfig,
  ChartDataRow,
  ChartOrientation,
  ChartStackMode,
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
    /** Bar corner radius */
    radius?: number;
    barGap?: number;
    categoryGap?: number;
    minHeight?: number;
    class?: string;
    xAxis?: ChartAxisConfig;
    yAxis?: ChartAxisConfig;
    tooltipFormatter?: (value: number, key: string) => string;
    /** Enable entrance animation */
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
let rafId = 0;

onMounted(() => {
  if (props.animate) {
    // Trigger after next frame so CSS transitions kick in
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

/* ── Derived data ──────────────────────────────────────────── */

const extent = computed(() =>
  getDataExtent(props.data, visibleSeriesKeys.value, props.mode === 'stacked'),
);

const scale = computed(() =>
  niceScale(extent.value.min, extent.value.max, props.tickCount),
);

const fmtValue = computed(() => props.valueFormatter ?? formatNumber);
const fmtCategory = computed(
  () => props.categoryFormatter ?? ((v: string | number) => String(v)),
);

/* ── Padding ───────────────────────────────────────────────── */

const PADDING = computed(() => {
  const isVert = props.orientation === 'vertical';
  return {
    top: 16,
    right: 20,
    bottom: isVert ? 48 : 20,
    left: isVert ? 60 : 72,
  };
});

/* ── Tooltip state ─────────────────────────────────────────── */

const tooltipData = ref<ChartTooltipData | null>(null);
const tooltipX = ref(0);
const tooltipY = ref(0);
const hoveredIndex = ref<number | null>(null);
/** Crosshair X position (vertical) or Y position (horizontal) */
const crosshairPos = ref<number | null>(null);

/* ── Generate gradient IDs ─────────────────────────────────── */

const gradientDefs = computed(() =>
  visibleSeriesKeys.value.map((key) => ({
    key,
    id: `bar-grad-${key}`,
    color: props.config[key]!.color,
  })),
);

/* ── Bar computation — Vertical ────────────────────────────── */

function computeVerticalBars(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale.value;
  const range = sMax - sMin || 1;

  const categoryCount = props.data.length;
  const bandWidth = plotW / categoryCount;
  const usableWidth = bandWidth * (1 - props.categoryGap!);
  const keys = visibleSeriesKeys.value;
  const seriesCount = keys.length;

  const bars: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    gradientId: string;
    seriesKey: string;
    dataIndex: number;
    value: number;
    rx: number;
    /** Target height before animation */
    targetY: number;
    targetH: number;
  }> = [];

  for (let di = 0; di < categoryCount; di++) {
    const row = props.data[di]!;
    const categoryX = pad.left + di * bandWidth + (bandWidth - usableWidth) / 2;

    if (props.mode === 'stacked') {
      let positiveY = 0;
      let negativeY = 0;

      for (const key of keys) {
        const v = Number(row[key]) || 0;
        const barH = (Math.abs(v) / range) * plotH;
        const gradientId = `bar-grad-${key}`;

        let y: number;
        if (v >= 0) {
          y = pad.top + ((sMax - positiveY - v) / range) * plotH;
          positiveY += v;
        } else {
          y = pad.top + ((sMax - negativeY) / range) * plotH;
          negativeY += v;
        }

        // Animate: start from zero line
        const zeroY = pad.top + (sMax / range) * plotH;
        const animY = zeroY + (y - zeroY) * animProgress.value;
        const animH = barH * animProgress.value;

        bars.push({
          x: categoryX,
          y: animY,
          width: usableWidth,
          height: Math.max(animH, 0.5),
          gradientId,
          seriesKey: key,
          dataIndex: di,
          value: v,
          rx: props.radius!,
          targetY: y,
          targetH: barH,
        });
      }
    } else {
      const barW = usableWidth / seriesCount;
      const gap = barW * props.barGap!;
      const effectiveBarW = barW - gap;
      const zeroY = pad.top + (sMax / range) * plotH;

      for (let si = 0; si < seriesCount; si++) {
        const key = keys[si]!;
        const v = Number(row[key]) || 0;
        const barH = (Math.abs(v) / range) * plotH;
        const gradientId = `bar-grad-${key}`;

        const x = categoryX + si * barW + gap / 2;
        const targetY = v >= 0 ? zeroY - barH : zeroY;

        // Animate
        const animY = zeroY + (targetY - zeroY) * animProgress.value;
        const animH = barH * animProgress.value;

        bars.push({
          x,
          y: animY,
          width: Math.max(effectiveBarW, 2),
          height: Math.max(animH, 0.5),
          gradientId,
          seriesKey: key,
          dataIndex: di,
          value: v,
          rx: props.radius!,
          targetY,
          targetH: barH,
        });
      }
    }
  }
  return bars;
}

/* ── Bar computation — Horizontal ──────────────────────────── */

function computeHorizontalBars(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale.value;
  const range = sMax - sMin || 1;

  const categoryCount = props.data.length;
  const bandHeight = plotH / categoryCount;
  const usableHeight = bandHeight * (1 - props.categoryGap!);
  const keys = visibleSeriesKeys.value;
  const seriesCount = keys.length;

  const bars: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    gradientId: string;
    seriesKey: string;
    dataIndex: number;
    value: number;
    rx: number;
    targetY: number;
    targetH: number;
  }> = [];

  for (let di = 0; di < categoryCount; di++) {
    const row = props.data[di]!;
    const categoryY = pad.top + di * bandHeight + (bandHeight - usableHeight) / 2;

    if (props.mode === 'stacked') {
      let positiveX = 0;
      const zeroX = pad.left + ((0 - sMin) / range) * plotW;

      for (const key of keys) {
        const v = Number(row[key]) || 0;
        const barW = (Math.abs(v) / range) * plotW;
        const gradientId = `bar-grad-${key}`;

        const targetX = v >= 0 ? zeroX + (positiveX / range) * plotW : zeroX - barW;
        if (v >= 0) positiveX += v;

        const animW = barW * animProgress.value;
        const animX = v >= 0 ? targetX : targetX + barW - animW;

        bars.push({
          x: animX,
          y: categoryY,
          width: Math.max(animW, 0.5),
          height: usableHeight,
          gradientId,
          seriesKey: key,
          dataIndex: di,
          value: v,
          rx: props.radius!,
          targetY: categoryY,
          targetH: usableHeight,
        });
      }
    } else {
      const barH = usableHeight / seriesCount;
      const gap = barH * props.barGap!;
      const effectiveBarH = barH - gap;
      const zeroX = pad.left + ((0 - sMin) / range) * plotW;

      for (let si = 0; si < seriesCount; si++) {
        const key = keys[si]!;
        const v = Number(row[key]) || 0;
        const barW = (Math.abs(v) / range) * plotW;
        const gradientId = `bar-grad-${key}`;

        const y = categoryY + si * barH + gap / 2;
        const targetX = v >= 0 ? zeroX : zeroX - barW;

        const animW = barW * animProgress.value;
        const animX = v >= 0 ? targetX : targetX + barW - animW;

        bars.push({
          x: animX,
          y,
          width: Math.max(animW, 0.5),
          height: Math.max(effectiveBarH, 2),
          gradientId,
          seriesKey: key,
          dataIndex: di,
          value: v,
          rx: props.radius!,
          targetY: y,
          targetH: effectiveBarH,
        });
      }
    }
  }
  return bars;
}

/* ── Grid & Axes ───────────────────────────────────────────── */

function computeGridAndAxes(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax, ticks } = scale.value;
  const range = sMax - sMin || 1;
  const isVert = props.orientation === 'vertical';

  // Dot grid points instead of lines
  const gridDots: Array<{ cx: number; cy: number }> = [];

  const valueLabels: Array<{
    x: number;
    y: number;
    text: string;
    anchor: string;
  }> = [];

  const categoryLabels: Array<{
    x: number;
    y: number;
    text: string;
    anchor: string;
  }> = [];

  const categoryCount = props.data.length;

  // Value axis ticks + dot grid
  for (const tick of ticks) {
    if (isVert) {
      const y = pad.top + ((sMax - tick) / range) * plotH;
      if (props.showGrid) {
        // Place dots at each category center
        const band = plotW / categoryCount;
        for (let ci = 0; ci < categoryCount; ci++) {
          gridDots.push({ cx: pad.left + ci * band + band / 2, cy: y });
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
    } else {
      const x = pad.left + ((tick - sMin) / range) * plotW;
      if (props.showGrid) {
        const band = plotH / categoryCount;
        for (let ci = 0; ci < categoryCount; ci++) {
          gridDots.push({ cx: x, cy: pad.top + ci * band + band / 2 });
        }
      }
      if (props.showXAxis) {
        valueLabels.push({
          x,
          y: pad.top + plotH + 24,
          text: fmtValue.value(tick),
          anchor: 'middle',
        });
      }
    }
  }

  // Category labels
  if (isVert) {
    const band = plotW / categoryCount;
    for (let i = 0; i < categoryCount; i++) {
      if (props.showXAxis) {
        categoryLabels.push({
          x: pad.left + i * band + band / 2,
          y: pad.top + plotH + 28,
          text: fmtCategory.value(props.data[i]![props.index] as string),
          anchor: 'middle',
        });
      }
    }
  } else {
    const band = plotH / categoryCount;
    for (let i = 0; i < categoryCount; i++) {
      if (props.showYAxis) {
        categoryLabels.push({
          x: pad.left - 12,
          y: pad.top + i * band + band / 2 + 4,
          text: fmtCategory.value(props.data[i]![props.index] as string),
          anchor: 'end',
        });
      }
    }
  }

  return { gridDots, valueLabels, categoryLabels };
}

/* ── Hover regions ─────────────────────────────────────────── */

function computeHoverRegions(w: number, h: number) {
  const pad = PADDING.value;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const categoryCount = props.data.length;
  const isVert = props.orientation === 'vertical';

  const regions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    dataIndex: number;
    /** Center for crosshair */
    center: number;
  }> = [];

  for (let i = 0; i < categoryCount; i++) {
    if (isVert) {
      const band = plotW / categoryCount;
      regions.push({
        x: pad.left + i * band,
        y: pad.top,
        width: band,
        height: plotH,
        dataIndex: i,
        center: pad.left + i * band + band / 2,
      });
    } else {
      const band = plotH / categoryCount;
      regions.push({
        x: pad.left,
        y: pad.top + i * band,
        width: plotW,
        height: band,
        dataIndex: i,
        center: pad.top + i * band + band / 2,
      });
    }
  }
  return regions;
}

/* ── Tooltip handlers ──────────────────────────────────────── */

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

function onCategoryLeave() {
  hoveredIndex.value = null;
  crosshairPos.value = null;
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
        <template v-for="c in [{ grid: computeGridAndAxes(w, h), hover: computeHoverRegions(w, h), bars: orientation === 'vertical' ? computeVerticalBars(w, h) : computeHorizontalBars(w, h) }]" :key="0">
        <defs>
          <!-- Gradient definitions for each series -->
          <linearGradient
            v-for="grad in gradientDefs"
            :id="grad.id"
            :key="grad.key"
            x1="0" y1="0" x2="0" y2="1"
          >
            <stop offset="0%" :stop-color="grad.color" stop-opacity="1" />
            <stop offset="100%" :stop-color="grad.color" stop-opacity="0.6" />
          </linearGradient>

          <!-- Glow filter for hovered bars -->
          <filter id="bar-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Dot grid (instead of dashed lines) -->
        <circle
          v-for="(dot, i) in c.grid.gridDots"
          :key="`dot-${i}`"
          :cx="dot.cx"
          :cy="dot.cy"
          r="1.5"
          class="fill-border"
          opacity="0.5"
        />

        <!-- Value axis labels -->
        <text
          v-for="(label, i) in c.grid.valueLabels"
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
          v-for="(label, i) in c.grid.categoryLabels"
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

        <!-- Zero baseline (subtle) -->
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

        <!-- Crosshair line on hover -->
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

        <!-- Hover background highlight -->
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

        <!-- Bars with gradient fill -->
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
          :filter="hoveredIndex === bar.dataIndex ? 'url(#bar-glow)' : undefined"
          :style="{
            transition: 'opacity 200ms ease, filter 200ms ease, y 600ms cubic-bezier(0.34, 1.56, 0.64, 1), height 600ms cubic-bezier(0.34, 1.56, 0.64, 1), width 600ms cubic-bezier(0.34, 1.56, 0.64, 1), x 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }"
        />

        <!-- Hover regions (invisible) -->
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
