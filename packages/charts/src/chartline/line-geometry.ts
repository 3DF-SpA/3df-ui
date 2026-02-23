import type { ChartConfig, ChartDataRow, NiceScale } from '../shared/chart-types';

export type CurveType = 'monotone' | 'linear' | 'step';
export type StackMode = 'none' | 'stacked' | 'expanded';

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Pt {
  x: number;
  y: number;
}

export interface StackedPoint {
  dataIndex: number;
  rawValue: number;
  y0: number;
  y1: number;
}

export interface SeriesPointData {
  x: number;
  yTop: number;
  yBottom: number;
  value: number;
  dataIndex: number;
}

export interface SeriesData {
  key: string;
  points: SeriesPointData[];
  linePath: string;
  areaPath: string;
  color: string;
  gradientId: string;
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

export interface LineGridData {
  gridDots: GridDot[];
  valueLabels: AxisLabel[];
  categoryLabels: AxisLabel[];
}

export interface LineHoverRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  dataIndex: number;
  centerX: number;
}

export interface LineParams {
  data: ChartDataRow[];
  index: string;
  config: ChartConfig;
  curveType: CurveType;
  mode: StackMode;
  visibleSeriesKeys: string[];
  scale: NiceScale;
  animProgress: number;
  padding: Padding;
  showGrid: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  showArea: boolean;
  fmtValue: (value: number) => string;
  fmtCategory: (value: string | number) => string;
}

export function computeStackedData(
  data: ChartDataRow[],
  keys: string[],
  mode: StackMode,
): Record<string, StackedPoint[]> {
  const result: Record<string, StackedPoint[]> = {};
  for (const key of keys) result[key] = [];

  for (let di = 0; di < data.length; di++) {
    const row = data[di]!;
    if (mode === 'stacked') {
      let cumulative = 0;
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        result[key]!.push({ dataIndex: di, rawValue: v, y0: cumulative, y1: cumulative + v });
        cumulative += v;
      }
    } else if (mode === 'expanded') {
      const total = keys.reduce((sum, k) => sum + (Number(row[k]) || 0), 0) || 1;
      let cumulative = 0;
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        const frac = v / total;
        result[key]!.push({ dataIndex: di, rawValue: v, y0: cumulative, y1: cumulative + frac });
        cumulative += frac;
      }
    } else {
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        result[key]!.push({ dataIndex: di, rawValue: v, y0: 0, y1: v });
      }
    }
  }
  return result;
}

export function computeLineGrid(w: number, h: number, p: LineParams): LineGridData {
  const {
    padding: pad,
    scale,
    data,
    showGrid,
    showXAxis,
    showYAxis,
    fmtValue,
    fmtCategory,
    index,
  } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { max: sMax, ticks } = scale;
  const range = sMax - scale.min || 1;
  const categoryCount = data.length;
  const gridDots: GridDot[] = [];
  const valueLabels: AxisLabel[] = [];
  const categoryLabels: AxisLabel[] = [];

  for (const tick of ticks) {
    const y = pad.top + ((sMax - tick) / range) * plotH;
    if (showGrid) {
      for (let ci = 0; ci < categoryCount; ci++) {
        const x =
          categoryCount === 1
            ? pad.left + plotW / 2
            : pad.left + (ci / (categoryCount - 1)) * plotW;
        gridDots.push({ cx: x, cy: y });
      }
    }
    if (showYAxis) {
      valueLabels.push({ x: pad.left - 12, y: y + 4, text: fmtValue(tick), anchor: 'end' });
    }
  }

  if (showXAxis) {
    for (let i = 0; i < categoryCount; i++) {
      const x =
        categoryCount === 1 ? pad.left + plotW / 2 : pad.left + (i / (categoryCount - 1)) * plotW;
      categoryLabels.push({
        x,
        y: pad.top + plotH + 28,
        text: fmtCategory(data[i]![index] as string),
        anchor: 'middle',
      });
    }
  }

  return { gridDots, valueLabels, categoryLabels };
}

export function computeLineHoverRegions(w: number, h: number, p: LineParams): LineHoverRegion[] {
  const { padding: pad, data } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const count = data.length;
  const regions: LineHoverRegion[] = [];

  for (let i = 0; i < count; i++) {
    const cx = count === 1 ? pad.left + plotW / 2 : pad.left + (i / (count - 1)) * plotW;
    const step = count <= 1 ? plotW : plotW / (count - 1);
    const left = i === 0 ? pad.left : cx - step / 2;
    const right = i === count - 1 ? pad.left + plotW : cx + step / 2;
    regions.push({
      x: left,
      y: pad.top,
      width: right - left,
      height: plotH,
      dataIndex: i,
      centerX: cx,
    });
  }
  return regions;
}
