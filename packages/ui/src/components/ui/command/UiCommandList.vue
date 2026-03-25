<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import { COMMAND_KEY } from './command-types';

defineOptions({ name: 'UiCommandList', inheritAttrs: false });

const cmd = inject(COMMAND_KEY)!;

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    :id="cmd.listId"
    v-bind="restAttrs"
    role="listbox"
    :class="cn('max-h-[60dvh] overflow-x-hidden overflow-y-auto sm:max-h-[var(--command-list-max-h,20rem)]', attrs.class)"
  >
    <slot />
  </div>
</template>
