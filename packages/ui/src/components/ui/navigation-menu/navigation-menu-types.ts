import type { InjectionKey, Ref } from 'vue';

export interface NavigationMenuContext {
  activeValue: Ref<string>;
  viewportRef: Ref<HTMLElement | undefined>;
  open: (value: string) => void;
  close: () => void;
  onTriggerEnter: (value: string) => void;
  onTriggerLeave: () => void;
  onContentEnter: () => void;
  onContentLeave: () => void;
}

export interface NavigationMenuItemContext {
  value: string;
}

export const NAV_MENU_KEY: InjectionKey<NavigationMenuContext> = Symbol('navigation-menu');
export const NAV_MENU_ITEM_KEY: InjectionKey<NavigationMenuItemContext> = Symbol('navigation-menu-item');
