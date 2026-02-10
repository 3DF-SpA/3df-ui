<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTableRow', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    attrs.class,
  ),
);
</script>

<template>
  <tr v-bind="restAttrs" :class="classes">
    <slot />
  </tr>
</template>
