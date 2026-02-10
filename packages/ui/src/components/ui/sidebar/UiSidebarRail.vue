<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { useSidebar } from './use-sidebar';

defineOptions({ name: 'UiSidebarRail', inheritAttrs: false });

const ctx = useSidebar();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
    'cursor-pointer hover:after:bg-sidebar-border',
    ctx.side.value === 'left'
      ? 'right-0 translate-x-1/2'
      : 'left-0 -translate-x-1/2',
    attrs.class,
  ),
);

function onClick() {
  ctx.toggleSidebar();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    ctx.toggleSidebar();
  }
}
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="classes"
    :aria-label="ctx.open.value ? 'Colapsar sidebar' : 'Expandir sidebar'"
    role="button"
    tabindex="0"
    data-sidebar="rail"
    @click="onClick"
    @keydown="onKeydown"
  />
</template>
