<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useAttrs, watchEffect } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { CONTEXT_MENU_ITEM_KEY, CONTEXT_MENU_KEY, CONTEXT_MENU_SUB_KEY } from './context-menu-types';

defineOptions({ name: 'UiContextMenuSubTrigger', inheritAttrs: false });

interface UiContextMenuSubTriggerProps {
  disabled?: boolean;
  inset?: boolean;
}

const props = withDefaults(defineProps<UiContextMenuSubTriggerProps>(), {
  disabled: false,
  inset: false,
});

const menu = inject(CONTEXT_MENU_KEY)!;
const sub = inject(CONTEXT_MENU_SUB_KEY)!;
const ctx = inject(CONTEXT_MENU_ITEM_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const el = ref<HTMLElement>();

watchEffect(() => {
  if (el.value) {
    sub.triggerRef.value = el.value;
  }
});

const itemId = `ctx-subtrigger-${Math.random().toString(36).slice(2, 9)}`;

const itemIndex = computed(() => ctx.items.value.findIndex((i) => i.id === itemId));
const isFocused = computed(() => ctx.focusedIndex.value === itemIndex.value);

function action() {
  menu.openSub(sub.subId);
}

onMounted(() => {
  ctx.register({
    id: itemId,
    disabled: props.disabled,
    action,
    isSubTrigger: true,
    subId: sub.subId,
  });
});

onBeforeUnmount(() => {
  ctx.unregister(itemId);
});

function onPointerEnter() {
  ctx.focusedIndex.value = itemIndex.value;
  menu.openSub(sub.subId);
}

function onClick() {
  if (props.disabled) return;
  menu.openSub(sub.subId);
}
</script>

<template>
  <div
    ref="el"
    v-bind="restAttrs"
    role="menuitem"
    aria-haspopup="menu"
    :aria-expanded="sub.isOpen.value"
    :aria-disabled="disabled || undefined"
    :data-state="sub.isOpen.value ? 'open' : 'closed'"
    :class="
      cn(
        'relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm',
        'transition-colors duration-100 select-none outline-none',
        isFocused && 'bg-accent text-accent-foreground',
        sub.isOpen.value && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        inset && 'pl-8',
        attrs.class,
      )
    "
    @click="onClick"
    @pointerenter="onPointerEnter"
  >
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="ml-auto h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </div>
</template>
