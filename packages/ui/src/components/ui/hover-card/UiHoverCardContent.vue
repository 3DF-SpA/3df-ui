<script setup lang="ts">
import {
  type CSSProperties,
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  ref,
  useAttrs,
  watch,
} from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { HOVER_CARD_KEY } from './hover-card-types';
import type { HoverCardAlign, HoverCardSide } from './hover-card-types';

defineOptions({ name: 'UiHoverCardContent', inheritAttrs: false });

interface UiHoverCardContentProps {
  align?: HoverCardAlign;
  side?: HoverCardSide;
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

// ── Auto-positioning (fixed to viewport) ──────────────────────
const positionStyle = ref<CSSProperties>({});
let rafId: number | undefined;

function updatePosition() {
  const trigger = hoverCard.triggerRef.value;
  const content = hoverCard.contentRef.value;
  if (!trigger || !content) return;

  const triggerRect = trigger.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = props.viewportPadding;
  const gap = props.sideOffset;

  // ── Side: auto-flip ──
  let side: HoverCardSide = props.side;
  if (side === 'top') {
    if (
      triggerRect.top - gap < contentRect.height + pad &&
      vh - triggerRect.bottom - gap > triggerRect.top - gap
    ) {
      side = 'bottom';
    }
  } else if (side === 'bottom') {
    if (
      vh - triggerRect.bottom - gap < contentRect.height + pad &&
      triggerRect.top - gap > vh - triggerRect.bottom - gap
    ) {
      side = 'top';
    }
  } else if (side === 'left') {
    if (
      triggerRect.left - gap < contentRect.width + pad &&
      vw - triggerRect.right - gap > triggerRect.left - gap
    ) {
      side = 'right';
    }
  } else if (side === 'right') {
    if (
      vw - triggerRect.right - gap < contentRect.width + pad &&
      triggerRect.left - gap > vw - triggerRect.right - gap
    ) {
      side = 'left';
    }
  }

  let top: number;
  let left: number;

  if (side === 'top' || side === 'bottom') {
    top = side === 'top' ? triggerRect.top - contentRect.height - gap : triggerRect.bottom + gap;

    if (props.align === 'start') {
      left = triggerRect.left;
    } else if (props.align === 'end') {
      left = triggerRect.right - contentRect.width;
    } else {
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    }
  } else {
    left = side === 'left' ? triggerRect.left - contentRect.width - gap : triggerRect.right + gap;

    if (props.align === 'start') {
      top = triggerRect.top;
    } else if (props.align === 'end') {
      top = triggerRect.bottom - contentRect.height;
    } else {
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
    }
  }

  // ── Viewport clamping ──
  if (left < pad) left = pad;
  else if (left + contentRect.width > vw - pad) left = vw - pad - contentRect.width;

  if (top < pad) top = pad;
  else if (top + contentRect.height > vh - pad) top = vh - pad - contentRect.height;

  positionStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
  };
}

function onScroll() {
  hoverCard.close();
}

function onResize() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updatePosition();
    rafId = undefined;
  });
}

watch(
  () => hoverCard.isOpen.value,
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
            hoverCard.contentRef.value = el as HTMLElement;
          }
        "
        v-bind="restAttrs"
        :id="hoverCard.cardId"
        role="tooltip"
        :style="positionStyle"
        :class="
          cn(
            'z-50 w-64',
            'bg-popover text-popover-foreground',
            'rounded-md p-4 shadow-md outline-none',
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
