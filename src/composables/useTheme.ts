import { ref, watchEffect } from 'vue';

export type ThemeId =
  | 'default'
  | 'dark'
  | 'light-3df'
  | 'dark-3df'
  | 'light-coffee'
  | 'dark-coffee'
  | 'light-ocean'
  | 'dark-ocean'
  | 'light-aurora'
  | 'dark-aurora'
  | 'light-ember'
  | 'dark-ember'
  | 'light-sakura'
  | 'dark-sakura';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  family: string;
  mode: 'light' | 'dark';
  preview: { bg: string; primary: string; accent: string };
}

export const THEMES: ThemeDefinition[] = [
  { id: 'default', label: 'Default', family: 'Neutral', mode: 'light', preview: { bg: '#fafafa', primary: '#000000', accent: '#f4f4f5' } },
  { id: 'dark', label: 'Dark', family: 'Neutral', mode: 'dark', preview: { bg: '#050505', primary: '#ffffff', accent: '#27272a' } },
  { id: 'light-3df', label: '3DF Light', family: '3DF', mode: 'light', preview: { bg: '#f8faf8', primary: '#d4a017', accent: '#2dd4bf' } },
  { id: 'dark-3df', label: '3DF Dark', family: '3DF', mode: 'dark', preview: { bg: '#040d08', primary: '#ffc700', accent: '#00e5ff' } },
  { id: 'light-coffee', label: 'Coffee Light', family: 'Coffee', mode: 'light', preview: { bg: '#faf8f5', primary: '#8b5e3c', accent: '#c8a97e' } },
  { id: 'dark-coffee', label: 'Coffee Dark', family: 'Coffee', mode: 'dark', preview: { bg: '#100c08', primary: '#d4845a', accent: '#6b4226' } },
  { id: 'light-ocean', label: 'Ocean Light', family: 'Ocean', mode: 'light', preview: { bg: '#f0f9ff', primary: '#2563eb', accent: '#0891b2' } },
  { id: 'dark-ocean', label: 'Ocean Dark', family: 'Ocean', mode: 'dark', preview: { bg: '#03060d', primary: '#3b82f6', accent: '#06c2d4' } },
  { id: 'light-aurora', label: 'Aurora Light', family: 'Aurora', mode: 'light', preview: { bg: '#faf5ff', primary: '#7c3aed', accent: '#db2777' } },
  { id: 'dark-aurora', label: 'Aurora Dark', family: 'Aurora', mode: 'dark', preview: { bg: '#06030d', primary: '#a855f7', accent: '#e879b0' } },
  { id: 'light-ember', label: 'Ember Light', family: 'Ember', mode: 'light', preview: { bg: '#fff7f5', primary: '#ea4d0c', accent: '#f59e0b' } },
  { id: 'dark-ember', label: 'Ember Dark', family: 'Ember', mode: 'dark', preview: { bg: '#0a0402', primary: '#f4622a', accent: '#fbbf24' } },
  { id: 'light-sakura', label: 'Sakura Light', family: 'Sakura', mode: 'light', preview: { bg: '#fff5f8', primary: '#e11d71', accent: '#f43f5e' } },
  { id: 'dark-sakura', label: 'Sakura Dark', family: 'Sakura', mode: 'dark', preview: { bg: '#0a0206', primary: '#f472b6', accent: '#fb7185' } },
];

const ALL_THEME_IDS: ThemeId[] = THEMES.map((t) => t.id);

const STORAGE_KEY = '3df-ui-theme';

function getStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && ALL_THEME_IDS.includes(stored)) return stored;
  } catch {
    // SSR / blocked storage
  }
  return 'default';
}

const currentTheme = ref<ThemeId>(getStoredTheme());

watchEffect(() => {
  const root = document.documentElement;
  ALL_THEME_IDS.forEach((id) => {
    if (id !== 'default') root.classList.remove(id);
  });
  if (currentTheme.value !== 'default') {
    root.classList.add(currentTheme.value);
  }
  try {
    localStorage.setItem(STORAGE_KEY, currentTheme.value);
  } catch {
    // blocked storage
  }
});

export function useTheme() {
  return {
    currentTheme,
    themes: THEMES,
    setTheme: (id: ThemeId) => { currentTheme.value = id; },
  };
}
