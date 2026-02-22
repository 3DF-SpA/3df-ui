<script setup lang="ts">
import { UiChartRadar, type ChartConfig, type ChartDataRow } from '@3df-spa/charts';

const skillsData: ChartDataRow[] = [
  { skill: 'Frontend', alice: 90, bob: 70 },
  { skill: 'Backend', alice: 65, bob: 85 },
  { skill: 'DevOps', alice: 50, bob: 80 },
  { skill: 'Design', alice: 85, bob: 40 },
  { skill: 'Testing', alice: 70, bob: 75 },
  { skill: 'Security', alice: 55, bob: 90 },
];

const skillsConfig: ChartConfig = {
  alice: { label: 'Alice', color: 'var(--color-chart-1)' },
  bob:   { label: 'Bob',   color: 'var(--color-chart-4)' },
};

const productData: ChartDataRow[] = [
  { metric: 'Performance', ours: 92, competitor: 78 },
  { metric: 'Reliability', ours: 88, competitor: 82 },
  { metric: 'Usability', ours: 95, competitor: 70 },
  { metric: 'Features', ours: 75, competitor: 90 },
  { metric: 'Support', ours: 85, competitor: 60 },
  { metric: 'Price', ours: 70, competitor: 85 },
  { metric: 'Docs', ours: 90, competitor: 55 },
];

const productConfig: ChartConfig = {
  ours:       { label: 'Our Product',  color: 'var(--color-chart-3)' },
  competitor: { label: 'Competitor',   color: 'var(--color-chart-5)' },
};

const fitnessData: ChartDataRow[] = [
  { area: 'Strength', score: 80 },
  { area: 'Endurance', score: 65 },
  { area: 'Flexibility', score: 50 },
  { area: 'Speed', score: 70 },
  { area: 'Balance', score: 85 },
];

const fitnessConfig: ChartConfig = {
  score: { label: 'Score', color: 'var(--color-chart-1)' },
};

const teamData: ChartDataRow[] = [
  { quarter: 'Q1', engineering: 78, marketing: 65, sales: 82 },
  { quarter: 'Q2', engineering: 85, marketing: 72, sales: 75 },
  { quarter: 'Q3', engineering: 90, marketing: 80, sales: 88 },
  { quarter: 'Q4', engineering: 82, marketing: 88, sales: 92 },
  { quarter: 'Q5', engineering: 88, marketing: 75, sales: 80 },
];

const teamConfig: ChartConfig = {
  engineering: { label: 'Engineering', color: 'var(--color-chart-1)' },
  marketing:   { label: 'Marketing',   color: 'var(--color-chart-3)' },
  sales:       { label: 'Sales',       color: 'var(--color-chart-5)' },
};
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Radar Chart</h1>
      <p class="mt-2 text-muted-foreground">
        Multi-dimensional comparison — polygon &amp; circle grids, filled areas, interactive legend. 100% SVG, zero dependencies.
      </p>
    </div>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Polygon Grid</h2>
        <p class="text-sm text-muted-foreground">
          Compare two profiles across multiple dimensions. Hover dots for values, click legend to toggle.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartRadar
          :config="skillsConfig"
          :data="skillsData"
          index="skill"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Circle Grid</h2>
        <p class="text-sm text-muted-foreground">
          Circular grid with 7 axes. Higher fill opacity for emphasis.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartRadar
          :config="productConfig"
          :data="productData"
          index="metric"
          variant="circle"
          :fill-opacity="0.3"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Single Series &mdash; No Fill</h2>
        <p class="text-sm text-muted-foreground">
          Outline-only style with larger dots, thicker stroke.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartRadar
          :config="fitnessConfig"
          :data="fitnessData"
          index="area"
          :show-fill="false"
          :stroke-width="3"
          :dot-radius="5"
          :show-legend="false"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Multi-series &mdash; Three Teams</h2>
        <p class="text-sm text-muted-foreground">
          Circle variant with 3 overlapping series. No animation.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-6">
        <UiChartRadar
          :config="teamConfig"
          :data="teamData"
          index="quarter"
          variant="circle"
          :animate="false"
          :levels="4"
        />
      </div>
    </section>
  </div>
</template>