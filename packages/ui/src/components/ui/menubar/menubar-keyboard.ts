import type { Ref } from 'vue';

import type { MenubarItemData } from './menubar-types';

interface EnabledItem extends MenubarItemData {
  index: number;
}

function getEnabledItems(items: MenubarItemData[]): EnabledItem[] {
  return items.map((item, idx) => ({ ...item, index: idx })).filter((i) => !i.disabled);
}

function navigateList(
  enabled: EnabledItem[],
  focusedIndex: Ref<number>,
  direction: 'next' | 'prev' | 'first' | 'last',
) {
  if (!enabled.length) return;
  switch (direction) {
    case 'next': {
      const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
      const next = enabled[currentIdx + 1] ?? enabled[0];
      if (next) focusedIndex.value = next.index;
      break;
    }
    case 'prev': {
      const currentIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
      const prev = enabled[currentIdx - 1] ?? enabled[enabled.length - 1];
      if (prev) focusedIndex.value = prev.index;
      break;
    }
    case 'first':
      focusedIndex.value = enabled[0]!.index;
      break;
    case 'last':
      focusedIndex.value = enabled[enabled.length - 1]!.index;
      break;
  }
}

export interface MenuKeydownDeps {
  items: Ref<MenubarItemData[]>;
  focusedIndex: Ref<number>;
  openSub: (id: string) => void;
  navigateMenu: (direction: 'next' | 'prev') => void;
  close: () => void;
}

export function handleMenuKeydown(event: KeyboardEvent, deps: MenuKeydownDeps) {
  const enabled = getEnabledItems(deps.items.value);

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      navigateList(enabled, deps.focusedIndex, 'next');
      break;
    case 'ArrowUp':
      event.preventDefault();
      navigateList(enabled, deps.focusedIndex, 'prev');
      break;
    case 'ArrowRight': {
      event.preventDefault();
      const currentItem = deps.items.value[deps.focusedIndex.value];
      if (currentItem?.isSubTrigger && currentItem.subId) {
        deps.openSub(currentItem.subId);
      } else {
        deps.navigateMenu('next');
      }
      break;
    }
    case 'ArrowLeft':
      event.preventDefault();
      deps.navigateMenu('prev');
      break;
    case 'Enter':
    case ' ': {
      event.preventDefault();
      const currentItem = deps.items.value[deps.focusedIndex.value];
      if (!currentItem || currentItem.disabled) return;
      if (currentItem.isSubTrigger && currentItem.subId) {
        deps.openSub(currentItem.subId);
      } else {
        currentItem.action();
        deps.close();
      }
      break;
    }
    case 'Escape':
      event.preventDefault();
      deps.close();
      break;
    case 'Home':
      event.preventDefault();
      navigateList(enabled, deps.focusedIndex, 'first');
      break;
    case 'End':
      event.preventDefault();
      navigateList(enabled, deps.focusedIndex, 'last');
      break;
  }
}

export interface SubKeydownDeps {
  subItems: Ref<MenubarItemData[]>;
  subFocusedIndex: Ref<number>;
  closeSub: () => void;
  navigateMenu: (direction: 'next' | 'prev') => void;
  close: () => void;
}

export function handleSubKeydown(event: KeyboardEvent, deps: SubKeydownDeps) {
  const enabled = getEnabledItems(deps.subItems.value);

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      navigateList(enabled, deps.subFocusedIndex, 'next');
      break;
    case 'ArrowUp':
      event.preventDefault();
      navigateList(enabled, deps.subFocusedIndex, 'prev');
      break;
    case 'ArrowLeft':
      event.preventDefault();
      deps.closeSub();
      break;
    case 'ArrowRight':
      event.preventDefault();
      deps.navigateMenu('next');
      break;
    case 'Enter':
    case ' ': {
      event.preventDefault();
      const currentItem = deps.subItems.value[deps.subFocusedIndex.value];
      if (!currentItem || currentItem.disabled) return;
      currentItem.action();
      deps.close();
      break;
    }
    case 'Escape':
      event.preventDefault();
      deps.closeSub();
      break;
    case 'Home':
      event.preventDefault();
      navigateList(enabled, deps.subFocusedIndex, 'first');
      break;
    case 'End':
      event.preventDefault();
      navigateList(enabled, deps.subFocusedIndex, 'last');
      break;
  }
}
