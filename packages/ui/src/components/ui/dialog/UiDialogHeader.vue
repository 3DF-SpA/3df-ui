<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogHeader', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

// Confirm usage inside Dialog
inject(DIALOG_KEY)!;
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('flex flex-col space-y-1.5 text-center sm:text-left', attrs.class)"
  >
    <slot />
  </div>
</template>
