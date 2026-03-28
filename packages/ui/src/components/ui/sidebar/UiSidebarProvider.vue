<script setup lang="ts">
import type { SidebarSide, SidebarVariant } from './sidebar-types';
import { SIDEBAR_WIDTH } from './sidebar-types';
import { createBaseSidebarContext } from './use-sidebar';

defineOptions({ name: 'UiSidebarProvider' });

const props = withDefaults(
  defineProps<{
    side?: SidebarSide;
    variant?: SidebarVariant;
  }>(),
  {
    side: 'left',
    variant: 'sidebar',
  },
);

const ctx = createBaseSidebarContext({
  side: props.side,
  variant: props.variant,
});

defineExpose(ctx);
</script>

<template>
  <div
    class="group/sidebar-wrapper flex min-h-svh w-full"
    :data-side="ctx.side.value"
    :data-variant="ctx.variant.value"
    :style="{ 'touch-action': 'pan-y', '--sidebar-width': SIDEBAR_WIDTH }"
  >
    <slot />
  </div>
</template>
