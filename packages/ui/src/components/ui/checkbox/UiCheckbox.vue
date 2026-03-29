<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiCheckbox', inheritAttrs: false });

type CheckboxSize = 'sm' | 'default' | 'lg';

interface UiCheckboxProps {
  modelValue?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
}

const props = withDefaults(defineProps<UiCheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  size: 'default',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const sizeMap: Record<CheckboxSize, string> = {
  sm: 'size-3.5',
  default: 'size-4',
  lg: 'size-5',
};

const sizeClass = computed(() => sizeMap[props.size]);

const wrapperClasses = computed(() =>
  cn(
    'group relative inline-flex shrink-0',
    sizeClass.value,
    'transition-transform duration-200 active:scale-[0.85] active:duration-100',
    attrs.class,
  ),
);

const inputClasses = computed(() =>
  cn(
    'peer cursor-pointer appearance-none shrink-0',
    sizeClass.value,
    'rounded-sm border-ui border-input bg-foreground/5',
    'transition-[background-color,border-color,box-shadow] duration-150',
    'hover:border-primary/70',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-ring focus-visible:border-ring',
    'checked:bg-primary checked:border-primary',
  ),
);

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <span :class="wrapperClasses">
    <input
      v-bind="restAttrs"
      type="checkbox"
      :class="inputClasses"
      :checked="modelValue"
      :indeterminate="indeterminate"
      :aria-checked="indeterminate && !modelValue ? 'mixed' : undefined"
      @change="onChange"
    />

    <svg
      :class="[
        'pointer-events-none absolute inset-0',
        sizeClass,
        'transition-transform duration-150 ease-out',
        props.modelValue ? 'scale-100' : 'scale-0',
      ]"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="var(--color-primary-foreground)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="[
          'transition-[stroke-dashoffset] duration-200 ease-out',
          '[stroke-dasharray:20]',
          props.modelValue ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:20]',
        ]"
      />
    </svg>

    <svg
      v-if="props.indeterminate && !props.modelValue"
      class="pointer-events-none absolute inset-0"
      :class="sizeClass"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="4"
        y1="8"
        x2="12"
        y2="8"
        stroke="var(--color-primary-foreground)"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>
