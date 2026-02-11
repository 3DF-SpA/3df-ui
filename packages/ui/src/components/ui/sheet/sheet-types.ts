import type { InjectionKey, Ref } from 'vue';

export interface SheetContext {
  isOpen: Ref<boolean>;
  triggerId: string;
  titleId: string;
  descriptionId: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const SHEET_INJECTION_KEY: InjectionKey<SheetContext> = Symbol('sheet');
