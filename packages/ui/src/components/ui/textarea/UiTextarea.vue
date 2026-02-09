<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiTextarea', inheritAttrs: false });

interface UiTextareaProps {
  modelValue?: string;
}

withDefaults(defineProps<UiTextareaProps>(), {
  modelValue: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn(
    [
      'flex w-full min-h-[80px] rounded-[var(--radius-md)] bg-background text-sm text-foreground',
      'border border-input px-3 py-2',
      'transition-[color,border-color,box-shadow] duration-200',
      'placeholder:text-muted-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus-visible:outline-none focus-visible:ring-[2.2px] focus-visible:ring-ring focus-visible:border-ring',
      'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30',
      'resize-y',
    ].join(' '),
    attrs.class,
  ),
);

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <textarea v-bind="restAttrs" :class="classes" :value="modelValue" @input="onInput" />
</template>
