<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { CAROUSEL_KEY } from './carousel-types';

defineOptions({ name: 'UiCarouselItem', inheritAttrs: false });

const ctx = inject(CAROUSEL_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="restAttrs"
    role="group"
    aria-roledescription="slide"
    :class="
      cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        ctx.orientation.value === 'horizontal' ? 'pl-4' : 'pt-4',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
