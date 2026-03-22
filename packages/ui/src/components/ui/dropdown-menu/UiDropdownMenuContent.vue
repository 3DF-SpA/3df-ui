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
import { DROPDOWN_MENU_KEY } from './dropdown-menu-types';

defineOptions({ name: 'UiDropdownMenuContent', inheritAttrs: false });

interface UiDropdownMenuContentProps {
  align?: FloatingAlign;
  side?: FloatingSide;
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiDropdownMenuContentProps>(), {
  align: 'start',
  side: 'bottom',
  sideOffset: 4,
  viewportPadding: 8,
});

const menu = inject(DROPDOWN_MENU_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isVisible = ref(false);
const isEntering = ref(false);
let animTimeout: ReturnType<typeof setTimeout> | undefined;

watch(
  () => menu.isOpen.value,
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
      }, 150);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  clearTimeout(animTimeout);
});

const contentRef = ref<HTMLElement>();

const { positionStyle, updatePosition } = useFloatingPosition(menu.triggerRef, contentRef, () => ({
  side: props.side,
  align: props.align,
  sideOffset: props.sideOffset,
  viewportPadding: props.viewportPadding,
}));

useFloatingLifecycle({
  isOpen: isVisible,
  updatePosition,
  contentRef,
  closeFn: menu.close,
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      :ref="
        (el) => {
          const element = el as HTMLElement;
          menu.contentRef.value = element;
          contentRef = element;
        }
      "
      v-bind="restAttrs"
      role="menu"
      :aria-labelledby="menu.triggerId"
      :style="positionStyle"
      :class="
        cn(
          'z-50 max-w-[calc(100vw-1rem)] min-w-[8rem]',
          'bg-popover text-popover-foreground',
          'border border-border rounded-md p-1 shadow-lg',
          'max-h-[var(--dropdown-max-h,20rem)] overflow-auto',
          'transition-all duration-150',
          isEntering ? 'opacity-100 scale-100 ease-out' : 'opacity-0 scale-[0.97] ease-in',
          attrs.class,
        )
      "
    >
      <slot />
    </div>
  </Teleport>
</template>
