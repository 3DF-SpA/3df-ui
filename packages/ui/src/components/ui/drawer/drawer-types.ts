import type { InjectionKey, Ref } from 'vue';

export interface DrawerContext {
  isOpen: Ref<boolean>;
  titleId: string;
  descriptionId: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const DRAWER_KEY: InjectionKey<DrawerContext> = Symbol('drawer');
