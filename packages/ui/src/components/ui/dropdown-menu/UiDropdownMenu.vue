<script setup lang="ts">
import { type Ref, computed, onBeforeUnmount, provide, ref, watch } from 'vue';

import { DROPDOWN_MENU_KEY } from './dropdown-menu-types';

defineOptions({ name: 'UiDropdownMenu' });

const isOpen = ref(false);
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const focusedIndex = ref(-1);
const items: Ref<{ id: string; disabled: boolean; action: () => void }[]> = ref([]);
const triggerId = `dropdown-trigger-${Math.random().toString(36).slice(2, 9)}`;

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
  focusedIndex.value = -1;
  // Focus the first focusable element inside the trigger (e.g. the Button)
  const focusable = triggerRef.value?.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  (focusable ?? triggerRef.value)?.focus();
}

function toggle() {
  if (isOpen.value) {
    close();
  } else {
    open();
  }
}

function registerItem(id: string, disabled: boolean, action: () => void) {
  const existing = items.value.findIndex((i) => i.id === id);
  if (existing >= 0) {
    items.value[existing] = { id, disabled, action };
  } else {
    items.value.push({ id, disabled, action });
  }
}

function unregisterItem(id: string) {
  items.value = items.value.filter((i) => i.id !== id);
}

const enabledItems = computed(() =>
  items.value.map((item, index) => ({ ...item, index })).filter((item) => !item.disabled),
);

function onKeydown(event: KeyboardEvent) {
  const enabled = enabledItems.value;
  if (!enabled.length) return;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      if (!isOpen.value) {
        open();
        focusedIndex.value = enabled[0]?.index ?? 0;
      } else {
        const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
        const next = enabled[currentIdx + 1] ?? enabled[0];
        if (next) focusedIndex.value = next.index;
      }
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (!isOpen.value) {
        open();
        focusedIndex.value = enabled[enabled.length - 1]?.index ?? 0;
      } else {
        const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
        const prev = enabled[currentIdx - 1] ?? enabled[enabled.length - 1];
        if (prev) focusedIndex.value = prev.index;
      }
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      if (!isOpen.value) {
        open();
        focusedIndex.value = enabled[0]?.index ?? 0;
      } else if (focusedIndex.value >= 0) {
        const item = items.value[focusedIndex.value];
        if (item && !item.disabled) {
          item.action();
          close();
        }
      }
      break;
    }
    case 'Escape':
      event.preventDefault();
      close();
      break;
    case 'Tab':
      close();
      break;
    case 'Home': {
      event.preventDefault();
      if (isOpen.value && enabled.length) {
        focusedIndex.value = enabled[0]!.index;
      }
      break;
    }
    case 'End': {
      event.preventDefault();
      if (isOpen.value && enabled.length) {
        focusedIndex.value = enabled[enabled.length - 1]!.index;
      }
      break;
    }
  }
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (
    triggerRef.value &&
    !triggerRef.value.contains(target) &&
    contentRef.value &&
    !contentRef.value.contains(target)
  ) {
    close();
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', onClickOutside, true);
  } else {
    document.removeEventListener('click', onClickOutside, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true);
});

provide(DROPDOWN_MENU_KEY, {
  isOpen,
  triggerRef,
  contentRef,
  focusedIndex,
  items,
  triggerId,
  toggle,
  open,
  close,
  registerItem,
  unregisterItem,
  onKeydown,
});
</script>

<template>
  <div class="inline-block" @keydown="onKeydown">
    <slot />
  </div>
</template>
