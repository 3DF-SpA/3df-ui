<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { NAV_MENU_KEY } from './navigation-menu-types';

defineOptions({ name: 'UiNavigationMenu', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const rootRef = ref<HTMLElement>();
const activeValue = ref('');
const viewportRef = ref<HTMLElement>();
let enterTimer: ReturnType<typeof setTimeout> | undefined;
let leaveTimer: ReturnType<typeof setTimeout> | undefined;

// ─── Open / Close ─────────────────────────────────────────────
function open(value: string) {
  clearTimeout(leaveTimer);
  clearTimeout(enterTimer);
  activeValue.value = value;
}

function close() {
  clearTimeout(enterTimer);
  clearTimeout(leaveTimer);
  activeValue.value = '';
}

// ─── Hover delays ─────────────────────────────────────────────
function onTriggerEnter(value: string) {
  clearTimeout(leaveTimer);
  if (activeValue.value) {
    // Already open → switch immediately
    activeValue.value = value;
  } else {
    clearTimeout(enterTimer);
    enterTimer = setTimeout(() => {
      activeValue.value = value;
    }, 200);
  }
}

function onTriggerLeave() {
  clearTimeout(enterTimer);
  leaveTimer = setTimeout(() => {
    activeValue.value = '';
  }, 300);
}

function onContentEnter() {
  clearTimeout(leaveTimer);
}

function onContentLeave() {
  leaveTimer = setTimeout(() => {
    activeValue.value = '';
  }, 300);
}

// ─── Click outside ────────────────────────────────────────────
function onDocPointerDown(event: PointerEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown, true);
});

onBeforeUnmount(() => {
  clearTimeout(enterTimer);
  clearTimeout(leaveTimer);
  document.removeEventListener('pointerdown', onDocPointerDown, true);
});

provide(NAV_MENU_KEY, {
  activeValue,
  viewportRef,
  open,
  close,
  onTriggerEnter,
  onTriggerLeave,
  onContentEnter,
  onContentLeave,
});

const isOpen = computed(() => activeValue.value !== '');

const classes = computed(() =>
  cn(
    'relative flex max-w-max flex-1 items-center justify-center',
    isOpen.value ? 'z-50' : 'z-10',
    attrs.class,
  ),
);
</script>

<template>
  <nav
    ref="rootRef"
    v-bind="restAttrs"
    :class="classes"
    aria-label="Main"
    @keydown.escape="close"
  >
    <slot />
  </nav>
</template>
