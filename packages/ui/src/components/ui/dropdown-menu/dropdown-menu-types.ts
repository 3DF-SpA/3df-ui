import type { InjectionKey, Ref } from 'vue';

export interface DropdownMenuItemData {
  id: string;
  disabled: boolean;
  action: () => void;
}

export interface DropdownMenuContext {
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  focusedIndex: Ref<number>;
  items: Ref<DropdownMenuItemData[]>;
  triggerId: string;
  toggle: () => void;
  open: () => void;
  close: () => void;
  registerItem: (id: string, disabled: boolean, action: () => void) => void;
  unregisterItem: (id: string) => void;
  onKeydown: (event: KeyboardEvent) => void;
}

export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContext> = Symbol('dropdown-menu');
