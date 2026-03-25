<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ACCORDION_ITEM_KEY } from './accordion-types';

defineOptions({ name: 'UiAccordionContent', inheritAttrs: false });

const item = inject(ACCORDION_ITEM_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const contentRef = ref<HTMLElement>();
const height = ref<string>('0px');
const isAnimating = ref(false);
let rafId = 0;

watch(
  () => item.isOpen.value,
  (open) => {
    const el = contentRef.value;
    if (!el) return;

    isAnimating.value = true;

    if (open) {
      el.removeAttribute('hidden');
      const scrollH = el.scrollHeight;
      height.value = '0px';
      rafId = requestAnimationFrame(() => {
        height.value = `${scrollH}px`;
      });
    } else {
      height.value = `${el.scrollHeight}px`;
      rafId = requestAnimationFrame(() => {
        height.value = '0px';
      });
    }
  },
);

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

function onTransitionEnd() {
  isAnimating.value = false;
  if (item.isOpen.value) {
    height.value = 'auto';
  }
}
</script>

<template>
  <div
    ref="contentRef"
    v-bind="restAttrs"
    :id="item.contentId"
    role="region"
    :aria-labelledby="item.triggerId"
    :data-state="item.isOpen.value ? 'open' : 'closed'"
    :style="{
      height,
      overflow: isAnimating || !item.isOpen.value ? 'hidden' : undefined,
    }"
    :hidden="!item.isOpen.value && !isAnimating ? true : undefined"
    :class="cn('transition-[height] duration-200 ease-in-out', attrs.class)"
    @transitionend="onTransitionEnd"
  >
    <div class="pt-0 pb-4 sm:pb-5 text-sm">
      <slot />
    </div>
  </div>
</template>
