<script setup lang="ts">
import { onBeforeUnmount, provide, ref } from 'vue';

import { TOOLTIP_KEY } from './tooltip-types';

defineOptions({ name: 'UiTooltip' });

const props = withDefaults(
  defineProps<{
    delay?: number;
    closeDelay?: number;
  }>(),
  {
    delay: 300,
    closeDelay: 150,
  },
);

const isOpen = ref(false);
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;

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
  }, props.delay);
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

provide(TOOLTIP_KEY, {
  isOpen,
  triggerRef,
  contentRef,
  tooltipId,
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
