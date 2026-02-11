import type { ComputedRef, InjectionKey, Ref } from 'vue';

export interface SelectItemData {
  value: string;
  label: string;
  disabled: boolean;
}

export interface SelectContext {
  modelValue: ComputedRef<string>;
  focusedIndex: Ref<number>;
  items: Ref<SelectItemData[]>;
  registerItem: (value: string, label: string, disabled: boolean) => void;
  unregisterItem: (value: string) => void;
  selectItem: (value: string) => void;
}

export const SELECT_KEY: InjectionKey<SelectContext> = Symbol('select');
