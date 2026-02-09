<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiLabel', inheritAttrs: false });

interface UiLabelProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiLabelProps>(), {
  disabled: false,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'text-sm font-medium leading-none select-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.disabled && 'cursor-not-allowed opacity-70',
    attrs.class,
  ),
);
</script>

<template>
  <label v-bind="restAttrs" :class="classes">
    <slot />
  </label>
</template>
