<script setup lang="ts">
import { provide, ref, watch } from 'vue';

import { CONTEXT_MENU_RADIO_GROUP_KEY } from './context-menu-types';

defineOptions({ name: 'UiContextMenuRadioGroup' });

interface UiContextMenuRadioGroupProps {
  modelValue?: string;
}

const props = withDefaults(defineProps<UiContextMenuRadioGroupProps>(), {
  modelValue: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const currentValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = val;
  },
);

function onValueChange(value: string) {
  currentValue.value = value;
  emit('update:modelValue', value);
}

provide(CONTEXT_MENU_RADIO_GROUP_KEY, {
  modelValue: currentValue,
  onValueChange,
});
</script>

<template>
  <div role="group">
    <slot />
  </div>
</template>
