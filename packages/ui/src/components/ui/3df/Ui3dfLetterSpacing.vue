<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { use3dfConfig } from './use-3df-config';

defineOptions({ name: 'Ui3dfLetterSpacing', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => { const { class: _cls, ...rest } = attrs; return rest; });

const { config } = use3dfConfig();
const displayLabel = computed(() => {
  const v = config.value.letterSpacing;
  if (v === 0) return 'Normal';
  return `${v > 0 ? '+' : ''}${v.toFixed(3)}em`;
});
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-3', attrs.class)">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-foreground">Letter Spacing</span>
      <span class="text-xs font-semibold text-primary">{{ displayLabel }}</span>
    </div>
    <div class="py-1">
      <input
        type="range"
        min="-0.1"
        max="0.15"
        step="0.005"
        :value="config.letterSpacing"
        class="w-full cursor-pointer"
        style="accent-color: var(--color-primary)"
        @input="config.letterSpacing = Number(($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="flex flex-col gap-1 pt-1">
      <p class="text-xs text-muted-foreground truncate">The quick brown fox</p>
      <p class="text-sm font-medium text-foreground truncate">The quick brown fox</p>
      <p class="text-base font-semibold text-foreground truncate">The quick brown fox</p>
    </div>
  </div>
</template>
