<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { use3dfConfig, RADIUS_STEPS } from './use-3df-config';

defineOptions({ name: 'Ui3dfRadius', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => { const { class: _cls, ...rest } = attrs; return rest; });

const { config } = use3dfConfig();
const activeLabel = computed(() => RADIUS_STEPS[config.value.radiusStep]?.label ?? 'LG');
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-3', attrs.class)">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-foreground">Radius</span>
      <span class="text-xs font-semibold text-primary">{{ activeLabel }}</span>
    </div>
    <div class="py-1">
      <input
        type="range"
        min="0"
        max="7"
        step="1"
        :value="config.radiusStep"
        class="w-full cursor-pointer"
        style="accent-color: var(--color-primary)"
        @input="config.radiusStep = Number(($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="flex items-center gap-2 pt-1">
      <div class="h-7 flex-1 border-ui border-border bg-primary/15 transition-[border-radius] duration-200" :style="{ borderRadius: 'var(--ui-radius)' }" />
      <div class="h-7 flex-1 border-ui border-border bg-primary/10 transition-[border-radius] duration-200" :style="{ borderRadius: 'var(--ui-radius)' }" />
      <div class="size-7 shrink-0 border-ui border-border bg-primary/20 transition-[border-radius] duration-200" :style="{ borderRadius: 'var(--ui-radius)' }" />
      <div class="flex h-7 w-16 shrink-0 items-center justify-center bg-primary transition-[border-radius] duration-200" :style="{ borderRadius: 'var(--ui-radius)' }">
        <span class="text-[10px] font-semibold text-primary-foreground">Btn</span>
      </div>
    </div>
  </div>
</template>
