<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { useFloatingLifecycle } from '../../../composables/use-floating-lifecycle';
import {
  type FloatingAlign,
  type FloatingSide,
  useFloatingPosition,
} from '../../../composables/use-floating-position';
import { cn } from '../../../lib/utils';
import { TOOLTIP_KEY } from './tooltip-types';

defineOptions({ name: 'UiTooltipContent', inheritAttrs: false });

interface UiTooltipContentProps {
  align?: FloatingAlign;
  side?: FloatingSide;
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiTooltipContentProps>(), {
  align: 'center',
  side: 'top',
  sideOffset: 6,
  viewportPadding: 8,
});

const tooltip = inject(TOOLTIP_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isVisible = ref(false);
const isEntering = ref(false);
let animTimeout: ReturnType<typeof setTimeout> | undefined;

watch(
  () => tooltip.isOpen.value,
  async (open) => {
    clearTimeout(animTimeout);
    if (open) {
      isVisible.value = true;
      await nextTick();
      isEntering.value = true;
    } else {
      isEntering.value = false;
      animTimeout = setTimeout(() => {
        isVisible.value = false;
      }, 100);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  clearTimeout(animTimeout);
});

const contentRef = ref<HTMLElement>();

const { positionStyle, updatePosition } = useFloatingPosition(
  tooltip.triggerRef,
  contentRef,
  () => ({
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
    viewportPadding: props.viewportPadding,
  }),
);

useFloatingLifecycle({
  isOpen: isVisible,
  updatePosition,
  onScrollClose: () => tooltip.close(),
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      :ref="
        (el) => {
          const element = el as HTMLElement;
          tooltip.contentRef.value = element;
          contentRef = element;
        }
      "
      v-bind="restAttrs"
      :id="tooltip.tooltipId"
      role="tooltip"
      :style="positionStyle"
      :class="
        cn(
          'z-50 max-w-xs',
          'bg-popover text-popover-foreground',
          'border-ui border-border rounded-md px-3 py-1.5 text-sm shadow-md',
          'transition-all duration-100',
          isEntering ? 'opacity-100 scale-100 ease-out' : 'opacity-0 scale-95 ease-in',
          attrs.class,
        )
      "
      @mouseenter="tooltip.cancelClose()"
      @mouseleave="tooltip.close()"
    >
      <slot />
    </div>
  </Teleport>
</template>
