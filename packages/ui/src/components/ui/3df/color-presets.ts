export interface ColorPreset {
  id: string;
  label: string;
  preview: [string, string, string];
  previewDark: [string, string, string];
  varsLight: Record<string, string>;
  varsDark: Record<string, string>;
}

// CSS vars that may be overridden by presets — must be cleared before applying each preset
export const OVERRIDABLE_PRESET_VARS = ['--primary', '--primary-foreground', '--ring'] as const;

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'default',
    label: 'Default',
    preview: ['#18181b', '#71717a', '#d4d4d8'],
    previewDark: ['#fafafa', '#a1a1aa', '#3f3f46'],
    varsLight: {},
    varsDark: {},
  },
  {
    id: 'blue',
    label: 'Blue',
    preview: ['#1d4ed8', '#3b82f6', '#93c5fd'],
    previewDark: ['#60a5fa', '#3b82f6', '#1e3a8a'],
    varsLight: {
      '--primary': 'hsl(221 83% 53%)',
      '--primary-foreground': 'hsl(0 0% 98%)',
      '--ring': 'hsl(221 83% 53%)',
    },
    varsDark: {
      '--primary': 'hsl(217 91% 60%)',
      '--primary-foreground': 'hsl(222 47% 11%)',
      '--ring': 'hsl(217 91% 60%)',
    },
  },
  {
    id: 'violet',
    label: 'Violet',
    preview: ['#6d28d9', '#8b5cf6', '#c4b5fd'],
    previewDark: ['#a78bfa', '#7c3aed', '#2e1065'],
    varsLight: {
      '--primary': 'hsl(262 83% 58%)',
      '--primary-foreground': 'hsl(0 0% 98%)',
      '--ring': 'hsl(262 83% 58%)',
    },
    varsDark: {
      '--primary': 'hsl(263 70% 65%)',
      '--primary-foreground': 'hsl(263 40% 8%)',
      '--ring': 'hsl(263 70% 65%)',
    },
  },
  {
    id: 'rose',
    label: 'Rose',
    preview: ['#be123c', '#f43f5e', '#fda4af'],
    previewDark: ['#fb7185', '#e11d48', '#4c0519'],
    varsLight: {
      '--primary': 'hsl(347 77% 43%)',
      '--primary-foreground': 'hsl(0 0% 98%)',
      '--ring': 'hsl(347 77% 43%)',
    },
    varsDark: {
      '--primary': 'hsl(347 77% 62%)',
      '--primary-foreground': 'hsl(347 40% 8%)',
      '--ring': 'hsl(347 77% 62%)',
    },
  },
  {
    id: 'orange',
    label: 'Orange',
    preview: ['#c2410c', '#f97316', '#fed7aa'],
    previewDark: ['#fb923c', '#ea580c', '#431407'],
    varsLight: {
      '--primary': 'hsl(25 95% 53%)',
      '--primary-foreground': 'hsl(25 50% 8%)',
      '--ring': 'hsl(25 95% 53%)',
    },
    varsDark: {
      '--primary': 'hsl(21 90% 58%)',
      '--primary-foreground': 'hsl(21 50% 8%)',
      '--ring': 'hsl(21 90% 58%)',
    },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    preview: ['#047857', '#10b981', '#6ee7b7'],
    previewDark: ['#34d399', '#059669', '#022c22'],
    varsLight: {
      '--primary': 'hsl(160 84% 39%)',
      '--primary-foreground': 'hsl(160 50% 6%)',
      '--ring': 'hsl(160 84% 39%)',
    },
    varsDark: {
      '--primary': 'hsl(158 64% 52%)',
      '--primary-foreground': 'hsl(158 50% 6%)',
      '--ring': 'hsl(158 64% 52%)',
    },
  },
  {
    id: 'cyan',
    label: 'Cyan',
    preview: ['#0e7490', '#06b6d4', '#a5f3fc'],
    previewDark: ['#22d3ee', '#0891b2', '#083344'],
    varsLight: {
      '--primary': 'hsl(192 91% 36%)',
      '--primary-foreground': 'hsl(0 0% 98%)',
      '--ring': 'hsl(192 91% 36%)',
    },
    varsDark: {
      '--primary': 'hsl(187 85% 53%)',
      '--primary-foreground': 'hsl(187 50% 7%)',
      '--ring': 'hsl(187 85% 53%)',
    },
  },
  {
    id: 'amber',
    label: 'Amber',
    preview: ['#92400e', '#f59e0b', '#fde68a'],
    previewDark: ['#fcd34d', '#d97706', '#451a03'],
    varsLight: {
      '--primary': 'hsl(38 92% 50%)',
      '--primary-foreground': 'hsl(38 50% 7%)',
      '--ring': 'hsl(38 92% 50%)',
    },
    varsDark: {
      '--primary': 'hsl(43 96% 56%)',
      '--primary-foreground': 'hsl(43 50% 7%)',
      '--ring': 'hsl(43 96% 56%)',
    },
  },
  {
    id: 'fuchsia',
    label: 'Fuchsia',
    preview: ['#a21caf', '#d946ef', '#f5d0fe'],
    previewDark: ['#e879f9', '#c026d3', '#4a044e'],
    varsLight: {
      '--primary': 'hsl(295 72% 40%)',
      '--primary-foreground': 'hsl(0 0% 98%)',
      '--ring': 'hsl(295 72% 40%)',
    },
    varsDark: {
      '--primary': 'hsl(292 84% 61%)',
      '--primary-foreground': 'hsl(292 45% 8%)',
      '--ring': 'hsl(292 84% 61%)',
    },
  },
];
