import type { ComputedRef, InjectionKey, Ref } from 'vue';

export interface MenubarItemData {
  id: string;
  disabled: boolean;
  action: () => void;
  isSubTrigger?: boolean;
  subId?: string;
}

export interface MenubarContext {
  activeMenu: Ref<string | null>;
  openMenu: (value: string) => void;
  closeAll: () => void;
  navigateMenu: (direction: 'next' | 'prev') => void;
  registerMenu: (value: string) => void;
  unregisterMenu: (value: string) => void;
  setTriggerRef: (value: string, el: HTMLElement) => void;
  focusTrigger: (value: string) => void;
  isAnyOpen: ComputedRef<boolean>;
}

export interface MenubarMenuContext {
  value: string;
  isOpen: ComputedRef<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  focusedIndex: Ref<number>;
  items: Ref<MenubarItemData[]>;
  triggerId: string;
  registerItem: (data: MenubarItemData) => void;
  unregisterItem: (id: string) => void;
  close: () => void;
  // Sub-menu management
  activeSubId: Ref<string | null>;
  subItems: Ref<MenubarItemData[]>;
  subFocusedIndex: Ref<number>;
  openSub: (id: string) => void;
  closeSub: () => void;
  registerSubItem: (data: MenubarItemData) => void;
  unregisterSubItem: (id: string) => void;
}

export interface MenubarSubContext {
  subId: string;
  isOpen: ComputedRef<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
}

export interface MenubarItemRegistration {
  register: (data: MenubarItemData) => void;
  unregister: (id: string) => void;
  focusedIndex: Ref<number>;
  items: Ref<MenubarItemData[]>;
}

export interface MenubarRadioGroupContext {
  modelValue: Ref<string>;
  onValueChange: (value: string) => void;
}

export const MENUBAR_KEY: InjectionKey<MenubarContext> = Symbol('menubar');
export const MENUBAR_MENU_KEY: InjectionKey<MenubarMenuContext> = Symbol('menubar-menu');
export const MENUBAR_SUB_KEY: InjectionKey<MenubarSubContext> = Symbol('menubar-sub');
export const MENUBAR_ITEM_CONTEXT_KEY: InjectionKey<MenubarItemRegistration> =
  Symbol('menubar-item-context');
export const MENUBAR_RADIO_GROUP_KEY: InjectionKey<MenubarRadioGroupContext> =
  Symbol('menubar-radio-group');
