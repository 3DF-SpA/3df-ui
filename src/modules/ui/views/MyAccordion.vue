<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useDocPage } from '@/i18n/composables/useDocPage';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const faqItems = computed(() => [
  { value: 'item-1', question: t('demo.accordion.q1'), answer: t('demo.accordion.a1') },
  { value: 'item-2', question: t('demo.accordion.q2'), answer: t('demo.accordion.a2') },
  { value: 'item-3', question: t('demo.accordion.q3'), answer: t('demo.accordion.a3') },
  { value: 'item-4', question: t('demo.accordion.q4'), answer: t('demo.accordion.a4') },
]);

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('accordion');

const accordionProps = computed<PropItem[]>(() => [
  {
    name: 'Accordion: type',
    type: "'single' | 'multiple'",
    default: "'single'",
    description: propDesc('type'),
  },
  {
    name: 'Accordion: modelValue',
    type: 'string | string[]',
    default: '-',
    description: propDesc('modelValue'),
  },
  {
    name: 'Accordion: defaultValue',
    type: 'string | string[]',
    default: '-',
    description: propDesc('defaultValue'),
  },
  {
    name: 'Accordion: collapsible',
    type: 'boolean',
    default: 'false',
    description: propDesc('collapsible'),
  },
  {
    name: 'Accordion: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
  {
    name: 'AccordionItem: value',
    type: 'string',
    default: '-',
    description: propDesc('value'),
  },
  {
    name: 'AccordionItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('itemDisabled'),
  },
]);

const anatomyCode = `<Accordion>
  <AccordionItem>
    <AccordionTrigger />
    <AccordionContent />
  </AccordionItem>
</Accordion>`;

const singleCode = `<Accordion type="single" collapsible default-value="item-1">
  <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
    <AccordionTrigger>{{ item.question }}</AccordionTrigger>
    <AccordionContent>{{ item.answer }}</AccordionContent>
  </AccordionItem>
</Accordion>`;

const multipleCode = `<Accordion type="multiple" :default-value="['item-1', 'item-3']">
  <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
    <AccordionTrigger>{{ item.question }}</AccordionTrigger>
    <AccordionContent>{{ item.answer }}</AccordionContent>
  </AccordionItem>
</Accordion>`;

const disabledCode = `<Accordion type="single" collapsible>
  <AccordionItem value="enabled-1">
    <AccordionTrigger>Item habilitado</AccordionTrigger>
    <AccordionContent>Contenido visible.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="disabled-1" disabled>
    <AccordionTrigger>Item deshabilitado</AccordionTrigger>
    <AccordionContent>No se puede ver.</AccordionContent>
  </AccordionItem>
</Accordion>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Accordion"
      :description="description"
      import-code="import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" />
    </section>

    <DocShowcase
      :title="showcaseTitle('single')"
      :description="showcaseDesc('single')"
      :code="singleCode"
    >
      <div class="mx-auto w-full max-w-lg">
        <Accordion type="single" collapsible default-value="item-1">
          <AccordionItem v-for="item in faqItems" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.question }}</AccordionTrigger>
            <AccordionContent>{{ item.answer }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('multiple')"
      :description="showcaseDesc('multiple')"
      :code="multipleCode"
    >
      <div class="mx-auto w-full max-w-lg">
        <Accordion type="multiple" :default-value="['item-1', 'item-3']">
          <AccordionItem v-for="item in faqItems" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.question }}</AccordionTrigger>
            <AccordionContent>{{ item.answer }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('disabledItem')"
      :description="showcaseDesc('disabledItem')"
      :code="disabledCode"
    >
      <div class="mx-auto w-full max-w-lg">
        <Accordion type="single" collapsible>
          <AccordionItem value="enabled-1">
            <AccordionTrigger>{{ t('demo.accordion.itemEnabled') }}</AccordionTrigger>
            <AccordionContent>{{ t('demo.accordion.contentExpandsNormally') }}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="disabled-1" disabled>
            <AccordionTrigger>{{ t('demo.accordion.itemDisabled') }}</AccordionTrigger>
            <AccordionContent>{{ t('demo.accordion.contentNotVisible') }}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="enabled-2">
            <AccordionTrigger>{{ t('demo.accordion.anotherItemEnabled') }}</AccordionTrigger>
            <AccordionContent>{{ t('demo.accordion.contentWorksCorrectly') }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DocShowcase>

    <DocPropsTable :props="accordionProps" />
  </div>
</template>
