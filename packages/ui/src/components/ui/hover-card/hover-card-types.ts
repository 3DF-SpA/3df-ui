import type { CSSProperties, InjectionKey, Ref } from 'vue';

export interface HoverCardContext {
  isOpen: Ref<boolean>;
  triggerRef: Ref<HTMLElement | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  cardId: string;
  open: () => void;
  close: () => void;
  cancelClose: () => void;
}

export const HOVER_CARD_KEY: InjectionKey<HoverCardContext> = Symbol('hover-card');

export type HoverCardAlign = 'start' | 'center' | 'end';
export type HoverCardSide = 'top' | 'bottom' | 'left' | 'right';

export interface HoverCardPositionStyle extends CSSProperties {
  position: 'fixed';
  top: string;
  left: string;
}
