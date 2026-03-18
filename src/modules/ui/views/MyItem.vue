<script setup lang="ts">
import { computed } from 'vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

import { Item, ItemDescription, ItemLabel } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import ItemDemoNavSettings from './_components/ItemDemoNavSettings.vue';
import ItemDemoVariantsSizes from './_components/ItemDemoVariantsSizes.vue';

const { description, propDesc, showcaseTitle } = useDocPage('item');

const itemProps = computed<PropItem[]>(() => [
  {
    name: 'as',
    type: "'string' | Component",
    default: "'div'",
    description: propDesc('as'),
  },
  {
    name: 'variant',
    type: "'default' | 'ghost' | 'muted' | 'destructive'",
    default: "'default'",
    description: propDesc('variant'),
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description: propDesc('size'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const basicCode = `<Item as="button">
  <template #start>
    <svg>...</svg>
  </template>
  <ItemLabel>Profile</ItemLabel>
  <ItemDescription>Manage your account</ItemDescription>
  <template #end>
    <svg>...</svg>
  </template>
</Item>`;

const anatomyCode = `import {
  Item,
  ItemLabel,
  ItemDescription,
} from '@3df-spa/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Item"
      :description="description"
      import-code="import { Item, ItemLabel, ItemDescription } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="typescript" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <div class="w-full max-w-md">
        <Item as="button">
          <ItemLabel>General</ItemLabel>
          <ItemDescription>Configuración general de la cuenta</ItemDescription>
        </Item>
      </div>
    </DocShowcase>

    <ItemDemoNavSettings />
    <ItemDemoVariantsSizes />

    <DocPropsTable :props="itemProps" />
  </div>
</template>
