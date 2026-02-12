// Shared
export { default as UiChartContainer } from './shared/UiChartContainer.vue';
export { default as UiChartTooltip } from './shared/UiChartTooltip.vue';
export { default as UiChartLegend } from './shared/UiChartLegend.vue';
export { CHART_KEY } from './shared/chart-types';
export type {
  ChartConfig,
  ChartSeriesConfig,
  ChartDataRow,
  ChartOrientation,
  ChartStackMode,
  ChartAxisConfig,
  ChartTooltipData,
  ChartTooltipItem,
  ChartContext,
  NiceScale,
} from './shared/chart-types';
export {
  niceScale,
  getSeriesKeys,
  getDataExtent,
  formatNumber,
  formatTooltipValue,
  resolveColor,
  resolveConfigColors,
  CHART_COLORS,
} from './shared/chart-utils';

// Bar Chart
export { default as UiChartBar } from './chartbar/UiChartBar.vue';

// Line Chart
export { default as UiChartLine } from './chartline/UiChartLine.vue';
export type { CurveType } from './chartline/UiChartLine.vue';
