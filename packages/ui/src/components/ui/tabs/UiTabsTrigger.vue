<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { TABS_KEY } from './tabs-types';
import { type TabsTriggerVariant, tabsTriggerVariants } from './tabs-variants';

defineOptions({ name: 'UiTabsTrigger', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string;
    disabled?: boolean;
    variant?: TabsTriggerVariant;
  }>(),
  {
    disabled: false,
    variant: 'underline',
  },
);

const ctx = inject(TABS_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const triggerId = computed(() => `${ctx.tabsUid}-trigger-${props.value}`);
const panelId = computed(() => `${ctx.tabsUid}-panel-${props.value}`);

const isActive = computed(() => ctx.activeTab.value === props.value);

function onClick() {
  if (!props.disabled) ctx.setTab(props.value);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick();
  }
}
</script>

<template>
  <button
    v-bind="restAttrs"
    :id="triggerId"
    type="button"
    role="tab"
    :aria-selected="isActive"
    :aria-controls="panelId"
    :tabindex="isActive ? 0 : -1"
    :data-state="isActive ? 'active' : 'inactive'"
    :data-disabled="disabled || undefined"
    :disabled="disabled || undefined"
    :class="cn(tabsTriggerVariants({ variant }), attrs.class)"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot />
  </button>
</template>
