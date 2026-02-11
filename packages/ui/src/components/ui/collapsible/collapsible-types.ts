import type { InjectionKey, Ref } from 'vue';

export interface CollapsibleContext {
  isOpen: Ref<boolean>;
  disabled: Ref<boolean>;
  contentId: string;
  toggle: () => void;
}

export const COLLAPSIBLE_KEY: InjectionKey<CollapsibleContext> = Symbol('collapsible');
