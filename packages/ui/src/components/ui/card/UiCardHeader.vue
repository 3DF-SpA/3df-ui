<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCardHeader', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn('flex flex-col gap-1.5 p-6', attrs.class));
</script>

<template>
  <div v-bind="restAttrs" :class="classes">
    <slot />
  </div>
</template>
