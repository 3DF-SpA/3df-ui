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

const sizePage = ref(2);

const { t } = useI18n();
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('views.pagination.refArrowsOnly') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('views.pagination.refArrowsOnlyDesc') }}
    </p>
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
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('views.pagination.refDisabledState') }}</h2>
    <p class="text-muted-foreground text-sm">{{ t('views.pagination.refDisabledStateDesc') }}</p>
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
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">6. {{ t('demo.componentReference') }}</h2>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[600px] rounded-md border text-sm">
        <thead>
          <tr class="bg-muted/50 border-b">
            <th class="px-4 py-2 text-left font-medium">{{ t('demo.component') }}</th>
            <th class="px-4 py-2 text-left font-medium">Props</th>
            <th class="px-4 py-2 text-left font-medium">{{ t('demo.description') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">Pagination</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2" v-html="t('views.pagination.refWrapperDesc')"></td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationContent</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2" v-html="t('views.pagination.refContentDesc')"></td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationItem</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2" v-html="t('views.pagination.refItemDesc')"></td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationLink</td>
            <td class="px-4 py-2 font-mono">isActive, as, disabled, class</td>
            <td class="px-4 py-2">{{ t('views.pagination.refLinkDesc') }}</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationPrevious</td>
            <td class="px-4 py-2 font-mono">as, disabled, class</td>
            <td class="px-4 py-2">{{ t('views.pagination.refPreviousDesc') }}</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationNext</td>
            <td class="px-4 py-2 font-mono">as, disabled, class</td>
            <td class="px-4 py-2">{{ t('views.pagination.refNextDesc') }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-mono">PaginationEllipsis</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2">{{ t('views.pagination.refEllipsisDesc') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
