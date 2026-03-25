<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { tableCellVariants } from './table-variants';

defineOptions({ name: 'UiTableCell', inheritAttrs: false });

interface UiTableCellProps {
  align?: 'left' | 'center' | 'right';
  numeric?: boolean;
}

const props = withDefaults(defineProps<UiTableCellProps>(), {
  align: 'left',
  numeric: false,
});

const _tableSize = inject<{ value: string }>('tableSize', { value: 'default' });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(tableCellVariants({ align: props.align, numeric: props.numeric }), attrs.class),
);
</script>

<template>
  <td v-bind="restAttrs" :class="classes">
    <slot />
  </td>
</template>
