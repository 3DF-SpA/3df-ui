<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuBadge', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 select-none items-center justify-center rounded-full px-1 text-[10px] font-medium tabular-nums',
    'bg-sidebar-primary text-sidebar-primary-foreground',
    /* Ocultar en modo icon colapsado */
    'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
    attrs.class,
  ),
);
</script>

<template>
  <span v-bind="restAttrs" :class="classes" data-sidebar="menu-badge">
    <slot />
  </span>
</template>
