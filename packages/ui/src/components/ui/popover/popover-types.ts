import type { InjectionKey, Ref } from 'vue';

export interface PopoverContext {
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  triggerId: string;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const POPOVER_KEY: InjectionKey<PopoverContext> = Symbol('popover');
