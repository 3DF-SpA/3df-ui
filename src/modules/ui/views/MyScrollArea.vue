<script setup lang="ts">
import { ScrollArea, Separator } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const tags = Array.from({ length: 50 }, (_, i) => `v1.${i}.0-beta`);

const artworks = [
  { title: 'Noche estrellada', artist: 'Vincent van Gogh', year: '1889' },
  { title: 'La persistencia de la memoria', artist: 'Salvador Dalí', year: '1931' },
  { title: 'El grito', artist: 'Edvard Munch', year: '1893' },
  { title: 'Guernica', artist: 'Pablo Picasso', year: '1937' },
  { title: 'La joven de la perla', artist: 'Johannes Vermeer', year: '1665' },
  { title: 'El beso', artist: 'Gustav Klimt', year: '1908' },
  { title: 'Las meninas', artist: 'Diego Velázquez', year: '1656' },
  { title: 'La creación de Adán', artist: 'Miguel Ángel', year: '1512' },
  { title: 'La ronda de noche', artist: 'Rembrandt', year: '1642' },
  { title: 'Impresión, sol naciente', artist: 'Claude Monet', year: '1872' },
  { title: 'Composición VIII', artist: 'Wassily Kandinsky', year: '1923' },
  { title: 'Broadway Boogie Woogie', artist: 'Piet Mondrian', year: '1943' },
];

const scrollAreaProps: PropItem[] = [
  {
    name: 'type',
    type: "'auto' | 'always' | 'scroll' | 'hover'",
    default: "'hover'",
    description: 'Cuándo mostrar la scrollbar.',
  },
  {
    name: 'orientation',
    type: "'vertical' | 'horizontal' | 'both'",
    default: "'vertical'",
    description: 'Ejes de scroll habilitados.',
  },
];

const verticalCode = `<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm font-medium">Tags</h4>
    <template v-for="(tag, i) in tags" :key="tag">
      <div class="text-sm">{{ tag }}</div>
      <Separator v-if="i < tags.length - 1" class="my-2" decorative />
    </template>
  </div>
</ScrollArea>`;

const horizontalCode = `<ScrollArea orientation="horizontal" class="w-full max-w-xl rounded-md border">
  <div class="flex gap-4 p-4">
    <div v-for="artwork in artworks" :key="artwork.title" class="w-36 shrink-0 rounded-md border p-3">
      <div class="bg-muted mb-2 aspect-square rounded-md" />
      <p class="text-sm font-medium">{{ artwork.title }}</p>
      <p class="text-muted-foreground text-xs">{{ artwork.artist }}</p>
    </div>
  </div>
</ScrollArea>`;

const bothCode = `<ScrollArea orientation="both" class="h-64 w-80 rounded-md border">
  <div class="w-[600px] p-4">
    <table class="w-full text-sm">
      <!-- Tabla ancha con scroll en ambos ejes -->
    </table>
  </div>
</ScrollArea>`;

const alwaysCode = `<ScrollArea type="always" class="h-48 w-64 rounded-md border">
  <div class="p-4">
    <p v-for="i in 15" :key="i" class="mb-3 text-sm">Párrafo {{ i }}...</p>
  </div>
</ScrollArea>`;

const scrollTypeCode = `<ScrollArea type="scroll" class="h-48 w-64 rounded-md border">
  <div class="p-4">
    <p v-for="i in 15" :key="i" class="mb-3 text-sm">Párrafo {{ i }}...</p>
  </div>
</ScrollArea>`;

const chatCode = `<div class="flex w-80 flex-col rounded-lg border shadow-sm">
  <div class="border-b px-4 py-3">
    <h3 class="text-sm font-semibold">Mensajes</h3>
  </div>
  <ScrollArea class="h-64">
    <div class="flex flex-col gap-3 p-4">
      <div v-for="i in 20" :key="i" class="rounded-lg px-3 py-2 text-sm"
        :class="i % 3 === 0 ? 'bg-primary text-primary-foreground self-end' : 'bg-muted'">
        Mensaje {{ i }}
      </div>
    </div>
  </ScrollArea>
</div>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="ScrollArea"
      description="Área de scroll personalizada con scrollbars estilizados que reemplazan los nativos del navegador."
      import-code="import { ScrollArea } from '@3df-spa/ui'"
    />

    <DocShowcase
      title="Vertical — lista de tags"
      description="Scroll vertical estándar para listas largas."
      :code="verticalCode"
    >
      <ScrollArea class="border-border h-72 w-48 rounded-md border">
        <div class="p-4">
          <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
          <template v-for="(tag, i) in tags" :key="tag">
            <div class="text-sm">{{ tag }}</div>
            <Separator v-if="i < tags.length - 1" class="my-2" decorative />
          </template>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      title="Horizontal — galería de arte"
      description="Scroll horizontal para contenido que desborda el ancho."
      :code="horizontalCode"
    >
      <ScrollArea orientation="horizontal" class="border-border w-full max-w-xl rounded-md border">
        <div class="flex gap-4 p-4">
          <div
            v-for="artwork in artworks"
            :key="artwork.title"
            class="border-border bg-card w-36 shrink-0 rounded-md border p-3"
          >
            <div class="bg-muted mb-2 aspect-square rounded-md" />
            <p class="text-sm leading-tight font-medium">{{ artwork.title }}</p>
            <p class="text-muted-foreground mt-1 text-xs">{{ artwork.artist }}</p>
            <p class="text-muted-foreground text-xs">{{ artwork.year }}</p>
          </div>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      title="Ambas direcciones"
      description="Scroll en ambos ejes con orientation='both'."
      :code="bothCode"
    >
      <ScrollArea orientation="both" class="border-border h-64 w-80 rounded-md border">
        <div class="w-[600px] p-4">
          <table class="w-full text-sm">
            <thead>
              <tr>
                <th
                  v-for="col in 8"
                  :key="col"
                  class="px-4 py-2 text-left font-medium whitespace-nowrap"
                >
                  Columna {{ col }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in 20" :key="row" class="border-border border-t">
                <td v-for="col in 8" :key="col" class="px-4 py-2 whitespace-nowrap">
                  Celda {{ row }}-{{ col }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      title="type='always'"
      description="La scrollbar permanece siempre visible."
      :code="alwaysCode"
    >
      <ScrollArea type="always" class="border-border h-48 w-64 rounded-md border">
        <div class="p-4">
          <p v-for="i in 15" :key="i" class="text-muted-foreground mb-3 text-sm">
            Párrafo {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      title="type='scroll'"
      description="La scrollbar aparece solo mientras se hace scroll."
      :code="scrollTypeCode"
    >
      <ScrollArea type="scroll" class="border-border h-48 w-64 rounded-md border">
        <div class="p-4">
          <p v-for="i in 15" :key="i" class="text-muted-foreground mb-3 text-sm">
            Párrafo {{ i }} — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      title="En contexto — Chat"
      description="ScrollArea integrado en un panel de mensajes tipo chat."
      :code="chatCode"
    >
      <div class="border-border bg-card flex w-80 flex-col rounded-lg border shadow-sm">
        <div class="border-border border-b px-4 py-3">
          <h3 class="text-sm font-semibold">Mensajes</h3>
        </div>
        <ScrollArea class="h-64">
          <div class="flex flex-col gap-3 p-4">
            <div
              v-for="i in 20"
              :key="i"
              class="rounded-lg px-3 py-2 text-sm"
              :class="i % 3 === 0 ? 'bg-primary text-primary-foreground self-end' : 'bg-muted'"
            >
              {{ i % 3 === 0 ? 'Mensaje enviado #' + i : 'Mensaje recibido #' + i }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </DocShowcase>

    <DocPropsTable :props="scrollAreaProps" />
  </div>
</template>
