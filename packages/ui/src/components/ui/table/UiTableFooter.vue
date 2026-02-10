<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTableFooter', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', attrs.class),
);
</script>

<template>
  <tfoot v-bind="restAttrs" :class="classes">
    <slot />
  </tfoot>
</template>
