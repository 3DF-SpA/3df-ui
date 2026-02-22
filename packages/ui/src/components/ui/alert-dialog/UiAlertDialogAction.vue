<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogAction', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'destructive';
  }>(),
  { variant: 'default' },
);

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
    :class="
      cn(
        'ring-offset-background inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        props.variant === 'destructive'
          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
          : 'bg-primary text-primary-foreground hover:bg-primary/90',
        attrs.class,
      )
    "
    @click="ctx.close()"
  >
    <slot />
  </button>
</template>
