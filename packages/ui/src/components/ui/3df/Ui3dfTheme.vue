<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { use3dfConfig } from './use-3df-config';
import type { Theme } from './use-3df-config';

defineOptions({ name: 'Ui3dfTheme', inheritAttrs: false });

interface ThemeOption {
  value: Theme;
  label: string;
  icon: 'sun' | 'moon' | 'monitor';
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
];

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => { const { class: _cls, ...rest } = attrs; return rest; });

const { config } = use3dfConfig();

function select(value: Theme): void {
  config.value.theme = value;
}
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-2', attrs.class)">
    <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Theme</span>
    <div class="grid grid-cols-3 gap-1.5">
      <button
        v-for="opt in THEME_OPTIONS"
        :key="opt.value"
        type="button"
        :aria-label="opt.label"
        :aria-pressed="config.theme === opt.value"
        :class="cn(
          'flex flex-col items-center gap-1.5 rounded-md border-ui px-2 py-2.5 text-[10px] font-medium transition-colors cursor-pointer',
          config.theme === opt.value
            ? 'border-primary bg-primary/5 text-foreground'
            : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground'
        )"
        @click="select(opt.value)"
      >
        <!-- Sun icon -->
        <svg v-if="opt.icon === 'sun'" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
        <!-- Moon icon -->
        <svg v-else-if="opt.icon === 'moon'" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <!-- Monitor icon -->
        <svg v-else class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
