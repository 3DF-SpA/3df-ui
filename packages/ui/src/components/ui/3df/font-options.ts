export interface FontOption {
  id: string;
  label: string;
  stack: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'inter',             label: 'Inter',             stack: "'Inter', ui-sans-serif, sans-serif" },
  { id: 'plus-jakarta-sans', label: 'Plus Jakarta Sans', stack: "'Plus Jakarta Sans', ui-sans-serif, sans-serif" },
  { id: 'dm-sans',           label: 'DM Sans',           stack: "'DM Sans', ui-sans-serif, sans-serif" },
  { id: 'outfit',            label: 'Outfit',            stack: "'Outfit', ui-sans-serif, sans-serif" },
  { id: 'geist-sans',  label: 'Geist Sans',  stack: "'Geist', ui-sans-serif, sans-serif" },
  { id: 'geist-mono',  label: 'Geist Mono',  stack: "'Geist Mono', ui-monospace, 'Courier New', monospace" },
  { id: 'geist-pixel', label: 'Geist Pixel', stack: "'Geist Pixel', ui-monospace, monospace" },
];
