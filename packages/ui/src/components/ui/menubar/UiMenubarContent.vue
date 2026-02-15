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
import { MENUBAR_ITEM_CONTEXT_KEY, MENUBAR_MENU_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubarContent', inheritAttrs: false });

type Align = 'start' | 'center' | 'end';
type Side = 'top' | 'bottom';

interface UiMenubarContentProps {
  align?: Align;
  side?: Side;
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

// ── Provide item registration for children ────────────────────
provide(MENUBAR_ITEM_CONTEXT_KEY, {
  register: menu.registerItem,
  unregister: menu.unregisterItem,
  focusedIndex: menu.focusedIndex,
  items: menu.items,
});

// ── Auto-positioning (fixed to viewport) ──────────────────────
const positionStyle = ref<CSSProperties>({});
let rafId: number | undefined;

function updatePosition() {
  const trigger = menu.triggerRef.value;
  const content = menu.contentRef.value;
  if (!trigger || !content) return;

  const triggerRect = trigger.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = props.viewportPadding;
  const gap = props.sideOffset;

  // ── Side (vertical): auto-flip ──
  let side = props.side;
  if (side === 'bottom') {
    const spaceBelow = vh - triggerRect.bottom - gap;
    if (spaceBelow < contentRect.height && triggerRect.top - gap > spaceBelow) {
      side = 'top';
    }
  } else {
    const spaceAbove = triggerRect.top - gap;
    if (spaceAbove < contentRect.height && vh - triggerRect.bottom - gap > spaceAbove) {
      side = 'bottom';
    }
  }

  // ── Align (horizontal): auto-flip ──
  let align = props.align;
  if (align === 'start') {
    if (triggerRect.left + contentRect.width > vw - pad) align = 'end';
  } else if (align === 'end') {
    if (triggerRect.right - contentRect.width < pad) align = 'start';
  } else {
    const cx = triggerRect.left + triggerRect.width / 2;
    const hw = contentRect.width / 2;
    if (cx - hw < pad) align = 'start';
    else if (cx + hw > vw - pad) align = 'end';
  }

  let top: number;
  if (side === 'bottom') {
    top = triggerRect.bottom + gap;
  } else {
    top = triggerRect.top - contentRect.height - gap;
  }

  let left: number;
  if (align === 'start') {
    left = triggerRect.left;
  } else if (align === 'end') {
    left = triggerRect.right - contentRect.width;
  } else {
    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
  }

  // ── Viewport clamping ──
  if (left < pad) left = pad;
  else if (left + contentRect.width > vw - pad) left = vw - pad - contentRect.width;
  if (top < pad) top = pad;
  else if (top + contentRect.height > vh - pad) top = vh - pad - contentRect.height;

  positionStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px` };
}

function onScroll(event: Event) {
  const target = event.target as Node | null;
  if (menu.contentRef.value && target && menu.contentRef.value.contains(target)) return;
  menu.close();
}

function onResize() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updatePosition();
    rafId = undefined;
  });
}

watch(
  () => menu.isOpen.value,
  async (open) => {
    if (open) {
      await nextTick();
      updatePosition();
      await nextTick();
      updatePosition();
      window.addEventListener('scroll', onScroll, true);
      window.addEventListener('resize', onResize);
    } else {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    }
  },
);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll, true);
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
        v-if="menu.isOpen.value"
        :ref="
          (el: any) => {
            menu.contentRef.value = el as HTMLElement;
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
            'rounded-md border-ui border-border p-1 shadow-md',
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
