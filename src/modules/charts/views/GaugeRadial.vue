<script setup lang="ts">
import { UiChartGauge, type GaugeSegment } from '@3df/charts';

/* ── Gauge segments for zones ──────────────────────────────── */

const speedSegments: GaugeSegment[] = [
  { max: 60, color: 'var(--color-chart-3)', label: 'Safe' },
  { max: 100, color: 'var(--color-chart-1)', label: 'Normal' },
  { max: 140, color: 'oklch(0.65 0.18 45)', label: 'Fast' },
  { max: 200, color: 'oklch(0.60 0.22 25)', label: 'Danger' },
];

const healthSegments: GaugeSegment[] = [
  { max: 30, color: 'oklch(0.60 0.22 25)', label: 'Critical' },
  { max: 60, color: 'oklch(0.65 0.18 45)', label: 'Warning' },
  { max: 80, color: 'var(--color-chart-1)', label: 'Good' },
  { max: 100, color: 'var(--color-chart-3)', label: 'Excellent' },
];
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Gauge / Radial</h1>
      <p class="mt-2 text-muted-foreground">
        Radial gauges with needles, colored segments &amp; 3 arc shapes — semicircle, 270° arc, full 360°. 100% SVG, zero dependencies.
      </p>
    </div>

    <!-- 1. Semicircle — default -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Semicircle &mdash; Default</h2>
        <p class="text-sm text-muted-foreground">
          Classic half-circle gauge with needle. Single color value arc.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartGauge
          :value="72"
          label="Performance"
          :value-formatter="(v: number) => `${v}%`"
        />
      </div>
    </section>

    <!-- 2. Arc 270° with segments -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Arc 270° &mdash; Speed Zones</h2>
        <p class="text-sm text-muted-foreground">
          Four colored segments with labels. Needle points to current speed.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartGauge
          :value="115"
          :max="200"
          variant="arc"
          :segments="speedSegments"
          :show-segment-labels="true"
          label="km/h"
          :value-formatter="(v: number) => `${v}`"
        />
      </div>
    </section>

    <!-- 3. Full circle -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Full Circle &mdash; Temperature</h2>
        <p class="text-sm text-muted-foreground">
          360° full-circle gauge with custom color. No needle variant.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartGauge
          :value="38.6"
          :min="35"
          :max="42"
          variant="full"
          color="oklch(0.65 0.18 45)"
          :show-needle="false"
          label="°C"
          :value-formatter="(v: number) => v.toFixed(1)"
        />
      </div>
    </section>

    <!-- 4. Health score with segments -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Health Score &mdash; Segments, No Animation</h2>
        <p class="text-sm text-muted-foreground">
          Semicircle with health zones. Static (no entrance animation).
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartGauge
          :value="85"
          :segments="healthSegments"
          :show-segment-labels="true"
          :animate="false"
          label="Health"
          :value-formatter="(v: number) => `${v}/100`"
        />
      </div>
    </section>
  </div>
</template>