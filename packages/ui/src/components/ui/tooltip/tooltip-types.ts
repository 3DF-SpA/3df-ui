import type { InjectionKey, Ref } from 'vue';

export interface TooltipContext {
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  tooltipId: string;
  open: () => void;
  close: () => void;
  cancelClose: () => void;
}

export const TOOLTIP_KEY: InjectionKey<TooltipContext> = Symbol('tooltip');
