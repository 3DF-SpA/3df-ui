<script setup lang="ts">
import { type ComputedRef, computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { panelTableRowVariants } from './panel-table-variants';
import type { PanelTableAccent } from './panel-table-variants';

defineOptions({ name: 'UiPanelTableRow', inheritAttrs: false });

const ptAccent = inject<ComputedRef<PanelTableAccent>>('ptAccent', computed(() => 'default' as PanelTableAccent));
const ptDivided = inject<ComputedRef<boolean>>('ptDivided', computed(() => false));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    panelTableRowVariants({ accent: ptAccent.value }),
    ptDivided.value ? 'border-b-ui border-border last:border-0' : '',
    attrs.class,
  ),
);
</script>

<template>
  <tr v-bind="restAttrs" :class="classes">
    <slot />
  </tr>
</template>