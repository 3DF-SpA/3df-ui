<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { buttonVariants } from './button-variants';

defineOptions({ name: 'UiButton', inheritAttrs: false });

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface UiButtonProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  as?: string | Component;
  truncate?: boolean;
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  as: 'button',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.truncate && 'truncate', attrs.class),
);
</script>

<template>
  <component :is="as" v-bind="restAttrs" :class="classes">
    <slot />
  </component>
</template>
