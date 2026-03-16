<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Separator, cn } from '@3df/ui';
import type { ClassValue } from 'clsx';

import DocCodeBlock from './DocCodeBlock.vue';

defineOptions({ name: 'DocHeader', inheritAttrs: false });

interface Props {
  title: string;
  description: string;
  importCode: string;
}

defineProps<Props>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-4', attrs.class)">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground text-base">{{ description }}</p>
    </div>
    <DocCodeBlock :code="importCode" language="typescript" />
    <Separator />
  </div>
</template>
