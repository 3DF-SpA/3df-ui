<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DRAWER_KEY } from './drawer-types';

defineOptions({ name: 'UiDrawerContent', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: 'default';
    showClose?: boolean;
    dragCloseThreshold?: number;
  }>(),
  {
    variant: 'default',
    showClose: true,
    dragCloseThreshold: 0.4,
  },
);

const drawer = inject(DRAWER_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const panelRef = ref<HTMLElement>();

const isVisible = ref(false);
const isAnimating = ref(false);
let animTimeout: ReturnType<typeof setTimeout> | undefined;

const isDragging = ref(false);
const dragOffset = ref(0);

let startY = 0;
let currentY = 0;

function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e: KeyboardEvent) {
  if (e.key !== 'Tab' || !panelRef.value) return;

  const focusable = Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  if (focusable.length === 0) {
    e.preventDefault();
    return;
  }

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

let previousActiveElement: HTMLElement | null = null;

watch(
  () => drawer.isOpen.value,
  async (open) => {
    if (open) {
      previousActiveElement = document.activeElement as HTMLElement | null;
      isVisible.value = true;
      lockScroll();
      await nextTick();
      panelRef.value?.getBoundingClientRect();
      isAnimating.value = true;
      await nextTick();
      const firstFocusable = panelRef.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (firstFocusable ?? panelRef.value)?.focus();
    } else {
      isAnimating.value = false;
      dragOffset.value = 0;
      unlockScroll();
      animTimeout = setTimeout(() => {
        isVisible.value = false;
        previousActiveElement?.focus();
      }, 400);
    }
  },
  { immediate: true },
);

watch(isVisible, (val) => {
  if (val) {
    document.addEventListener('keydown', trapFocus);
  } else {
    document.removeEventListener('keydown', trapFocus);
  }
});

onBeforeUnmount(() => {
  unlockScroll();
  if (animTimeout) clearTimeout(animTimeout);
  document.removeEventListener('keydown', trapFocus);
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
});

function onPointerDown(e: PointerEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest('[data-drawer-handle]') && !target.closest('[data-drawer-header]')) return;

  isDragging.value = true;
  startY = e.clientY;
  currentY = e.clientY;
  dragOffset.value = 0;

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return;
  currentY = e.clientY;
  const delta = currentY - startY;
  dragOffset.value = Math.max(0, delta);
}

function onPointerUp() {
  if (!isDragging.value) return;
  isDragging.value = false;

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);

  const panel = panelRef.value;
  if (!panel) return;

  const panelHeight = panel.getBoundingClientRect().height;
  if (dragOffset.value > panelHeight * props.dragCloseThreshold) {
    drawer.close();
  } else {
    dragOffset.value = 0;
  }
}

function onOverlayClick() {
  drawer.close();
}

const panelStyle = computed(() => {
  if (isDragging.value || dragOffset.value > 0) {
    return {
      transform: `translateY(${dragOffset.value}px)`,
      transition: isDragging.value ? 'none' : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
    };
  }
  return {};
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50">
      <div
        class="fixed inset-0 bg-black/80 transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="isAnimating ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
        @click="onOverlayClick"
      />

      <div
        ref="panelRef"
        v-bind="restAttrs"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="drawer.titleId"
        :aria-describedby="drawer.descriptionId"
        :class="
          cn(
            'border-ui border-border fixed inset-x-0 bottom-0 z-50 flex max-h-[96dvh] flex-col rounded-t-xl',
            'bg-popover',
            'transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isAnimating && !isDragging && dragOffset === 0
              ? 'translate-y-0'
              : !isAnimating
                ? 'translate-y-full'
                : '',
            attrs.class,
          )
        "
        :style="panelStyle"
        :data-state="isAnimating ? 'open' : 'closed'"
        data-drawer="content"
        @pointerdown="onPointerDown"
      >
        <div
          data-drawer-handle
          class="bg-muted-foreground/20 mx-auto mt-4 h-1.5 w-12 shrink-0 cursor-grab rounded-full active:cursor-grabbing"
        />

        <slot />

        <button
          v-if="showClose"
          type="button"
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          aria-label="Close"
          @click="drawer.close()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>
