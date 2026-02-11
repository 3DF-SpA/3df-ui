<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiContextMenuLabel', inheritAttrs: false });

interface UiContextMenuLabelProps {
  inset?: boolean;
}

withDefaults(defineProps<UiContextMenuLabelProps>(), {
  inset: false,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('px-2 py-1.5 text-sm font-semibold text-foreground', inset && 'pl-8', attrs.class)"
  >
    <slot />
  </div>
</template>
