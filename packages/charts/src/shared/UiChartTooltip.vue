<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ChartTooltipData } from './chart-types';
import { formatTooltipValue } from './chart-utils';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    data: ChartTooltipData | null;
    /** Position in pixels relative to chart container */
    x?: number;
    y?: number;
    class?: string;
    /** Custom value formatter */
    formatter?: (value: number, key: string) => string;
  }>(),
  { x: 0, y: 0 },
);

const attrs = useAttrs();

const style = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y}px`,
}));

function formatValue(value: number, key: string): string {
  if (props.formatter) return props.formatter(value, key);
  return formatTooltipValue(value);
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    leave-active-class="transition-all duration-150 ease-in"
    enter-from-class="opacity-0 scale-95 translate-y-1"
    leave-to-class="opacity-0 scale-95 translate-y-1"
  >
    <div
      v-if="data"
      v-bind="attrs"
      :class="[
        'pointer-events-none absolute z-50 min-w-[10rem] origin-top rounded-lg border border-border/50 bg-popover/80 px-3.5 py-2.5 text-sm text-popover-foreground shadow-lg shadow-black/5 backdrop-blur-xl',
        props.class,
      ]"
      :style="style"
      role="tooltip"
    >
      <!-- Label -->
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {{ data.label }}
      </p>

      <!-- Items -->
      <ul class="space-y-1.5">
        <li
          v-for="item in data.items"
          :key="item.key"
          class="flex items-center justify-between gap-6"
        >
          <span class="flex items-center gap-2.5 text-muted-foreground">
            <span
              class="inline-block h-2 w-2 shrink-0 rounded-full ring-2 ring-offset-1 ring-offset-popover"
              :style="{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}40`, '--tw-ring-color': item.color }"
            />
            <span class="text-[13px]">{{ item.label }}</span>
          </span>
          <span class="font-mono text-[13px] font-semibold tabular-nums text-foreground">
            {{ formatValue(item.value, item.key) }}
          </span>
        </li>
      </ul>
    </div>
  </Transition>
</template>
