<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSidebarMenuAction', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    showOnHover?: boolean;
  }>(),
  { showOnHover: false },
);

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    'absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-0.5 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-transform',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2',
    '[&>svg]:size-4 [&>svg]:shrink-0',
    /* Ocultar en modo icon colapsado */
    'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
    /* showOnHover: solo visible al hacer hover sobre el menu-item */
    props.showOnHover &&
      'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
    attrs.class,
  ),
);
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    :class="classes"
    data-sidebar="menu-action"
  >
    <slot />
  </button>
</template>
