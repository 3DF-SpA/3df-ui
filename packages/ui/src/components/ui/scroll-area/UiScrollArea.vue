<script setup lang="ts">
import { computed, ref, toRef, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { useScrollbar } from './use-scrollbar';

defineOptions({ name: 'UiScrollArea', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    orientation?: 'vertical' | 'horizontal' | 'both';
  }>(),
  {
    type: 'hover',
    orientation: 'vertical',
  },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn('relative overflow-hidden', attrs.class));
const viewportRef = ref<HTMLElement>();

const {
  trackYRef,
  trackXRef,
  thumbYHeight,
  thumbYTop,
  thumbXWidth,
  thumbXLeft,
  isHovering,
  showVertical,
  showHorizontal,
  onScroll,
  onThumbYPointerDown,
  onThumbXPointerDown,
  onTrackYClick,
  onTrackXClick,
} = useScrollbar(viewportRef, {
  orientation: toRef(props, 'orientation'),
  type: toRef(props, 'type'),
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="classes"
    data-scroll-area=""
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      ref="viewportRef"
      class="h-full w-full rounded-[inherit]"
      :class="[
        orientation === 'vertical' || orientation === 'both'
          ? 'overflow-y-scroll'
          : 'overflow-y-hidden',
        orientation === 'horizontal' || orientation === 'both'
          ? 'overflow-x-scroll'
          : 'overflow-x-hidden',
      ]"
      style="scrollbar-width: none; -ms-overflow-style: none"
      data-scroll-area="viewport"
      @scroll="onScroll"
    >
      <div class="table min-w-full">
        <slot />
      </div>
    </div>

    <div
      v-if="showVertical"
      ref="trackYRef"
      class="absolute top-0 right-0 flex w-2.5 touch-none border-l border-l-transparent p-px transition-opacity duration-200 select-none"
      :class="showVertical ? 'opacity-100' : 'opacity-0'"
      :style="{ height: showHorizontal ? 'calc(100% - 10px)' : '100%' }"
      data-scroll-area="scrollbar-y"
      data-orientation="vertical"
      @click.self="onTrackYClick"
    >
      <div
        class="bg-border hover:bg-border/80 relative flex-1 cursor-pointer rounded-full transition-colors"
        :style="{
          height: `${thumbYHeight}px`,
          transform: `translateY(${thumbYTop}px)`,
        }"
        data-scroll-area="thumb-y"
        @pointerdown="onThumbYPointerDown"
      />
    </div>

    <div
      v-if="showHorizontal"
      ref="trackXRef"
      class="absolute bottom-0 left-0 flex h-2.5 touch-none border-t border-t-transparent p-px transition-opacity duration-200 select-none"
      :class="showHorizontal ? 'opacity-100' : 'opacity-0'"
      :style="{ width: showVertical ? 'calc(100% - 10px)' : '100%' }"
      data-scroll-area="scrollbar-x"
      data-orientation="horizontal"
      @click.self="onTrackXClick"
    >
      <div
        class="bg-border hover:bg-border/80 relative cursor-pointer rounded-full transition-colors"
        :style="{
          width: `${thumbXWidth}px`,
          height: '100%',
          transform: `translateX(${thumbXLeft}px)`,
        }"
        data-scroll-area="thumb-x"
        @pointerdown="onThumbXPointerDown"
      />
    </div>
  </div>
</template>

<style scoped>
[data-scroll-area='viewport']::-webkit-scrollbar {
  display: none;
}
</style>
