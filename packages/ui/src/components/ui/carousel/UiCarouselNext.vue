<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { CAROUSEL_KEY } from './carousel-types';

defineOptions({ name: 'UiCarouselNext', inheritAttrs: false });

const ctx = inject(CAROUSEL_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    :disabled="!ctx.canScrollNext.value"
    aria-label="Siguiente slide"
    :class="
      cn(
        'absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border-ui border-border bg-card shadow-md transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        ctx.orientation.value === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        attrs.class,
      )
    "
    @click="ctx.scrollNext()"
  >
    <!-- Arrow right icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
    <span class="sr-only">Siguiente slide</span>
  </button>
</template>
