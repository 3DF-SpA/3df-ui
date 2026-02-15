<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import UiPopover from '../popover/UiPopover.vue';
import UiPopoverTrigger from '../popover/UiPopoverTrigger.vue';
import UiPopoverContent from '../popover/UiPopoverContent.vue';
import UiCommand from '../command/UiCommand.vue';
import UiCommandInput from '../command/UiCommandInput.vue';
import UiCommandList from '../command/UiCommandList.vue';
import UiCommandEmpty from '../command/UiCommandEmpty.vue';
import UiCommandGroup from '../command/UiCommandGroup.vue';
import UiCommandItem from '../command/UiCommandItem.vue';

defineOptions({ name: 'UiCombobox', inheritAttrs: false });

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface UiComboboxProps {
  modelValue?: string;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

const props = withDefaults(defineProps<UiComboboxProps>(), {
  modelValue: '',
  placeholder: 'Select option...',
  searchPlaceholder: 'Search...',
  emptyMessage: 'No results found.',
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
const search = ref('');

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue);
  return found?.label ?? null;
});

function onSelect(value: string) {
  // Toggle selection
  if (props.modelValue === value) {
    emit('update:modelValue', '');
  } else {
    emit('update:modelValue', value);
  }
  // Close popover after selection
  isOpen.value = false;
  search.value = '';
}
</script>

<template>
  <UiPopover v-model:open="isOpen">
    <UiPopoverTrigger>
      <template #default="{ open }">
        <button
          v-bind="restAttrs"
          type="button"
          role="combobox"
          :aria-expanded="open"
          :class="
            cn(
              'flex h-10 w-full min-w-[200px] items-center justify-between rounded-md border-2 border-input bg-foreground/5 px-3 py-2 text-sm ring-offset-background',
              'hover:bg-accent/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              !modelValue && 'text-muted-foreground',
              attrs.class,
            )
          "
        >
          <span class="truncate">{{ selectedLabel ?? placeholder }}</span>
          <!-- Chevron up/down -->
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
            class="ml-2 h-4 w-4 shrink-0 opacity-50"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </button>
      </template>
    </UiPopoverTrigger>
    <UiPopoverContent align="start" class="min-w-[200px] p-0">
      <UiCommand>
        <UiCommandInput v-model="search" :placeholder="searchPlaceholder" />
        <UiCommandList>
          <UiCommandEmpty>{{ emptyMessage }}</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.label"
              :disabled="option.disabled"
              @select="onSelect(option.value)"
            >
              <!-- Checkmark -->
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
                :class="cn('mr-2 h-4 w-4', modelValue === option.value ? 'opacity-100' : 'opacity-0')"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {{ option.label }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>
