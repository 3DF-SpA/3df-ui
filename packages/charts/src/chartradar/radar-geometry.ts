import type { ChartConfig, ChartDataRow } from '../shared/chart-types';

export type RadarVariant = 'polygon' | 'circle';

export interface RadarSeriesData {
  key: string;
  color: string;
  path: string;
  points: Array<{ x: number; y: number; value: number; dataIndex: number }>;
}

export interface RadarAxisLabel {
  x: number;
  y: number;
  text: string;
  anchor: string;
  dy: string;
}

export interface RadarGridData {
  levelPaths: string[];
  axisPaths: string[];
}

export interface RadarParams {
  data: ChartDataRow[];
  config: ChartConfig;
  categories: string[];
  visibleSeriesKeys: string[];
  maxValue: number;
  animProgress: number;
  levels: number;
  variant: RadarVariant;
}

export function polarToCartesian(cx: number, cy: number, radius: number, angleRad: number) {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

export function angleFor(index: number, total: number): number {
  return ((2 * Math.PI) / total) * index - Math.PI / 2;
}

export function computeGrid(cx: number, cy: number, radius: number, p: RadarParams): RadarGridData {
  const n = p.categories.length;
  if (n < 3) return { levelPaths: [], axisPaths: [] };

  const levelPaths: string[] = [];
  const axisPaths: string[] = [];

  for (let lvl = 1; lvl <= p.levels; lvl++) {
    const r = (radius / p.levels) * lvl;

    if (p.variant === 'circle') {
      levelPaths.push(
        `M${cx - r},${cy}A${r},${r} 0 1,1 ${cx + r},${cy}A${r},${r} 0 1,1 ${cx - r},${cy}Z`,
      );
    } else {
      let path = '';
      for (let i = 0; i < n; i++) {
        const a = angleFor(i, n);
        const pt = polarToCartesian(cx, cy, r, a);
        path += i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`;
      }
      path += 'Z';
      levelPaths.push(path);
    }
  }

  for (let i = 0; i < n; i++) {
    const a = angleFor(i, n);
    const pt = polarToCartesian(cx, cy, radius, a);
    axisPaths.push(`M${cx},${cy}L${pt.x},${pt.y}`);
  }

  return { levelPaths, axisPaths };
}

export function computeSeries(
  cx: number,
  cy: number,
  radius: number,
  p: RadarParams,
): RadarSeriesData[] {
  const n = p.categories.length;
  if (n < 3) return [];
  const max = p.maxValue;

  return p.visibleSeriesKeys.map((key) => {
    const points: RadarSeriesData['points'] = [];
    let path = '';

    for (let i = 0; i < n; i++) {
      const row = p.data[i]!;
      const v = Number(row[key]) || 0;
      const ratio = (v / max) * p.animProgress;
      const a = angleFor(i, n);
      const pt = polarToCartesian(cx, cy, radius * ratio, a);
      points.push({ x: pt.x, y: pt.y, value: v, dataIndex: i });
      path += i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`;
    }
    path += 'Z';

    return { key, color: p.config[key]!.color, path, points };
  });
}

export function computeAxisLabels(
  cx: number,
  cy: number,
  radius: number,
  categories: string[],
): RadarAxisLabel[] {
  const n = categories.length;
  if (n < 3) return [];

  const labelRadius = radius + 18;

  return categories.map((cat, i) => {
    const a = angleFor(i, n);
    const pt = polarToCartesian(cx, cy, labelRadius, a);

    const deg = ((a * 180) / Math.PI + 360) % 360;
    let anchor = 'middle';
    if (deg > 20 && deg < 160) anchor = 'start';
    else if (deg > 200 && deg < 340) anchor = 'end';

    let dy = '0.35em';
    if (deg > 250 && deg < 290) dy = '0em';
    if (deg > 70 && deg < 110) dy = '0.8em';

    return { x: pt.x, y: pt.y, text: cat, anchor, dy };
  });
}
