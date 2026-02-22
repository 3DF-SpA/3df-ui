<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiPaginationPrevious', inheritAttrs: false });

interface UiPaginationPreviousProps {
  as?: string | Component;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiPaginationPreviousProps>(), {
  as: 'button',
  disabled: false,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'inline-flex h-8 items-center justify-center gap-1 rounded-md px-2 text-xs font-medium',
    'transition-colors duration-200',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    'cursor-pointer select-none',
    props.disabled && 'pointer-events-none opacity-50',
    attrs.class,
  ),
);
</script>

<template>
  <component
    :is="as"
    v-bind="restAttrs"
    :class="classes"
    :aria-label="$attrs['aria-label'] ?? 'Go to previous page'"
    :disabled="disabled || undefined"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    <slot>
      <span>Anterior</span>
    </slot>
  </component>
</template>
