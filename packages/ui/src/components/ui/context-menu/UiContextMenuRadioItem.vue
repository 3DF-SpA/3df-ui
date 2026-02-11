<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import {
  CONTEXT_MENU_ITEM_KEY,
  CONTEXT_MENU_KEY,
  CONTEXT_MENU_RADIO_GROUP_KEY,
} from './context-menu-types';

defineOptions({ name: 'UiContextMenuRadioItem', inheritAttrs: false });

interface UiContextMenuRadioItemProps {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiContextMenuRadioItemProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  select: [];
}>();

const menu = inject(CONTEXT_MENU_KEY)!;
const ctx = inject(CONTEXT_MENU_ITEM_KEY)!;
const radioGroup = inject(CONTEXT_MENU_RADIO_GROUP_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const itemId = `ctx-radio-${Math.random().toString(36).slice(2, 9)}`;

const itemIndex = computed(() => ctx.items.value.findIndex((i) => i.id === itemId));
const isFocused = computed(() => ctx.focusedIndex.value === itemIndex.value);
const isChecked = computed(() => radioGroup.modelValue.value === props.value);

function action() {
  radioGroup.onValueChange(props.value);
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
  action();
  menu.close();
}
</script>

<template>
  <div
    v-bind="restAttrs"
    role="menuitemradio"
    :aria-checked="isChecked"
    :aria-disabled="disabled || undefined"
    :class="
      cn(
        'relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-sm',
        'transition-colors duration-100 select-none outline-none',
        isFocused && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        attrs.class,
      )
    "
    @click="onClick"
    @pointerenter="ctx.focusedIndex.value = itemIndex"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <svg
        v-if="isChecked"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-2 w-2 fill-current"
      >
        <circle cx="12" cy="12" r="6" />
      </svg>
    </span>
    <slot />
  </div>
</template>
