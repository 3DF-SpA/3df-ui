<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';

import {
  handleMenuKeydown as menuKeydown,
  handleSubKeydown as subKeydown,
} from './menubar-keyboard';
import { MENUBAR_KEY, MENUBAR_MENU_KEY, type MenubarItemData } from './menubar-types';

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

const activeSubId = ref<string | null>(null);
const subItems = ref<MenubarItemData[]>([]);
const subFocusedIndex = ref(-1);

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

watch(enabledSubItems, (enabled) => {
  if (activeSubId.value && subFocusedIndex.value === -1 && enabled.length) {
    subFocusedIndex.value = enabled[0]!.index;
  }
});

watch(focusedIndex, (newIdx) => {
  if (activeSubId.value && newIdx >= 0) {
    const item = items.value[newIdx];
    if (!item?.isSubTrigger || item.subId !== activeSubId.value) {
      closeSub();
    }
  }
});

watch(isOpen, (open) => {
  if (open) {
    nextTick(() => {
      const enabled = items.value
        .map((item, idx) => ({ ...item, index: idx }))
        .filter((i) => !i.disabled);
      if (enabled.length) focusedIndex.value = enabled[0]!.index;
    });
  } else {
    focusedIndex.value = -1;
    closeSub();
  }
});

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (activeSubId.value) {
    subKeydown(event, {
      subItems,
      subFocusedIndex,
      closeSub,
      navigateMenu: menubar.navigateMenu,
      close,
    });
    return;
  }

  menuKeydown(event, {
    items,
    focusedIndex,
    openSub,
    navigateMenu: menubar.navigateMenu,
    close,
  });
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
