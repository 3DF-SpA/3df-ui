<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn } from '@3df-spa/ui';
import type { ClassValue } from 'clsx';

defineOptions({ name: 'DocPropsTable', inheritAttrs: false });

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface Props {
  props: PropItem[];
}

defineProps<Props>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="restAttrs" :class="cn('flex flex-col gap-3', attrs.class)">
    <h2 class="text-sm font-semibold">Props</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Descripción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="prop in props" :key="prop.name">
          <TableCell class="font-mono text-xs">{{ prop.name }}</TableCell>
          <TableCell class="font-mono text-xs">{{ prop.type }}</TableCell>
          <TableCell class="font-mono text-xs">{{ prop.default ?? '-' }}</TableCell>
          <TableCell>{{ prop.description }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
