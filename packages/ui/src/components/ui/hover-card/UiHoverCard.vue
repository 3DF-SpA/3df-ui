<script setup lang="ts">
import { onBeforeUnmount, provide, ref } from 'vue';

import { HOVER_CARD_KEY } from './hover-card-types';

defineOptions({ name: 'UiHoverCard' });

const props = withDefaults(
  defineProps<{
    openDelay?: number;
    closeDelay?: number;
  }>(),
  {
    openDelay: 700,
    closeDelay: 300,
  },
);

const isOpen = ref(false);
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const cardId = `hover-card-${Math.random().toString(36).slice(2, 9)}`;

let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

function clearTimers() {
  if (openTimer) {
    clearTimeout(openTimer);
    openTimer = undefined;
  }
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = undefined;
  }
}

function open() {
  clearTimers();
  openTimer = setTimeout(() => {
    isOpen.value = true;
  }, props.openDelay);
}

function close() {
  clearTimers();
  closeTimer = setTimeout(() => {
    isOpen.value = false;
  }, props.closeDelay);
}

function cancelClose() {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = undefined;
  }
}

onBeforeUnmount(() => {
  clearTimers();
});

provide(HOVER_CARD_KEY, {
  isOpen,
  triggerRef,
  contentRef,
  cardId,
  open,
  close,
  cancelClose,
});
</script>

<template>
  <div class="inline-block">
    <slot />
  </div>
</template>
