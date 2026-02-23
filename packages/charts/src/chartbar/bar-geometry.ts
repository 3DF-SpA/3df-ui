import type {
  ChartConfig,
  ChartDataRow,
  ChartOrientation,
  ChartStackMode,
  NiceScale,
} from '../shared/chart-types';

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BarRect {
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
}

export interface GridDot {
  cx: number;
  cy: number;
}

export interface AxisLabel {
  x: number;
  y: number;
  text: string;
  anchor: string;
}

export interface BarGridData {
  gridDots: GridDot[];
  valueLabels: AxisLabel[];
  categoryLabels: AxisLabel[];
}

export interface HoverRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  dataIndex: number;
  center: number;
}

export interface BarParams {
  data: ChartDataRow[];
  index: string;
  config: ChartConfig;
  orientation: ChartOrientation;
  mode: ChartStackMode;
  visibleSeriesKeys: string[];
  scale: NiceScale;
  animProgress: number;
  padding: Padding;
  radius: number;
  barGap: number;
  categoryGap: number;
  showGrid: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  fmtValue: (value: number) => string;
  fmtCategory: (value: string | number) => string;
}

export function computeBarGrid(w: number, h: number, p: BarParams): BarGridData {
  const {
    padding: pad,
    scale,
    data,
    orientation,
    showGrid,
    showXAxis,
    showYAxis,
    fmtValue,
    fmtCategory,
    index,
  } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax, ticks } = scale;
  const range = sMax - sMin || 1;
  const isVert = orientation === 'vertical';
  const categoryCount = data.length;
  const gridDots: GridDot[] = [];
  const valueLabels: AxisLabel[] = [];
  const categoryLabels: AxisLabel[] = [];

  for (const tick of ticks) {
    if (isVert) {
      const y = pad.top + ((sMax - tick) / range) * plotH;
      if (showGrid) {
        const band = plotW / categoryCount;
        for (let ci = 0; ci < categoryCount; ci++) {
          gridDots.push({ cx: pad.left + ci * band + band / 2, cy: y });
        }
      }
      if (showYAxis) {
        valueLabels.push({ x: pad.left - 12, y: y + 4, text: fmtValue(tick), anchor: 'end' });
      }
    } else {
      const x = pad.left + ((tick - sMin) / range) * plotW;
      if (showGrid) {
        const band = plotH / categoryCount;
        for (let ci = 0; ci < categoryCount; ci++) {
          gridDots.push({ cx: x, cy: pad.top + ci * band + band / 2 });
        }
      }
      if (showXAxis) {
        valueLabels.push({ x, y: pad.top + plotH + 24, text: fmtValue(tick), anchor: 'middle' });
      }
    }
  }

  if (isVert) {
    const band = plotW / categoryCount;
    for (let i = 0; i < categoryCount; i++) {
      if (showXAxis) {
        categoryLabels.push({
          x: pad.left + i * band + band / 2,
          y: pad.top + plotH + 28,
          text: fmtCategory(data[i]![index] as string),
          anchor: 'middle',
        });
      }
    }
  } else {
    const band = plotH / categoryCount;
    for (let i = 0; i < categoryCount; i++) {
      if (showYAxis) {
        categoryLabels.push({
          x: pad.left - 12,
          y: pad.top + i * band + band / 2 + 4,
          text: fmtCategory(data[i]![index] as string),
          anchor: 'end',
        });
      }
    }
  }

  return { gridDots, valueLabels, categoryLabels };
}

export function computeBarHoverRegions(w: number, h: number, p: BarParams): HoverRegion[] {
  const { padding: pad, data, orientation } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const categoryCount = data.length;
  const isVert = orientation === 'vertical';
  const regions: HoverRegion[] = [];

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
