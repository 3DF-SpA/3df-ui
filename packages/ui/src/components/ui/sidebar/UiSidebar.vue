<script setup lang="ts">
import { computed, useAttrs, watchEffect } from 'vue';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { useSidebar } from './use-sidebar';
import type { SidebarCollapsible, SidebarSide, SidebarVariant } from './sidebar-types';

defineOptions({ name: 'UiSidebar', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    side?: SidebarSide;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
  }>(),
  {
    side: undefined,
    variant: undefined,
    collapsible: undefined,
  },
);

const ctx = useSidebar();

/* Sync reactiva: si las props cambian, el contexto se actualiza */
watchEffect(() => {
  if (props.side) ctx.side.value = props.side;
  if (props.variant) ctx.variant.value = props.variant;
  if (props.collapsible) ctx.collapsible.value = props.collapsible;
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

/* ─── Classnames ─── */

const wrapperClasses = computed(() => {
  if (ctx.collapsible.value === 'none') {
    return cn(
      'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
      attrs.class,
    );
  }
  return '';
});

/* Spacer div que reserva espacio en el layout */
const gapClasses = computed(() => {
  const base =
    'relative w-(--sidebar-width) bg-transparent transition-[width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]';
  const collapsed =
    ctx.state.value === 'collapsed'
      ? ctx.collapsible.value === 'offcanvas'
        ? 'w-0'
        : 'w-(--sidebar-width-icon)'
      : '';
  const rightSideFlip = 'group-data-[side=right]/sidebar-wrapper:rotate-180';
  return cn(base, collapsed, rightSideFlip);
});

/* El sidebar real, fixed + inset */
const sidebarClasses = computed(() => {
  const base = cn(
    'fixed inset-y-0 z-10 flex h-svh flex-col bg-sidebar text-sidebar-foreground transition-[left,right,width,padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    ctx.side.value === 'left'
      ? 'left-0 border-r border-sidebar-border'
      : 'right-0 border-l border-sidebar-border',
  );

  const width =
    ctx.state.value === 'collapsed'
      ? ctx.collapsible.value === 'offcanvas'
        ? ctx.side.value === 'left'
          ? 'left-[calc(var(--sidebar-width)*-1)]'
          : 'right-[calc(var(--sidebar-width)*-1)]'
        : 'w-(--sidebar-width-icon)'
      : 'w-(--sidebar-width)';

  const isIconCollapsed =
    ctx.state.value === 'collapsed' && ctx.collapsible.value === 'icon';

  const floating =
    (ctx.variant.value === 'floating' || ctx.variant.value === 'inset') && !isIconCollapsed
      ? 'p-2'
      : '';

  const floatingInner =
    ctx.variant.value === 'floating'
      ? 'rounded-lg border border-border shadow-lg'
      : '';

  return cn(base, width, floating, floatingInner, attrs.class);
});

/* Overlay móvil */
const showMobileOverlay = computed(() => ctx.isMobile.value && ctx.openMobile.value);

const mobileSheetClasses = computed(() =>
  cn(
    'fixed inset-y-0 z-50 flex h-svh w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground shadow-xl',
    ctx.side.value === 'left' ? 'left-0' : 'right-0',
  ),
);
</script>

<template>
  <!-- ═══ Non-collapsible ═══ -->
  <div v-if="ctx.collapsible.value === 'none'" v-bind="restAttrs" :class="wrapperClasses">
    <slot />
  </div>

  <!-- ═══ Desktop collapsible ═══ -->
  <template v-else>
    <!-- Spacer -->
    <div
      v-if="!ctx.isMobile.value"
      :class="gapClasses"
    />

    <!-- Sidebar panel (desktop) -->
    <aside
      v-if="!ctx.isMobile.value"
      v-bind="restAttrs"
      :data-state="ctx.state.value"
      :data-collapsible="ctx.state.value === 'collapsed' ? ctx.collapsible.value : ''"
      :data-variant="ctx.variant.value"
      :data-side="ctx.side.value"
      :class="sidebarClasses"
    >
      <div
        class="flex h-full w-full flex-col overflow-hidden"
        :class="{
          'group-data-[collapsible=icon]:overflow-hidden': true,
        }"
        data-sidebar="sidebar"
      >
        <slot />
      </div>
    </aside>

    <!-- ═══ Mobile sheet / drawer ═══ -->
    <Teleport to="body">
      <Transition name="sidebar-overlay">
        <div
          v-if="showMobileOverlay"
          class="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
          @click="ctx.setOpenMobile(false)"
        />
      </Transition>

      <Transition :name="ctx.side.value === 'left' ? 'sidebar-sheet-left' : 'sidebar-sheet-right'">
        <aside
          v-if="showMobileOverlay"
          :class="mobileSheetClasses"
          data-sidebar="sidebar"
          data-mobile="true"
        >
          <div class="flex h-full w-full flex-col overflow-y-auto">
            <slot />
          </div>

          <!-- Close button -->
          <button
            class="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Cerrar sidebar"
            @click="ctx.setOpenMobile(false)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </aside>
      </Transition>
    </Teleport>
  </template>
</template>

<style scoped>
/* ─── Overlay ─── */
.sidebar-overlay-enter-active {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.sidebar-overlay-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-overlay-enter-from,
.sidebar-overlay-leave-to {
  opacity: 0;
}

/* ─── Mobile sheet left ─── */
.sidebar-sheet-left-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.sidebar-sheet-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.6, 1);
}
.sidebar-sheet-left-enter-from,
.sidebar-sheet-left-leave-to {
  transform: translateX(-100%);
}

/* ─── Mobile sheet right ─── */
.sidebar-sheet-right-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.sidebar-sheet-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.6, 1);
}
.sidebar-sheet-right-enter-from,
.sidebar-sheet-right-leave-to {
  transform: translateX(100%);
}
</style>
