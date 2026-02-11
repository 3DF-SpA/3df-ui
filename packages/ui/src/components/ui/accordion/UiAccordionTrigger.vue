<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ACCORDION_ITEM_KEY, ACCORDION_KEY } from './accordion-types';

defineOptions({ name: 'UiAccordionTrigger', inheritAttrs: false });

const accordion = inject(ACCORDION_KEY)!;
const item = inject(ACCORDION_ITEM_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

function onClick() {
  if (item.disabled.value) return;
  accordion.toggle(item.value);
}
</script>

<template>
  <h3 class="flex">
    <button
      v-bind="restAttrs"
      :id="item.triggerId"
      type="button"
      :aria-expanded="item.isOpen.value"
      :aria-controls="item.contentId"
      :data-state="item.isOpen.value ? 'open' : 'closed'"
      :data-disabled="item.disabled.value ? '' : undefined"
      :disabled="item.disabled.value"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all',
          'hover:underline',
          '[&[data-state=open]>svg]:rotate-180',
          'disabled:pointer-events-none disabled:opacity-50',
          attrs.class,
        )
      "
      @click="onClick"
    >
      <slot />
      <!-- Chevron down icon -->
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
        class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  </h3>
</template>
