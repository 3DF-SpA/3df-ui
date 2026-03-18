<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const totalPages = ref(20);
const currentPage = ref(1);

const { t } = useI18n();

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: (number | 'ellipsis')[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  pages.push(total);

  return pages;
});

const code = `const visiblePages = computed(() => {
  // Lógica de ventana deslizante con ellipsis
})

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious :disabled="page <= 1" @click="goToPage(page - 1)" />
    </PaginationItem>
    <template v-for="item in visiblePages" :key="item">
      <PaginationItem v-if="item === 'ellipsis'">
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem v-else>
        <PaginationLink :is-active="page === item" @click="goToPage(item)">
          {{ item }}
        </PaginationLink>
      </PaginationItem>
    </template>
    <PaginationItem>
      <PaginationNext :disabled="page >= total" @click="goToPage(page + 1)" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;
</script>

<template>
  <DocShowcase :title="t('views.pagination.showcases.dynamic.title')" :code="code">
    <p class="text-muted-foreground mb-3 text-sm">
      {{ t('views.pagination.dynamicDescBefore', { total: totalPages }) }}
      <span class="font-mono font-medium">{{ currentPage }}</span>
      {{ t('views.pagination.dynamicDescAfter', { total: totalPages }) }}
    </p>
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)" />
        </PaginationItem>
        <template v-for="(item, idx) in visiblePages" :key="idx">
          <PaginationItem v-if="item === 'ellipsis'">
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem v-else>
            <PaginationLink :is-active="currentPage === item" @click="goToPage(item)">
              {{ item }}
            </PaginationLink>
          </PaginationItem>
        </template>
        <PaginationItem>
          <PaginationNext
            :disabled="currentPage >= totalPages"
            @click="goToPage(currentPage + 1)"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </DocShowcase>
</template>
