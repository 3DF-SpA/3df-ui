<script setup lang="ts">
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';

import ProgressDemoAdvanced from './_components/ProgressDemoAdvanced.vue';
import ProgressDemoBasic from './_components/ProgressDemoBasic.vue';

const progressProps: PropItem[] = [
  {
    name: 'modelValue',
    type: 'number | undefined',
    default: 'undefined',
    description: 'Valor actual. undefined = indeterminado',
  },
  { name: 'max', type: 'number', default: '100', description: 'Valor máximo' },
  {
    name: 'indicatorClass',
    type: 'ClassValue',
    default: '-',
    description: 'Clases CSS del indicador de progreso',
  },
];
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Progress"
      description="Barra de progreso que muestra el avance de una operación."
      import-code="import { Progress } from '@3df-spa/ui'"
    />
    <ProgressDemoBasic />
    <ProgressDemoAdvanced />
    <DocPropsTable :props="progressProps" />
  </div>
</template>
