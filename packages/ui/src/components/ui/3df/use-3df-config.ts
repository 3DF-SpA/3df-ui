import { ref, watch } from 'vue'

export const CONFIG_VERSION = 1
export const RADIUS_STEPS = [0, 0.125, 0.25, 0.375, 0.5, 0.75, 1, 1.5, 2] // rem values (9 steps: None→3XL)
export const RADIUS_LABELS = ['None', 'XS', 'SM', 'MD', 'LG', 'XL', '2XL', '3XL', '3XL+']

export interface Ui3dfConfig {
  version: number
  radiusStep: number      // 0-8 index into RADIUS_STEPS
  borderOpacity: number   // 0-100 (percentage)
  letterSpacing: number   // 0-25 index (-0.10em to +0.15em)
}

export const DEFAULT_CONFIG: Ui3dfConfig = {
  version: CONFIG_VERSION,
  radiusStep: 4,
  borderOpacity: 20,
  letterSpacing: 10,
}

const STORAGE_KEY = '3df:config'

// MODULE-LEVEL singleton refs (shared across all composable instances)
const config = ref<Ui3dfConfig>({ ...DEFAULT_CONFIG })
let initialized = false

function applyConfig(cfg: Ui3dfConfig) {
  if (typeof window === 'undefined') return
  const radiusRem = RADIUS_STEPS[cfg.radiusStep] ?? 0.5
  document.documentElement.style.setProperty('--ui-radius', `${radiusRem}rem`)
  document.documentElement.style.setProperty('--ui-radius-field', `${Math.max(0, radiusRem - 0.125)}rem`)
  document.documentElement.style.setProperty('--ui-border-opacity', `${cfg.borderOpacity / 100}`)
  const lsIndex = cfg.letterSpacing ?? 10
  const lsValue = -0.10 + lsIndex * 0.01
  document.documentElement.style.setProperty('--ui-letter-spacing', `${lsValue.toFixed(2)}em`)
}

function saveToStorage(cfg: Ui3dfConfig) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
  } catch {}
}

function loadFromStorage(): Ui3dfConfig {
  if (typeof window === 'undefined') return { ...DEFAULT_CONFIG }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_CONFIG }
    const parsed = JSON.parse(raw) as Partial<Ui3dfConfig>
    if (parsed.version !== CONFIG_VERSION) return { ...DEFAULT_CONFIG }
    return { ...DEFAULT_CONFIG, ...parsed }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

// Module-level watcher — runs once across all instances
watch(config, (cfg) => {
  applyConfig(cfg)
  saveToStorage(cfg)
}, { deep: true })

export function use3dfConfig() {
  if (!initialized) {
    initialized = true
    const saved = loadFromStorage()
    config.value = saved
    applyConfig(saved)
  }

  function reset() {
    config.value = { ...DEFAULT_CONFIG }
  }

  return { config, reset, DEFAULT_CONFIG, RADIUS_STEPS, RADIUS_LABELS }
}
