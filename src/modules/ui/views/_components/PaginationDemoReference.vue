<script setup lang="ts">
import { ref } from 'vue';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@3df-spa/ui';

const sizePage = ref(2);
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">4. Solo flechas (compacto)</h2>
    <p class="text-muted-foreground text-sm">
      Slots vacios en Previous/Next para mostrar solo iconos.
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
            Página {{ sizePage }} de 10
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
    <h2 class="text-xl font-semibold">5. Estado disabled</h2>
    <p class="text-muted-foreground text-sm">Todos los elementos deshabilitados.</p>
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
    <h2 class="text-xl font-semibold">6. Referencia de Componentes</h2>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[600px] rounded-md border text-sm">
        <thead>
          <tr class="bg-muted/50 border-b">
            <th class="px-4 py-2 text-left font-medium">Componente</th>
            <th class="px-4 py-2 text-left font-medium">Props</th>
            <th class="px-4 py-2 text-left font-medium">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">Pagination</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2">Wrapper <code>&lt;nav&gt;</code> con aria-label</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationContent</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2">Lista <code>&lt;ul&gt;</code> contenedora</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationItem</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2">Elemento <code>&lt;li&gt;</code> individual</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationLink</td>
            <td class="px-4 py-2 font-mono">isActive, as, disabled, class</td>
            <td class="px-4 py-2">Botón de página con aria-current</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationPrevious</td>
            <td class="px-4 py-2 font-mono">as, disabled, class</td>
            <td class="px-4 py-2">Botón «Anterior» con icono chevron</td>
          </tr>
          <tr class="border-b">
            <td class="px-4 py-2 font-mono">PaginationNext</td>
            <td class="px-4 py-2 font-mono">as, disabled, class</td>
            <td class="px-4 py-2">Botón «Siguiente» con icono chevron</td>
          </tr>
          <tr>
            <td class="px-4 py-2 font-mono">PaginationEllipsis</td>
            <td class="px-4 py-2 font-mono">class</td>
            <td class="px-4 py-2">Indicador «…» con sr-only</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
