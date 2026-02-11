<script setup lang="ts">
import { inject, computed, useAttrs } from 'vue';
import type { ChartContext } from './chart-types';
import { CHART_KEY } from './chart-types';
import { getSeriesKeys } from './chart-utils';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    /** Layout direction */
    direction?: 'horizontal' | 'vertical';
    /** Set of hidden series keys (for interactive toggle) */
    hiddenKeys?: Set<string>;
  }>(),
  { direction: 'horizontal' },
);

const emit = defineEmits<{
  /** Emitted when a legend item is clicked */
  toggle: [key: string];
}>();

const attrs = useAttrs();

const ctx = inject<ChartContext>(CHART_KEY);

const isInteractive = computed(() => !!props.hiddenKeys);

const entries = computed(() => {
  if (!ctx) return [];
  const keys = getSeriesKeys(ctx.config.value);
  return keys.map((key) => ({
    key,
    label: ctx.config.value[key]!.label,
    color: ctx.resolvedColors.value[key] ?? ctx.config.value[key]!.color,
    hidden: props.hiddenKeys?.has(key) ?? false,
  }));
});

function onClick(key: string) {
  if (isInteractive.value) {
    emit('toggle', key);
  }
}
</script>

<template>
  <div
    v-bind="attrs"
    :class="[
      'flex flex-wrap items-center gap-1.5 text-sm',
      direction === 'vertical' && 'flex-col items-start',
      props.class,
    ]"
    role="list"
    aria-label="Chart legend"
  >
    <button
      v-for="entry in entries"
      :key="entry.key"
      role="listitem"
      type="button"
      :class="[
        'flex items-center gap-2 rounded-full px-3 py-1 transition-all duration-200',
        isInteractive
          ? 'cursor-pointer hover:bg-accent active:scale-95'
          : 'cursor-default',
        entry.hidden
          ? 'opacity-40'
          : 'opacity-100',
      ]"
      :aria-pressed="isInteractive ? !entry.hidden : undefined"
      @click="onClick(entry.key)"
    >
      <span
        class="inline-block h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-200"
        :style="{
          backgroundColor: entry.hidden ? 'transparent' : entry.color,
          border: entry.hidden ? `2px solid ${entry.color}` : 'none',
          boxShadow: entry.hidden ? 'none' : `0 0 6px ${entry.color}50`,
        }"
        aria-hidden="true"
      />
      <span
        :class="[
          'text-[13px] font-medium transition-colors duration-200',
          entry.hidden ? 'text-muted-foreground line-through' : 'text-foreground',
        ]"
      >
        {{ entry.label }}
      </span>
    </button>
  </div>
</template>
