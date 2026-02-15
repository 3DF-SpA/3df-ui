<script setup lang="ts">
import { computed, inject, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COLLAPSIBLE_KEY } from './collapsible-types';

defineOptions({ name: 'UiCollapsibleContent', inheritAttrs: false });

const ctx = inject(COLLAPSIBLE_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const contentRef = ref<HTMLElement>();
const height = ref<string>('0px');
const isAnimating = ref(false);

watch(
  () => ctx.isOpen.value,
  (open) => {
    const el = contentRef.value;
    if (!el) return;

    isAnimating.value = true;

    if (open) {
      // Expanding: remove hidden so we can measure, then animate 0 → scrollHeight
      el.removeAttribute('hidden');
      const scrollH = el.scrollHeight;
      height.value = '0px';
      requestAnimationFrame(() => {
        height.value = `${scrollH}px`;
      });
    } else {
      // Collapsing: measure current height, animate from current → 0
      height.value = `${el.scrollHeight}px`;
      requestAnimationFrame(() => {
        height.value = '0px';
      });
    }
  },
);

function onTransitionEnd() {
  isAnimating.value = false;
  if (ctx.isOpen.value) {
    // After expanding, allow content to grow naturally
    height.value = 'auto';
  }
}
</script>

<template>
  <div
    ref="contentRef"
    v-bind="restAttrs"
    :id="ctx.contentId"
    role="region"
    :data-state="ctx.isOpen.value ? 'open' : 'closed'"
    :style="{
      height,
      overflow: isAnimating || !ctx.isOpen.value ? 'hidden' : undefined,
    }"
    :hidden="!ctx.isOpen.value && !isAnimating ? true : undefined"
    :class="
      cn(
        'transition-[height] duration-200 ease-in-out',
        attrs.class,
      )
    "
    @transitionend="onTransitionEnd"
  >
    <slot />
  </div>
</template>
