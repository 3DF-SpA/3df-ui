<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogDescription', inheritAttrs: false });

const ctx = inject(ALERT_DIALOG_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <p
    v-bind="restAttrs"
    :id="ctx.descriptionId"
    :class="cn('text-sm text-muted-foreground', attrs.class)"
  >
    <slot />
  </p>
</template>
