import type { InjectionKey, Ref } from 'vue';

export interface CommandContext {
  search: Ref<string>;
  selectedValue: Ref<string>;
  allValues: Ref<string[]>;
  filterFn: (value: string, search: string) => boolean;
  handleSelect: (value: string) => void;
  registerItem: (value: string) => void;
  unregisterItem: (value: string) => void;
}

export const COMMAND_KEY: InjectionKey<CommandContext> = Symbol('command');
