<script setup lang="ts">
import { computed, nextTick, provide, ref, useAttrs, useId, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COMMAND_KEY, type CommandContext } from './command-types';

defineOptions({ name: 'UiCommand', inheritAttrs: false });

interface UiCommandProps {
  filter?: (value: string, search: string) => boolean;
  label?: string;
}

const props = withDefaults(defineProps<UiCommandProps>(), {
  filter: undefined,
  label: 'Comando',
});

const uid = useId();
const listId = `command-list-${uid}`;

const emit = defineEmits<{
  select: [value: string];
  'update:selected': [value: string];
}>(); 

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const search = ref('');
const selectedValue = ref('');
const allValues = ref<string[]>([]);

const defaultFilter: CommandContext['filterFn'] = (value: string, searchTerm: string) => {
  if (!searchTerm) return true;
  return value.toLowerCase().includes(searchTerm.toLowerCase());
};

function filterFn(value: string, searchTerm: string) {
  return (props.filter ?? defaultFilter)(value, searchTerm);
}

function handleSelect(value: string) {
  emit('select', value);
}

function registerItem(value: string) {
  if (!allValues.value.includes(value)) {
    allValues.value.push(value);
  }
}

function unregisterItem(value: string) {
  allValues.value = allValues.value.filter((v) => v !== value);
}

const visibleValues = computed(() => allValues.value.filter((v) => filterFn(v, search.value)));

function navigateItems(direction: 'next' | 'prev') {
  const values = visibleValues.value;
  if (values.length === 0) return;

  const currentIdx = values.indexOf(selectedValue.value);

  if (direction === 'next') {
    selectedValue.value = values[(currentIdx + 1) % values.length]!;
  } else {
    selectedValue.value = values[(currentIdx - 1 + values.length) % values.length]!;
  }
}

function onKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown': {
      e.preventDefault();
      navigateItems('next');
      break;
    }
    case 'ArrowUp': {
      e.preventDefault();
      navigateItems('prev');
      break;
    }
    case 'Enter': {
      e.preventDefault();
      if (selectedValue.value) {
        handleSelect(selectedValue.value);
      }
      break;
    }
    case 'Home': {
      e.preventDefault();
      const values = visibleValues.value;
      if (values.length) selectedValue.value = values[0]!;
      break;
    }
    case 'End': {
      e.preventDefault();
      const values = visibleValues.value;
      if (values.length) selectedValue.value = values[values.length - 1]!;
      break;
    }
  }
}

function itemValueToId(value: string) {
  return `${listId}-item-${value.replace(/\s+/g, '-').toLowerCase()}`;
}

const activeDescendantId = computed(() => {
  if (!selectedValue.value) return undefined;
  return itemValueToId(selectedValue.value);
});

provide(COMMAND_KEY, {
  search,
  selectedValue,
  allValues,
  listId,
  activeDescendantId,
  filterFn,
  handleSelect,
  registerItem,
  unregisterItem,
});

watch(selectedValue, async (val) => {
  emit('update:selected', val);
  if (!val) return;
  await nextTick();
  document.getElementById(itemValueToId(val))?.scrollIntoView({ block: 'nearest' });
});
</script>

<template>
  <div
    v-bind="restAttrs"
    role="dialog"
    :aria-label="label"
    :class="
      cn(
        'border border-border bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        attrs.class,
      )
    "
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
