<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { DROPDOWN_MENU_KEY } from './dropdown-menu-types';

defineOptions({ name: 'UiDropdownMenuItem', inheritAttrs: false });

interface UiDropdownMenuItemProps {
  disabled?: boolean;
  destructive?: boolean;
}

const props = withDefaults(defineProps<UiDropdownMenuItemProps>(), {
  disabled: false,
  destructive: false,
});

const emit = defineEmits<{
  select: [];
}>();

const menu = inject(DROPDOWN_MENU_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const itemId = `dropdown-item-${Math.random().toString(36).slice(2, 9)}`;

const itemIndex = computed(() => menu.items.value.findIndex((i) => i.id === itemId));
const isFocused = computed(() => menu.focusedIndex.value === itemIndex.value);

function action() {
  emit('select');
}

onMounted(() => {
  menu.registerItem(itemId, props.disabled, action);
});

onBeforeUnmount(() => {
  menu.unregisterItem(itemId);
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
    :data-dropdown-item-id="itemId"
    :class="
      cn(
        'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'transition-colors duration-100',
        'select-none',
        isFocused && !destructive && 'bg-accent text-accent-foreground',
        isFocused && destructive && 'bg-destructive/10 text-destructive',
        !isFocused && destructive && 'text-destructive',
        disabled && 'pointer-events-none opacity-50',
        attrs.class,
      )
    "
    @click="onClick"
    @mouseenter="menu.focusedIndex.value = itemIndex"
    @mouseleave="menu.focusedIndex.value = -1"
  >
    <slot />
  </div>
</template>
