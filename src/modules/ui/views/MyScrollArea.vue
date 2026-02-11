<script setup lang="ts">
import { ScrollArea, Separator } from '@3df/ui';

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
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">ScrollArea</h1>

    <!-- ─── 1. Vertical básico ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Vertical — lista de tags</h2>
      <ScrollArea class="h-72 w-48 rounded-md border border-border">
        <div class="p-4">
          <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
          <template v-for="(tag, i) in tags" :key="tag">
            <div class="text-sm">{{ tag }}</div>
            <Separator v-if="i < tags.length - 1" class="my-2" decorative />
          </template>
        </div>
      </ScrollArea>
    </section>

    <!-- ─── 2. Horizontal ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Horizontal — galería de arte</h2>
      <ScrollArea orientation="horizontal" class="w-full max-w-xl rounded-md border border-border">
        <div class="flex gap-4 p-4">
          <div
            v-for="artwork in artworks"
            :key="artwork.title"
            class="w-36 shrink-0 rounded-md border border-border bg-card p-3"
          >
            <div class="mb-2 aspect-square rounded-md bg-muted" />
            <p class="text-sm font-medium leading-tight">{{ artwork.title }}</p>
            <p class="text-muted-foreground mt-1 text-xs">{{ artwork.artist }}</p>
            <p class="text-muted-foreground text-xs">{{ artwork.year }}</p>
          </div>
        </div>
      </ScrollArea>
    </section>

    <!-- ─── 3. Ambas direcciones ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Ambas direcciones</h2>
      <ScrollArea orientation="both" class="h-64 w-80 rounded-md border border-border">
        <div class="w-[600px] p-4">
          <table class="w-full text-sm">
            <thead>
              <tr>
                <th v-for="col in 8" :key="col" class="whitespace-nowrap px-4 py-2 text-left font-medium">
                  Columna {{ col }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in 20" :key="row" class="border-t border-border">
                <td v-for="col in 8" :key="col" class="whitespace-nowrap px-4 py-2">
                  Celda {{ row }}-{{ col }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </section>

    <!-- ─── 4. Type: always ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">type="always" — scrollbar siempre visible</h2>
      <ScrollArea type="always" class="h-48 w-64 rounded-md border border-border">
        <div class="p-4">
          <p v-for="i in 15" :key="i" class="text-muted-foreground mb-3 text-sm">
            Párrafo {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </ScrollArea>
    </section>

    <!-- ─── 5. Type: scroll ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">type="scroll" — visible solo al scrollear</h2>
      <ScrollArea type="scroll" class="h-48 w-64 rounded-md border border-border">
        <div class="p-4">
          <p v-for="i in 15" :key="i" class="text-muted-foreground mb-3 text-sm">
            Párrafo {{ i }} — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </ScrollArea>
    </section>

    <!-- ─── 6. En contexto — Chat ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">En contexto — Chat</h2>
      <div class="flex w-80 flex-col rounded-lg border border-border bg-card shadow-sm">
        <div class="border-b border-border px-4 py-3">
          <h3 class="text-sm font-semibold">Mensajes</h3>
        </div>
        <ScrollArea class="h-64">
          <div class="flex flex-col gap-3 p-4">
            <div
              v-for="i in 20"
              :key="i"
              class="rounded-lg px-3 py-2 text-sm"
              :class="i % 3 === 0 ? 'self-end bg-primary text-primary-foreground' : 'bg-muted'"
            >
              {{ i % 3 === 0 ? 'Mensaje enviado #' + i : 'Mensaje recibido #' + i }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </section>

    <!-- ─── 7. Referencia de Props ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Referencia de Props</h2>
      <div class="overflow-x-auto rounded-lg border border-border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-2 text-left font-medium">Prop</th>
              <th class="px-4 py-2 text-left font-medium">Tipo</th>
              <th class="px-4 py-2 text-left font-medium">Default</th>
              <th class="px-4 py-2 text-left font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">type</td>
              <td class="px-4 py-2 font-mono text-xs">'auto' | 'always' | 'scroll' | 'hover'</td>
              <td class="px-4 py-2 font-mono text-xs">'hover'</td>
              <td class="px-4 py-2">Cuándo mostrar la scrollbar</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">orientation</td>
              <td class="px-4 py-2 font-mono text-xs">'vertical' | 'horizontal' | 'both'</td>
              <td class="px-4 py-2 font-mono text-xs">'vertical'</td>
              <td class="px-4 py-2">Ejes de scroll habilitados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>