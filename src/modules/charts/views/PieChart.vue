<script setup lang="ts">
import { UiChartPie, type ChartConfig, type ChartDataRow } from '@3df/charts';

/* ── Data: browser market share (valueKey mode) ────────────── */

const browserData: ChartDataRow[] = [
  { browser: 'Chrome', share: 63 },
  { browser: 'Safari', share: 19 },
  { browser: 'Firefox', share: 7 },
  { browser: 'Edge', share: 6 },
  { browser: 'Other', share: 5 },
];

const browserConfig: ChartConfig = {
  Chrome:  { label: 'Chrome',  color: 'var(--color-chart-1)' },
  Safari:  { label: 'Safari',  color: 'var(--color-chart-2)' },
  Firefox: { label: 'Firefox', color: 'var(--color-chart-3)' },
  Edge:    { label: 'Edge',    color: 'var(--color-chart-4)' },
  Other:   { label: 'Other',   color: 'var(--color-chart-5)' },
};

/* ── Data: revenue by channel (multi-key single row) ───────── */

const revenueData: ChartDataRow[] = [
  { label: 'Revenue', website: 42000, app: 28000, wholesale: 15000 },
];

const revenueConfig: ChartConfig = {
  website:   { label: 'Website',   color: 'var(--color-chart-1)' },
  app:       { label: 'App',       color: 'var(--color-chart-3)' },
  wholesale: { label: 'Wholesale', color: 'var(--color-chart-5)' },
};

/* ── Data: tasks status ────────────────────────────────────── */

const tasksData: ChartDataRow[] = [
  { status: 'Done', count: 45 },
  { status: 'In Progress', count: 22 },
  { status: 'Todo', count: 18 },
  { status: 'Blocked', count: 8 },
];

const tasksConfig: ChartConfig = {
  Done:          { label: 'Done',        color: 'var(--color-chart-3)' },
  'In Progress': { label: 'In Progress', color: 'var(--color-chart-1)' },
  Todo:          { label: 'Todo',        color: 'var(--color-chart-2)' },
  Blocked:       { label: 'Blocked',     color: 'var(--color-chart-4)' },
};

/* ── Data: storage quotas ──────────────────────────────────── */

const storageData: ChartDataRow[] = [
  { type: 'Photos', used: 48 },
  { type: 'Videos', used: 32 },
  { type: 'Docs', used: 12 },
  { type: 'Free', used: 8 },
];

const storageConfig: ChartConfig = {
  Photos: { label: 'Photos', color: 'var(--color-chart-1)' },
  Videos: { label: 'Videos', color: 'var(--color-chart-4)' },
  Docs:   { label: 'Docs',   color: 'var(--color-chart-3)' },
  Free:   { label: 'Free',   color: 'var(--color-chart-2)' },
};
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Pie Chart</h1>
      <p class="mt-2 text-muted-foreground">
        Pie &amp; donut variants — hover to explode slices, click legend to toggle. 100% SVG, zero dependencies.
      </p>
    </div>

    <!-- 1. Full Pie — browser market share -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Full Pie</h2>
        <p class="text-sm text-muted-foreground">
          Hover to explode slices outward. Click legend items to hide/show.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartPie
          :config="browserConfig"
          :data="browserData"
          index="browser"
          value-key="share"
          :show-labels="true"
          label-type="percent"
        />
      </div>
    </section>

    <!-- 2. Donut — revenue by channel -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Donut</h2>
        <p class="text-sm text-muted-foreground">
          Inner radius creates a donut with centered total. Multi-key single-row data.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartPie
          :config="revenueConfig"
          :data="revenueData"
          index="label"
          :inner-radius="70"
          :show-labels="true"
          label-type="value"
          :value-formatter="(v: number) => `$${(v / 1000).toFixed(0)}K`"
        />
      </div>
    </section>

    <!-- 3. Donut — task status with name labels -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Task Status</h2>
        <p class="text-sm text-muted-foreground">
          Donut with name labels. valueKey mode — each row is a slice.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartPie
          :config="tasksConfig"
          :data="tasksData"
          index="status"
          value-key="count"
          :inner-radius="60"
          :show-labels="true"
          label-type="name"
        />
      </div>
    </section>

    <!-- 4. Minimal — no labels, no animation -->
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Minimal &mdash; No Animation</h2>
        <p class="text-sm text-muted-foreground">
          Clean look without labels. Animation disabled.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartPie
          :config="storageConfig"
          :data="storageData"
          index="type"
          value-key="used"
          :inner-radius="50"
          :animate="false"
          :pad-angle="2"
          :value-formatter="(v: number) => `${v} GB`"
        />
      </div>
    </section>
  </div>
</template>