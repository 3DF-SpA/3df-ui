<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiDataTableSkeleton', inheritAttrs: false });

interface UiDataTableSkeletonProps {
  rows?: number;
  columns?: number;
}

const props = withDefaults(defineProps<UiDataTableSkeletonProps>(), {
  rows: 5,
  columns: 4,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const rowArray = computed(() => Array.from({ length: props.rows }));
const colArray = computed(() => Array.from({ length: props.columns }));
</script>

<template>
  <tbody v-bind="restAttrs">
    <tr
      v-for="(_, rowIdx) in rowArray"
      :key="rowIdx"
      class="border-b-ui border-border"
    >
      <td
        v-for="(_, colIdx) in colArray"
        :key="colIdx"
        class="px-4 py-3"
      >
        <div
          :class="
            cn(
              'h-4 animate-pulse rounded bg-muted',
              colIdx === 0 ? 'w-3/4' : 'w-full',
            )
          "
        />
      </td>
    </tr>
  </tbody>
</template>