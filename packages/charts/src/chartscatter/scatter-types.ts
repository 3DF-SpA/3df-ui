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
