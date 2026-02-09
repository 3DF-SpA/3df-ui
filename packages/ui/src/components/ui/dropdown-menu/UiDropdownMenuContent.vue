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

defineOptions({ name: 'UiDropdownMenuContent', inheritAttrs: false });

type Align = 'start' | 'center' | 'end';
type Side = 'top' | 'bottom';

interface UiDropdownMenuContentProps {
  align?: Align;
  side?: Side;
  /** Gap between trigger and content in px */
  sideOffset?: number;
  /** Minimum distance from viewport edge in px */
  viewportPadding?: number;
}

const props = withDefaults(defineProps<UiDropdownMenuContentProps>(), {
  align: 'start',
  side: 'bottom',
  sideOffset: 4,
  viewportPadding: 8,
});

const menu = inject<{
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  triggerId: string;
  close: () => void;
}>('dropdown-menu')!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

// ── Auto-positioning (fixed to viewport) ──────────────────────
const positionStyle = ref<CSSProperties>({});

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

  // ── Side (vertical): auto-flip if not enough space ──
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

  // ── Align (horizontal): auto-flip if overflows ──
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

  // ── Compute fixed position (viewport coords) ──
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

  // ── Viewport clamping (shift) ──
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
  // Ignore scroll events from inside the dropdown content itself
  const target = event.target as Node | null;
  if (menu.contentRef.value && target && menu.contentRef.value.contains(target)) return;
  menu.close();
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
        v-if="menu.isOpen.value"
        :ref="
          (el) => {
            menu.contentRef.value = el as HTMLElement;
          }
        "
        v-bind="restAttrs"
        role="menu"
        :aria-labelledby="menu.triggerId"
        :style="positionStyle"
        :class="
          cn(
            'z-50 min-w-[8rem]',
            'border-border bg-popover text-popover-foreground border',
            'rounded-md p-1 shadow-md',
            'max-h-[var(--dropdown-max-h,20rem)] overflow-auto',
            attrs.class,
          )
        "
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
