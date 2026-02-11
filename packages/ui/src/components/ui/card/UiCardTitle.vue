<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCardTitle', inheritAttrs: false });

interface UiCardTitleProps {
  as?: string | Component;
}

withDefaults(defineProps<UiCardTitleProps>(), {
  as: 'h3',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('text-lg font-semibold leading-none tracking-tight', attrs.class),
);
</script>

<template>
  <component :is="as" v-bind="restAttrs" :class="classes">
    <slot />
  </component>
</template>
