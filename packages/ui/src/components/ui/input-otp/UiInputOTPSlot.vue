<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { INPUT_OTP_KEY } from './input-otp-types';

defineOptions({ name: 'UiInputOTPSlot', inheritAttrs: false });

interface UiInputOTPSlotProps {
  index: number;
}

const props = defineProps<UiInputOTPSlotProps>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const otp = inject(INPUT_OTP_KEY)!;

const inputRef = ref<HTMLInputElement>();
const char = computed(() => otp.slots.value[props.index] ?? '');
const isFocused = computed(() => otp.focusedIndex.value === props.index);
const hasFakeCaret = computed(() => isFocused.value && !char.value);

const classes = computed(() =>
  cn(
    'relative flex h-10 w-10 items-center justify-center',
    'border-y border-r border-input bg-background text-sm font-medium text-foreground',
    'transition-all duration-100',
    'first:rounded-l-md first:border-l',
    'last:rounded-r-md',
    isFocused.value && 'z-10 ring-[2.2px] ring-ring border-ring',
    otp.disabled.value && 'pointer-events-none opacity-50',
    attrs.class,
  ),
);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  const lastChar = value.slice(-1);
  otp.setValue(props.index, lastChar);

  target.value = otp.slots.value[props.index] ?? '';
}

function onKeydown(event: KeyboardEvent) {
  otp.onSlotKeydown(props.index, event);
}

function onFocus() {
  otp.focusedIndex.value = props.index;
}

function onBlur() {
  if (otp.focusedIndex.value === props.index) {
    otp.focusedIndex.value = -1;
  }
}

function onPaste(event: ClipboardEvent) {
  otp.onPaste(event);
}

onMounted(() => {
  if (inputRef.value) {
    otp.registerSlotRef(props.index, inputRef.value);
  }
});

onBeforeUnmount(() => {
  otp.registerSlotRef(props.index, null as unknown as HTMLInputElement);
});
</script>

<template>
  <div v-bind="restAttrs" :class="classes" :data-active="isFocused || undefined">
    <input
      ref="inputRef"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      :maxlength="1"
      :value="char"
      :disabled="otp.disabled.value"
      :aria-label="`Digit ${index + 1}`"
      class="absolute inset-0 h-full w-full cursor-default bg-transparent text-center text-sm caret-transparent outline-none"
      @input="onInput"
      @keydown="onKeydown"
      @focus="onFocus"
      @blur="onBlur"
      @paste="onPaste"
    />
    <div
      v-if="hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="bg-foreground h-4 w-px animate-pulse duration-1000" />
    </div>
  </div>
</template>
