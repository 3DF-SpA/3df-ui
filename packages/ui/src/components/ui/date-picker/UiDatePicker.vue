<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { format } from 'date-fns';
import type { Locale } from 'date-fns/locale';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import UiPopover from '../popover/UiPopover.vue';
import UiPopoverTrigger from '../popover/UiPopoverTrigger.vue';
import UiPopoverContent from '../popover/UiPopoverContent.vue';
import UiCalendar from '../calendar/UiCalendar.vue';

defineOptions({ name: 'UiDatePicker', inheritAttrs: false });

interface UiDatePickerProps {
  modelValue?: Date;
  placeholder?: string;
  formatStr?: string;
  locale?: Locale;
  disabled?: (date: Date) => boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const props = withDefaults(defineProps<UiDatePickerProps>(), {
  modelValue: undefined,
  placeholder: 'Pick a date',
  formatStr: 'PPP',
  locale: undefined,
  disabled: undefined,
  weekStartsOn: 1,
});

const emit = defineEmits<{
  'update:modelValue': [value: Date | undefined];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const displayValue = computed(() => {
  if (!props.modelValue) return null;
  return format(props.modelValue, props.formatStr, { locale: props.locale });
});

function onSelect(value: unknown) {
  emit('update:modelValue', value as Date);
}
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger>
      <button
        v-bind="restAttrs"
        type="button"
        :class="
          cn(
            'inline-flex h-10 w-full min-w-[240px] items-center justify-start gap-2 rounded-md border-ui border-input bg-foreground/5 px-3 py-2 text-left text-sm ring-offset-background transition-colors',
            'hover:bg-accent/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            !modelValue && 'text-muted-foreground',
            attrs.class,
          )
        "
      >
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
          class="h-4 w-4 shrink-0 opacity-50"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
        <span>{{ displayValue ?? placeholder }}</span>
      </button>
    </UiPopoverTrigger>
    <UiPopoverContent align="start" class="w-auto p-0">
      <UiCalendar
        mode="single"
        :model-value="modelValue"
        :disabled="disabled"
        :locale="locale"
        :week-starts-on="weekStartsOn"
        @update:model-value="onSelect"
      />
    </UiPopoverContent>
  </UiPopover>
</template>
