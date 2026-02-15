<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCard', inheritAttrs: false });

interface UiCardProps {
  as?: string | Component;
  variant?: 'default';
}

const props = withDefaults(defineProps<UiCardProps>(), {
  as: 'div',
  variant: 'default',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isInteractive = computed(() => {
  if (typeof props.as !== 'string') return true;
  return ['a', 'button'].includes(props.as);
});

const variantClasses: Record<string, string> = {
  default: 'bg-card text-card-foreground rounded-xl border-ui border-border shadow-sm',
};

const classes = computed(() =>
  cn(
    variantClasses[props.variant] ?? variantClasses.default,
    isInteractive.value && 'cursor-pointer transition-all duration-200 active:scale-[0.98] active:brightness-[0.97]',
    attrs.class,
  ),
);
</script>

<template>
  <component :is="as" v-bind="restAttrs" :class="classes">
    <slot />
  </component>
</template>
