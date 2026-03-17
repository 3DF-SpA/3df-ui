<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const sizePage = ref(2);

const { t } = useI18n();

const compactCode = `<PaginationPrevious :disabled="page <= 1" @click="prev">
  <template #default><span /></template>
</PaginationPrevious>
<span class="text-muted-foreground text-sm">
  Página {{ page }} de 10
</span>
<PaginationNext :disabled="page >= 10" @click="next">
  <template #default><span /></template>
</PaginationNext>`;

const disabledCode = `<PaginationPrevious disabled />
<PaginationLink disabled :is-active="page === 2">2</PaginationLink>
<PaginationNext disabled />`;
</script>

<template>
  <DocShowcase :title="t('views.pagination.showcases.compact.title')" :code="compactCode">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            :disabled="sizePage <= 1"
            @click="sizePage = Math.max(1, sizePage - 1)"
          >
            <template #default><span /></template>
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <span class="text-muted-foreground inline-flex h-10 items-center px-3 text-sm">
            {{ t('views.pagination.pageOf', { page: sizePage, total: 10 }) }}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext :disabled="sizePage >= 10" @click="sizePage = Math.min(10, sizePage + 1)">
            <template #default><span /></template>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </DocShowcase>

  <DocShowcase :title="t('views.pagination.showcases.disabled.title')" :code="disabledCode">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled />
        </PaginationItem>
        <PaginationItem v-for="page in 3" :key="page">
          <PaginationLink disabled :is-active="page === 2">
            {{ page }}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </DocShowcase>
</template>
