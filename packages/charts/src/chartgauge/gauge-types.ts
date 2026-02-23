export type GaugeVariant = 'semicircle' | 'arc' | 'full';

export interface GaugeSegment {
  label?: string;
  max: number;
  color: string;
}
