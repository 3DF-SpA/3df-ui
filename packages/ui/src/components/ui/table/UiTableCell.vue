<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTableCell', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', attrs.class),
);
</script>

<template>
  <td v-bind="restAttrs" :class="classes">
    <slot />
  </td>
</template>
