import type { NiceScale } from '../shared/chart-types';

export type ScatterShape = 'circle' | 'square' | 'diamond';

export interface ScatterSeriesConfig {
  label: string;
  color: string;
  xKey: string;
  yKey: string;
  sizeKey?: string;
  shape?: ScatterShape;
}

export type ScatterConfig = Record<string, ScatterSeriesConfig>;

export interface ScatterPoint {
  x: number;
  y: number;
  r: number;
  seriesKey: string;
  dataIndex: number;
  rawX: number;
  rawY: number;
  rawSize: number | null;
  color: string;
  shape: ScatterShape;
}

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ScatterGridData {
  gridDots: Array<{ cx: number; cy: number }>;
  xLabels: Array<{ x: number; y: number; text: string }>;
  yLabels: Array<{ x: number; y: number; text: string }>;
}

export interface ScatterParams {
  config: ScatterConfig;
  data: Record<string, string | number>[];
  visibleSeriesKeys: string[];
  padding: Padding;
  xScale: NiceScale;
  yScale: NiceScale;
  sizeExtent: { min: number; max: number };
  animProgress: number;
  dotRadius: number;
  minDotRadius: number;
  maxDotRadius: number;
  showGrid: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  fmtX: (value: number) => string;
  fmtY: (value: number) => string;
}

export function getExtent(
  config: ScatterConfig,
  visibleKeys: string[],
  data: Record<string, string | number>[],
  accessor: (s: ScatterSeriesConfig) => string,
): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const key of visibleKeys) {
    const s = config[key]!;
    const k = accessor(s);
    for (const row of data) {
      const v = Number(row[k]);
      if (!Number.isFinite(v)) continue;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (min === Infinity) {
    min = 0;
    max = 1;
  }
  return { min, max };
}

export function getSizeExtent(
  config: ScatterConfig,
  visibleKeys: string[],
  data: Record<string, string | number>[],
): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const key of visibleKeys) {
    const sizeKey = config[key]!.sizeKey;
    if (!sizeKey) continue;
    for (const row of data) {
      const v = Number(row[sizeKey]);
      if (!Number.isFinite(v)) continue;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (min === Infinity) {
    min = 0;
    max = 1;
  }
  return { min, max };
}

export function computePoints(w: number, h: number, p: ScatterParams): ScatterPoint[] {
  const { padding: pad, xScale, yScale, sizeExtent, animProgress, config } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const xRange = xScale.max - xScale.min || 1;
  const yRange = yScale.max - yScale.min || 1;
  const sRange = sizeExtent.max - sizeExtent.min || 1;
  const points: ScatterPoint[] = [];

  for (const seriesKey of p.visibleSeriesKeys) {
    const s = config[seriesKey]!;
    for (let di = 0; di < p.data.length; di++) {
      const row = p.data[di]!;
      const rawX = Number(row[s.xKey]);
      const rawY = Number(row[s.yKey]);
      if (!Number.isFinite(rawX) || !Number.isFinite(rawY)) continue;

      const px = pad.left + ((rawX - xScale.min) / xRange) * plotW;
      const targetPy = pad.top + ((yScale.max - rawY) / yRange) * plotH;
      const centerY = pad.top + plotH / 2;
      const py = centerY + (targetPy - centerY) * animProgress;

      let radius = p.dotRadius;
      let rawSize: number | null = null;
      if (s.sizeKey) {
        rawSize = Number(row[s.sizeKey]) || 0;
        const norm = sRange > 0 ? (rawSize - sizeExtent.min) / sRange : 0.5;
        radius = p.minDotRadius + norm * (p.maxDotRadius - p.minDotRadius);
      }

      points.push({
        x: px,
        y: py,
        r: radius * animProgress,
        seriesKey,
        dataIndex: di,
        rawX,
        rawY,
        rawSize,
        color: s.color,
        shape: s.shape ?? 'circle',
      });
    }
  }
  return points;
}

export function computeScatterGrid(w: number, h: number, p: ScatterParams): ScatterGridData {
  const { padding: pad, xScale, yScale, showGrid, showXAxis, showYAxis, fmtX, fmtY } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const xRange = xScale.max - xScale.min || 1;
  const yRange = yScale.max - yScale.min || 1;

  const gridDots: ScatterGridData['gridDots'] = [];
  const xLabels: ScatterGridData['xLabels'] = [];
  const yLabels: ScatterGridData['yLabels'] = [];

  if (showGrid) {
    for (const yt of yScale.ticks) {
      const py = pad.top + ((yScale.max - yt) / yRange) * plotH;
      for (const xt of xScale.ticks) {
        const px = pad.left + ((xt - xScale.min) / xRange) * plotW;
        gridDots.push({ cx: px, cy: py });
      }
    }
  }

  if (showXAxis) {
    for (const xt of xScale.ticks) {
      const px = pad.left + ((xt - xScale.min) / xRange) * plotW;
      xLabels.push({ x: px, y: pad.top + plotH + 28, text: fmtX(xt) });
    }
  }

  if (showYAxis) {
    for (const yt of yScale.ticks) {
      const py = pad.top + ((yScale.max - yt) / yRange) * plotH;
      yLabels.push({ x: pad.left - 12, y: py + 4, text: fmtY(yt) });
    }
  }

  return { gridDots, xLabels, yLabels };
}

export function shapePath(shape: ScatterShape, cx: number, cy: number, r: number): string {
  switch (shape) {
    case 'square': {
      const s = r * 0.85;
      return `M${cx - s},${cy - s}h${s * 2}v${s * 2}h${-s * 2}Z`;
    }
    case 'diamond': {
      const d = r * 1.1;
      return `M${cx},${cy - d}L${cx + d},${cy}L${cx},${cy + d}L${cx - d},${cy}Z`;
    }
    default:
      return '';
  }
}
