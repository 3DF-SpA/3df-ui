<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { dataTableRowVariants } from './data-table-variants';

defineOptions({ name: 'UiDataTableRow', inheritAttrs: false });

interface UiDataTableRowProps {
  variant?: 'default' | 'selected' | 'striped';
  selected?: boolean;
  hoverable?: boolean;
}

const props = withDefaults(defineProps<UiDataTableRowProps>(), {
  variant: 'default',
  selected: false,
  hoverable: true,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const resolvedVariant = computed(() => (props.selected ? 'selected' : props.variant));

const classes = computed(() =>
  cn(dataTableRowVariants({ variant: resolvedVariant.value, hoverable: props.hoverable }), attrs.class),
);
</script>

<template>
  <tr v-bind="restAttrs" :class="classes">
    <slot />
    <slot name="actions" />
  </tr>
</template>
