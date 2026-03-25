<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { tableHeadVariants } from './table-variants';

defineOptions({ name: 'UiTableHead', inheritAttrs: false });

interface UiTableHeadProps {
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

const props = withDefaults(defineProps<UiTableHeadProps>(), {
  align: 'left',
  sortable: false,
  sortDirection: null,
});

const emit = defineEmits<{ click: [] }>();

const _tableSize = inject<{ value: string }>('tableSize', { value: 'default' });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    tableHeadVariants({ align: props.align }),
    props.sortable && 'cursor-pointer select-none',
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
        <!-- asc -->
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
          class="shrink-0"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <!-- desc -->
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
          class="shrink-0"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <!-- unsorted -->
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
          class="shrink-0 opacity-50"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </template>
    </span>
  </th>
</template>
