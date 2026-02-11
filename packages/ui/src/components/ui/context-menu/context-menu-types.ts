import type { ComputedRef, InjectionKey, Ref } from 'vue';

export interface ContextMenuItemData {
  id: string;
  disabled: boolean;
  action: () => void;
  isSubTrigger?: boolean;
  subId?: string;
}

export interface ContextMenuContext {
  isOpen: Ref<boolean>;
  position: Ref<{ x: number; y: number }>;
  contentRef: Ref<HTMLElement | undefined>;
  focusedIndex: Ref<number>;
  items: Ref<ContextMenuItemData[]>;
  open: (pos: { x: number; y: number }) => void;
  close: () => void;
  registerItem: (data: ContextMenuItemData) => void;
  unregisterItem: (id: string) => void;
  activeSubId: Ref<string | null>;
  subItems: Ref<ContextMenuItemData[]>;
  subFocusedIndex: Ref<number>;
  openSub: (id: string) => void;
  closeSub: () => void;
  registerSubItem: (data: ContextMenuItemData) => void;
  unregisterSubItem: (id: string) => void;
}

export interface ContextMenuSubContext {
  subId: string;
  isOpen: ComputedRef<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
}

export interface ContextMenuItemRegistration {
  register: (data: ContextMenuItemData) => void;
  unregister: (id: string) => void;
  focusedIndex: Ref<number>;
  items: Ref<ContextMenuItemData[]>;
}

export interface ContextMenuRadioGroupContext {
  modelValue: Ref<string>;
  onValueChange: (value: string) => void;
}

export const CONTEXT_MENU_KEY: InjectionKey<ContextMenuContext> = Symbol('context-menu');
export const CONTEXT_MENU_SUB_KEY: InjectionKey<ContextMenuSubContext> =
  Symbol('context-menu-sub');
export const CONTEXT_MENU_ITEM_KEY: InjectionKey<ContextMenuItemRegistration> =
  Symbol('context-menu-item');
export const CONTEXT_MENU_RADIO_GROUP_KEY: InjectionKey<ContextMenuRadioGroupContext> =
  Symbol('context-menu-radio-group');
