import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import {
  SIDEBAR_INJECTION_KEY,
  SIDEBAR_MOBILE_BREAKPOINT,
  type SidebarCollapsible,
  type SidebarContext,
  type SidebarSide,
  type SidebarVariant,
} from './sidebar-types';

export function useSidebar(): SidebarContext {
  const ctx = inject(SIDEBAR_INJECTION_KEY, null);
  if (!ctx) {
    throw new Error('[UiSidebar] useSidebar() debe usarse dentro de un <SidebarProvider>.');
  }
  return ctx;
}

export interface CreateSidebarOptions {
  defaultOpen?: boolean;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}

export function createSidebarContext(options: CreateSidebarOptions = {}): SidebarContext {
  const {
    defaultOpen = true,
    side: initialSide = 'left',
    variant: initialVariant = 'sidebar',
    collapsible: initialCollapsible = 'offcanvas',
  } = options;

  const open = ref(defaultOpen);
  const openMobile = ref(false);
  const isMobile = ref(false);
  const side = ref<SidebarSide>(initialSide);
  const variant = ref<SidebarVariant>(initialVariant);
  const collapsible = ref<SidebarCollapsible>(initialCollapsible);

  const state = computed<'expanded' | 'collapsed'>(() => (open.value ? 'expanded' : 'collapsed'));

  let mql: MediaQueryList | undefined;

  function onMediaChange(e: MediaQueryListEvent | MediaQueryList) {
    isMobile.value = !e.matches;
    if (isMobile.value) {
      openMobile.value = false;
    }
  }

  onMounted(() => {
    mql = window.matchMedia(`(min-width: ${SIDEBAR_MOBILE_BREAKPOINT}px)`);
    isMobile.value = !mql.matches;
    mql.addEventListener('change', onMediaChange as EventListener);
  });

  onBeforeUnmount(() => {
    mql?.removeEventListener('change', onMediaChange as EventListener);
  });

  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  }
  onMounted(() => document.addEventListener('keydown', onKeydown));
  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));

  function setOpen(value: boolean) {
    open.value = value;
  }

  function setOpenMobile(value: boolean) {
    openMobile.value = value;
  }

  function toggleSidebar() {
    if (isMobile.value) {
      openMobile.value = !openMobile.value;
    } else {
      open.value = !open.value;
    }
  }

  watch(openMobile, (val) => {
    document.body.style.overflow = val ? 'hidden' : '';
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = '';
  });

  return {
    state,
    open,
    isMobile,
    openMobile,
    side,
    variant,
    collapsible,
    setOpen,
    setOpenMobile,
    toggleSidebar,
  };
}
