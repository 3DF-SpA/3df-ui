import type { InjectionKey, Ref } from 'vue';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContext {
  type: AccordionType;
  value: Ref<string[]>;
  disabled: Ref<boolean>;
  collapsible: boolean;
  toggle: (itemValue: string) => void;
  isExpanded: (itemValue: string) => boolean;
}

export interface AccordionItemContext {
  value: string;
  triggerId: string;
  contentId: string;
  disabled: Ref<boolean>;
  isOpen: Ref<boolean>;
}

export const ACCORDION_KEY: InjectionKey<AccordionContext> = Symbol('accordion');
export const ACCORDION_ITEM_KEY: InjectionKey<AccordionItemContext> = Symbol('accordion-item');
