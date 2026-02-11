<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { SHEET_INJECTION_KEY } from './sheet-types';

defineOptions({ name: 'UiSheet' });

const props = withDefaults(
  defineProps<{
    /** Estado externo (v-model:open) */
    open?: boolean;
    /** Estado inicial por defecto */
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
const triggerId = `sheet-trigger-${uid}`;
const titleId = `sheet-title-${uid}`;
const descriptionId = `sheet-desc-${uid}`;

/* ── Estado ── */
const isOpen = ref(props.open ?? props.defaultOpen);

/* Sincronizar prop externa → estado interno */
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

function openSheet() {
  setOpen(true);
}

function closeSheet() {
  setOpen(false);
}

function toggleSheet() {
  setOpen(!isOpen.value);
}

/* ── Escape global ── */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault();
    e.stopPropagation();
    closeSheet();
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown, true);
});

provide(SHEET_INJECTION_KEY, {
  isOpen,
  triggerId,
  titleId,
  descriptionId,
  open: openSheet,
  close: closeSheet,
  toggle: toggleSheet,
});

defineExpose({ open: openSheet, close: closeSheet, toggle: toggleSheet, isOpen });
</script>

<template>
  <slot :open="isOpen" />
</template>
