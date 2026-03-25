<script setup lang="ts">
import { type ComputedRef, computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { dataTableCellVariants } from './data-table-variants';

defineOptions({ name: 'UiDataTableCell', inheritAttrs: false });

interface UiDataTableCellProps {
  align?: 'left' | 'center' | 'right';
  numeric?: boolean;
  mono?: boolean;
  truncate?: boolean;
}

const props = withDefaults(defineProps<UiDataTableCellProps>(), {
  align: 'left',
  numeric: false,
  mono: false,
  truncate: false,
});

const _dtSize = inject<ComputedRef<string>>('dtSize', computed(() => 'default'));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    dataTableCellVariants({
      align: props.align,
      numeric: props.numeric,
      mono: props.mono,
      truncate: props.truncate,
    }),
    attrs.class,
  ),
);
</script>

<template>
  <td v-bind="restAttrs" :class="classes">
    <slot />
  </td>
</template>