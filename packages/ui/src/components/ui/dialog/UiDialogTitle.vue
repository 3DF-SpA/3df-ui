<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogTitle', inheritAttrs: false });

const dialog = inject(DIALOG_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <h2
    v-bind="restAttrs"
    :id="dialog.titleId"
    :class="cn('text-lg font-semibold leading-none tracking-tight', attrs.class)"
  >
    <slot />
  </h2>
</template>
