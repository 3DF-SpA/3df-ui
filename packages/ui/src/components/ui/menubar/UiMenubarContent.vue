<script setup lang="ts">
import { computed, inject, provide, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { useFloatingLifecycle } from '../../../composables/use-floating-lifecycle';
import {
  type FloatingAlign,
  type FloatingSide,
  useFloatingPosition,
} from '../../../composables/use-floating-position';
import { cn } from '../../../lib/utils';
import { MENUBAR_ITEM_CONTEXT_KEY, MENUBAR_MENU_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubarContent', inheritAttrs: false });

interface UiMenubarContentProps {
  align?: FloatingAlign;
  side?: FloatingSide;
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiMenubarContentProps>(), {
  align: 'start',
  side: 'bottom',
  sideOffset: 4,
  viewportPadding: 8,
});

const menu = inject(MENUBAR_MENU_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

provide(MENUBAR_ITEM_CONTEXT_KEY, {
  register: menu.registerItem,
  unregister: menu.unregisterItem,
  focusedIndex: menu.focusedIndex,
  items: menu.items,
});

const contentRef = ref<HTMLElement>();

const { positionStyle, updatePosition } = useFloatingPosition(menu.triggerRef, contentRef, () => ({
  side: props.side,
  align: props.align,
  sideOffset: props.sideOffset,
  viewportPadding: props.viewportPadding,
}));

useFloatingLifecycle({
  isOpen: menu.isOpen,
  updatePosition,
  contentRef,
  closeFn: menu.close,
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
        v-if="menu.isOpen.value"
        :ref="
          (el: any) => {
            const element = el as HTMLElement;
            menu.contentRef.value = element;
            contentRef = element;
          }
        "
        v-bind="restAttrs"
        role="menu"
        data-menubar-content
        :aria-labelledby="menu.triggerId"
        :style="positionStyle"
        :class="
          cn(
            'z-50 min-w-[12rem]',
            'bg-popover text-popover-foreground',
            'border-ui border-border rounded-md p-1 shadow-md',
            'max-h-[var(--menubar-max-h,20rem)] overflow-auto',
            attrs.class,
          )
        "
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
