<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarGroupLabel', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 outline-none transition-[margin,opacity,padding,height] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-data-[collapsible=icon]/sidebar-wrapper:pointer-events-none group-data-[collapsible=icon]/sidebar-wrapper:h-0 group-data-[collapsible=icon]/sidebar-wrapper:overflow-hidden group-data-[collapsible=icon]/sidebar-wrapper:opacity-0',
    attrs.class,
  ),
);
</script>

<template>
  <div v-bind="restAttrs" :class="classes" data-sidebar="group-label">
    <slot />
  </div>
</template>
