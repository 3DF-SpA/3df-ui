import type { InjectionKey, Ref } from 'vue';

/* ── Series configuration ──────────────────────────────────── */

export interface ChartSeriesConfig {
  /** Human-readable label shown in tooltip & legend */
  label: string;
  /** CSS color value — supports var(--color-chart-1), hex, hsl, etc. */
  color: string;
}

/**
 * Maps each numeric key in your data to its visual configuration.
 *
 * @example
 * const config: ChartConfig = {
 *   revenue:  { label: 'Revenue',  color: 'var(--color-chart-1)' },
 *   expenses: { label: 'Expenses', color: 'var(--color-chart-2)' },
 * };
 */
export type ChartConfig = Record<string, ChartSeriesConfig>;

/* ── Data types ────────────────────────────────────────────── */

/** A single data row — must have an index key (string) + numeric series */
export type ChartDataRow = Record<string, string | number>;

/* ── Layout & orientation ──────────────────────────────────── */

export type ChartOrientation = 'vertical' | 'horizontal';
export type ChartStackMode = 'grouped' | 'stacked';

/* ── Axis types ────────────────────────────────────────────── */

export interface ChartAxisConfig {
  /** Show axis line */
  show?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Label formatter */
  formatter?: (value: string | number) => string;
  /** Number of ticks (approximate) */
  tickCount?: number;
}

/* ── Tooltip ───────────────────────────────────────────────── */

export interface ChartTooltipData {
  /** Index value (category label) */
  label: string;
  /** Series entries */
  items: ChartTooltipItem[];
}

export interface ChartTooltipItem {
  /** Series key */
  key: string;
  /** Human-readable label */
  label: string;
  /** Numeric value */
  value: number;
  /** Resolved CSS color */
  color: string;
}

/* ── Provide/inject context ────────────────────────────────── */

export interface ChartContext {
  config: Ref<ChartConfig>;
  /** Resolved colors (CSS variable → computed color) */
  resolvedColors: Ref<Record<string, string>>;
}

export const CHART_KEY: InjectionKey<ChartContext> = Symbol('chart');

/* ── Scale types (internal) ────────────────────────────────── */

export interface NiceScale {
  min: number;
  max: number;
  step: number;
  ticks: number[];
}
