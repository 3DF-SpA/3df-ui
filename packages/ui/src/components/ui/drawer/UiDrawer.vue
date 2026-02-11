<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';

import { DRAWER_KEY } from './drawer-types';

defineOptions({ name: 'UiDrawer' });

const props = withDefaults(
  defineProps<{
    /** External state (v-model:open) */
    open?: boolean;
    /** Default initial state */
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
const titleId = `drawer-title-${uid}`;
const descriptionId = `drawer-desc-${uid}`;

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

function openDrawer() {
  setOpen(true);
}

function closeDrawer() {
  setOpen(false);
}

function toggleDrawer() {
  setOpen(!isOpen.value);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault();
    e.stopPropagation();
    closeDrawer();
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown, true);
});

provide(DRAWER_KEY, {
  isOpen,
  titleId,
  descriptionId,
  open: openDrawer,
  close: closeDrawer,
  toggle: toggleDrawer,
});

defineExpose({ open: openDrawer, close: closeDrawer, toggle: toggleDrawer, isOpen });
</script>

<template>
  <slot :open="isOpen" />
</template>
