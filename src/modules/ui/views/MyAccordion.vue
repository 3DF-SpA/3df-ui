<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@3df/ui';

const faqItems = [
  {
    value: 'item-1',
    question: '¿Es accesible?',
    answer: 'Sí. Sigue los patrones de diseño WAI-ARIA para acordeones.',
  },
  {
    value: 'item-2',
    question: '¿Es estilizable?',
    answer: 'Sí. Viene con estilos por defecto que siguen el design system, pero puedes sobrescribir cualquier clase con Tailwind.',
  },
  {
    value: 'item-3',
    question: '¿Soporta animaciones?',
    answer: 'Sí. Incluye animaciones suaves de expandir/colapsar usando transiciones CSS de altura.',
  },
  {
    value: 'item-4',
    question: '¿Puedo abrir múltiples items?',
    answer: 'Sí. Usa type="multiple" para permitir que varios items estén abiertos simultáneamente.',
  },
];
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Accordion</h1>

    <!-- Single (default) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Single (un item a la vez)</h2>
      <div class="mx-auto w-full max-w-lg">
        <Accordion type="single" collapsible default-value="item-1">
          <AccordionItem
            v-for="item in faqItems"
            :key="item.value"
            :value="item.value"
          >
            <AccordionTrigger>{{ item.question }}</AccordionTrigger>
            <AccordionContent>{{ item.answer }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- Multiple -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Multiple (varios abiertos)</h2>
      <div class="mx-auto w-full max-w-lg">
        <Accordion type="multiple" :default-value="['item-1', 'item-3']">
          <AccordionItem
            v-for="item in faqItems"
            :key="item.value"
            :value="item.value"
          >
            <AccordionTrigger>{{ item.question }}</AccordionTrigger>
            <AccordionContent>{{ item.answer }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- Disabled -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con item deshabilitado</h2>
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
            <AccordionContent>
              Este contenido no se puede ver.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="enabled-2">
            <AccordionTrigger>Otro item habilitado</AccordionTrigger>
            <AccordionContent>
              Este también funciona correctamente.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  </div>
</template>