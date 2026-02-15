<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DIALOG_KEY } from './dialog-types';

defineOptions({ name: 'UiDialogContent', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Visual variant */
    variant?: 'default';
    /** Show close button (×) */
    showClose?: boolean;
    /** Close when clicking overlay */
    closeOnOverlay?: boolean;
  }>(),
  {
    variant: 'default',
    showClose: true,
    closeOnOverlay: true,
  },
);

const dialog = inject(DIALOG_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const panelRef = ref<HTMLElement>();

// ── Visibility & animation ──
const isVisible = ref(false);
const isAnimating = ref(false);
let animTimeout: ReturnType<typeof setTimeout> | undefined;

function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

// ── Focus trap ──
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e: KeyboardEvent) {
  if (e.key !== 'Tab' || !panelRef.value) return;

  const focusable = Array.from(
    panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
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
  () => dialog.isOpen.value,
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
      unlockScroll();
      animTimeout = setTimeout(() => {
        isVisible.value = false;
        previousActiveElement?.focus();
      }, 200);
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
});

function onOverlayClick() {
  if (props.closeOnOverlay) {
    dialog.close();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50">
      <!-- Overlay with backdrop blur -->
      <div
        class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
        :class="isAnimating ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
        @click="onOverlayClick"
      />

      <!-- Centering wrapper -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <!-- Panel -->
        <div
          ref="panelRef"
          v-bind="restAttrs"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="dialog.titleId"
          :aria-describedby="dialog.descriptionId"
          :class="
            cn(
              'relative z-50 grid w-full max-w-lg gap-4 rounded-lg border-2 border-border p-6 shadow-lg',
              'transition-all duration-200',
              'bg-popover',
              isAnimating
                ? 'scale-100 opacity-100'
                : 'scale-95 opacity-0',
              attrs.class,
            )
          "
          :data-state="isAnimating ? 'open' : 'closed'"
          data-dialog="content"
        >
          <slot />

          <!-- Close button -->
          <button
            v-if="showClose"
            type="button"
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
            @click="dialog.close()"
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
    </div>
  </Teleport>
</template>
