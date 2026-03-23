import { onMounted, ref, watch } from 'vue';
import { COLOR_PRESETS, OVERRIDABLE_PRESET_VARS } from './color-presets';
import { FONT_OPTIONS } from './font-options';

export const CONFIG_VERSION = 3;
const STORAGE_KEY = '3df:config';

export const RADIUS_STEPS = [
  { label: 'None', value: '0px' },
  { label: 'XS', value: '0.25rem' },
  { label: 'SM', value: '0.5rem' },
  { label: 'MD', value: '0.75rem' },
  { label: 'LG', value: '1rem' },
  { label: 'XL', value: '1.5rem' },
  { label: '2XL', value: '2rem' },
  { label: '3XL', value: '3rem' },
] as const;

export interface Ui3dfConfig {
  version: number;
  radiusStep: number;
  borderOpacity: number;
  letterSpacing: number;
  colorPreset: string;
  fontId: string;
}

export const DEFAULT_CONFIG: Ui3dfConfig = {
  version: CONFIG_VERSION,
  radiusStep: 4,
  borderOpacity: 0.5,
  letterSpacing: 0,
  colorPreset: 'default',
  fontId: 'inter',
};

// Singleton module-level state
export const config3df = ref<Ui3dfConfig>({ ...DEFAULT_CONFIG });

function isSSR(): boolean {
  return typeof window === 'undefined';
}

export function applyColorVars(presetId: string, isDark: boolean): void {
  if (isSSR()) return;
  const root = document.documentElement;
  const preset = COLOR_PRESETS.find(p => p.id === presetId) ?? COLOR_PRESETS[0]!;
  const vars = isDark ? preset.varsDark : preset.varsLight;
  OVERRIDABLE_PRESET_VARS.forEach(v => root.style.removeProperty(v));
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function applyFontVar(fontId: string): void {
  if (isSSR()) return;
  const font = FONT_OPTIONS.find(f => f.id === fontId) ?? FONT_OPTIONS[0]!;
  document.documentElement.style.setProperty('--font-sans', font.stack);
}

function applyCSS(cfg: Ui3dfConfig): void {
  if (isSSR()) return;
  const radius = RADIUS_STEPS[cfg.radiusStep]?.value ?? '1rem';
  document.documentElement.style.setProperty('--ui-radius', radius);
  document.documentElement.style.setProperty('--radius', radius);
  document.documentElement.style.setProperty('--ui-border-opacity', String(cfg.borderOpacity));
  document.documentElement.style.setProperty('--ui-letter-spacing', `${cfg.letterSpacing}em`);
  applyColorVars(cfg.colorPreset, document.documentElement.classList.contains('dark'));
  applyFontVar(cfg.fontId);
}

function loadFromStorage(): Ui3dfConfig {
  if (isSSR()) return { ...DEFAULT_CONFIG };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CONFIG };
    const parsed = JSON.parse(raw) as Partial<Ui3dfConfig>;
    if (parsed.version !== CONFIG_VERSION) return { ...DEFAULT_CONFIG };
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function saveToStorage(cfg: Ui3dfConfig): void {
  if (isSSR()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch { /* storage unavailable */ }
}

// Watch at module level: save + apply on any change
watch(config3df, (cfg) => {
  saveToStorage(cfg);
  applyCSS(cfg);
}, { deep: true });

// Re-apply color vars when dark mode class changes (e.g., from useTheme toggling .dark)
if (typeof window !== 'undefined') {
  const darkObserver = new MutationObserver(() => {
    applyColorVars(config3df.value.colorPreset, document.documentElement.classList.contains('dark'));
  });
  darkObserver.observe(document.documentElement, { attributeFilter: ['class'] });
}

export function use3dfConfig() {
  onMounted(() => {
    config3df.value = loadFromStorage();
    applyCSS(config3df.value);
  });

  function reset(): void {
    config3df.value = { ...DEFAULT_CONFIG };
  }

  return { config: config3df, reset, RADIUS_STEPS, DEFAULT_CONFIG };
}
