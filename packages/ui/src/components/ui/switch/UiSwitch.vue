<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSwitch', inheritAttrs: false });

interface UiSwitchProps {
  modelValue?: boolean;
}

const props = withDefaults(defineProps<UiSwitchProps>(), {
  modelValue: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const trackClasses = computed(() =>
  cn(
    [
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center',
      'rounded-full border-ui border-transparent',
      'bg-input',
      'transition-colors duration-200',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus-visible:outline-none focus-visible:ring-[2.2px] focus-visible:ring-ring',
    ].join(' '),
    props.modelValue && 'bg-primary',
    attrs.class,
  ),
);

function toggle() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <button
    v-bind="restAttrs"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :class="trackClasses"
    @click="toggle"
  >
    <span
      :class="
        cn(
          'bg-background pointer-events-none block size-5 rounded-full shadow-lg ring-0',
          'transition-transform duration-200',
          modelValue ? 'translate-x-5' : 'translate-x-0',
        )
      "
    />
  </button>
</template>
