import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import {
  type SidebarCollapsible,
  type SidebarContext,
  type SidebarSide,
  type SidebarVariant,
  SIDEBAR_INJECTION_KEY,
  SIDEBAR_MOBILE_BREAKPOINT,
} from './sidebar-types';

/**
 * Composable: acceso al contexto del sidebar desde cualquier descendiente.
 *
 * Si se llama sin argumentos (dentro de un hijo), devuelve el contexto inyectado.
 * Si se llama con opciones (desde SidebarProvider), crea el contexto raíz.
 */
export function useSidebar(): SidebarContext {
  const ctx = inject(SIDEBAR_INJECTION_KEY, null);
  if (!ctx) {
    throw new Error(
      '[UiSidebar] useSidebar() debe usarse dentro de un <SidebarProvider>.',
    );
  }
  return ctx;
}

export interface CreateSidebarOptions {
  defaultOpen?: boolean;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}

/**
 * Crea el estado raíz del sidebar (solo para SidebarProvider).
 */
export function createSidebarContext(
  options: CreateSidebarOptions = {},
): SidebarContext {
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

  const state = computed<'expanded' | 'collapsed'>(() =>
    open.value ? 'expanded' : 'collapsed',
  );

  /* ─── Media query listener ─── */
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

  /* ─── Keyboard shortcut: Ctrl+B / ⌘+B ─── */
  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  }
  onMounted(() => document.addEventListener('keydown', onKeydown));
  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));

  /* ─── Métodos ─── */
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

  /* ─── Lock body scroll en mobile ─── */
  watch(openMobile, (val) => {
    document.body.style.overflow = val ? 'hidden' : '';
  });

  /* Limpiar scroll lock si se desmonta con mobile abierto */
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
