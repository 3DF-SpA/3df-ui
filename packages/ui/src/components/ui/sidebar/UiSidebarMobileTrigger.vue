<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { SIDEBAR_INJECTION_KEY } from './sidebar-types';

defineOptions({ name: 'UiSidebarMobileTrigger', inheritAttrs: false });

const ctx = inject(SIDEBAR_INJECTION_KEY, null);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'inline-flex size-9 items-center justify-center rounded-md text-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring touch-manipulation',
    attrs.class,
  ),
);
</script>

<template>
  <button
    v-if="ctx"
    v-show="ctx.isMobile.value"
    v-bind="restAttrs"
    type="button"
    aria-label="Abrir menú de navegación"
    :aria-expanded="ctx.openMobile.value"
    aria-controls="ui-sidebar-sheet"
    :class="classes"
    @click="ctx.setOpenMobile(true)"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    </slot>
  </button>
</template>
