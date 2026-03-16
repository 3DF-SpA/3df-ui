<script setup lang="ts">
import { computed } from 'vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const faqItems = [
  {
    value: 'item-1',
    question: '¿Es accesible?',
    answer: 'Sí. Sigue los patrones de diseño WAI-ARIA para acordeones.',
  },
  {
    value: 'item-2',
    question: '¿Es estilizable?',
    answer:
      'Sí. Viene con estilos por defecto que siguen el design system, pero puedes sobrescribir cualquier clase con Tailwind.',
  },
  {
    value: 'item-3',
    question: '¿Soporta animaciones?',
    answer:
      'Sí. Incluye animaciones suaves de expandir/colapsar usando transiciones CSS de altura.',
  },
  {
    value: 'item-4',
    question: '¿Puedo abrir múltiples items?',
    answer:
      'Sí. Usa type="multiple" para permitir que varios items estén abiertos simultáneamente.',
  },
];

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
      import-code="import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
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
            <AccordionTrigger>Item habilitado</AccordionTrigger>
            <AccordionContent>
              Este item se puede expandir y colapsar normalmente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="disabled-1" disabled>
            <AccordionTrigger>Item deshabilitado</AccordionTrigger>
            <AccordionContent>Este contenido no se puede ver.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="enabled-2">
            <AccordionTrigger>Otro item habilitado</AccordionTrigger>
            <AccordionContent>Este también funciona correctamente.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DocShowcase>

    <DocPropsTable :props="accordionProps" />
  </div>
</template>
