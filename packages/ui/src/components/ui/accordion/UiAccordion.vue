<script setup lang="ts">
import { computed, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ACCORDION_KEY, type AccordionType } from './accordion-types';

defineOptions({ name: 'UiAccordion', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    type?: AccordionType;
    modelValue?: string | string[];
    defaultValue?: string | string[];
    collapsible?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'single',
    modelValue: undefined,
    defaultValue: undefined,
    collapsible: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

function normalizeValue(val: string | string[] | undefined): string[] {
  if (val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

const internalValue = ref<string[]>(normalizeValue(props.defaultValue));

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) {
      internalValue.value = normalizeValue(v);
    }
  },
);

function emitValue(val: string[]) {
  if (props.type === 'single') {
    emit('update:modelValue', val[0] ?? '');
  } else {
    emit('update:modelValue', val);
  }
}

function toggle(itemValue: string) {
  if (props.disabled) return;

  const current = internalValue.value;
  const isActive = current.includes(itemValue);

  if (props.type === 'single') {
    if (isActive) {
      if (props.collapsible) {
        internalValue.value = [];
      }
    } else {
      internalValue.value = [itemValue];
    }
  } else {
    if (isActive) {
      internalValue.value = current.filter((v) => v !== itemValue);
    } else {
      internalValue.value = [...current, itemValue];
    }
  }

  emitValue(internalValue.value);
}

function isExpanded(itemValue: string): boolean {
  return internalValue.value.includes(itemValue);
}

const disabledRef = computed(() => props.disabled);

provide(ACCORDION_KEY, {
  type: props.type,
  value: internalValue,
  disabled: disabledRef,
  collapsible: props.collapsible,
  toggle,
  isExpanded,
});
</script>

<template>
  <div v-bind="restAttrs" :data-orientation="'vertical'" :class="cn(attrs.class)">
    <slot />
  </div>
</template>
