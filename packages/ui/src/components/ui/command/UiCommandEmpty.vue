<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COMMAND_KEY } from './command-types';

defineOptions({ name: 'UiCommandEmpty', inheritAttrs: false });

const cmd = inject(COMMAND_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

const hasVisibleItems = computed(() =>
  cmd.allValues.value.some((v) => cmd.filterFn(v, cmd.search.value)),
);
</script>

<template>
  <div
    v-if="!hasVisibleItems"
    v-bind="restAttrs"
    :class="cn('py-6 text-center text-sm', attrs.class)"
  >
    <slot>No se encontraron resultados.</slot>
  </div>
</template>
