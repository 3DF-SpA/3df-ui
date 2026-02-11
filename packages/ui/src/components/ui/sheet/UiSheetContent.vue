<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { sheetVariants, type SheetSide } from './sheet-variants';
import { SHEET_INJECTION_KEY, type SheetContext } from './sheet-types';

defineOptions({ name: 'UiSheetContent', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    side?: SheetSide;
    /** Mostrar botón de cierre (×) */
    showClose?: boolean;
  }>(),
  {
    side: 'right',
    showClose: true,
  },
);

const sheet = inject<SheetContext>(SHEET_INJECTION_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const panelRef = ref<HTMLElement>();

/* ── Posición CSS para las transiciones ── */
const translateHidden: Record<SheetSide, string> = {
  top: '-translate-y-full',
  bottom: 'translate-y-full',
  left: '-translate-x-full',
  right: 'translate-x-full',
};

const panelClasses = computed(() =>
  cn(
    sheetVariants({ side: props.side }),
    attrs.class,
  ),
);

/* ── Body scroll lock ── */
let scrollLocked = false;
function lockScroll() {
  if (!scrollLocked) {
    document.body.style.overflow = 'hidden';
    scrollLocked = true;
  }
}
function unlockScroll() {
  if (scrollLocked) {
    document.body.style.overflow = '';
    scrollLocked = false;
  }
}

/* ── Focus trap ── */
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

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

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

/* Restaurar el foco al trigger al cerrar */
let previousActiveElement: HTMLElement | null = null;

/* ── Animación con clases manuales (sin <Transition>) ── */
const isVisible = ref(false);
const isAnimating = ref(false);
let animFrame: number | undefined;

watch(
  () => sheet.isOpen.value,
  async (open) => {
    if (open) {
      previousActiveElement = document.activeElement as HTMLElement | null;
      isVisible.value = true;
      lockScroll();
      await nextTick();
      // Forzar reflow para que la transición funcione
      panelRef.value?.getBoundingClientRect();
      isAnimating.value = true;
      // Focus al panel
      await nextTick();
      const firstFocusable = panelRef.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (firstFocusable ?? panelRef.value)?.focus();
    } else {
      isAnimating.value = false;
      unlockScroll();
      // Esperar que termine la animación (400ms)
      animFrame = window.setTimeout(() => {
        isVisible.value = false;
        previousActiveElement?.focus();
      }, 400);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  unlockScroll();
  if (animFrame) clearTimeout(animFrame);
  document.removeEventListener('keydown', trapFocus);
});

/* Registrar/desregistrar focus trap */
watch(isVisible, (val) => {
  if (val) {
    document.addEventListener('keydown', trapFocus);
  } else {
    document.removeEventListener('keydown', trapFocus);
  }
});

function onOverlayClick() {
  sheet.close();
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/80 transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="isAnimating ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
        @click="onOverlayClick"
      />

      <!-- Panel -->
      <div
        ref="panelRef"
        v-bind="restAttrs"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="sheet.titleId"
        :aria-describedby="sheet.descriptionId"
        :class="[panelClasses, isAnimating ? 'translate-x-0 translate-y-0 opacity-100' : [translateHidden[props.side], 'opacity-0']]"
        :data-state="isAnimating ? 'open' : 'closed'"
        data-sheet="content"
      >
        <slot />

        <!-- Botón cerrar -->
        <button
          v-if="showClose"
          type="button"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          aria-label="Cerrar"
          @click="sheet.close()"
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
          <span class="sr-only">Cerrar</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>
