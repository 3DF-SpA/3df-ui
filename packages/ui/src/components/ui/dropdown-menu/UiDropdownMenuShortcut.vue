<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiDropdownMenuShortcut', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <span
    v-bind="restAttrs"
    :class="cn('text-muted-foreground ml-auto text-xs tracking-widest', attrs.class)"
  >
    <slot />
  </span>
</template>
