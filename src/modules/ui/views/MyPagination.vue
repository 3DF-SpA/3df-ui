<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@3df-spa/ui';

import PaginationDemoReference from './_components/PaginationDemoReference.vue';

const basicPage = ref(1);
const totalPages = ref(20);
const currentPage = ref(1);

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

const borderedPage = ref(3);
</script>

<template>
  <div class="space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold">Pagination</h1>
      <p class="text-muted-foreground mt-2">
        Sistema de paginación con patrón compound component. Semántica <code>&lt;nav&gt;</code> y
        accesibilidad ARIA completa.
      </p>
    </div>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">1. Básico</h2>
      <p class="text-muted-foreground text-sm">
        Paginación estática con 5 páginas. Página actual:
        <span class="font-mono font-medium">{{ basicPage }}</span>
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              :disabled="basicPage <= 1"
              @click="basicPage = Math.max(1, basicPage - 1)"
            />
          </PaginationItem>
          <PaginationItem v-for="page in 5" :key="page">
            <PaginationLink :is-active="basicPage === page" @click="basicPage = page">
              {{ page }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              :disabled="basicPage >= 5"
              @click="basicPage = Math.min(5, basicPage + 1)"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">2. Dinámica con ellipsis</h2>
      <p class="text-muted-foreground text-sm">
        {{ totalPages }} páginas con ventana deslizante y ellipsis. Página
        <span class="font-mono font-medium">{{ currentPage }}</span>
        de {{ totalPages }}.
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
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">3. Variante con bordes</h2>
      <p class="text-muted-foreground text-sm">Links con borde vía <code>class</code> override.</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              :disabled="borderedPage <= 1"
              class="border-border border"
              @click="borderedPage = Math.max(1, borderedPage - 1)"
            />
          </PaginationItem>
          <PaginationItem v-for="page in 5" :key="page">
            <PaginationLink
              :is-active="borderedPage === page"
              class="border-border border"
              @click="borderedPage = page"
            >
              {{ page }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              :disabled="borderedPage >= 5"
              class="border-border border"
              @click="borderedPage = Math.min(5, borderedPage + 1)"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>

    <PaginationDemoReference />
  </div>
</template>
