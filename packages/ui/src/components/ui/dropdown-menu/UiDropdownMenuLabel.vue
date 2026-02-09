<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiDropdownMenuLabel', inheritAttrs: false });

interface UiDropdownMenuLabelProps {
  inset?: boolean;
}

withDefaults(defineProps<UiDropdownMenuLabelProps>(), {
  inset: false,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', attrs.class)"
  >
    <slot />
  </div>
</template>
