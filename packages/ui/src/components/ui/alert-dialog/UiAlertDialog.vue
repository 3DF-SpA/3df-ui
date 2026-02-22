<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';

import { ALERT_DIALOG_KEY } from './alert-dialog-types';

defineOptions({ name: 'UiAlertDialog' });

const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
  }>(),
  {
    open: undefined,
    defaultOpen: false,
  },
);

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const uid = Math.random().toString(36).slice(2, 9);
const titleId = `alert-dialog-title-${uid}`;
const descriptionId = `alert-dialog-desc-${uid}`;

const isOpen = ref(props.open ?? props.defaultOpen);

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) isOpen.value = val;
  },
);

function setOpen(val: boolean) {
  isOpen.value = val;
  emit('update:open', val);
}

function openDialog() {
  setOpen(true);
}

function closeDialog() {
  setOpen(false);
}

function toggleDialog() {
  setOpen(!isOpen.value);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault();
    e.stopPropagation();
    closeDialog();
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown, true);
});

provide(ALERT_DIALOG_KEY, {
  isOpen,
  titleId,
  descriptionId,
  open: openDialog,
  close: closeDialog,
  toggle: toggleDialog,
});

defineExpose({ open: openDialog, close: closeDialog, toggle: toggleDialog, isOpen });
</script>

<template>
  <slot :open="isOpen" />
</template>
