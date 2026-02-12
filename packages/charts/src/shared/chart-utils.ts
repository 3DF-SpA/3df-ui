import type { ChartConfig, ChartDataRow, NiceScale } from './chart-types';

/* ── Nice scale (tick calculation) ─────────────────────────── */

/**
 * Compute a "nice" scale for a numeric axis.
 * Produces round min/max/step values and an array of tick positions.
 */
export function niceScale(
  dataMin: number,
  dataMax: number,
  approxTicks = 5,
): NiceScale {
  if (dataMin === dataMax) {
    const v = dataMin || 1;
    return { min: 0, max: v * 2, step: v, ticks: [0, v, v * 2] };
  }

  const range = dataMax - dataMin;
  const roughStep = range / approxTicks;

  // Round step to nearest "nice" number (1, 2, 5 × 10^n)
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / mag;

  let niceStep: number;
  if (residual <= 1.5) niceStep = 1 * mag;
  else if (residual <= 3) niceStep = 2 * mag;
  else if (residual <= 7) niceStep = 5 * mag;
  else niceStep = 10 * mag;

  const niceMin = Math.floor(dataMin / niceStep) * niceStep;
  const niceMax = Math.ceil(dataMax / niceStep) * niceStep;

  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + niceStep * 0.5; v += niceStep) {
    ticks.push(Math.round(v * 1e10) / 1e10); // avoid FP drift
  }

  return { min: niceMin, max: niceMax, step: niceStep, ticks };
}

/* ── Data helpers ──────────────────────────────────────────── */

/**
 * Extract series keys from config (keys that map to numeric columns in data).
 */
export function getSeriesKeys(config: ChartConfig): string[] {
  return Object.keys(config);
}

/**
 * Compute min/max across all series in a dataset.
 */
export function getDataExtent(
  data: ChartDataRow[],
  seriesKeys: string[],
  stacked = false,
): { min: number; max: number } {
  let min = 0;
  let max = 0;

  if (stacked) {
    for (const row of data) {
      let positiveSum = 0;
      let negativeSum = 0;
      for (const key of seriesKeys) {
        const v = Number(row[key]) || 0;
        if (v >= 0) positiveSum += v;
        else negativeSum += v;
      }
      if (positiveSum > max) max = positiveSum;
      if (negativeSum < min) min = negativeSum;
    }
  } else {
    for (const row of data) {
      for (const key of seriesKeys) {
        const v = Number(row[key]) || 0;
        if (v > max) max = v;
        if (v < min) min = v;
      }
    }
  }

  // Always include 0
  if (min > 0) min = 0;
  if (max < 0) max = 0;

  return { min, max };
}

/* ── Format helpers ────────────────────────────────────────── */

/**
 * Default number formatter (compact: 1000 → 1K, etc.)
 */
export function formatNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/**
 * Default precise number format for tooltips
 */
export function formatTooltipValue(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/* ── Color resolution ──────────────────────────────────────── */

/**
 * Resolve CSS variable references to computed colors.
 * Handles `var(--color-chart-1)` → actual hsl/hex color.
 */
export function resolveColor(color: string, el?: HTMLElement): string {
  const varMatch = color.match(/^var\((.+)\)$/);
  if (!varMatch) return color;

  const root = el ?? document.documentElement;
  const computed = getComputedStyle(root).getPropertyValue(varMatch[1]!.trim());
  return computed.trim() || color;
}

/**
 * Build a resolved color map from ChartConfig.
 */
export function resolveConfigColors(
  config: ChartConfig,
  el?: HTMLElement,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, series] of Object.entries(config)) {
    result[key] = resolveColor(series.color, el);
  }
  return result;
}

/* ── Default chart color palette ───────────────────────────── */

export const CHART_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
] as const;
