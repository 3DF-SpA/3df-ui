<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { use3dfConfig } from './use-3df-config';

defineOptions({ name: 'Ui3dfBorderOpacity', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => { const { class: _cls, ...rest } = attrs; return rest; });

const { config } = use3dfConfig();
const displayPct = computed(() => Math.round(config.value.borderOpacity * 100));
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-3', attrs.class)">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-foreground">Border Opacity</span>
      <span class="text-xs font-semibold text-primary">{{ displayPct }}%</span>
    </div>
    <div class="py-1">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="config.borderOpacity"
        class="w-full cursor-pointer"
        style="accent-color: var(--color-primary)"
        @input="config.borderOpacity = Number(($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="flex items-center gap-2 pt-1">
      <div class="h-7 flex-1 border-ui border-border bg-card transition-colors duration-200" />
      <div class="h-7 flex-1 border-ui border-border bg-muted transition-colors duration-200" />
      <div class="size-7 shrink-0 border-ui border-border bg-background transition-colors duration-200" />
      <div class="flex h-7 w-16 shrink-0 items-center justify-center border-ui border-border bg-card transition-colors duration-200">
        <span class="text-[10px] font-semibold text-foreground">Card</span>
      </div>
    </div>
  </div>
</template>
