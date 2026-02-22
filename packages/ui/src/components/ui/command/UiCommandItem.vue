<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COMMAND_KEY } from './command-types';

defineOptions({ name: 'UiCommandItem', inheritAttrs: false });

interface UiCommandItemProps {
  value: string;
  keywords?: string[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiCommandItemProps>(), {
  keywords: undefined,
  disabled: false,
});

const emit = defineEmits<{
  select: [value: string];
}>();

const cmd = inject(COMMAND_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const searchableValue = computed(() => {
  const parts = [props.value];
  if (props.keywords?.length) parts.push(...props.keywords);
  return parts.join(' ');
});

onMounted(() => {
  cmd.registerItem(searchableValue.value);
});

onBeforeUnmount(() => {
  cmd.unregisterItem(searchableValue.value);
});

watch(
  () => searchableValue.value,
  (newVal, oldVal) => {
    if (oldVal) cmd.unregisterItem(oldVal);
    cmd.registerItem(newVal);
  },
);

const isVisible = computed(() => cmd.filterFn(searchableValue.value, cmd.search.value));

const isSelected = computed(() => cmd.selectedValue.value === searchableValue.value);

function onClick() {
  if (props.disabled) return;
  cmd.selectedValue.value = searchableValue.value;
  cmd.handleSelect(props.value);
  emit('select', props.value);
}

function onPointerEnter() {
  if (!props.disabled) {
    cmd.selectedValue.value = searchableValue.value;
  }
}
</script>

<template>
  <div
    v-if="isVisible"
    v-bind="restAttrs"
    role="option"
    :aria-selected="isSelected || undefined"
    :aria-disabled="disabled || undefined"
    :data-value="value"
    :class="
      cn(
        'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'outline-none select-none',
        'transition-colors duration-100',
        isSelected && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        attrs.class,
      )
    "
    @click="onClick"
    @pointerenter="onPointerEnter"
  >
    <slot />
  </div>
</template>
