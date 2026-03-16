<script setup lang="ts">
import { useDocPage } from '@/i18n/composables/useDocPage';
import DocHeader from '@/components/docs/DocHeader.vue';

import SkeletonDemoBasic from './_components/SkeletonDemoBasic.vue';
import SkeletonDemoPatterns from './_components/SkeletonDemoPatterns.vue';

const { description } = useDocPage('skeleton');
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Skeleton"
      :description="description"
      import-code="import { Skeleton } from '@3df/ui'"
    />
    <SkeletonDemoBasic />
    <SkeletonDemoPatterns />
  </div>
</template>
