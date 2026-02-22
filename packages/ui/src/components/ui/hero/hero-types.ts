export interface HeroAction {
  label: string;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export type HeroAlign = 'left' | 'center' | 'right';
