<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuSubButton', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    isActive?: boolean;
    size?: 'sm' | 'default';
    disabled?: boolean;
  }>(),
  {
    as: 'a',
    isActive: false,
    size: 'default',
    disabled: false,
  },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const sizeClasses: Record<string, string> = {
  sm: 'h-6 text-xs',
  default: 'h-7 text-xs',
};

const classes = computed(() =>
  cn(
    'flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 outline-none ring-sidebar-ring transition-colors',
    'text-sidebar-foreground/70',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&>svg]:size-3.5 [&>svg]:shrink-0',
    '[&>span]:truncate',
    props.isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
    sizeClasses[props.size] ?? sizeClasses.default,
    attrs.class,
  ),
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
    data-sidebar="menu-sub-button"
  >
    <slot />
  </component>
</template>
