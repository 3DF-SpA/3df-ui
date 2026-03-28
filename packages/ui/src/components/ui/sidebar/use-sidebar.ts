import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue';

import {
  BASE_SIDEBAR_INJECTION_KEY,
  SIDEBAR_INJECTION_KEY,
  type BaseSidebarContext,
  type CollapsibleSidebarContext,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarVariant,
} from './sidebar-types';

export function useSidebar(): BaseSidebarContext {
  const ctx = inject(BASE_SIDEBAR_INJECTION_KEY, null);
  if (!ctx) {
    throw new Error('[UiSidebar] useSidebar() debe usarse dentro de un <SidebarProvider>.');
  }
  return ctx;
}

// ─── Base (non-collapsible) context ──────────────────────────────────────────

export interface CreateBaseSidebarOptions {
  side?: SidebarSide;
  variant?: SidebarVariant;
}

export function createBaseSidebarContext(
  options: CreateBaseSidebarOptions = {},
): BaseSidebarContext {
  const { side: initialSide = 'left', variant: initialVariant = 'sidebar' } = options;

  const side = ref<SidebarSide>(initialSide);
  const variant = ref<SidebarVariant>(initialVariant);

  const ctx: BaseSidebarContext = { side, variant };
  provide(BASE_SIDEBAR_INJECTION_KEY, ctx);
  return ctx;
}

// ─── Collapsible context (future variant) ────────────────────────────────────

export interface CreateCollapsibleSidebarOptions {
  defaultOpen?: boolean;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}

export function createCollapsibleSidebarContext(
  options: CreateCollapsibleSidebarOptions = {},
): CollapsibleSidebarContext {
  const {
    defaultOpen = true,
    side: initialSide = 'left',
    variant: initialVariant = 'sidebar',
    collapsible: initialCollapsible = 'offcanvas',
  } = options;

  const open = ref(defaultOpen);
  const side = ref<SidebarSide>(initialSide);
  const variant = ref<SidebarVariant>(initialVariant);
  const collapsible = ref<SidebarCollapsible>(initialCollapsible);

  const state = computed<'expanded' | 'collapsed'>(() => (open.value ? 'expanded' : 'collapsed'));

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

  function toggleSidebar() {
    open.value = !open.value;
  }

  const ctx: CollapsibleSidebarContext = {
    state,
    open,
    side,
    variant,
    collapsible,
    setOpen,
    toggleSidebar,
  };

  // Provide to both keys so all base components work inside a collapsible provider too
  provide(BASE_SIDEBAR_INJECTION_KEY, ctx);
  provide(SIDEBAR_INJECTION_KEY, ctx);
  return ctx;
}

/** @deprecated Use createCollapsibleSidebarContext. Kept for backward compatibility. */
export const createSidebarContext = createCollapsibleSidebarContext;
export type CreateSidebarOptions = CreateCollapsibleSidebarOptions;
