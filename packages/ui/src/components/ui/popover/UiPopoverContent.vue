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
import { POPOVER_KEY } from './popover-types';

defineOptions({ name: 'UiPopoverContent', inheritAttrs: false });

interface UiPopoverContentProps {
  align?: FloatingAlign;
  side?: FloatingSide;
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiPopoverContentProps>(), {
  align: 'center',
  side: 'bottom',
  sideOffset: 4,
  viewportPadding: 8,
});

const popover = inject(POPOVER_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const contentRef = ref<HTMLElement>();

const { positionStyle, updatePosition } = useFloatingPosition(
  popover.triggerRef,
  contentRef,
  () => ({
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
    viewportPadding: props.viewportPadding,
  }),
);

useFloatingLifecycle({
  isOpen: popover.isOpen,
  updatePosition,
  contentRef,
  closeFn: popover.close,
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-[0.97]"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-[0.97]"
    >
      <div
        v-if="popover.isOpen.value"
        :ref="
          (el) => {
            const element = el as HTMLElement;
            popover.contentRef.value = element;
            contentRef = element;
          }
        "
        v-bind="restAttrs"
        role="dialog"
        :aria-labelledby="popover.triggerId"
        tabindex="-1"
        :style="positionStyle"
        :class="
          cn(
            'z-50 w-72 max-w-[calc(100vw-1rem)]',
            'bg-popover text-popover-foreground',
            'border-ui border-border rounded-md p-4 shadow-md',
            attrs.class,
          )
        "
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
