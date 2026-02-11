<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { SHEET_INJECTION_KEY, type SheetContext } from './sheet-types';

defineOptions({ name: 'UiSheetClose', inheritAttrs: false });

const sheet = inject<SheetContext>(SHEET_INJECTION_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn(attrs.class));
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    :class="classes"
    data-sheet="close"
    @click="sheet.close()"
  >
    <slot>Close</slot>
  </button>
</template>
