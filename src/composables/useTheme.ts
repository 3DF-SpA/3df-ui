import { ref, watchEffect } from 'vue';

export interface InlinePreset {
  id: string;
  label: string;
  preview: [string, string, string];
  previewDark: [string, string, string];
  vars?: Record<string, string>;
}

export const INLINE_PRESETS: InlinePreset[] = [
  {
    id: 'default',
    label: 'Default',
    preview: ['#18181b', '#71717a', '#d4d4d8'],
    previewDark: ['#fafafa', '#a1a1aa', '#3f3f46'],
  },
];

export type BaseMode = 'light' | 'dark';

const STORAGE_MODE = '3df-ui-mode';
const STORAGE_PRESET = '3df-ui-preset';

function stored<T extends string>(key: string, fallback: T, valid: T[]): T {
  try {
    const v = localStorage.getItem(key) as T | null;
    if (v && valid.includes(v)) return v;
  } catch { /* SSR */ }
  return fallback;
}

const currentMode = ref<BaseMode>(
  stored('3df-ui-mode', 'light', ['light', 'dark'])
);
const currentPreset = ref<string>(
  stored('3df-ui-preset', 'default', INLINE_PRESETS.map(p => p.id))
);

const overridableVars = [
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--accent',
  '--accent-foreground',
  '--muted',
  '--ring',
];

watchEffect(() => {
  const root = document.documentElement;

  // Toggle dark class
  if (currentMode.value === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Clear all possible overrides
  overridableVars.forEach(v => root.style.removeProperty(v));

  // Apply preset vars
  const preset = INLINE_PRESETS.find(p => p.id === currentPreset.value);
  if (preset?.vars) {
    Object.entries(preset.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }

  // Persist
  try {
    localStorage.setItem(STORAGE_MODE, currentMode.value);
    localStorage.setItem(STORAGE_PRESET, currentPreset.value);
  } catch { /* SSR */ }
});

export function useTheme() {
  return {
    currentMode,
    currentPreset,
    presets: INLINE_PRESETS,
    setMode: (mode: BaseMode) => { currentMode.value = mode; },
    setPreset: (id: string) => { currentPreset.value = id; },
  };
}

export const THEMES = INLINE_PRESETS;
export type ThemeId = string;
