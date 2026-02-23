import type { ChartConfig, ChartDataRow } from '../shared/chart-types';
import { getSeriesKeys } from '../shared/chart-utils';

const DEG2RAD = Math.PI / 180;

export interface SliceData {
  key: string;
  label: string;
  value: number;
  color: string;
}

export interface ArcSlice {
  key: string;
  label: string;
  value: number;
  percent: number;
  color: string;
  path: string;
  midAngle: number;
  labelX: number;
  labelY: number;
  gradientId: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = angleDeg * DEG2RAD;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startDeg: number,
  endDeg: number,
): string {
  const sweep = endDeg - startDeg;
  const largeArc = sweep > 180 ? 1 : 0;
  const outerStart = polarToCartesian(cx, cy, outerR, startDeg);
  const outerEnd = polarToCartesian(cx, cy, outerR, endDeg);

  if (innerR <= 0) {
    if (sweep >= 359.99) {
      const mid = polarToCartesian(cx, cy, outerR, startDeg + 180);
      return [
        `M${outerStart.x},${outerStart.y}`,
        `A${outerR},${outerR},0,1,1,${mid.x},${mid.y}`,
        `A${outerR},${outerR},0,1,1,${outerStart.x},${outerStart.y}`,
        'Z',
      ].join(' ');
    }
    return [
      `M${cx},${cy}`,
      `L${outerStart.x},${outerStart.y}`,
      `A${outerR},${outerR},0,${largeArc},1,${outerEnd.x},${outerEnd.y}`,
      'Z',
    ].join(' ');
  }

  const innerStart = polarToCartesian(cx, cy, innerR, endDeg);
  const innerEnd = polarToCartesian(cx, cy, innerR, startDeg);

  if (sweep >= 359.99) {
    const outerMid = polarToCartesian(cx, cy, outerR, startDeg + 180);
    const innerMid = polarToCartesian(cx, cy, innerR, startDeg + 180);
    return [
      `M${outerStart.x},${outerStart.y}`,
      `A${outerR},${outerR},0,1,1,${outerMid.x},${outerMid.y}`,
      `A${outerR},${outerR},0,1,1,${outerStart.x},${outerStart.y}`,
      `Z`,
      `M${innerEnd.x},${innerEnd.y}`,
      `A${innerR},${innerR},0,1,0,${innerMid.x},${innerMid.y}`,
      `A${innerR},${innerR},0,1,0,${innerEnd.x},${innerEnd.y}`,
      `Z`,
    ].join(' ');
  }

  return [
    `M${outerStart.x},${outerStart.y}`,
    `A${outerR},${outerR},0,${largeArc},1,${outerEnd.x},${outerEnd.y}`,
    `L${innerStart.x},${innerStart.y}`,
    `A${innerR},${innerR},0,${largeArc},0,${innerEnd.x},${innerEnd.y}`,
    'Z',
  ].join(' ');
}

export function resolveSlices(
  data: ChartDataRow[],
  index: string,
  config: ChartConfig,
  valueKey?: string,
): SliceData[] {
  const configKeys = getSeriesKeys(config);

  if (valueKey) {
    return data
      .map((row) => {
        const catValue = String(row[index] ?? '');
        const cfg = config[catValue];
        if (!cfg) return null;
        return {
          key: catValue,
          label: cfg.label,
          value: Math.abs(Number(row[valueKey]) || 0),
          color: cfg.color,
        };
      })
      .filter((s): s is SliceData => s !== null);
  }

  if (data.length === 1) {
    const row = data[0]!;
    return configKeys.map((key) => ({
      key,
      label: config[key]!.label,
      value: Math.abs(Number(row[key]) || 0),
      color: config[key]!.color,
    }));
  }

  return configKeys.map((key) => ({
    key,
    label: config[key]!.label,
    value: data.reduce((sum, row) => sum + Math.abs(Number(row[key]) || 0), 0),
    color: config[key]!.color,
  }));
}

export function computeArcs(
  w: number,
  h: number,
  visibleSlices: SliceData[],
  total: number,
  animProgress: number,
  radiusFraction: number,
  innerRadius: number,
  padAngle: number,
  startAngle: number,
): ArcSlice[] {
  const size = Math.min(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const outerR = (size / 2) * radiusFraction;
  const totalVal = total || 1;
  const arcs: ArcSlice[] = [];
  let currentAngle = startAngle;

  for (const slice of visibleSlices) {
    const fraction = slice.value / totalVal;
    const sweepDeg = fraction * 360 * animProgress;
    const actualPad = visibleSlices.length > 1 ? padAngle : 0;
    const startDeg = currentAngle + actualPad / 2;
    const endDeg = currentAngle + sweepDeg - actualPad / 2;

    if (endDeg > startDeg + 0.1) {
      const midAngle = (startDeg + endDeg) / 2;
      const labelR = innerRadius > 0 ? (outerR + innerRadius) / 2 : outerR * 0.65;
      const labelPos = polarToCartesian(cx, cy, labelR, midAngle);

      arcs.push({
        key: slice.key,
        label: slice.label,
        value: slice.value,
        percent: fraction * 100,
        color: slice.color,
        path: arcPath(cx, cy, outerR, innerRadius, startDeg, endDeg),
        midAngle,
        labelX: labelPos.x,
        labelY: labelPos.y,
        gradientId: `pie-grad-${slice.key}`,
      });
    }
    currentAngle += sweepDeg;
  }
  return arcs;
}

export function labelText(
  slice: ArcSlice,
  labelType: 'percent' | 'value' | 'name',
  fmtValue: (v: number) => string,
): string {
  switch (labelType) {
    case 'value':
      return fmtValue(slice.value);
    case 'name':
      return slice.label;
    case 'percent':
    default:
      return `${slice.percent.toFixed(0)}%`;
  }
}
