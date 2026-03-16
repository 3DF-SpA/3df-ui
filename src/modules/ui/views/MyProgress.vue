<script setup lang="ts">
import { computed } from 'vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';

import ProgressDemoAdvanced from './_components/ProgressDemoAdvanced.vue';
import ProgressDemoBasic from './_components/ProgressDemoBasic.vue';

const { description, propDesc } = useDocPage('progress');

const progressProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'number | undefined',
    default: 'undefined',
    description: propDesc('modelValue'),
  },
  { name: 'max', type: 'number', default: '100', description: propDesc('max') },
  {
    name: 'indicatorClass',
    type: 'ClassValue',
    default: '-',
    description: propDesc('indicatorClass'),
  },
]);
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Progress"
      :description="description"
      import-code="import { Progress } from '@3df/ui'"
    />
    <ProgressDemoBasic />
    <ProgressDemoAdvanced />
    <DocPropsTable :props="progressProps" />
  </div>
</template>
