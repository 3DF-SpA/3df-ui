import type { InjectionKey, Ref } from 'vue';

export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
// Kept for collapsible variant (future) and backward-compat exports
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

/** Context for the base (non-collapsible) sidebar. */
export interface BaseSidebarContext {
  side: Ref<SidebarSide>;
  variant: Ref<SidebarVariant>;
}

/** Context for the collapsible sidebar variant (future). */
export interface CollapsibleSidebarContext extends BaseSidebarContext {
  state: Ref<'expanded' | 'collapsed'>;
  open: Ref<boolean>;
  collapsible: Ref<SidebarCollapsible>;
  setOpen: (value: boolean) => void;
  toggleSidebar: () => void;
}

/** @deprecated Use CollapsibleSidebarContext. Kept for backward compatibility. */
export type SidebarContext = CollapsibleSidebarContext;

export const BASE_SIDEBAR_INJECTION_KEY: InjectionKey<BaseSidebarContext> = Symbol('base-sidebar');
export const SIDEBAR_INJECTION_KEY: InjectionKey<CollapsibleSidebarContext> = Symbol('sidebar');

export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
