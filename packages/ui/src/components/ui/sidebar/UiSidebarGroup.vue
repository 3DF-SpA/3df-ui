<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarGroup', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'relative flex w-full min-w-0 flex-col p-4 transition-[padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-data-[collapsible=icon]/sidebar-wrapper:p-1',
    attrs.class,
  ),
);
</script>

<template>
  <div v-bind="restAttrs" :class="classes" data-sidebar="group">
    <slot />
  </div>
</template>
