<script setup lang="ts">
import { onBeforeUnmount, provide, ref, watch } from 'vue';

import { POPOVER_KEY } from './popover-types';

defineOptions({ name: 'UiPopover' });

interface UiPopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<UiPopoverProps>(), {
  open: undefined,
  defaultOpen: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const isOpen = ref(props.defaultOpen);

// Sync with optional v-model:open
watch(
  () => props.open,
  (v) => {
    if (v !== undefined) isOpen.value = v;
  },
);

watch(isOpen, (v) => {
  emit('update:open', v);
});
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const triggerId = `popover-trigger-${Math.random().toString(36).slice(2, 9)}`;

function openPopover() {
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
  else openPopover();
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

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', onClickOutside, true);
  } else {
    document.removeEventListener('click', onClickOutside, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true);
});

provide(POPOVER_KEY, {
  isOpen,
  triggerRef,
  contentRef,
  triggerId,
  toggle,
  open: openPopover,
  close,
});
</script>

<template>
  <div class="inline-block" @keydown="onKeydown">
    <slot />
  </div>
</template>
