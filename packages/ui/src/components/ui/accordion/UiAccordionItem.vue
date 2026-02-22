<script setup lang="ts">
import { computed, inject, provide, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { ACCORDION_ITEM_KEY, ACCORDION_KEY } from './accordion-types';

defineOptions({ name: 'UiAccordionItem', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const accordion = inject(ACCORDION_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const uid = Math.random().toString(36).slice(2, 9);
const triggerId = `accordion-trigger-${uid}`;
const contentId = `accordion-content-${uid}`;

const itemDisabled = computed(() => props.disabled || accordion.disabled.value);
const isOpen = computed(() => accordion.isExpanded(props.value));

provide(ACCORDION_ITEM_KEY, {
  value: props.value,
  triggerId,
  contentId,
  disabled: itemDisabled,
  isOpen,
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :data-state="isOpen ? 'open' : 'closed'"
    :data-disabled="itemDisabled ? '' : undefined"
    :class="cn('border-border/60 border-b', attrs.class)"
  >
    <slot :open="isOpen" />
  </div>
</template>
