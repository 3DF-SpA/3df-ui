<script setup lang="ts">
import { provide, ref, watch } from 'vue';

import { MENUBAR_RADIO_GROUP_KEY } from './menubar-types';

defineOptions({ name: 'UiMenubarRadioGroup' });

interface UiMenubarRadioGroupProps {
  modelValue?: string;
}

const props = withDefaults(defineProps<UiMenubarRadioGroupProps>(), {
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

provide(MENUBAR_RADIO_GROUP_KEY, {
  modelValue: currentValue,
  onValueChange,
});
</script>

<template>
  <div role="group">
    <slot />
  </div>
</template>
