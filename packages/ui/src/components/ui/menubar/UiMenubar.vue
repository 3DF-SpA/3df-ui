<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { MENUBAR_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubar', inheritAttrs: false });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const activeMenu = ref<string | null>(null);
const menuOrder = ref<string[]>([]);
const triggerElements = new Map<string, HTMLElement>();
const rootRef = ref<HTMLElement>();

function registerMenu(value: string) {
  if (!menuOrder.value.includes(value)) {
    menuOrder.value.push(value);
  }
}

function unregisterMenu(value: string) {
  menuOrder.value = menuOrder.value.filter((v) => v !== value);
  triggerElements.delete(value);
}

function setTriggerRef(value: string, el: HTMLElement) {
  triggerElements.set(value, el);
}

function focusTrigger(value: string) {
  const el = triggerElements.get(value);
  if (el) {
    const focusable = el.querySelector<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])',
    );
    (focusable ?? el)?.focus();
  }
}

function openMenu(value: string) {
  activeMenu.value = value;
}

function closeAll() {
  const prev = activeMenu.value;
  activeMenu.value = null;
  if (prev) focusTrigger(prev);
}

function navigateMenu(direction: 'next' | 'prev') {
  const order = menuOrder.value;
  if (!order.length) return;

  const currentIdx = activeMenu.value ? order.indexOf(activeMenu.value) : -1;
  let nextIdx: number;

  if (direction === 'next') {
    nextIdx = currentIdx < 0 ? 0 : (currentIdx + 1) % order.length;
  } else {
    nextIdx = currentIdx < 0 ? order.length - 1 : (currentIdx - 1 + order.length) % order.length;
  }

  const nextValue = order[nextIdx];
  if (nextValue) {
    activeMenu.value = nextValue;
    focusTrigger(nextValue);
  }
}

const isAnyOpen = computed(() => activeMenu.value !== null);

function onClickOutside(event: MouseEvent) {
  if (!activeMenu.value) return;

  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    const menubarContents = Array.from(document.querySelectorAll('[data-menubar-content]'));
    for (const content of menubarContents) {
      if (content.contains(event.target as Node)) return;
    }
    closeAll();
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true);
});

provide(MENUBAR_KEY, {
  activeMenu,
  openMenu,
  closeAll,
  navigateMenu,
  registerMenu,
  unregisterMenu,
  setTriggerRef,
  focusTrigger,
  isAnyOpen,
});
</script>

<template>
  <div
    ref="rootRef"
    v-bind="restAttrs"
    role="menubar"
    :class="
      cn(
        'flex h-9 items-center space-x-1 rounded-md border-ui border-border bg-card p-1 shadow-sm',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
