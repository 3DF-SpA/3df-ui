<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiDialogFooter', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="
      cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
