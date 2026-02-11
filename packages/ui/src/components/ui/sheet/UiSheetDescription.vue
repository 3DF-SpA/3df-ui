<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { SHEET_INJECTION_KEY, type SheetContext } from './sheet-types';

defineOptions({ name: 'UiSheetDescription', inheritAttrs: false });

const sheet = inject<SheetContext>(SHEET_INJECTION_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'text-sm text-muted-foreground',
    attrs.class,
  ),
);
</script>

<template>
  <p
    v-bind="restAttrs"
    :id="sheet.descriptionId"
    :class="classes"
    data-sheet="description"
  >
    <slot />
  </p>
</template>
