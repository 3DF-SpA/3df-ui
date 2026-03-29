import { ref, watchEffect, computed } from 'vue';
import { config3df, COLOR_PRESETS } from '@3df-spa/ui';

export type { ColorPreset } from '@3df-spa/ui';
export { COLOR_PRESETS };

// Backward-compat alias
export const INLINE_PRESETS = COLOR_PRESETS;

export type BaseMode = 'light' | 'dark' | '3df';

const STORAGE_MODE = '3df-ui-mode';

function stored<T extends string>(key: string, fallback: T, valid: T[]): T {
  try {
    const v = localStorage.getItem(key) as T | null;
    if (v && valid.includes(v)) return v;
  } catch { /* SSR */ }
  return fallback;
}

const currentMode = ref<BaseMode>(
  stored('3df-ui-mode', 'light', ['light', 'dark', '3df'])
);

// currentPreset now derived from use3dfConfig singleton
const currentPreset = computed(() => config3df.value.colorPreset);

watchEffect(() => {
  const root = document.documentElement;
  root.classList.remove('dark', 'theme-3df');
  if (currentMode.value === 'dark') {
    root.classList.add('dark');
  } else if (currentMode.value === '3df') {
    root.classList.add('theme-3df');
  }
  try {
    localStorage.setItem(STORAGE_MODE, currentMode.value);
  } catch { /* SSR */ }
});

export function useTheme() {
  return {
    currentMode,
    currentPreset,
    presets: INLINE_PRESETS,
    setMode: (mode: BaseMode) => { currentMode.value = mode; },
    setPreset: (id: string) => { config3df.value.colorPreset = id; },
  };
}

