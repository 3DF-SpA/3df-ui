<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiRadio', inheritAttrs: false });

interface UiRadioProps {
  modelValue?: string;
  value: string;
}

const props = defineProps<UiRadioProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isChecked = computed(() => props.modelValue === props.value);

const classes = computed(() =>
  cn(
    [
      'peer size-4 shrink-0 cursor-pointer appearance-none',
      'rounded-full border border-input bg-background',
      'transition-[color,background-color,border-color,box-shadow] duration-200',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus-visible:outline-none focus-visible:ring-[2.2px] focus-visible:ring-ring focus-visible:border-ring',
      'checked:border-primary checked:border-[5px]',
    ].join(' '),
    attrs.class,
  ),
);

function onChange() {
  emit('update:modelValue', props.value);
}
</script>

<template>
  <input
    v-bind="restAttrs"
    type="radio"
    :class="classes"
    :value="value"
    :checked="isChecked"
    @change="onChange"
  />
</template>
