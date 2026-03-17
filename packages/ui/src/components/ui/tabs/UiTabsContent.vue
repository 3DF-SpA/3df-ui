<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { TABS_KEY } from './tabs-types';

defineOptions({ name: 'UiTabsContent', inheritAttrs: false });

const props = defineProps<{
  value: string;
}>();

const ctx = inject(TABS_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const panelId = computed(() => `${ctx.tabsUid}-panel-${props.value}`);
const triggerId = computed(() => `${ctx.tabsUid}-trigger-${props.value}`);

const isActive = computed(() => ctx.activeTab.value === props.value);
</script>

<template>
  <div
    v-show="isActive"
    v-bind="restAttrs"
    :id="panelId"
    role="tabpanel"
    :aria-labelledby="triggerId"
    :data-state="isActive ? 'active' : 'inactive'"
    :tabindex="0"
    :class="
      cn(
        'mt-2 transition-opacity duration-200',
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
