<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { tableVariants } from './table-variants';

defineOptions({ name: 'UiTable', inheritAttrs: false });

interface UiTableProps {
  variant?: 'default' | 'bordered' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  rounded?: boolean;
  stickyHeader?: boolean;
}

const props = withDefaults(defineProps<UiTableProps>(), {
  variant: 'default',
  size: 'default',
  rounded: false,
  stickyHeader: false,
});

provide('tableSize', computed(() => props.size));
provide('tableVariant', computed(() => props.variant));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(tableVariants({ variant: props.variant, size: props.size, rounded: props.rounded }), attrs.class),
);

const wrapperClasses = computed(() =>
  cn('relative w-full overflow-auto', props.rounded && 'rounded-lg'),
);
</script>

<template>
  <div :class="wrapperClasses">
    <table v-bind="restAttrs" :class="classes">
      <slot />
    </table>
  </div>
</template>
