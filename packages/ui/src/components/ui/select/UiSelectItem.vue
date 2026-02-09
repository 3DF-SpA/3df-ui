<script setup lang="ts">
import { type ComputedRef, type Ref, computed, inject, onBeforeUnmount, onMounted } from 'vue';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSelectItem' });

interface UiSelectItemProps {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiSelectItemProps>(), {
  disabled: false,
});

const select = inject<{
  modelValue: ComputedRef<string>;
  focusedIndex: Ref<number>;
  items: Ref<{ value: string; label: string; disabled: boolean }[]>;
  registerItem: (value: string, label: string, disabled: boolean) => void;
  unregisterItem: (value: string) => void;
  selectItem: (value: string) => void;
}>('select')!;

const isSelected = computed(() => select.modelValue.value === props.value);

const itemIndex = computed(() => select.items.value.findIndex((i) => i.value === props.value));

const isFocused = computed(() => select.focusedIndex.value === itemIndex.value);

onMounted(() => {
  // Get label from rendered text content
  const el = document.querySelector(`[data-select-value="${props.value}"]`);
  const label = el?.textContent?.trim() ?? props.value;
  select.registerItem(props.value, label, props.disabled);
});

onBeforeUnmount(() => {
  select.unregisterItem(props.value);
});

function onClick() {
  if (props.disabled) return;
  select.selectItem(props.value);
}
</script>

<template>
  <li
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled || undefined"
    :data-select-value="value"
    :class="
      cn(
        'relative flex cursor-pointer items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-sm',
        'transition-colors duration-100',
        'select-none',
        isFocused && 'bg-accent text-accent-foreground',
        isSelected && 'font-medium',
        disabled && 'pointer-events-none opacity-50',
      )
    "
    @click="onClick"
    @mouseenter="select.focusedIndex.value = itemIndex"
  >
    <span class="flex-1 truncate">
      <slot />
    </span>
    <svg
      v-if="isSelected"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="ml-2 shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </li>
</template>
