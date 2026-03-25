<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { PanelTableAccent } from './panel-table-variants';

defineOptions({ name: 'UiPanelTable', inheritAttrs: false });

interface UiPanelTableProps {
  accent?: PanelTableAccent;
  size?: 'sm' | 'default' | 'lg';
  divided?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<UiPanelTableProps>(), {
  accent: 'default',
  size: 'default',
  divided: false,
  rounded: true,
});

provide('ptAccent', computed(() => props.accent));
provide('ptSize', computed(() => props.size));
provide('ptDivided', computed(() => props.divided));

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const wrapperClasses = computed(() =>
  cn(
    'bg-card border-ui border-border overflow-hidden',
    props.rounded ? 'rounded-lg' : '',
    attrs.class,
  ),
);

const tbodyClasses = computed(() =>
  cn(props.divided ? 'divide-y divide-border' : ''),
);
</script>

<template>
  <div v-bind="restAttrs" :class="wrapperClasses">
    <table class="w-full caption-bottom">
      <slot :tbody-classes="tbodyClasses" />
    </table>
  </div>
</template>
