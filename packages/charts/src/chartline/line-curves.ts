import type { NiceScale } from '../shared/chart-types';
import type {
  CurveType,
  LineParams,
  Padding,
  Pt,
  SeriesData,
  SeriesPointData,
  StackedPoint,
} from './line-geometry';

function monotonePath(pts: Pt[]): string {
  if (pts.length < 2) return pts.length === 1 ? `M${pts[0]!.x},${pts[0]!.y}` : '';
  if (pts.length === 2) return `M${pts[0]!.x},${pts[0]!.y}L${pts[1]!.x},${pts[1]!.y}`;

  const n = pts.length;
  const slopes: number[] = [];

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      slopes.push((pts[1]!.y - pts[0]!.y) / (pts[1]!.x - pts[0]!.x));
    } else if (i === n - 1) {
      slopes.push((pts[n - 1]!.y - pts[n - 2]!.y) / (pts[n - 1]!.x - pts[n - 2]!.x));
    } else {
      const s1 = (pts[i]!.y - pts[i - 1]!.y) / (pts[i]!.x - pts[i - 1]!.x);
      const s2 = (pts[i + 1]!.y - pts[i]!.y) / (pts[i + 1]!.x - pts[i]!.x);
      slopes.push(s1 * s2 <= 0 ? 0 : (s1 + s2) / 2);
    }
  }

  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i]!;
    const p1 = pts[i + 1]!;
    const dx = (p1.x - p0.x) / 3;
    d += `C${p0.x + dx},${p0.y + slopes[i]! * dx},${p1.x - dx},${p1.y - slopes[i + 1]! * dx},${p1.x},${p1.y}`;
  }
  return d;
}

function linearPath(pts: Pt[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) d += `L${pts[i]!.x},${pts[i]!.y}`;
  return d;
}

function stepPath(pts: Pt[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 1; i < pts.length; i++) {
    const midX = (pts[i - 1]!.x + pts[i]!.x) / 2;
    d += `H${midX}V${pts[i]!.y}H${pts[i]!.x}`;
  }
  return d;
}

export function buildCurve(pts: Pt[], curveType: CurveType): string {
  switch (curveType) {
    case 'linear':
      return linearPath(pts);
    case 'step':
      return stepPath(pts);
    default:
      return monotonePath(pts);
  }
}

function xPos(w: number, di: number, count: number, pad: Padding): number {
  const plotW = w - pad.left - pad.right;
  return count === 1 ? pad.left + plotW / 2 : pad.left + (di / (count - 1)) * plotW;
}

function yPos(
  h: number,
  value: number,
  scale: NiceScale,
  pad: Padding,
  animProgress: number,
): number {
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale;
  const range = sMax - sMin || 1;
  const targetY = pad.top + ((sMax - value) / range) * plotH;
  const baseY = pad.top + (sMax / range) * plotH;
  return baseY + (targetY - baseY) * animProgress;
}

export function computeSeriesData(
  w: number,
  h: number,
  stacked: Record<string, StackedPoint[]>,
  p: LineParams,
): SeriesData[] {
  const {
    visibleSeriesKeys: keys,
    scale,
    padding: pad,
    animProgress,
    config,
    curveType,
    showArea,
    mode,
  } = p;
  const isStacked = mode !== 'none';
  const count = p.data.length;

  return keys.map((key) => {
    const stackPts = stacked[key] ?? [];
    const topPts: Pt[] = [];
    const bottomPts: Pt[] = [];
    const points: SeriesPointData[] = [];

    for (const sp of stackPts) {
      const x = xPos(w, sp.dataIndex, count, pad);
      const yTop = yPos(h, sp.y1, scale, pad, animProgress);
      const yBottom = yPos(h, sp.y0, scale, pad, animProgress);
      topPts.push({ x, y: yTop });
      bottomPts.push({ x, y: yBottom });
      points.push({ x, yTop, yBottom, value: sp.rawValue, dataIndex: sp.dataIndex });
    }

    const linePath = buildCurve(topPts, curveType);

    let areaPath = '';
    if (showArea && topPts.length >= 2) {
      if (isStacked) {
        const bottomReversed = [...bottomPts].reverse();
        const bottomLine = buildCurve(bottomReversed, curveType);
        const lastTop = topPts[topPts.length - 1]!;
        const firstBottom = bottomReversed[0]!;
        areaPath = `${linePath}L${lastTop.x},${firstBottom.y}${bottomLine.replace('M', 'L')}Z`;
      } else {
        const plotH = h - pad.top - pad.bottom;
        const { min: sMin, max: sMax } = scale;
        const range = sMax - sMin || 1;
        const baseY = pad.top + (sMax / range) * plotH;
        const last = topPts[topPts.length - 1]!;
        const first = topPts[0]!;
        areaPath = `${linePath}L${last.x},${baseY}L${first.x},${baseY}Z`;
      }
    }

    return {
      key,
      points,
      linePath,
      areaPath,
      color: config[key]!.color,
      gradientId: `line-area-${key}`,
    };
  });
}
