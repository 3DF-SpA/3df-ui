<script setup lang="ts">
import { provide, watch } from 'vue';

import type { SidebarCollapsible, SidebarSide, SidebarVariant } from './sidebar-types';
import { SIDEBAR_INJECTION_KEY, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from './sidebar-types';
import { createSidebarContext } from './use-sidebar';

defineOptions({ name: 'UiSidebarProvider' });

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
    side?: SidebarSide;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
  }>(),
  {
    defaultOpen: true,
    open: undefined,
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
  },
);

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const ctx = createSidebarContext({
  defaultOpen: props.open ?? props.defaultOpen,
  side: props.side,
  variant: props.variant,
  collapsible: props.collapsible,
});

/* ─── Sync v-model:open ─── */
watch(
  () => props.open,
  (val) => {
    if (val !== undefined && val !== ctx.open.value) {
      ctx.setOpen(val);
    }
  },
);

watch(ctx.open, (val) => {
  emit('update:open', val);
});

provide(SIDEBAR_INJECTION_KEY, ctx);

defineExpose(ctx);
</script>

<template>
  <div
    class="group/sidebar-wrapper flex min-h-svh w-full"
    :data-side="ctx.side.value"
    :data-variant="ctx.variant.value"
    :data-collapsible="ctx.state.value === 'collapsed' ? ctx.collapsible.value : ''"
    :data-state="ctx.state.value"
    :style="{
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    }"
  >
    <slot
      :open="ctx.open.value"
      :state="ctx.state.value"
      :is-mobile="ctx.isMobile.value"
      :toggle="ctx.toggleSidebar"
    />
  </div>
</template>
