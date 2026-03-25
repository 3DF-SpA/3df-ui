<script setup lang="ts">
import { type ComputedRef, computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { panelTableHeadVariants } from './panel-table-variants';
import type { PanelTableAccent } from './panel-table-variants';

defineOptions({ name: 'UiPanelTableHead', inheritAttrs: false });

const ptAccent = inject<ComputedRef<PanelTableAccent>>('ptAccent', computed(() => 'default' as PanelTableAccent));
const ptSize = inject<ComputedRef<string>>('ptSize', computed(() => 'default'));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    panelTableHeadVariants({
      accent: ptAccent.value,
      size: ptSize.value as 'sm' | 'default' | 'lg',
    }),
    attrs.class,
  ),
);
</script>

<template>
  <th v-bind="restAttrs" :class="classes">
    <slot />
  </th>
</template>
