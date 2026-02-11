import type { InjectionKey, Ref } from 'vue';

export interface CommandContext {
  search: Ref<string>;
  /** Currently focused item value */
  selectedValue: Ref<string>;
  /** All registered item values for keyboard nav */
  allValues: Ref<string[]>;
  /** Filter fn — returns true if item matches search */
  filterFn: (value: string, search: string) => boolean;
  /** Select (activate) an item */
  handleSelect: (value: string) => void;
  /** Register an item for keyboard nav */
  registerItem: (value: string) => void;
  /** Unregister an item */
  unregisterItem: (value: string) => void;
}

export const COMMAND_KEY: InjectionKey<CommandContext> = Symbol('command');
