<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiProgress', inheritAttrs: false });

interface UiProgressProps {
  modelValue?: number | undefined;
  max?: number;
}

const props = withDefaults(defineProps<UiProgressProps>(), {
  modelValue: undefined,
  max: 100,
});

const attrs = useAttrs() as Record<string, unknown> & {
  class?: ClassValue;
  indicatorClass?: ClassValue;
};

const restAttrs = computed(() => {
  const { class: _cls, indicatorClass: _ind, ...rest } = attrs;
  return rest;
});

const percentage = computed(() => {
  if (props.modelValue == null) return undefined;
  const clamped = Math.max(0, Math.min(props.max, props.modelValue));
  return (clamped / props.max) * 100;
});

const isIndeterminate = computed(() => props.modelValue == null);

const rootClasses = computed(() =>
  cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', attrs.class),
);

const indicatorClasses = computed(() =>
  cn(
    'h-full w-full flex-1 rounded-full bg-primary transition-transform duration-400 ease-in-out',
    isIndeterminate.value && 'animate-progress-indeterminate origin-left',
    attrs.indicatorClass,
  ),
);

const indicatorStyle = computed(() => {
  if (isIndeterminate.value) return {};
  return { transform: `translateX(-${100 - (percentage.value ?? 0)}%)` };
});
</script>

<template>
  <div
    v-bind="restAttrs"
    role="progressbar"
    :aria-valuemax="max"
    :aria-valuemin="0"
    :aria-valuenow="modelValue ?? undefined"
    :data-state="isIndeterminate ? 'indeterminate' : 'determinate'"
    :data-value="modelValue ?? undefined"
    :data-max="max"
    :class="rootClasses"
  >
    <div :class="indicatorClasses" :style="indicatorStyle" data-state="indicator" />
  </div>
</template>

<style scoped>
@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
</style>
