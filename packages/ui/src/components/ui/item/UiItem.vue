<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { type ItemVariants, itemVariants } from './item-variants';

defineOptions({ name: 'UiItem', inheritAttrs: false });

interface UiItemProps {
  as?: string | Component;
  variant?: NonNullable<ItemVariants['variant']>;
  size?: NonNullable<ItemVariants['size']>;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiItemProps>(), {
  as: 'div',
  variant: 'default',
  size: 'default',
  disabled: false,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    itemVariants({ variant: props.variant, size: props.size }),
    props.as === 'button' || props.as === 'a' ? 'cursor-pointer' : '',
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
    :disabled="disabled && as === 'button' ? true : undefined"
    :aria-disabled="disabled || undefined"
  >
    <span v-if="$slots.start" class="flex shrink-0 items-center">
      <slot name="start" />
    </span>

    <span class="flex min-w-0 flex-1 flex-col">
      <slot />
    </span>

    <span v-if="$slots.end" class="flex shrink-0 items-center">
      <slot name="end" />
    </span>
  </component>
</template>
