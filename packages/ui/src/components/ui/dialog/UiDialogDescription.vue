<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogDescription', inheritAttrs: false });

const dialog = inject(DIALOG_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <p
    v-bind="restAttrs"
    :id="dialog.descriptionId"
    :class="cn('text-sm text-muted-foreground', attrs.class)"
  >
    <slot />
  </p>
</template>
