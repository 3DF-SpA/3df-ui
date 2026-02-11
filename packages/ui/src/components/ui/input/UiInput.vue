<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { inputVariants } from './input-variants';

defineOptions({ name: 'UiInput', inheritAttrs: false });

type InputVariants = VariantProps<typeof inputVariants>;

interface UiInputProps {
  size?: InputVariants['size'];
  modelValue?: string | number;
}

const props = withDefaults(defineProps<UiInputProps>(), {
  modelValue: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() => cn(inputVariants({ size: props.size }), attrs.class));

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input v-bind="restAttrs" :class="classes" :value="modelValue" @input="onInput" />
</template>
