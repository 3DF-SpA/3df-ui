export { default as Accordion } from './accordion/UiAccordion.vue';
export { default as AccordionItem } from './accordion/UiAccordionItem.vue';
export { default as AccordionTrigger } from './accordion/UiAccordionTrigger.vue';
export { default as AccordionContent } from './accordion/UiAccordionContent.vue';
export { ACCORDION_KEY, ACCORDION_ITEM_KEY } from './accordion/accordion-types';
export type {
  AccordionContext,
  AccordionItemContext,
  AccordionType,
} from './accordion/accordion-types';
export { default as Collapsible } from './collapsible/UiCollapsible.vue';
export { default as CollapsibleTrigger } from './collapsible/UiCollapsibleTrigger.vue';
export { default as CollapsibleContent } from './collapsible/UiCollapsibleContent.vue';
export { COLLAPSIBLE_KEY } from './collapsible/collapsible-types';
export type { CollapsibleContext } from './collapsible/collapsible-types';
/** Pestañas de navegación con contenido intercambiable. Variantes: underline, pill, card. */
export { default as Tabs } from './tabs/UiTabs.vue';
export { default as TabsList } from './tabs/UiTabsList.vue';
export { default as TabsTrigger } from './tabs/UiTabsTrigger.vue';
export { default as TabsContent } from './tabs/UiTabsContent.vue';
export { TABS_KEY } from './tabs/tabs-types';
export type { TabsContext } from './tabs/tabs-types';
export { tabsTriggerVariants, type TabsTriggerVariant } from './tabs/tabs-variants';
