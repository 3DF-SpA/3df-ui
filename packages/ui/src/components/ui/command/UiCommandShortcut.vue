<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCommandShortcut', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <span
    v-bind="restAttrs"
    :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', attrs.class)"
  >
    <slot />
  </span>
</template>
