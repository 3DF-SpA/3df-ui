<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiDropdownMenuSeparator', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="restAttrs" role="separator" :class="cn('bg-border -mx-1 my-1 h-px', attrs.class)" />
</template>
