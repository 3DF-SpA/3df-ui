<script setup lang="ts">
import { type Ref, onBeforeUnmount, onMounted, provide, ref } from 'vue';

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

function getEnabledItems() {
  return items.value.map((item, index) => ({ ...item, index })).filter((item) => !item.disabled);
}

function onKeydown(event: KeyboardEvent) {
  const enabledItems = getEnabledItems();
  if (!enabledItems.length) return;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      if (!isOpen.value) {
        open();
        focusedIndex.value = enabledItems[0]?.index ?? 0;
      } else {
        const currentIdx = enabledItems.findIndex((i) => i.index === focusedIndex.value);
        const next = enabledItems[currentIdx + 1] ?? enabledItems[0];
        if (next) focusedIndex.value = next.index;
      }
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (!isOpen.value) {
        open();
        focusedIndex.value = enabledItems[enabledItems.length - 1]?.index ?? 0;
      } else {
        const currentIdx = enabledItems.findIndex((i) => i.index === focusedIndex.value);
        const prev = enabledItems[currentIdx - 1] ?? enabledItems[enabledItems.length - 1];
        if (prev) focusedIndex.value = prev.index;
      }
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      if (!isOpen.value) {
        open();
        focusedIndex.value = enabledItems[0]?.index ?? 0;
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
      if (isOpen.value && enabledItems.length) {
        focusedIndex.value = enabledItems[0]!.index;
      }
      break;
    }
    case 'End': {
      event.preventDefault();
      if (isOpen.value && enabledItems.length) {
        focusedIndex.value = enabledItems[enabledItems.length - 1]!.index;
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

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});

provide('dropdown-menu', {
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
