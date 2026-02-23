<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

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
let rafId = 0;

watch(
  () => ctx.isOpen.value,
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
  if (ctx.isOpen.value) {
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
    :class="cn('transition-[height] duration-200 ease-in-out', attrs.class)"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </div>
</template>
