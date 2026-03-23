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
];
