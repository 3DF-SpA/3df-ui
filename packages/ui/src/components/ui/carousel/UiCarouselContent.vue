<script setup lang="ts">
import { computed, inject, onMounted, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { CAROUSEL_KEY } from './carousel-types';

defineOptions({ name: 'UiCarouselContent', inheritAttrs: false });

const ctx = inject(CAROUSEL_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

function setViewportRef(el: unknown) {
  ctx.viewportRef.value = el as HTMLElement;
}

onMounted(() => {
  // Ensure the parent carousel can init Embla with this viewport
  if (ctx.viewportRef.value) return;
});
</script>

<template>
  <div :ref="setViewportRef" class="overflow-hidden">
    <div
      v-bind="restAttrs"
      :class="
        cn(
          'flex',
          ctx.orientation.value === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          attrs.class,
        )
      "
    >
      <slot />
    </div>
  </div>
</template>
