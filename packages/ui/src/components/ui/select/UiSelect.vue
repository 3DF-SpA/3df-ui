<script setup lang="ts">
import { computed, onBeforeUnmount, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { SELECT_KEY } from './select-types';

defineOptions({ name: 'UiSelect', inheritAttrs: false });

interface UiSelectProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiSelectProps>(), {
  modelValue: '',
  placeholder: 'Select an option',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
   
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isOpen = ref(false);
const containerRef = ref<HTMLDivElement>();
const triggerRef = ref<HTMLButtonElement>();
const focusedIndex = ref(-1);
const items = ref<{ value: string; label: string; disabled: boolean }[]>([]);

const selectedLabel = computed(() => {
  const item = items.value.find((i) => i.value === props.modelValue);
  return item?.label ?? '';
});

const isInvalid = computed(
  () => attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true,
);

function registerItem(value: string, label: string, disabled: boolean) {
  const existing = items.value.findIndex((i) => i.value === value);
  if (existing >= 0) {
    items.value[existing] = { value, label, disabled };
  } else {
    items.value.push({ value, label, disabled });
  }
}

function unregisterItem(value: string) {
  items.value = items.value.filter((i) => i.value !== value);
}

function selectItem(value: string) {
  emit('update:modelValue', value);
  isOpen.value = false;
  triggerRef.value?.focus();
}

provide(SELECT_KEY, {
  modelValue: computed(() => props.modelValue),
  focusedIndex,
  items,
  registerItem,
  unregisterItem,
  selectItem,
});

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
  focusedIndex.value = -1;
}

function onClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    close();
  }
}

const enabledItems = computed(() =>
  items.value.map((item, index) => ({ ...item, index })).filter((item) => !item.disabled),
);

function onKeydown(event: KeyboardEvent) {
  const enabled = enabledItems.value;
  if (!enabled.length) return;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
        focusedIndex.value = enabled[0]?.index ?? 0;
      } else {
        const currentEnabledIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
        const next = enabled[currentEnabledIdx + 1] ?? enabled[0];
        if (next) focusedIndex.value = next.index;
      }
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
        focusedIndex.value = enabled[enabled.length - 1]?.index ?? 0;
      } else {
        const currentEnabledIdx = enabled.findIndex((i) => i.index === focusedIndex.value);
        const prev = enabled[currentEnabledIdx - 1] ?? enabled[enabled.length - 1];
        if (prev) focusedIndex.value = prev.index;
      }
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
        const selectedIdx = items.value.findIndex((i) => i.value === props.modelValue);
        focusedIndex.value = selectedIdx >= 0 ? selectedIdx : (enabled[0]?.index ?? 0);
      } else if (focusedIndex.value >= 0) {
        const item = items.value[focusedIndex.value];
        if (item && !item.disabled) {
          selectItem(item.value);
        }
      }
      break;
    }
    case 'Escape':
      event.preventDefault();
      close();
      triggerRef.value?.focus();
      break;
    case 'Tab':
      close();
      break;
    case 'Home': {
      event.preventDefault();
      if (isOpen.value && enabled.length) {
        focusedIndex.value = enabled[0]!.index;
      }
      break;
    }
    case 'End': {
      event.preventDefault();
      if (isOpen.value && enabled.length) {
        focusedIndex.value = enabled[enabled.length - 1]!.index;
      }
      break;
    }
  }
}

watch(isOpen, (open) => {
  if (open) {
    const selectedIdx = items.value.findIndex((i) => i.value === props.modelValue);
    focusedIndex.value = selectedIdx >= 0 ? selectedIdx : 0;
    document.addEventListener('click', onClickOutside, true);
  } else {
    focusedIndex.value = -1;
    document.removeEventListener('click', onClickOutside, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true);
});

const triggerClasses = computed(() =>
  cn(
    [
      'flex h-10 w-full items-center justify-between',
      'rounded-md border-ui border-input bg-foreground/5 text-sm text-foreground',
      'px-3 py-2',
      'transition-[color,box-shadow] duration-200',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
      'cursor-pointer select-none',
    ].join(' '),
    isInvalid.value && 'ring-1 ring-destructive focus-visible:ring-destructive/30',
    attrs.class,
  ),
);
</script>

<template>
  <div ref="containerRef" v-bind="restAttrs" class="relative" @keydown="onKeydown">
    <button
      ref="triggerRef"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-invalid="isInvalid || undefined"
      :disabled="disabled"
      :class="triggerClasses"
      @click="toggle"
    >
      <span :class="cn('truncate', !selectedLabel && 'text-muted-foreground')">
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="
          cn('ml-2 shrink-0 opacity-50 transition-transform duration-200', isOpen && 'rotate-180')
        "
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-[0.97]"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-[0.97]"
    >
      <ul
        v-if="isOpen"
        role="listbox"
        :class="
          cn(
            'absolute inset-x-0 top-0 z-50 w-full',
            'bg-popover text-popover-foreground rounded-md border-ui border-border',
            'shadow-md',
            'p-1',
            'max-h-60 overflow-auto',
          )
        "
      >
        <slot />
      </ul>
    </Transition>
  </div>
</template>
