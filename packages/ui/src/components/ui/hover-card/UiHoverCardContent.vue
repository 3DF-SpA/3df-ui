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
import { HOVER_CARD_KEY } from './hover-card-types';

defineOptions({ name: 'UiHoverCardContent', inheritAttrs: false });

interface UiHoverCardContentProps {
  align?: FloatingAlign;
  side?: FloatingSide;
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiHoverCardContentProps>(), {
  align: 'center',
  side: 'bottom',
  sideOffset: 8,
  viewportPadding: 8,
});

const hoverCard = inject(HOVER_CARD_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const contentRef = ref<HTMLElement>();

const { positionStyle, updatePosition } = useFloatingPosition(
  hoverCard.triggerRef,
  contentRef,
  () => ({
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
    viewportPadding: props.viewportPadding,
  }),
);

useFloatingLifecycle({
  isOpen: hoverCard.isOpen,
  updatePosition,
  onScrollClose: () => hoverCard.close(),
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="hoverCard.isOpen.value"
        :ref="
          (el) => {
            const element = el as HTMLElement;
            hoverCard.contentRef.value = element;
            contentRef = element;
          }
        "
        v-bind="restAttrs"
        :id="hoverCard.cardId"
        role="tooltip"
        :style="positionStyle"
        :class="
          cn(
            'z-50 w-64 max-w-[calc(100vw-1rem)]',
            'bg-popover text-popover-foreground',
            'border border-border rounded-md p-4 shadow-md outline-none',
            attrs.class,
          )
        "
        @mouseenter="hoverCard.cancelClose()"
        @mouseleave="hoverCard.close()"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
