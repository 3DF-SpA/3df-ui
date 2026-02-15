<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTextarea', inheritAttrs: false });

interface UiTextareaProps {
  variant?: 'default';
  modelValue?: string;
}

const props = withDefaults(defineProps<UiTextareaProps>(), {
  variant: 'default',
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

const baseClasses = [
  'flex w-full min-h-[80px] rounded-md border-2 border-input text-sm text-foreground',
  'px-3 py-2',
  'transition-[color,box-shadow,transform] duration-200 ease-out',
  'placeholder:text-muted-foreground',
  'disabled:pointer-events-none disabled:opacity-50',
  'focus-visible:outline-none focus-visible:ring-[2.2px] focus-visible:ring-ring',
  'aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-destructive aria-[invalid=true]:focus-visible:ring-destructive/30',
  'resize-y',
].join(' ');

const variantClasses: Record<string, string> = {
  default: 'bg-foreground/5',
};

const classes = computed(() =>
  cn(baseClasses, variantClasses[props.variant] ?? variantClasses.default, attrs.class),
);

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <textarea v-bind="restAttrs" :class="classes" :value="modelValue" @input="onInput" />
</template>
