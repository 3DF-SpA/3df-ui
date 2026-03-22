import { onMounted, ref, watch } from 'vue';

export const CONFIG_VERSION = 1;
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
}

export const DEFAULT_CONFIG: Ui3dfConfig = {
  version: CONFIG_VERSION,
  radiusStep: 4,
  borderOpacity: 0.5,
  letterSpacing: 0,
};

// Singleton module-level state
const config = ref<Ui3dfConfig>({ ...DEFAULT_CONFIG });

function isSSR(): boolean {
  return typeof window === 'undefined';
}

function applyCSS(cfg: Ui3dfConfig): void {
  if (isSSR()) return;
  const radius = RADIUS_STEPS[cfg.radiusStep]?.value ?? '1rem';
  document.documentElement.style.setProperty('--ui-radius', radius);
  document.documentElement.style.setProperty('--radius', radius);
  document.documentElement.style.setProperty('--ui-border-opacity', String(cfg.borderOpacity));
  document.documentElement.style.setProperty('--ui-letter-spacing', `${cfg.letterSpacing}em`);
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
watch(config, (cfg) => {
  saveToStorage(cfg);
  applyCSS(cfg);
}, { deep: true });

export function use3dfConfig() {
  onMounted(() => {
    config.value = loadFromStorage();
    applyCSS(config.value);
  });

  function reset(): void {
    config.value = { ...DEFAULT_CONFIG };
  }

  return { config, reset, RADIUS_STEPS, DEFAULT_CONFIG };
}
