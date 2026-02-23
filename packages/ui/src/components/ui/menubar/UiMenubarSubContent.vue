<script setup lang="ts">
import { computed, inject, provide, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { useFloatingLifecycle } from '../../../composables/use-floating-lifecycle';
import { useSubMenuPosition } from '../../../composables/use-floating-position';
import { cn } from '../../../lib/utils';
import { MENUBAR_ITEM_CONTEXT_KEY, MENUBAR_MENU_KEY, MENUBAR_SUB_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubarSubContent', inheritAttrs: false });

interface UiMenubarSubContentProps {
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiMenubarSubContentProps>(), {
  sideOffset: 2,
  viewportPadding: 8,
});

const menu = inject(MENUBAR_MENU_KEY)!;
const sub = inject(MENUBAR_SUB_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

provide(MENUBAR_ITEM_CONTEXT_KEY, {
  register: menu.registerSubItem,
  unregister: menu.unregisterSubItem,
  focusedIndex: menu.subFocusedIndex,
  items: menu.subItems,
});

const contentRef = ref<HTMLElement>();

const { positionStyle, updatePosition } = useSubMenuPosition(sub.triggerRef, contentRef, () => ({
  sideOffset: props.sideOffset,
  viewportPadding: props.viewportPadding,
}));

useFloatingLifecycle({
  isOpen: sub.isOpen,
  updatePosition,
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
        v-if="sub.isOpen.value"
        :ref="
          (el: any) => {
            const element = el as HTMLElement;
            sub.contentRef.value = element;
            contentRef = element;
          }
        "
        v-bind="restAttrs"
        role="menu"
        data-menubar-content
        :style="positionStyle"
        :class="
          cn(
            'z-50 min-w-[8rem]',
            'bg-popover text-popover-foreground',
            'border-ui border-border rounded-md p-1 shadow-lg',
            attrs.class,
          )
        "
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
