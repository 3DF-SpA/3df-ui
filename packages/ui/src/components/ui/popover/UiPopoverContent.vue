<script setup lang="ts">
import {
  type CSSProperties,
  type Ref,
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

defineOptions({ name: 'UiPopoverContent', inheritAttrs: false });

type Align = 'start' | 'center' | 'end';
type Side = 'top' | 'bottom';

interface UiPopoverContentProps {
  align?: Align;
  side?: Side;
  sideOffset?: number;
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiPopoverContentProps>(), {
  align: 'center',
  side: 'bottom',
  sideOffset: 4,
  viewportPadding: 8,
});

const popover = inject<{
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  triggerId: string;
  close: () => void;
}>('popover')!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

// ── Auto-positioning (fixed to viewport) ──────────────────────
const positionStyle = ref<CSSProperties>({});

function updatePosition() {
  const trigger = popover.triggerRef.value;
  const content = popover.contentRef.value;
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

  // ── Compute fixed position ──
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
  if (left < pad) {
    left = pad;
  } else if (left + contentRect.width > vw - pad) {
    left = vw - pad - contentRect.width;
  }

  if (top < pad) {
    top = pad;
  } else if (top + contentRect.height > vh - pad) {
    top = vh - pad - contentRect.height;
  }

  positionStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
  };
}

function onScroll(event: Event) {
  const target = event.target as Node | null;
  if (popover.contentRef.value && target && popover.contentRef.value.contains(target)) return;
  popover.close();
}

watch(
  () => popover.isOpen.value,
  async (open) => {
    if (open) {
      await nextTick();
      updatePosition();
      await nextTick();
      updatePosition();
      window.addEventListener('scroll', onScroll, true);
      window.addEventListener('resize', updatePosition);
    } else {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', updatePosition);
    }
  },
);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll, true);
  window.removeEventListener('resize', updatePosition);
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
            popover.contentRef.value = el as HTMLElement;
          }
        "
        v-bind="restAttrs"
        role="dialog"
        :aria-labelledby="popover.triggerId"
        tabindex="-1"
        :style="positionStyle"
        :class="
          cn(
            'z-50 w-72',
            'border-border bg-popover text-popover-foreground border',
            'rounded-md p-4 shadow-md',
            attrs.class,
          )
        "
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
