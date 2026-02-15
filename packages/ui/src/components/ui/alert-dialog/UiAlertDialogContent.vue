<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialogContent', inheritAttrs: false });

const ctx = inject(ALERT_DIALOG_KEY)!;

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
  () => ctx.isOpen.value,
  async (open) => {
    if (open) {
      previousActiveElement = document.activeElement as HTMLElement | null;
      isVisible.value = true;
      lockScroll();
      await nextTick();
      panelRef.value?.getBoundingClientRect();
      isAnimating.value = true;
      await nextTick();
      // Focus the cancel button (data-alert-dialog-cancel) for safety,
      // otherwise fall back to first focusable element
      const cancelBtn = panelRef.value?.querySelector<HTMLElement>('[data-alert-dialog-cancel]');
      const firstFocusable = panelRef.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (cancelBtn ?? firstFocusable ?? panelRef.value)?.focus();
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
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50">
      <!-- Overlay — does NOT close on click (AlertDialog behavior) -->
      <div
        class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
        :class="isAnimating ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
      />

      <!-- Centering wrapper -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <!-- Panel -->
        <div
          ref="panelRef"
          v-bind="restAttrs"
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="ctx.titleId"
          :aria-describedby="ctx.descriptionId"
          :class="
            cn(
              'relative z-50 grid w-full max-w-lg gap-4 rounded-lg bg-popover p-6 shadow-lg',
              'transition-all duration-200',
              isAnimating
                ? 'scale-100 opacity-100'
                : 'scale-95 opacity-0',
              attrs.class,
            )
          "
          :data-state="isAnimating ? 'open' : 'closed'"
          data-alert-dialog="content"
        >
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
