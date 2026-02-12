<script setup lang="ts">
import { UiChartLine, type ChartConfig, type ChartDataRow } from '@3df-spa/charts';

/* ── Data sets ─────────────────────────────────────────────── */

const salesData: ChartDataRow[] = [
  { month: 'Jan', online: 3200, store: 1800 },
  { month: 'Feb', online: 2800, store: 2100 },
  { month: 'Mar', online: 4100, store: 2400 },
  { month: 'Apr', online: 3600, store: 2000 },
  { month: 'May', online: 5200, store: 2900 },
  { month: 'Jun', online: 4800, store: 3200 },
  { month: 'Jul', online: 5800, store: 3500 },
  { month: 'Aug', online: 5400, store: 3100 },
];

const salesConfig: ChartConfig = {
  online: { label: 'Online', color: 'var(--color-chart-1)' },
  store: { label: 'In-Store', color: 'var(--color-chart-2)' },
};

const latencyData: ChartDataRow[] = [
  { time: '00:00', p50: 42, p95: 120, p99: 280 },
  { time: '04:00', p50: 38, p95: 95, p99: 210 },
  { time: '08:00', p50: 55, p95: 180, p99: 420 },
  { time: '12:00', p50: 68, p95: 220, p99: 510 },
  { time: '16:00', p50: 72, p95: 240, p99: 580 },
  { time: '20:00', p50: 48, p95: 150, p99: 340 },
  { time: '23:59', p50: 40, p95: 110, p99: 260 },
];

const latencyConfig: ChartConfig = {
  p50: { label: 'p50', color: 'var(--color-chart-3)' },
  p95: { label: 'p95', color: 'var(--color-chart-4)' },
  p99: { label: 'p99', color: 'var(--color-chart-5)' },
};

const temperatureData: ChartDataRow[] = [
  { day: 'Mon', indoor: 22, outdoor: 14 },
  { day: 'Tue', indoor: 21, outdoor: 12 },
  { day: 'Wed', indoor: 23, outdoor: 18 },
  { day: 'Thu', indoor: 22, outdoor: 16 },
  { day: 'Fri', indoor: 24, outdoor: 20 },
  { day: 'Sat', indoor: 23, outdoor: 22 },
  { day: 'Sun', indoor: 22, outdoor: 19 },
];

const temperatureConfig: ChartConfig = {
  indoor: { label: 'Indoor', color: 'var(--color-chart-1)' },
  outdoor: { label: 'Outdoor', color: 'var(--color-chart-4)' },
};

const stepData: ChartDataRow[] = [
  { hour: '6am', users: 120 },
  { hour: '9am', users: 580 },
  { hour: '12pm', users: 430 },
  { hour: '3pm', users: 620 },
  { hour: '6pm', users: 380 },
  { hour: '9pm', users: 210 },
  { hour: '12am', users: 90 },
];

const stepConfig: ChartConfig = {
  users: { label: 'Active Users', color: 'var(--color-chart-5)' },
};
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Line Chart</h1>
      <p class="mt-2 text-muted-foreground">
        Monotone, linear &amp; step interpolation — gradient area fill, glow on hover, interactive legend. 100% SVG, zero dependencies.
      </p>
    </div>

    <!-- 1. Monotone (default) — smooth curves -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Monotone (Smooth)</h2>
        <p class="text-sm text-muted-foreground">
          Default curve type. Gradient area fill, crosshair on hover. Click legend to toggle series.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartLine
          :config="salesConfig"
          :data="salesData"
          index="month"
        />
      </div>
    </section>

    <!-- 2. Multi-line — server latency percentiles -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Multi-line &mdash; Latency Percentiles</h2>
        <p class="text-sm text-muted-foreground">
          Three series with visible dots, custom formatter. Toggle any series via legend.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartLine
          :config="latencyConfig"
          :data="latencyData"
          index="time"
          :show-dots="true"
          :value-formatter="(v: number) => `${v}ms`"
        />
      </div>
    </section>

    <!-- 3. Linear — no area fill -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Linear &mdash; No Area</h2>
        <p class="text-sm text-muted-foreground">
          Straight line segments. Area fill disabled, dots visible.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartLine
          :config="temperatureConfig"
          :data="temperatureData"
          index="day"
          curve-type="linear"
          :show-area="false"
          :show-dots="true"
          :value-formatter="(v: number) => `${v}°C`"
        />
      </div>
    </section>

    <!-- 4. Step — single series -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Step</h2>
        <p class="text-sm text-muted-foreground">
          Step interpolation for discrete jumps. No animation, dot grid hidden.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartLine
          :config="stepConfig"
          :data="stepData"
          index="hour"
          curve-type="step"
          :show-legend="false"
          :show-grid="false"
          :animate="false"
          :stroke-width="3"
        />
      </div>
    </section>
  </div>
</template>
