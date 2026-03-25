<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { dataTableVariants } from './data-table-variants';
import UiDataTableSkeleton from './UiDataTableSkeleton.vue';

defineOptions({ name: 'UiDataTable', inheritAttrs: false });

interface UiDataTableProps {
  variant?: 'default' | 'bordered' | 'striped' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  rounded?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  skeletonRows?: number;
  skeletonColumns?: number;
}

const props = withDefaults(defineProps<UiDataTableProps>(), {
  variant: 'default',
  size: 'default',
  rounded: false,
  stickyHeader: false,
  loading: false,
  skeletonRows: 5,
  skeletonColumns: 4,
});

provide('dtSize', computed(() => props.size));
provide('dtVariant', computed(() => props.variant));
provide('dtStickyHeader', computed(() => props.stickyHeader));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const wrapperClasses = computed(() =>
  cn(
    'border-ui border-border bg-card overflow-auto',
    props.rounded ? 'rounded-lg' : '',
    attrs.class,
  ),
);

const tableClasses = computed(() =>
  cn(dataTableVariants({ variant: props.variant, size: props.size })),
);
</script>

<template>
  <div v-bind="restAttrs" :class="wrapperClasses">
    <table :class="tableClasses">
      <template v-if="loading">
        <UiDataTableSkeleton :rows="skeletonRows" :columns="skeletonColumns" />
      </template>
      <template v-else>
        <slot />
      </template>
    </table>
  </div>
</template>
