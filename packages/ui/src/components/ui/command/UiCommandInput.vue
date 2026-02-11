<script setup lang="ts">
import { computed, inject, onMounted, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COMMAND_KEY } from './command-types';

defineOptions({ name: 'UiCommandInput', inheritAttrs: false });

interface UiCommandInputProps {
  placeholder?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<UiCommandInputProps>(), {
  placeholder: 'Search...',
  modelValue: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const cmd = inject(COMMAND_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const inputRef = ref<HTMLInputElement>();

// Sync external v-model → internal search (if provided)
const value = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : cmd.search.value),
  set: (val: string) => {
    cmd.search.value = val;
    emit('update:modelValue', val);
  },
});

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <div class="flex items-center border-b border-border/60 px-3" data-command-input-wrapper>
    <!-- Search icon -->
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
      class="mr-2 h-4 w-4 shrink-0 opacity-50"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input
      ref="inputRef"
      v-bind="restAttrs"
      :value="value"
      type="text"
      :placeholder="placeholder"
      :class="
        cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
          'placeholder:text-muted-foreground',
          'disabled:cursor-not-allowed disabled:opacity-50',
          attrs.class,
        )
      "
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      role="combobox"
      aria-expanded="true"
      aria-autocomplete="list"
      @input="value = ($event.target as HTMLInputElement).value"
    />
  </div>
</template>
