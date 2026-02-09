<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCard', inheritAttrs: false });

interface UiCardProps {
  as?: string | Component;
}

withDefaults(defineProps<UiCardProps>(), {
  as: 'div',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'bg-card text-card-foreground rounded-[var(--radius-xl)] border border-border shadow-sm',
    attrs.class,
  ),
);
</script>

<template>
  <component :is="as" v-bind="restAttrs" :class="classes">
    <slot />
  </component>
</template>
