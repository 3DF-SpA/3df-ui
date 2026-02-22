<script setup lang="ts">
import {
  type CSSProperties,
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  provide,
  ref,
  useAttrs,
  watch,
} from 'vue';

import type { ClassValue } from 'clsx';

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

const positionStyle = ref<CSSProperties>({});
let rafId: number | undefined;

function updatePosition() {
  const trigger = sub.triggerRef.value;
  const content = sub.contentRef.value;
  if (!trigger || !content) return;

  const triggerRect = trigger.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = props.viewportPadding;
  const gap = props.sideOffset;

  let left = triggerRect.right + gap;
  if (left + contentRect.width > vw - pad) {
    left = triggerRect.left - contentRect.width - gap;
  }
  if (left < pad) left = pad;

  let top = triggerRect.top;
  if (top + contentRect.height > vh - pad) {
    top = vh - pad - contentRect.height;
  }
  if (top < pad) top = pad;

  positionStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px` };
}

function onResize() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updatePosition();
    rafId = undefined;
  });
}

watch(
  () => sub.isOpen.value,
  async (open) => {
    if (open) {
      await nextTick();
      updatePosition();
      await nextTick();
      updatePosition();
      window.addEventListener('resize', onResize);
    } else {
      window.removeEventListener('resize', onResize);
    }
  },
);

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  if (rafId) cancelAnimationFrame(rafId);
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
            sub.contentRef.value = el as HTMLElement;
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
