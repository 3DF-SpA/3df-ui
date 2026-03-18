<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Button, EmptyState } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('empty');
const { t } = useI18n();

const emptyProps = computed<PropItem[]>(() => [
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    description: propDesc('title'),
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: propDesc('descriptionProp'),
  },
]);

const searchCode = `<EmptyState
  title="No results found"
  description="Try adjusting your search filters."
>
  <template #icon>
    <svg>...</svg>
  </template>
  <Button variant="outline" size="sm">Clear filters</Button>
  <Button size="sm">Create new</Button>
</EmptyState>`;

const minimalCode = `<EmptyState
  title="No data available"
  description="Data will appear here when available."
/>`;

const heightCode = `<EmptyState
  class="min-h-80"
  title="Upload your first file"
  description="Drag and drop files here."
>
  <template #icon>
    <svg>...</svg>
  </template>
  <Button variant="outline" size="sm">Select</Button>
</EmptyState>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="EmptyState"
      :description="description"
      import-code="import { EmptyState } from '@3df-spa/ui'"
    />

    <DocShowcase :title="showcaseTitle('noResults')" :code="searchCode">
      <div class="border-border rounded-lg border">
        <EmptyState
          :title="t('demo.empty.noResultsFull')"
          :description="t('demo.empty.tryAdjustFiltersFull')"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <Button variant="outline" size="sm">{{ t('demo.empty.clearFilters') }}</Button>
          <Button size="sm">{{ t('demo.empty.createNew') }}</Button>
        </EmptyState>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('emptyCart')" code="">
      <div class="border-border rounded-lg border">
        <EmptyState
          :title="t('demo.empty.emptyCart')"
          :description="t('demo.empty.addProducts')"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
              />
            </svg>
          </template>
          <Button size="sm">{{ t('demo.empty.exploreProducts') }}</Button>
        </EmptyState>
      </div>
    </DocShowcase>

    <DocShowcase :title="t('demo.empty.noNotifications')" code="">
      <div class="border-border rounded-lg border">
        <EmptyState
          :title="t('demo.empty.upToDate')"
          :description="t('demo.empty.noNewNotifications')"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </template>
        </EmptyState>
      </div>
    </DocShowcase>

    <DocShowcase :title="t('demo.empty.minimalOnly')" :code="minimalCode">
      <div class="border-border rounded-lg border">
        <EmptyState
          :title="t('demo.empty.noData')"
          :description="t('demo.empty.dataWillAppear')"
        />
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('withHeight')" :code="heightCode">
      <div class="border-border rounded-lg border">
        <EmptyState
          class="min-h-80"
          :title="t('demo.empty.uploadFirstFile')"
          :description="t('demo.empty.dragAndDropFull')"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </template>
          <Button variant="outline" size="sm">{{ t('demo.empty.selectFiles') }}</Button>
        </EmptyState>
      </div>
    </DocShowcase>

    <DocPropsTable :props="emptyProps" />
  </div>
</template>
