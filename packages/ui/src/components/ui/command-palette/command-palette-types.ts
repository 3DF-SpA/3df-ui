export interface CommandPaletteItem {
  value: string;
  label: string;
  icon?: string;
  keywords?: string[];
  [key: string]: unknown;
}

export interface CommandPaletteGroup {
  label: string;
  icon?: string;
  items: CommandPaletteItem[];
}
