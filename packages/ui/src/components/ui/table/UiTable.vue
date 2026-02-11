<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTable', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn('w-full caption-bottom text-sm', attrs.class));
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table v-bind="restAttrs" :class="classes">
      <slot />
    </table>
  </div>
</template>
