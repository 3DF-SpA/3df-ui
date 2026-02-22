<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';

import {
  CONTEXT_MENU_ITEM_KEY,
  CONTEXT_MENU_KEY,
  type ContextMenuItemData,
} from './context-menu-types';

defineOptions({ name: 'UiContextMenu' });

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });
const contentRef = ref<HTMLElement>();
const focusedIndex = ref(-1);
const items = ref<ContextMenuItemData[]>([]);

const activeSubId = ref<string | null>(null);
const subItems = ref<ContextMenuItemData[]>([]);
const subFocusedIndex = ref(-1);

function open(pos: { x: number; y: number }) {
  position.value = pos;
  isOpen.value = true;
  focusedIndex.value = -1;
  activeSubId.value = null;
}

function close() {
  isOpen.value = false;
  focusedIndex.value = -1;
  activeSubId.value = null;
  subFocusedIndex.value = -1;
}

function registerItem(data: ContextMenuItemData) {
  const existing = items.value.findIndex((i) => i.id === data.id);
  if (existing >= 0) {
    items.value[existing] = data;
  } else {
    items.value.push(data);
  }
}

function unregisterItem(id: string) {
  items.value = items.value.filter((i) => i.id !== id);
}

function openSub(id: string) {
  activeSubId.value = id;
  subFocusedIndex.value = -1;
  subItems.value = [];
}

function closeSub() {
  activeSubId.value = null;
  subFocusedIndex.value = -1;
  subItems.value = [];
}

function registerSubItem(data: ContextMenuItemData) {
  const existing = subItems.value.findIndex((i) => i.id === data.id);
  if (existing >= 0) {
    subItems.value[existing] = data;
  } else {
    subItems.value.push(data);
  }
}

function unregisterSubItem(id: string) {
  subItems.value = subItems.value.filter((i) => i.id !== id);
}

const enabledItems = computed(() =>
  items.value.map((item, index) => ({ ...item, index })).filter((item) => !item.disabled),
);

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (activeSubId.value) {
    const subEnabled = subItems.value
      .map((item, index) => ({ ...item, index }))
      .filter((item) => !item.disabled);

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const currentIdx = subEnabled.findIndex((i) => i.index === subFocusedIndex.value);
        const next = subEnabled[currentIdx + 1] ?? subEnabled[0];
        if (next) subFocusedIndex.value = next.index;
        return;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const currentIdx = subEnabled.findIndex((i) => i.index === subFocusedIndex.value);
        const prev = subEnabled[currentIdx - 1] ?? subEnabled[subEnabled.length - 1];
        if (prev) subFocusedIndex.value = prev.index;
        return;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        closeSub();
        return;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (subFocusedIndex.value >= 0) {
          const item = subItems.value[subFocusedIndex.value];
          if (item && !item.disabled) {
            item.action();
            close();
          }
        }
        return;
      }
      case 'Escape': {
        event.preventDefault();
        close();
        return;
      }
    }
  }

  const enabled = enabledItems.value;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
      const next = enabled[currentIdx + 1] ?? enabled[0];
      if (next) focusedIndex.value = next.index;
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
      const prev = enabled[currentIdx - 1] ?? enabled[enabled.length - 1];
      if (prev) focusedIndex.value = prev.index;
      break;
    }
    case 'ArrowRight': {
      event.preventDefault();
      if (focusedIndex.value >= 0) {
        const item = items.value[focusedIndex.value];
        if (item?.isSubTrigger && item.subId) {
          openSub(item.subId);
        }
      }
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      if (focusedIndex.value >= 0) {
        const item = items.value[focusedIndex.value];
        if (item && !item.disabled) {
          if (item.isSubTrigger && item.subId) {
            openSub(item.subId);
          } else {
            item.action();
            close();
          }
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
      if (enabled.length) focusedIndex.value = enabled[0]!.index;
      break;
    }
    case 'End': {
      event.preventDefault();
      if (enabled.length) focusedIndex.value = enabled[enabled.length - 1]!.index;
      break;
    }
  }
}

function onPointerDown(event: PointerEvent) {
  if (!isOpen.value) return;
  const target = event.target as Node;
  if (contentRef.value && !contentRef.value.contains(target)) {
    close();
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeydown, true);
  } else {
    document.removeEventListener('pointerdown', onPointerDown, true);
    document.removeEventListener('keydown', onKeydown, true);
  }
});

onMounted(() => {});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown, true);
  document.removeEventListener('keydown', onKeydown, true);
});

provide(CONTEXT_MENU_KEY, {
  isOpen,
  position,
  contentRef,
  focusedIndex,
  items,
  open,
  close,
  registerItem,
  unregisterItem,
  activeSubId,
  subItems,
  subFocusedIndex,
  openSub,
  closeSub,
  registerSubItem,
  unregisterSubItem,
});

provide(CONTEXT_MENU_ITEM_KEY, {
  register: registerItem,
  unregister: unregisterItem,
  focusedIndex,
  items,
});
</script>

<template>
  <slot />
</template>
