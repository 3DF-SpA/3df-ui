import type { InjectionKey, Ref } from 'vue';

export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

export interface SidebarContext {
  state: Ref<'expanded' | 'collapsed'>;
  open: Ref<boolean>;
  isMobile: Ref<boolean>;
  openMobile: Ref<boolean>;
  side: Ref<SidebarSide>;
  variant: Ref<SidebarVariant>;
  collapsible: Ref<SidebarCollapsible>;
  setOpen: (value: boolean) => void;
  setOpenMobile: (value: boolean) => void;
  toggleSidebar: () => void;
}

export const SIDEBAR_INJECTION_KEY: InjectionKey<SidebarContext> = Symbol('sidebar');

/** Ancho visual del sidebar */
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';

/** Breakpoint para mobile */
export const SIDEBAR_MOBILE_BREAKPOINT = 768;
