<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { useSidebar } from './use-sidebar';

defineOptions({ name: 'UiSidebarTrigger', inheritAttrs: false });

const ctx = useSidebar();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'inline-flex size-8 items-center justify-center rounded-md text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
    attrs.class,
  ),
);

function onClick() {
  ctx.toggleSidebar();
}
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    data-sidebar="trigger"
    :aria-label="ctx.open.value ? 'Cerrar sidebar' : 'Abrir sidebar'"
    :class="classes"
    @click="onClick"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </slot>
    <span class="sr-only">Toggle sidebar</span>
  </button>
</template>
