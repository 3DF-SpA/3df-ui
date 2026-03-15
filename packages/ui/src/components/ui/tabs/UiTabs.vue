<script lang="ts">
let _tabsCounter = 0;
</script>
<script setup lang="ts">
import { computed, provide, ref, useAttrs, watch } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { TABS_KEY } from './tabs-types';

defineOptions({ name: 'UiTabs', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    orientation?: 'horizontal' | 'vertical';
  }>(),
  {
    modelValue: undefined,
    defaultValue: undefined,
    orientation: 'horizontal',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const tabsUid = `tabs-${++_tabsCounter}`;
const activeTab = ref(props.modelValue ?? props.defaultValue ?? '');

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) activeTab.value = v;
  },
);

function setTab(value: string) {
  activeTab.value = value;
  emit('update:modelValue', value);
}

provide(TABS_KEY, {
  tabsUid,
  activeTab,
  setTab,
  orientation: props.orientation,
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :data-orientation="orientation"
    :class="cn('flex', orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col', attrs.class)"
  >
    <slot />
  </div>
</template>
