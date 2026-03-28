<script setup lang="ts">
import { computed, useAttrs, watchEffect } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { SidebarSide, SidebarVariant } from './sidebar-types';
import { useSidebar } from './use-sidebar';

defineOptions({ name: 'UiSidebar', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    side?: SidebarSide;
    variant?: SidebarVariant;
  }>(),
  {
    side: undefined,
    variant: undefined,
  },
);

const ctx = useSidebar();

watchEffect(() => {
  if (props.side && ctx.side.value !== props.side) ctx.side.value = props.side;
  if (props.variant && ctx.variant.value !== props.variant) ctx.variant.value = props.variant;
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const sidebarClasses = computed(() => {
  const base = cn(
    'flex h-svh w-(--sidebar-width) shrink-0 flex-col bg-sidebar text-sidebar-foreground',
    ctx.side.value === 'left' ? 'border-r-ui' : 'border-l-ui order-last',
  );

  const floating =
    ctx.variant.value === 'floating' || ctx.variant.value === 'inset' ? 'p-2' : '';

  const floatingInner =
    ctx.variant.value === 'floating' ? 'rounded-lg border-ui border-sidebar-border shadow-lg' : '';

  return cn(base, floating, floatingInner, attrs.class);
});
</script>

<template>
  <aside
    v-bind="restAttrs"
    :data-variant="ctx.variant.value"
    :data-side="ctx.side.value"
    :class="sidebarClasses"
  >
    <div class="flex h-full w-full flex-col overflow-hidden" data-sidebar="sidebar">
      <slot />
    </div>
  </aside>
</template>
