<script setup lang="ts">
import { computed, inject, ref, useAttrs } from 'vue';

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
  isOpen: tooltip.isOpen,
  updatePosition,
  onScrollClose: () => tooltip.close(),
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="tooltip.isOpen.value"
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
            attrs.class,
          )
        "
        @mouseenter="tooltip.cancelClose()"
        @mouseleave="tooltip.close()"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
