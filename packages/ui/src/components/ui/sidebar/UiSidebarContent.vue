<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarContent', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto',
    /* Scrollbar personalizado */
    '[&::-webkit-scrollbar]:w-1.5',
    '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sidebar-border/60',
    '[&::-webkit-scrollbar-track]:bg-transparent',
    'hover:[&::-webkit-scrollbar-thumb]:bg-sidebar-border',
    /* Bordes entre grupos */
    '[&>[data-sidebar=group]]:border-b [&>[data-sidebar=group]]:border-sidebar-border/50 [&>[data-sidebar=group]:last-child]:border-b-0',
    attrs.class,
  ),
);
</script>

<template>
  <div v-bind="restAttrs" :class="classes" data-sidebar="content">
    <slot />
  </div>
</template>
