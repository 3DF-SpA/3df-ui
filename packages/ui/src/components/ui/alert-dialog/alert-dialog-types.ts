import type { InjectionKey, Ref } from 'vue';

export interface AlertDialogContext {
  isOpen: Ref<boolean>;
  titleId: string;
  descriptionId: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const ALERT_DIALOG_KEY: InjectionKey<AlertDialogContext> = Symbol('alert-dialog');
