<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

import PaginationDemoCompactDisabled from './_components/PaginationDemoCompactDisabled.vue';
import PaginationDemoDynamic from './_components/PaginationDemoDynamic.vue';

const basicPage = ref(1);
const borderedPage = ref(3);

const { t } = useI18n();
const { description, propDesc, showcaseTitle } = useDocPage('pagination');

const paginationLinkProps = computed<PropItem[]>(() => [
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description: propDesc('isActive'),
  },
  {
    name: 'as',
    type: 'string | Component',
    default: "'button'",
    description: propDesc('as'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const paginationNavProps = computed<PropItem[]>(() => [
  {
    name: 'as',
    type: 'string | Component',
    default: "'button'",
    description: propDesc('navAs'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('navDisabled'),
  },
]);

const basicCode = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious :disabled="page <= 1" @click="page--" />
    </PaginationItem>
    <PaginationItem v-for="p in 5" :key="p">
      <PaginationLink :is-active="page === p" @click="page = p">
        {{ p }}
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext :disabled="page >= 5" @click="page++" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;

const borderedCode = `<PaginationLink
  :is-active="page === p"
  class="border-border border"
  @click="page = p"
>
  {{ p }}
</PaginationLink>`;

const anatomyCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@3df-spa/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Pagination"
      :description="description"
      import-code="import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@3df-spa/ui'"
    />

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <p class="text-muted-foreground mb-3 text-sm">
        {{ t('views.pagination.currentPage') }} <span class="font-mono font-medium">{{ basicPage }}</span>
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
    </DocShowcase>

    <PaginationDemoDynamic />

    <DocShowcase :title="showcaseTitle('bordered')" :code="borderedCode">
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
    </DocShowcase>

    <PaginationDemoCompactDisabled />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">{{ t('views.pagination.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" language="typescript" />
    </section>

    <DocPropsTable :title="t('views.pagination.propsLinkTitle')" :props="paginationLinkProps" />
    <DocPropsTable
      :title="t('views.pagination.propsNavTitle')"
      :props="paginationNavProps"
    />
  </div>
</template>
