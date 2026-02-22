<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiPaginationLink', inheritAttrs: false });

interface UiPaginationLinkProps {
  isActive?: boolean;
  as?: string | Component;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiPaginationLinkProps>(), {
  isActive: false,
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
    'inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    'cursor-pointer select-none',
    props.isActive
      ? 'bg-accent text-accent-foreground'
      : 'hover:bg-accent hover:text-accent-foreground',
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
    :aria-current="isActive ? 'page' : undefined"
    :disabled="disabled || undefined"
  >
    <slot />
  </component>
</template>
