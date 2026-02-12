/** Shared types for Hero section components */

export interface HeroAction {
  /** Button label */
  label: string;
  /** Link href or click handler identifier */
  href?: string;
  /** Open in new tab */
  external?: boolean;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export type HeroAlign = 'left' | 'center' | 'right';
