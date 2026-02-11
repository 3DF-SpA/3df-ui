<script setup lang="ts">
import { type Component, computed, inject, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { SHEET_INJECTION_KEY, type SheetContext } from './sheet-types';

defineOptions({ name: 'UiSheetTitle', inheritAttrs: false });

withDefaults(
  defineProps<{
    /** Elemento HTML o componente a renderizar */
    as?: string | Component;
  }>(),
  { as: 'h2' },
);

const sheet = inject<SheetContext>(SHEET_INJECTION_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'text-lg font-semibold text-foreground',
    attrs.class,
  ),
);
</script>

<template>
  <component
    :is="as"
    v-bind="restAttrs"
    :id="sheet.titleId"
    :class="classes"
    data-sheet="title"
  >
    <slot />
  </component>
</template>
