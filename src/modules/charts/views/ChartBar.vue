<script setup lang="ts">
import { UiChartBar, type ChartConfig, type ChartDataRow } from '@3df/charts';

/* ── Data sets ─────────────────────────────────────────────── */

const monthlyData: ChartDataRow[] = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
  { month: 'Mar', revenue: 5100, expenses: 3400 },
  { month: 'Apr', revenue: 4600, expenses: 3100 },
  { month: 'May', revenue: 6200, expenses: 3900 },
  { month: 'Jun', revenue: 5800, expenses: 4200 },
];

const monthlyConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: 'var(--color-chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--color-chart-2)' },
};

const browserData: ChartDataRow[] = [
  { browser: 'Chrome', users: 4500 },
  { browser: 'Safari', users: 2200 },
  { browser: 'Firefox', users: 1800 },
  { browser: 'Edge', users: 1200 },
  { browser: 'Opera', users: 600 },
];

const browserConfig: ChartConfig = {
  users: { label: 'Users', color: 'var(--color-chart-3)' },
};

const stackedData: ChartDataRow[] = [
  { quarter: 'Q1', desktop: 3200, mobile: 1800, tablet: 900 },
  { quarter: 'Q2', desktop: 3600, mobile: 2100, tablet: 1100 },
  { quarter: 'Q3', desktop: 3100, mobile: 2500, tablet: 1300 },
  { quarter: 'Q4', desktop: 4200, mobile: 2800, tablet: 1500 },
];

const stackedConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--color-chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--color-chart-4)' },
  tablet: { label: 'Tablet', color: 'var(--color-chart-5)' },
};

const performanceData: ChartDataRow[] = [
  { team: 'Alpha', frontend: 92, backend: 78, devops: 65 },
  { team: 'Beta', frontend: 68, backend: 88, devops: 82 },
  { team: 'Gamma', frontend: 85, backend: 72, devops: 91 },
  { team: 'Delta', frontend: 76, backend: 95, devops: 70 },
];

const performanceConfig: ChartConfig = {
  frontend: { label: 'Frontend', color: 'var(--color-chart-1)' },
  backend: { label: 'Backend', color: 'var(--color-chart-4)' },
  devops: { label: 'DevOps', color: 'var(--color-chart-5)' },
};
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Bar Chart</h1>
      <p class="mt-2 text-muted-foreground">
        Vertical, horizontal, grouped &amp; stacked variants — 100% SVG, zero dependencies.
        Gradient bars, glow on hover, dot-grid, crosshair, entrance animation &amp; interactive legend.
      </p>
    </div>

    <!-- 1. Vertical grouped (default) -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Vertical Grouped</h2>
        <p class="text-sm text-muted-foreground">
          Hover to see glow effect &amp; crosshair. Click legend items to hide/show series.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartBar
          :config="monthlyConfig"
          :data="monthlyData"
          index="month"
        />
      </div>
    </section>

    <!-- 2. Horizontal grouped -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Horizontal</h2>
        <p class="text-sm text-muted-foreground">
          Same features in horizontal layout. Legend hidden via prop.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartBar
          :config="browserConfig"
          :data="browserData"
          index="browser"
          orientation="horizontal"
          :show-legend="false"
        />
      </div>
    </section>

    <!-- 3. Stacked vertical -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Stacked</h2>
        <p class="text-sm text-muted-foreground">
          Toggle series on the legend — bars recalculate automatically.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartBar
          :config="stackedConfig"
          :data="stackedData"
          index="quarter"
          mode="stacked"
        />
      </div>
    </section>

    <!-- 4. Interactive legend + 3 series -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Interactive Legend</h2>
        <p class="text-sm text-muted-foreground">
          Three series with interactive legend pills. Click to toggle series visibility — hidden series show hollow dot &amp; strikethrough.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartBar
          :config="performanceConfig"
          :data="performanceData"
          index="team"
          :radius="8"
        />
      </div>
    </section>

    <!-- 5. No animation + custom formatter + no grid -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Custom Formatter &mdash; No Animation</h2>
        <p class="text-sm text-muted-foreground">
          Entrance animation disabled. Dot grid hidden. Dollar formatter applied.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartBar
          :config="monthlyConfig"
          :data="monthlyData"
          index="month"
          :show-grid="false"
          :animate="false"
          :value-formatter="(v: number) => `$${(v / 1000).toFixed(1)}K`"
          :radius="10"
        />
      </div>
    </section>
  </div>
</template>