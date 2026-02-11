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
import { TOOLTIP_KEY } from './tooltip-types';

defineOptions({ name: 'UiTooltipContent', inheritAttrs: false });

type Align = 'start' | 'center' | 'end';
type Side = 'top' | 'bottom' | 'left' | 'right';

interface UiTooltipContentProps {
  align?: Align;
  side?: Side;
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

// ── Auto-positioning (fixed to viewport) ──────────────────────
const positionStyle = ref<CSSProperties>({});
let rafId: number | undefined;

function updatePosition() {
  const trigger = tooltip.triggerRef.value;
  const content = tooltip.contentRef.value;
  if (!trigger || !content) return;

  const triggerRect = trigger.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = props.viewportPadding;
  const gap = props.sideOffset;

  // ── Side: auto-flip ──
  let side = props.side;
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
    // Vertical positioning
    top = side === 'top' ? triggerRect.top - contentRect.height - gap : triggerRect.bottom + gap;

    // Horizontal alignment
    if (props.align === 'start') {
      left = triggerRect.left;
    } else if (props.align === 'end') {
      left = triggerRect.right - contentRect.width;
    } else {
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    }
  } else {
    // Horizontal positioning (left/right)
    left = side === 'left' ? triggerRect.left - contentRect.width - gap : triggerRect.right + gap;

    // Vertical alignment
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
  tooltip.close();
}

function onResize() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updatePosition();
    rafId = undefined;
  });
}

watch(
  () => tooltip.isOpen.value,
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
            tooltip.contentRef.value = el as HTMLElement;
          }
        "
        v-bind="restAttrs"
        :id="tooltip.tooltipId"
        role="tooltip"
        :style="positionStyle"
        :class="
          cn(
            'z-50 max-w-xs',
            'border-border bg-popover text-popover-foreground border',
            'rounded-md px-3 py-1.5 text-sm shadow-md',
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
