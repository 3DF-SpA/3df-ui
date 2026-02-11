<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';

import {
  MENUBAR_KEY,
  MENUBAR_MENU_KEY,
  type MenubarItemData,
} from './menubar-types';

defineOptions({ name: 'UiMenubarMenu' });

interface UiMenubarMenuProps {
  value?: string;
}

const props = withDefaults(defineProps<UiMenubarMenuProps>(), {
  value: undefined,
});

const menubar = inject(MENUBAR_KEY)!;

const generatedValue = `menu-${Math.random().toString(36).slice(2, 9)}`;
const menuValue = props.value ?? generatedValue;
const triggerId = `menubar-trigger-${Math.random().toString(36).slice(2, 9)}`;

const isOpen = computed(() => menubar.activeMenu.value === menuValue);
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const focusedIndex = ref(-1);
const items = ref<MenubarItemData[]>([]);

// Sub-menu state
const activeSubId = ref<string | null>(null);
const subItems = ref<MenubarItemData[]>([]);
const subFocusedIndex = ref(-1);

const enabledItems = computed(() =>
  items.value.map((item, idx) => ({ ...item, index: idx })).filter((i) => !i.disabled),
);

const enabledSubItems = computed(() =>
  subItems.value.map((item, idx) => ({ ...item, index: idx })).filter((i) => !i.disabled),
);

function registerItem(data: MenubarItemData) {
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

function registerSubItem(data: MenubarItemData) {
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

function openSub(id: string) {
  if (activeSubId.value === id) return;
  activeSubId.value = id;
  subItems.value = [];
  subFocusedIndex.value = -1;
}

function closeSub() {
  activeSubId.value = null;
  subFocusedIndex.value = -1;
}

function close() {
  closeSub();
  menubar.closeAll();
}

// Auto-focus first enabled sub-item when sub opens
watch(enabledSubItems, (enabled) => {
  if (activeSubId.value && subFocusedIndex.value === -1 && enabled.length) {
    subFocusedIndex.value = enabled[0]!.index;
  }
});

// Close sub when focus moves away from the sub-trigger (mouse hover)
watch(focusedIndex, (newIdx) => {
  if (activeSubId.value && newIdx >= 0) {
    const item = items.value[newIdx];
    if (!item?.isSubTrigger || item.subId !== activeSubId.value) {
      closeSub();
    }
  }
});

// Reset on close, auto-focus first item on open
watch(isOpen, (open) => {
  if (open) {
    nextTick(() => {
      const enabled = enabledItems.value;
      if (enabled.length) focusedIndex.value = enabled[0]!.index;
    });
  } else {
    focusedIndex.value = -1;
    closeSub();
  }
});

// ── Keyboard handler ──────────────────────────────────────────
function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (activeSubId.value) {
    handleSubKeydown(event);
    return;
  }

  handleMenuKeydown(event);
}

function handleMenuKeydown(event: KeyboardEvent) {
  const enabled = enabledItems.value;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      if (!enabled.length) return;
      const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
      const next = enabled[currentIdx + 1] ?? enabled[0];
      if (next) focusedIndex.value = next.index;
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (!enabled.length) return;
      const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
      const prev = enabled[currentIdx - 1] ?? enabled[enabled.length - 1];
      if (prev) focusedIndex.value = prev.index;
      break;
    }
    case 'ArrowRight': {
      event.preventDefault();
      const currentItem = items.value[focusedIndex.value];
      if (currentItem?.isSubTrigger && currentItem.subId) {
        openSub(currentItem.subId);
      } else {
        menubar.navigateMenu('next');
      }
      break;
    }
    case 'ArrowLeft': {
      event.preventDefault();
      menubar.navigateMenu('prev');
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      const currentItem = items.value[focusedIndex.value];
      if (!currentItem || currentItem.disabled) return;
      if (currentItem.isSubTrigger && currentItem.subId) {
        openSub(currentItem.subId);
      } else {
        currentItem.action();
        close();
      }
      break;
    }
    case 'Escape': {
      event.preventDefault();
      close();
      break;
    }
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

function handleSubKeydown(event: KeyboardEvent) {
  const enabled = enabledSubItems.value;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      if (!enabled.length) return;
      const currentIdx = enabled.findIndex((i) => i.index === subFocusedIndex.value);
      const next = enabled[currentIdx + 1] ?? enabled[0];
      if (next) subFocusedIndex.value = next.index;
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (!enabled.length) return;
      const currentIdx = enabled.findIndex((i) => i.index === subFocusedIndex.value);
      const prev = enabled[currentIdx - 1] ?? enabled[enabled.length - 1];
      if (prev) subFocusedIndex.value = prev.index;
      break;
    }
    case 'ArrowLeft': {
      event.preventDefault();
      closeSub();
      break;
    }
    case 'ArrowRight': {
      event.preventDefault();
      menubar.navigateMenu('next');
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      const currentItem = subItems.value[subFocusedIndex.value];
      if (!currentItem || currentItem.disabled) return;
      currentItem.action();
      close();
      break;
    }
    case 'Escape': {
      event.preventDefault();
      closeSub();
      break;
    }
    case 'Home': {
      event.preventDefault();
      if (enabled.length) subFocusedIndex.value = enabled[0]!.index;
      break;
    }
    case 'End': {
      event.preventDefault();
      if (enabled.length) subFocusedIndex.value = enabled[enabled.length - 1]!.index;
      break;
    }
  }
}

onMounted(() => {
  menubar.registerMenu(menuValue);
});

onBeforeUnmount(() => {
  menubar.unregisterMenu(menuValue);
});

provide(MENUBAR_MENU_KEY, {
  value: menuValue,
  isOpen,
  triggerRef,
  contentRef,
  focusedIndex,
  items,
  triggerId,
  registerItem,
  unregisterItem,
  close,
  activeSubId,
  subItems,
  subFocusedIndex,
  openSub,
  closeSub,
  registerSubItem,
  unregisterSubItem,
});
</script>

<template>
  <div role="none" @keydown="onKeydown">
    <slot />
  </div>
</template>
