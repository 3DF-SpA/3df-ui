export type GaugeVariant = 'semicircle' | 'arc' | 'full';

export interface GaugeSegment {
  label?: string;
  max: number;
  color: string;
}

export interface AngleConfig {
  startAngle: number;
  sweepAngle: number;
  viewBoxH: number;
}

export interface ComputedSegment {
  path: string;
  color: string;
  label?: string;
  labelX: number;
  labelY: number;
}

export interface NeedleData {
  path: string;
  tipX: number;
  tipY: number;
  angle: number;
}

export function getAngleConfig(variant: GaugeVariant): AngleConfig {
  switch (variant) {
    case 'full':
      return { startAngle: (3 * Math.PI) / 4, sweepAngle: 2 * Math.PI, viewBoxH: 1.08 };
    case 'arc':
      return { startAngle: (-3 * Math.PI) / 4, sweepAngle: (3 * Math.PI) / 2, viewBoxH: 0.88 };
    case 'semicircle':
    default:
      return { startAngle: Math.PI, sweepAngle: Math.PI, viewBoxH: 0.62 };
  }
}

export function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  let sweep = endAngle - startAngle;
  while (sweep < 0) sweep += 2 * Math.PI;
  if (sweep > 2 * Math.PI) sweep = 2 * Math.PI;

  if (sweep < 0.001) return '';

  if (sweep >= 2 * Math.PI - 0.01) {
    const midAngle = startAngle + Math.PI;
    const s = polarToCartesian(cx, cy, r, startAngle);
    const m = polarToCartesian(cx, cy, r, midAngle);
    const eAngle = startAngle + sweep - 0.001;
    const e = polarToCartesian(cx, cy, r, eAngle);
    return [
      `M${s.x},${s.y}`,
      `A${r},${r} 0 1 1 ${m.x},${m.y}`,
      `A${r},${r} 0 1 1 ${e.x},${e.y}`,
    ].join('');
  }

  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = sweep > Math.PI ? 1 : 0;
  return `M${start.x},${start.y}A${r},${r} 0 ${largeArc} 1 ${end.x},${end.y}`;
}

interface SegmentParams {
  min: number;
  max: number;
  segments?: GaugeSegment[];
  color: string;
  progress: number;
  strokeWidth: number;
  angleConfig: AngleConfig;
}

export function computeSegments(
  cx: number,
  cy: number,
  r: number,
  params: SegmentParams,
): ComputedSegment[] {
  const { startAngle, sweepAngle } = params.angleConfig;
  const range = params.max - params.min || 1;

  if (!params.segments || params.segments.length === 0) {
    if (params.progress <= 0) return [];
    const endAngle = startAngle + sweepAngle * params.progress;
    return [
      {
        path: describeArc(cx, cy, r, startAngle, endAngle),
        color: params.color,
        labelX: cx,
        labelY: cy,
      },
    ];
  }

  const result: ComputedSegment[] = [];
  let prevMax = params.min;

  for (const seg of params.segments) {
    const segStart = (prevMax - params.min) / range;
    const segEnd = (seg.max - params.min) / range;
    const sa = startAngle + sweepAngle * segStart;
    const ea = startAngle + sweepAngle * segEnd;

    const midAngle = (sa + ea) / 2;
    const labelPt = polarToCartesian(cx, cy, r + params.strokeWidth + 12, midAngle);

    result.push({
      path: describeArc(cx, cy, r, sa, ea),
      color: seg.color,
      label: seg.label,
      labelX: labelPt.x,
      labelY: labelPt.y,
    });

    prevMax = seg.max;
  }

  return result;
}

interface NeedleParams {
  progress: number;
  strokeWidth: number;
  angleConfig: AngleConfig;
}

export function computeNeedle(cx: number, cy: number, r: number, params: NeedleParams): NeedleData {
  const { startAngle, sweepAngle } = params.angleConfig;
  const angle = startAngle + sweepAngle * params.progress;
  const tipLen = r - params.strokeWidth / 2 - 4;
  const tip = polarToCartesian(cx, cy, tipLen, angle);
  const baseLen = 6;
  const baseL = polarToCartesian(cx, cy, baseLen, angle - Math.PI / 2);
  const baseR = polarToCartesian(cx, cy, baseLen, angle + Math.PI / 2);

  return {
    path: `M${baseL.x},${baseL.y}L${tip.x},${tip.y}L${baseR.x},${baseR.y}Z`,
    tipX: tip.x,
    tipY: tip.y,
    angle,
  };
}
