<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiSelect', inheritAttrs: false });

interface UiSelectProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiSelectProps>(), {
  modelValue: '',
  placeholder: 'Selecciona una opción',
  disabled: false,
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

provide('select', {
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

function getEnabledItems() {
  return items.value.map((item, index) => ({ ...item, index })).filter((item) => !item.disabled);
}

function onKeydown(event: KeyboardEvent) {
  const enabledItems = getEnabledItems();
  if (!enabledItems.length) return;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
        focusedIndex.value = enabledItems[0]?.index ?? 0;
      } else {
        const currentEnabledIdx = enabledItems.findIndex((i) => i.index === focusedIndex.value);
        const next = enabledItems[currentEnabledIdx + 1] ?? enabledItems[0];
        if (next) focusedIndex.value = next.index;
      }
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
        focusedIndex.value = enabledItems[enabledItems.length - 1]?.index ?? 0;
      } else {
        const currentEnabledIdx = enabledItems.findIndex((i) => i.index === focusedIndex.value);
        const prev = enabledItems[currentEnabledIdx - 1] ?? enabledItems[enabledItems.length - 1];
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
        focusedIndex.value = selectedIdx >= 0 ? selectedIdx : (enabledItems[0]?.index ?? 0);
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
      if (isOpen.value && enabledItems.length) {
        focusedIndex.value = enabledItems[0]!.index;
      }
      break;
    }
    case 'End': {
      event.preventDefault();
      if (isOpen.value && enabledItems.length) {
        focusedIndex.value = enabledItems[enabledItems.length - 1]!.index;
      }
      break;
    }
  }
}

watch(isOpen, (open) => {
  if (open) {
    const selectedIdx = items.value.findIndex((i) => i.value === props.modelValue);
    focusedIndex.value = selectedIdx >= 0 ? selectedIdx : 0;
  } else {
    focusedIndex.value = -1;
  }
});

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});

const triggerClasses = computed(() =>
  cn(
    [
      'flex h-10 w-full items-center justify-between',
      'rounded-md bg-background text-sm text-foreground',
      'border border-input px-3 py-2',
      'transition-[color,border-color,box-shadow] duration-200',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring focus-visible:border-ring',
      'cursor-pointer select-none',
    ].join(' '),
    isInvalid.value && 'border-destructive focus-visible:ring-destructive/30',
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
            'border-border bg-popover text-popover-foreground rounded-md border',
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
