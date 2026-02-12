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

// ─── Sección 1: Básico ─────────────────────────────────────
const basicPage = ref(1);

// ─── Sección 2: Paginación dinámica ────────────────────────
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

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push('ellipsis');
  }

  // Window around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  // Always show last page
  pages.push(total);

  return pages;
});

// ─── Sección 3: Con bordes ─────────────────────────────────
const borderedPage = ref(3);

// ─── Sección 4: Tamaños ────────────────────────────────────
const sizePage = ref(2);
</script>

<template>
  <div class="space-y-12 p-8">
    <div>
      <h1 class="text-3xl font-bold">Pagination</h1>
      <p class="text-muted-foreground mt-2">
        Sistema de paginación con patrón compound component.
        Semántica <code>&lt;nav&gt;</code> y accesibilidad ARIA completa.
      </p>
    </div>

    <!-- ─── 1. BÁSICO ──────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">1. Básico</h2>
      <p class="text-sm text-muted-foreground">
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
            <PaginationLink
              :is-active="basicPage === page"
              @click="basicPage = page"
            >
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

    <!-- ─── 2. DINÁMICA ────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">2. Dinámica con ellipsis</h2>
      <p class="text-sm text-muted-foreground">
        {{ totalPages }} páginas con ventana deslizante y ellipsis. Página
        <span class="font-mono font-medium">{{ currentPage }}</span>
        de {{ totalPages }}.
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              :disabled="currentPage <= 1"
              @click="goToPage(currentPage - 1)"
            />
          </PaginationItem>

          <template v-for="(item, idx) in visiblePages" :key="idx">
            <PaginationItem v-if="item === 'ellipsis'">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem v-else>
              <PaginationLink
                :is-active="currentPage === item"
                @click="goToPage(item)"
              >
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

    <!-- ─── 3. CON BORDES ──────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">3. Variante con bordes</h2>
      <p class="text-sm text-muted-foreground">
        Links con borde vía <code>class</code> override.
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              :disabled="borderedPage <= 1"
              class="border border-border"
              @click="borderedPage = Math.max(1, borderedPage - 1)"
            />
          </PaginationItem>

          <PaginationItem v-for="page in 5" :key="page">
            <PaginationLink
              :is-active="borderedPage === page"
              class="border border-border"
              @click="borderedPage = page"
            >
              {{ page }}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              :disabled="borderedPage >= 5"
              class="border border-border"
              @click="borderedPage = Math.min(5, borderedPage + 1)"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>

    <!-- ─── 4. SOLO ICONOS ─────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">4. Solo flechas (compacto)</h2>
      <p class="text-sm text-muted-foreground">
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
            <span class="inline-flex h-10 items-center px-3 text-sm text-muted-foreground">
              Página {{ sizePage }} de 10
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              :disabled="sizePage >= 10"
              @click="sizePage = Math.min(10, sizePage + 1)"
            >
              <template #default><span /></template>
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>

    <!-- ─── 5. DISABLED ────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">5. Estado disabled</h2>
      <p class="text-sm text-muted-foreground">
        Todos los elementos deshabilitados.
      </p>
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

    <!-- ─── 6. REFERENCIA ──────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">6. Referencia de Componentes</h2>
      <div class="overflow-x-auto">
        <table class="min-w-[600px] w-full text-sm border rounded-md">
          <thead>
            <tr class="border-b bg-muted/50">
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
  </div>
</template>