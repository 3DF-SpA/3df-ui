<script setup lang="ts">
import { type ComputedRef, computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { panelTableCellVariants } from './panel-table-variants';

defineOptions({ name: 'UiPanelTableCell', inheritAttrs: false });

interface UiPanelTableCellProps {
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<UiPanelTableCellProps>(), {
  align: 'left',
});

const ptSize = inject<ComputedRef<string>>('ptSize', computed(() => 'default'));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    panelTableCellVariants({
      size: ptSize.value as 'sm' | 'default' | 'lg',
      align: props.align,
    }),
    attrs.class,
  ),
);
</script>

<template>
  <td v-bind="restAttrs" :class="classes">
    <slot />
    <slot name="badge" />
    <slot name="avatar" />
  </td>
</template>