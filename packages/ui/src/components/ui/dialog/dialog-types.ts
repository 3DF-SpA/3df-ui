import type { InjectionKey, Ref } from 'vue';

export interface DialogContext {
  isOpen: Ref<boolean>;
  titleId: string;
  descriptionId: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const DIALOG_KEY: InjectionKey<DialogContext> = Symbol('dialog');
