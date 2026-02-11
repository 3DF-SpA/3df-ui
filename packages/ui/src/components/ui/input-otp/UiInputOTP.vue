<script setup lang="ts">
import { computed, nextTick, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { INPUT_OTP_KEY, OTP_PATTERNS } from './input-otp-types';
import type { OTPPatternType } from './input-otp-types';

defineOptions({ name: 'UiInputOTP', inheritAttrs: false });

interface UiInputOTPProps {
  /** Current OTP value */
  modelValue?: string;
  /** Number of expected digits/chars */
  length?: number;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Validation pattern: preset name or custom RegExp */
  pattern?: OTPPatternType | RegExp;
  /** Auto-submit when all slots are filled */
  autoSubmit?: boolean;
}

const props = withDefaults(defineProps<UiInputOTPProps>(), {
  modelValue: '',
  length: 6,
  disabled: false,
  pattern: 'numeric',
  autoSubmit: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  complete: [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const classes = computed(() =>
  cn('flex items-center gap-2', attrs.class),
);

const isDisabled = computed(() => props.disabled);

const validationPattern = computed<RegExp>(() => {
  if (props.pattern instanceof RegExp) return props.pattern;
  return OTP_PATTERNS[props.pattern] ?? OTP_PATTERNS.numeric;
});

// --- Internal state ---
const slots = ref<string[]>(Array.from({ length: props.length }, () => ''));
const focusedIndex = ref(-1);
const slotRefs = new Map<number, HTMLInputElement>();

// Sync from modelValue prop → internal slots
watch(
  () => props.modelValue,
  (val) => {
    const chars = (val ?? '').split('');
    for (let i = 0; i < props.length; i++) {
      slots.value[i] = chars[i] ?? '';
    }
  },
  { immediate: true },
);

// Sync from internal slots → modelValue prop
function emitValue() {
  const value = slots.value.join('');
  emit('update:modelValue', value);

  if (value.length === props.length && props.autoSubmit) {
    emit('complete', value);
  }
}

function setValue(index: number, value: string) {
  if (index < 0 || index >= props.length) return;
  if (value && !validationPattern.value.test(value)) return;

  slots.value[index] = value;
  emitValue();

  // Auto-advance to next slot
  if (value && index < props.length - 1) {
    focusSlot(index + 1);
  }
}

function focusSlot(index: number) {
  if (index < 0 || index >= props.length) return;
  focusedIndex.value = index;

  nextTick(() => {
    const el = slotRefs.get(index);
    if (el) {
      el.focus();
      el.select();
    }
  });
}

function onSlotKeydown(index: number, event: KeyboardEvent) {
  const key = event.key;

  if (key === 'Backspace') {
    event.preventDefault();
    if (slots.value[index]) {
      // Clear current slot
      slots.value[index] = '';
      emitValue();
    } else if (index > 0) {
      // Move to previous slot and clear it
      slots.value[index - 1] = '';
      emitValue();
      focusSlot(index - 1);
    }
    return;
  }

  if (key === 'Delete') {
    event.preventDefault();
    slots.value[index] = '';
    emitValue();
    return;
  }

  if (key === 'ArrowLeft') {
    event.preventDefault();
    if (index > 0) focusSlot(index - 1);
    return;
  }

  if (key === 'ArrowRight') {
    event.preventDefault();
    if (index < props.length - 1) focusSlot(index + 1);
    return;
  }

  if (key === 'Home') {
    event.preventDefault();
    focusSlot(0);
    return;
  }

  if (key === 'End') {
    event.preventDefault();
    focusSlot(props.length - 1);
    return;
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const text = event.clipboardData?.getData('text/plain') ?? '';
  const chars = text.split('').filter((ch) => validationPattern.value.test(ch));

  // Determine start index: current focused slot or 0
  const startIdx = focusedIndex.value >= 0 ? focusedIndex.value : 0;

  for (let i = 0; i < chars.length && startIdx + i < props.length; i++) {
    slots.value[startIdx + i] = chars[i]!;
  }

  emitValue();

  // Focus the next empty slot or the last filled one
  const nextEmpty = slots.value.findIndex((s, idx) => idx >= startIdx && !s);
  focusSlot(nextEmpty >= 0 ? nextEmpty : Math.min(startIdx + chars.length - 1, props.length - 1));
}

function registerSlotRef(index: number, el: HTMLInputElement) {
  if (el) {
    slotRefs.set(index, el);
  } else {
    slotRefs.delete(index);
  }
}

// Reset slots array length when length prop changes
watch(
  () => props.length,
  (newLen) => {
    const current = slots.value;
    slots.value = Array.from({ length: newLen }, (_, i) => current[i] ?? '');
  },
);

provide(INPUT_OTP_KEY, {
  slots,
  length: props.length,
  focusedIndex,
  disabled: isDisabled,
  pattern: validationPattern.value,
  setValue,
  focusSlot,
  onSlotKeydown,
  onPaste,
  registerSlotRef,
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="classes"
    role="group"
    :aria-label="($attrs['aria-label'] as string) ?? 'One-time password'"
    :data-disabled="isDisabled || undefined"
  >
    <slot />
  </div>
</template>
