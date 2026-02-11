<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { CONTEXT_MENU_ITEM_KEY, CONTEXT_MENU_KEY } from './context-menu-types';

defineOptions({ name: 'UiContextMenuItem', inheritAttrs: false });

interface UiContextMenuItemProps {
  disabled?: boolean;
  destructive?: boolean;
  inset?: boolean;
}

const props = withDefaults(defineProps<UiContextMenuItemProps>(), {
  disabled: false,
  destructive: false,
  inset: false,
});

const emit = defineEmits<{
  select: [];
}>();

const menu = inject(CONTEXT_MENU_KEY)!;
const ctx = inject(CONTEXT_MENU_ITEM_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const itemId = `ctx-item-${Math.random().toString(36).slice(2, 9)}`;

const itemIndex = computed(() => ctx.items.value.findIndex((i) => i.id === itemId));
const isFocused = computed(() => ctx.focusedIndex.value === itemIndex.value);

function action() {
  emit('select');
}

onMounted(() => {
  ctx.register({ id: itemId, disabled: props.disabled, action });
});

onBeforeUnmount(() => {
  ctx.unregister(itemId);
});

function onClick() {
  if (props.disabled) return;
  emit('select');
  menu.close();
}
</script>

<template>
  <div
    v-bind="restAttrs"
    role="menuitem"
    :aria-disabled="disabled || undefined"
    :class="
      cn(
        'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'transition-colors duration-100 select-none outline-none',
        isFocused && !destructive && 'bg-accent text-accent-foreground',
        isFocused && destructive && 'bg-destructive/10 text-destructive',
        !isFocused && destructive && 'text-destructive',
        disabled && 'pointer-events-none opacity-50',
        inset && 'pl-8',
        attrs.class,
      )
    "
    @click="onClick"
    @pointerenter="ctx.focusedIndex.value = itemIndex"
    @pointerleave="ctx.focusedIndex.value = -1"
  >
    <slot />
  </div>
</template>
