<script setup lang="ts">
import { type ComputedRef, computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { dataTableHeadVariants } from './data-table-variants';

defineOptions({ name: 'UiDataTableHead', inheritAttrs: false });

interface UiDataTableHeadProps {
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

const props = withDefaults(defineProps<UiDataTableHeadProps>(), {
  align: 'left',
  sortable: false,
  sortDirection: null,
});

const emit = defineEmits<{ click: [] }>();

const dtStickyHeader = inject<ComputedRef<boolean>>('dtStickyHeader', computed(() => false));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    dataTableHeadVariants({
      align: props.align,
      sortable: props.sortable,
      sticky: dtStickyHeader.value,
    }),
    attrs.class,
  ),
);

function handleClick() {
  if (props.sortable) emit('click');
}
</script>

<template>
  <th v-bind="restAttrs" :class="classes" @click="handleClick">
    <span class="inline-flex items-center gap-1">
      <slot />
      <template v-if="sortable">
        <!-- asc: ChevronUp -->
        <svg
          v-if="sortDirection === 'asc'"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 transition-transform duration-150"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <!-- desc: ChevronDown -->
        <svg
          v-else-if="sortDirection === 'desc'"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 transition-transform duration-150"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <!-- unsorted: ChevronsUpDown -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 opacity-40 transition-opacity duration-150"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </template>
    </span>
  </th>
</template>