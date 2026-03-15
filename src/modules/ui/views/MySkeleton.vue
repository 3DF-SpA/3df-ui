<script setup lang="ts">
import DocHeader from '@/components/docs/DocHeader.vue';

import SkeletonDemoBasic from './_components/SkeletonDemoBasic.vue';
import SkeletonDemoPatterns from './_components/SkeletonDemoPatterns.vue';
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Skeleton"
      description="Marcador de posición animado que indica contenido en proceso de carga."
      import-code="import { Skeleton } from '@3df/ui'"
    />
    <SkeletonDemoBasic />
    <SkeletonDemoPatterns />
  </div>
</template>
