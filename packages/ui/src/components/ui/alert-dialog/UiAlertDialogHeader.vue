<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogHeader', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

// Confirm usage inside AlertDialog
inject(ALERT_DIALOG_KEY)!;
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('flex flex-col space-y-2 text-center sm:text-left', attrs.class)"
  >
    <slot />
  </div>
</template>
