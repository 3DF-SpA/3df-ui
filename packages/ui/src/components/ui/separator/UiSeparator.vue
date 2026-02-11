<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSeparator', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Orientación del separador */
    orientation?: 'horizontal' | 'vertical';
    /** Si es puramente decorativo (sin role="separator") */
    decorative?: boolean;
  }>(),
  {
    orientation: 'horizontal',
    decorative: false,
  },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'shrink-0 bg-border',
    props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    attrs.class,
  ),
);
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="classes"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
    :data-orientation="orientation"
    data-separator=""
  />
</template>
