<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogCancel', inheritAttrs: false });

const ctx = inject(ALERT_DIALOG_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    data-alert-dialog-cancel
    :class="
      cn(
        'inline-flex h-10 items-center justify-center rounded-md border-2 border-input bg-foreground/5 px-4 py-2 text-sm font-medium ring-offset-background transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'mt-2 sm:mt-0',
        attrs.class,
      )
    "
    @click="ctx.close()"
  >
    <slot />
  </button>
</template>
