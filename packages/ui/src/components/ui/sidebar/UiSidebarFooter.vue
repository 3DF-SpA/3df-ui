<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarFooter', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'flex shrink-0 flex-col gap-2 border-t-ui border-sidebar-border/70 p-4 transition-[padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    attrs.class,
  ),
);
</script>

<template>
  <div v-bind="restAttrs" :class="classes" data-sidebar="footer">
    <slot />
  </div>
</template>
