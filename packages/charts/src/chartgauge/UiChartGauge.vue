<script setup lang="ts">
import { ref, computed, useAttrs, onMounted, nextTick } from 'vue';

defineOptions({ inheritAttrs: false });

export type GaugeVariant = 'semicircle' | 'arc' | 'full';

export interface GaugeSegment {
  /** Label for this zone */
  label?: string;
  /** Max value of this zone (min is previous segment's max, or overall min) */
  max: number;
  /** Color for this zone */
  color: string;
}

const props = withDefaults(
  defineProps<{
    /** Current value */
    value: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Gauge shape */
    variant?: GaugeVariant;
    /** Colored segments/zones (optional — if omitted, uses single color) */
    segments?: GaugeSegment[];
    /** Primary color (when no segments) */
    color?: string;
    /** Track (background arc) color */
    trackColor?: string;
    /** Track opacity */
    trackOpacity?: number;
    /** Label shown below the value */
    label?: string;
    /** Value formatter */
    valueFormatter?: (value: number) => string;
    /** Arc stroke width */
    strokeWidth?: number;
    /** Show the needle indicator */
    showNeedle?: boolean;
    /** Show segment labels */
    showSegmentLabels?: boolean;
    /** Min height */
    minHeight?: number;
    /** Enable entrance animation */
    animate?: boolean;
    class?: string;
  }>(),
  {
    min: 0,
    max: 100,
    variant: 'semicircle',
    color: 'var(--color-chart-1)',
    trackColor: 'var(--color-border)',
    trackOpacity: 0.3,
    strokeWidth: 20,
    showNeedle: true,
    showSegmentLabels: false,
    minHeight: 250,
    animate: true,
  },
);

const attrs = useAttrs();

/* ── Unique IDs for SVG filters (multiple gauges on one page) */

let _uidCounter = 0;
const uid = `gauge-${++_uidCounter}-${Math.random().toString(36).slice(2, 6)}`;
const filtShadow = computed(() => `${uid}-shadow`);
const filtGlow = computed(() => `${uid}-glow`);

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

/* ── Derived ───────────────────────────────────────────────── */

const clampedValue = computed(() =>
  Math.min(Math.max(props.value, props.min), props.max),
);

const progress = computed(() => {
  const range = props.max - props.min || 1;
  return ((clampedValue.value - props.min) / range) * animProgress.value;
});

const fmtValue = computed(() =>
  props.valueFormatter
    ? props.valueFormatter(clampedValue.value)
    : clampedValue.value.toLocaleString('en-US', { maximumFractionDigits: 1 }),
);

/* ── Layout constants ──────────────────────────────────────── */

const CX = 150;
const CY = 150;
const ARC_R = computed(() => 130 - props.strokeWidth / 2);

/* ── Arc geometry ──────────────────────────────────────────── */

/** Angle range in radians depending on variant */
const angleConfig = computed(() => {
  switch (props.variant) {
    case 'full':
      // Start at bottom-left (7-o'clock) to leave gap at bottom for min/max labels
      return { startAngle: (3 * Math.PI) / 4, sweepAngle: 2 * Math.PI, viewBoxH: 1.08 };
    case 'arc':
      return { startAngle: (-3 * Math.PI) / 4, sweepAngle: (3 * Math.PI) / 2, viewBoxH: 0.88 };
    case 'semicircle':
    default:
      return { startAngle: Math.PI, sweepAngle: Math.PI, viewBoxH: 0.62 };
  }
});

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

/**
 * Build an SVG arc path. Handles near-full-circle (≥359°) by splitting
 * into two semicircular arcs so the path doesn't collapse to nothing.
 */
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  let sweep = endAngle - startAngle;
  while (sweep < 0) sweep += 2 * Math.PI;
  // Clamp to avoid >360° artefacts
  if (sweep > 2 * Math.PI) sweep = 2 * Math.PI;

  // Near-zero arc → empty
  if (sweep < 0.001) return '';

  // Near-full circle → split into two half arcs
  if (sweep >= 2 * Math.PI - 0.01) {
    const midAngle = startAngle + Math.PI;
    const s = polarToCartesian(cx, cy, r, startAngle);
    const m = polarToCartesian(cx, cy, r, midAngle);
    // Nudge end slightly before start so the second arc isn't zero-length
    const eAngle = startAngle + sweep - 0.001;
    const e = polarToCartesian(cx, cy, r, eAngle);
    return [
      `M${s.x},${s.y}`,
      `A${r},${r} 0 1 1 ${m.x},${m.y}`,
      `A${r},${r} 0 1 1 ${e.x},${e.y}`,
    ].join('');
  }

  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = sweep > Math.PI ? 1 : 0;
  return `M${start.x},${start.y}A${r},${r} 0 ${largeArc} 1 ${end.x},${end.y}`;
}

/* ── Segment computation ───────────────────────────────────── */

interface ComputedSegment {
  path: string;
  color: string;
  label?: string;
  labelX: number;
  labelY: number;
}

function computeSegments(cx: number, cy: number, r: number): ComputedSegment[] {
  const { startAngle, sweepAngle } = angleConfig.value;
  const range = props.max - props.min || 1;

  if (!props.segments || props.segments.length === 0) {
    // Single color — draw progress arc
    if (progress.value <= 0) return [];
    const endAngle = startAngle + sweepAngle * progress.value;
    return [{
      path: describeArc(cx, cy, r, startAngle, endAngle),
      color: props.color,
      labelX: cx,
      labelY: cy,
    }];
  }

  // Multi-segment
  const result: ComputedSegment[] = [];
  let prevMax = props.min;

  for (const seg of props.segments) {
    const segStart = ((prevMax - props.min) / range);
    const segEnd = ((seg.max - props.min) / range);
    const sa = startAngle + sweepAngle * segStart;
    const ea = startAngle + sweepAngle * segEnd;

    // Mid angle for label
    const midAngle = (sa + ea) / 2;
    const labelPt = polarToCartesian(cx, cy, r + props.strokeWidth + 12, midAngle);

    result.push({
      path: describeArc(cx, cy, r, sa, ea),
      color: seg.color,
      label: seg.label,
      labelX: labelPt.x,
      labelY: labelPt.y,
    });

    prevMax = seg.max;
  }

  return result;
}

/* ── Needle ────────────────────────────────────────────────── */

function computeNeedle(cx: number, cy: number, r: number) {
  const { startAngle, sweepAngle } = angleConfig.value;
  const angle = startAngle + sweepAngle * progress.value;
  const tipLen = r - props.strokeWidth / 2 - 4;
  const tip = polarToCartesian(cx, cy, tipLen, angle);
  const baseLen = 6;
  const baseL = polarToCartesian(cx, cy, baseLen, angle - Math.PI / 2);
  const baseR = polarToCartesian(cx, cy, baseLen, angle + Math.PI / 2);

  return {
    path: `M${baseL.x},${baseL.y}L${tip.x},${tip.y}L${baseR.x},${baseR.y}Z`,
    tipX: tip.x,
    tipY: tip.y,
    angle,
  };
}

/* ── Min / Max label positions ─────────────────────────────── */

const minLabelPos = computed(() => {
  const { startAngle } = angleConfig.value;
  const pos = polarToCartesian(CX, CY, 130 + 16, startAngle);
  // Text anchor based on angle quadrant
  const cos = Math.cos(startAngle);
  const anchor = cos < -0.2 ? 'end' : cos > 0.2 ? 'start' : 'middle';
  return { ...pos, anchor };
});

const maxLabelPos = computed(() => {
  const { startAngle, sweepAngle } = angleConfig.value;
  const endAngle = startAngle + sweepAngle;
  const pos = polarToCartesian(CX, CY, 130 + 16, endAngle);
  const cos = Math.cos(endAngle);
  const anchor = cos < -0.2 ? 'end' : cos > 0.2 ? 'start' : 'middle';
  return { ...pos, anchor };
});

/** Whether min/max labels would overlap (full circle variant) */
const showMinMax = computed(() => {
  if (props.variant === 'full') {
    const dx = minLabelPos.value.x - maxLabelPos.value.x;
    const dy = minLabelPos.value.y - maxLabelPos.value.y;
    // If labels are closer than 20px, hide them — they'd overlap
    return Math.sqrt(dx * dx + dy * dy) > 20;
  }
  return true;
});

/* ── Value / label vertical positions ──────────────────────── */

const valueY = computed(() => {
  switch (props.variant) {
    case 'semicircle': return CY - 10;
    case 'arc': return CY + 8;
    case 'full': return CY - 2;
    default: return CY;
  }
});

const labelY = computed(() => valueY.value + 24);
</script>

<template>
  <div v-bind="attrs" :class="['flex flex-col items-center gap-2', props.class]">
    <svg
      :viewBox="`0 0 300 ${300 * angleConfig.viewBoxH}`"
      :style="{ minHeight: `${minHeight}px`, width: '100%', maxWidth: '400px' }"
      class="overflow-visible"
    >
      <defs>
        <!-- Drop shadow for needle -->
        <filter :id="filtShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.2" />
        </filter>

        <!-- Glow for value arc -->
        <filter :id="filtGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Track (background arc) -->
      <path
        :d="describeArc(CX, CY, ARC_R,
          angleConfig.startAngle,
          angleConfig.startAngle + angleConfig.sweepAngle)"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
        :stroke-opacity="trackOpacity"
        stroke-linecap="round"
      />

      <!-- Segments or single value arc -->
      <template v-if="segments && segments.length > 0">
        <path
          v-for="(seg, i) in computeSegments(CX, CY, ARC_R)"
          :key="`seg-${i}`"
          :d="seg.path"
          fill="none"
          :stroke="seg.color"
          :stroke-width="strokeWidth"
          stroke-linecap="butt"
          :opacity="0.85"
        />
        <!-- Segment labels -->
        <template v-if="showSegmentLabels">
          <text
            v-for="(seg, i) in computeSegments(CX, CY, ARC_R)"
            :key="`seglab-${i}`"
            :x="seg.labelX"
            :y="seg.labelY"
            text-anchor="middle"
            class="fill-muted-foreground"
            font-size="9"
            font-weight="500"
          >
            {{ seg.label }}
          </text>
        </template>
      </template>
      <template v-else>
        <path
          v-for="(seg, i) in computeSegments(CX, CY, ARC_R)"
          :key="`val-${i}`"
          :d="seg.path"
          fill="none"
          :stroke="seg.color"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          :filter="`url(#${filtGlow})`"
          :style="{
            transition: 'd 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }"
        />
      </template>

      <!-- Needle -->
      <template v-if="showNeedle">
        <path
          :d="computeNeedle(CX, CY, ARC_R).path"
          class="fill-foreground"
          opacity="0.85"
          :filter="`url(#${filtShadow})`"
          :style="{
            transition: 'd 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }"
        />
        <!-- Center dot -->
        <circle
          :cx="CX"
          :cy="CY"
          r="8"
          class="fill-foreground"
        />
        <circle
          :cx="CX"
          :cy="CY"
          r="4"
          class="fill-background"
        />
      </template>

      <!-- Value text -->
      <text
        :x="CX"
        :y="valueY"
        text-anchor="middle"
        dominant-baseline="central"
        class="fill-foreground"
        font-size="36"
        font-weight="700"
        :style="{
          transition: 'opacity 500ms ease',
          opacity: animProgress,
        }"
      >
        {{ fmtValue }}
      </text>

      <!-- Label -->
      <text
        v-if="label"
        :x="CX"
        :y="labelY"
        text-anchor="middle"
        dominant-baseline="central"
        class="fill-muted-foreground"
        font-size="14"
        font-weight="500"
      >
        {{ label }}
      </text>

      <!-- Min / Max labels (hidden when they'd overlap, e.g. full circle) -->
      <template v-if="showMinMax">
        <text
          :x="minLabelPos.x"
          :y="minLabelPos.y"
          :text-anchor="minLabelPos.anchor"
          class="fill-muted-foreground"
          font-size="11"
          dy="0.4em"
        >
          {{ min }}
        </text>
        <text
          :x="maxLabelPos.x"
          :y="maxLabelPos.y"
          :text-anchor="maxLabelPos.anchor"
          class="fill-muted-foreground"
          font-size="11"
          dy="0.4em"
        >
          {{ max }}
        </text>
      </template>
    </svg>
  </div>
</template>