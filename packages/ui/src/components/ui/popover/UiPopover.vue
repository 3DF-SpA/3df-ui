<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref } from 'vue';

defineOptions({ name: 'UiPopover' });

const isOpen = ref(false);
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const triggerId = `popover-trigger-${Math.random().toString(36).slice(2, 9)}`;

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
  const focusable = triggerRef.value?.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  (focusable ?? triggerRef.value)?.focus();
}

function toggle() {
  if (isOpen.value) close();
  else open();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault();
    close();
  }
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (
    triggerRef.value &&
    !triggerRef.value.contains(target) &&
    contentRef.value &&
    !contentRef.value.contains(target)
  ) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true);
});

provide('popover', {
  isOpen,
  triggerRef,
  contentRef,
  triggerId,
  toggle,
  open,
  close,
});
</script>

<template>
  <div class="inline-block" @keydown="onKeydown">
    <slot />
  </div>
</template>
