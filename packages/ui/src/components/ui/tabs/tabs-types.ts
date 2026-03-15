import type { InjectionKey, Ref } from 'vue';

export interface TabsContext {
  tabsUid: string;
  activeTab: Ref<string>;
  setTab: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

export const TABS_KEY: InjectionKey<TabsContext> = Symbol('tabs');
