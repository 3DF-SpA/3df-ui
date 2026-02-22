<script setup lang="ts">
import { computed, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COLLAPSIBLE_KEY } from './collapsible-types';

defineOptions({ name: 'UiCollapsible', inheritAttrs: false });

interface UiCollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<UiCollapsibleProps>(), {
  open: undefined,
  defaultOpen: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const isOpen = ref(props.defaultOpen);
const disabled = computed(() => props.disabled);
const contentId = `collapsible-content-${Math.random().toString(36).slice(2, 9)}`;

watch(
  () => props.open,
  (v) => {
    if (v !== undefined) isOpen.value = v;
  },
);

watch(isOpen, (v) => {
  emit('update:open', v);
});

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}

provide(COLLAPSIBLE_KEY, {
  isOpen,
  disabled,
  contentId,
  toggle,
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :data-state="isOpen ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(attrs.class)"
  >
    <slot :open="isOpen" />
  </div>
</template>
