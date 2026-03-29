<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import UiCommandDialog from '../command/UiCommandDialog.vue';
import UiCommandEmpty from '../command/UiCommandEmpty.vue';
import UiCommandGroup from '../command/UiCommandGroup.vue';
import UiCommandInput from '../command/UiCommandInput.vue';
import UiCommandItem from '../command/UiCommandItem.vue';
import UiCommandList from '../command/UiCommandList.vue';
import type { CommandPaletteGroup, CommandPaletteItem } from './command-palette-types';

defineOptions({ name: 'UiCommandPalette', inheritAttrs: false });

interface Props {
  open: boolean;
  groups: CommandPaletteGroup[];
  searchPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Search...',
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [item: CommandPaletteItem];
  'update:selected': [item: CommandPaletteItem | null];
}>();

const DEFAULT_ITEM_ICON =
  'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z';

const selectedItem = ref<CommandPaletteItem | null>(null);

/**
 * Reconstructs the exact searchableValue that UiCommandItem computes
 * (props.value + ' ' + keywords.join(' ')).
 * Keywords passed to each item: [item.label, group.label, ...item.keywords]
 */
function buildSearchable(item: CommandPaletteItem, group: CommandPaletteGroup): string {
  return [item.value, item.label, group.label, ...(item.keywords ?? [])].join(' ');
}

const searchableToItem = computed(() => {
  const map = new Map<string, CommandPaletteItem>();
  for (const group of props.groups) {
    for (const item of group.items) {
      map.set(buildSearchable(item, group), item);
    }
  }
  return map;
});

function findItem(value: string): CommandPaletteItem | null {
  for (const group of props.groups) {
    const found = group.items.find((i) => i.value === value);
    if (found) return found;
  }
  return null;
}

function close() {
  emit('update:open', false);
}

function onOpenChange(val: boolean) {
  emit('update:open', val);
  if (!val) {
    selectedItem.value = null;
    emit('update:selected', null);
  }
}

// update:selected emits the searchableValue — map back to the original item
function onSelectedChange(searchableVal: string) {
  const found = searchableToItem.value.get(searchableVal) ?? null;
  selectedItem.value = found;
  emit('update:selected', found);
}

// @select emits the original item.value
function onSelectItem(value: string) {
  const item = findItem(value);
  if (item) emit('select', item);
  close();
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      selectedItem.value = null;
    }
  },
);
</script>

<template>
  <UiCommandDialog
    :open="open"
    :show-close="false"
    class="sm:max-w-[860px]"
    @update:open="onOpenChange"
    @update:selected="onSelectedChange"
    @select="onSelectItem"
  >
    <div class="flex h-[540px] p-3 gap-3">
      <!-- Left panel: search + grouped list -->
      <div
        class="flex w-[320px] shrink-0 flex-col border border-border/60 shadow-sm rounded-lg overflow-hidden"
      >
        <UiCommandInput :placeholder="searchPlaceholder" />
        <UiCommandList class="flex-1 overflow-auto max-h-none sm:max-h-none">
          <UiCommandEmpty>
            <slot name="empty">No results found.</slot>
          </UiCommandEmpty>

          <UiCommandGroup v-for="group in groups" :key="group.label">
            <!-- Group header -->
            <div class="flex items-center gap-1.5 px-2 pt-3 pb-1">
              <span
                class="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60"
              >
                {{ group.label }}
              </span>
              <span class="ml-auto text-[10px] tabular-nums text-muted-foreground/40">
                {{ group.items.length }}
              </span>
            </div>

            <UiCommandItem
              v-for="item in group.items"
              :key="item.value"
              :value="item.value"
              :keywords="[item.label, group.label, ...(item.keywords ?? [])]"
              class="relative flex items-center gap-2 pl-3"
              @select="onSelectItem(item.value)"
            >
              <slot name="item" :item="item" :group="group" :is-selected="selectedItem?.value === item.value">
                <!-- Active pip indicator -->
                <span
                  v-if="selectedItem?.value === item.value"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-primary"
                />
                <!-- Icon: item.icon → group.icon → default -->
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-3.5 h-3.5 shrink-0 opacity-60"
                >
                  <path :d="item.icon ?? group.icon ?? DEFAULT_ITEM_ICON" />
                </svg>
                {{ item.label }}
              </slot>
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </div>

      <!-- Right panel: fully controlled by the consumer via #preview slot -->
      <div
        class="flex flex-col flex-1 overflow-hidden bg-gradient-to-br from-background to-muted/40 rounded-lg"
      >
        <slot name="preview" :item="selectedItem" :close="close">
          <!-- Default empty state shown when no #preview slot is provided -->
          <div class="flex h-full flex-col items-center justify-center gap-3 text-center px-8 relative">
            <button
              class="absolute top-2 right-2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
              @click="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <div class="rounded-full bg-muted p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="w-6 h-6 text-muted-foreground"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium">Select an item</p>
              <p class="text-xs text-muted-foreground/60 mt-1">Browse groups or use the search</p>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </UiCommandDialog>
</template>
