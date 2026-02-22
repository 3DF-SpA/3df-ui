<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { useSidebar } from './use-sidebar';

defineOptions({ name: 'UiSidebarMenuButton', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    isActive?: boolean;
    size?: 'sm' | 'default' | 'lg';
    tooltip?: string;
    disabled?: boolean;
  }>(),
  {
    as: 'button',
    isActive: false,
    size: 'default',
    disabled: false,
    tooltip: undefined,
  },
);

const ctx = useSidebar();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const sizeClasses: Record<string, string> = {
  sm: 'h-7 text-xs',
  default: 'h-8 text-sm',
  lg: 'h-10 text-sm',
};

const classes = computed(() =>
  cn(
    'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-2 outline-none ring-sidebar-ring transition-[width,height,padding,gap] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'text-sidebar-foreground/80',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2',
    'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&>svg]:size-4 [&>svg]:shrink-0',
    props.isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
    sizeClasses[props.size] ?? sizeClasses.default,
    '[&>span:last-child]:truncate',
    'group-data-[collapsible=icon]/sidebar-wrapper:!size-8 group-data-[collapsible=icon]/sidebar-wrapper:!p-2',
    'group-data-[collapsible=icon]/sidebar-wrapper:justify-center',
    'group-data-[collapsible=icon]/sidebar-wrapper:[&>*:not(:first-child)]:hidden',
    attrs.class,
  ),
);

const showTooltip = computed(
  () =>
    props.tooltip &&
    ctx.collapsible.value === 'icon' &&
    ctx.state.value === 'collapsed' &&
    !ctx.isMobile.value,
);
</script>

<template>
  <component
    :is="as"
    v-bind="restAttrs"
    :class="classes"
    :disabled="disabled || undefined"
    :data-active="isActive || undefined"
    :data-size="size"
    :aria-current="isActive ? 'page' : undefined"
    data-sidebar="menu-button"
    :title="showTooltip ? tooltip : undefined"
  >
    <slot />
  </component>
</template>
