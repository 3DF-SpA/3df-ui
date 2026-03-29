<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { useFloatingLifecycle } from '../../../composables/use-floating-lifecycle';
import { useFloatingPosition } from '../../../composables/use-floating-position';
import { cn } from '../../../lib/utils';
import UiCommand from '../command/UiCommand.vue';
import UiCommandEmpty from '../command/UiCommandEmpty.vue';
import UiCommandGroup from '../command/UiCommandGroup.vue';
import UiCommandInput from '../command/UiCommandInput.vue';
import UiCommandItem from '../command/UiCommandItem.vue';
import UiCommandList from '../command/UiCommandList.vue';

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
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();

// ── Positioning ──────────────────────────────────────────────────────────────
const { positionStyle, updatePosition } = useFloatingPosition(
  triggerRef,
  contentRef,
  () => ({ side: 'bottom', align: 'start', sideOffset: 4, viewportPadding: 8 }),
);

useFloatingLifecycle({
  isOpen,
  updatePosition,
  contentRef,
  closeFn: () => {
    isOpen.value = false;
    search.value = '';
  },
});

// ── Dropdown min-width matches trigger ───────────────────────────────────────
const triggerWidth = computed(() =>
  triggerRef.value ? `${triggerRef.value.offsetWidth}px` : undefined,
);

// ── Animation ────────────────────────────────────────────────────────────────
const isVisible = ref(false);
const isEntering = ref(false);
let animTimeout: ReturnType<typeof setTimeout> | undefined;

watch(isOpen, async (open) => {
  clearTimeout(animTimeout);
  if (open) {
    isVisible.value = true;
    await nextTick();
    isEntering.value = true;
  } else {
    isEntering.value = false;
    animTimeout = setTimeout(() => {
      isVisible.value = false;
    }, 150);
  }
});

onBeforeUnmount(() => {
  clearTimeout(animTimeout);
});

// ── Click outside ────────────────────────────────────────────────────────────
function onClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (
    triggerRef.value &&
    !triggerRef.value.contains(target) &&
    contentRef.value &&
    !contentRef.value.contains(target)
  ) {
    isOpen.value = false;
    search.value = '';
  }
}

watch(isOpen, (open) => {
  if (open) {
    setTimeout(() => {
      document.addEventListener('click', onClickOutside, true);
    }, 0);
  } else {
    document.removeEventListener('click', onClickOutside, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, true);
});

// ── Keyboard ─────────────────────────────────────────────────────────────────
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault();
    isOpen.value = false;
    search.value = '';
    triggerRef.value?.focus();
  }
}

// ── Computed ─────────────────────────────────────────────────────────────────
const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue);
  return found?.label ?? null;
});

// ── Handlers ─────────────────────────────────────────────────────────────────
function toggle() {
  if (isOpen.value) {
    isOpen.value = false;
    search.value = '';
  } else {
    isOpen.value = true;
  }
}

function onSelect(value: string) {
  if (props.modelValue === value) {
    emit('update:modelValue', '');
  } else {
    emit('update:modelValue', value);
  }
  isOpen.value = false;
  search.value = '';
  triggerRef.value?.focus();
}
</script>

<template>
  <div class="inline-block" @keydown="onKeydown">
    <button
      ref="triggerRef"
      v-bind="restAttrs"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :class="
        cn(
          'border-ui border-input bg-foreground/5 ring-offset-background flex h-10 w-full items-center justify-between rounded-md px-3 py-2 text-sm',
          'hover:bg-accent/50',
          'focus-visible:outline-2 focus-visible:outline-ring',
          !modelValue && 'text-muted-foreground',
          attrs.class,
        )
      "
      @click="toggle"
    >
      <span class="truncate">{{ selectedLabel ?? placeholder }}</span>
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
        aria-hidden="true"
        class="ml-2 h-4 w-4 shrink-0 opacity-50"
      >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="isVisible"
        :ref="(el) => { contentRef = el as HTMLElement; }"
        :style="[positionStyle, { minWidth: triggerWidth }]"
        :class="
          cn(
            'z-50 w-auto',
            'bg-popover text-popover-foreground',
            'border border-border rounded-md shadow-lg p-0',
            'transition-all duration-150',
            isEntering ? 'opacity-100 scale-100 ease-out' : 'opacity-0 scale-[0.97] ease-in',
          )
        "
      >
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
                  aria-hidden="true"
                  :class="
                    cn('mr-2 h-4 w-4', modelValue === option.value ? 'opacity-100' : 'opacity-0')
                  "
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {{ option.label }}
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </div>
    </Teleport>
  </div>
</template>
