<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useDocPage } from '@/i18n/composables/useDocPage';

import { ScrollArea, Separator } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t, tm } = useI18n();

const tags = Array.from({ length: 50 }, (_, i) => `v1.${i}.0-beta`);

const artworks = computed(
  () => tm('demo.scrollArea.artworks') as Array<{ title: string; artist: string; year: string }>,
);

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('scrollArea');

const scrollAreaProps = computed<PropItem[]>(() => [
  {
    name: 'type',
    type: "'auto' | 'always' | 'scroll' | 'hover'",
    default: "'hover'",
    description: propDesc('type'),
  },
  {
    name: 'orientation',
    type: "'vertical' | 'horizontal' | 'both'",
    default: "'vertical'",
    description: propDesc('orientation'),
  },
]);

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
      :description="description"
      import-code="import { ScrollArea } from '@3df-spa/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('verticalList')"
      :description="showcaseDesc('verticalList')"
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
      :title="showcaseTitle('horizontalGallery')"
      :description="showcaseDesc('horizontalGallery')"
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
      :title="showcaseTitle('bothDirections')"
      :description="showcaseDesc('bothDirections')"
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
                  {{ t('demo.scrollArea.column') }} {{ col }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in 20" :key="row" class="border-border border-t">
                <td v-for="col in 8" :key="col" class="px-4 py-2 whitespace-nowrap">
                  {{ t('demo.scrollArea.cell') }} {{ row }}-{{ col }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('alwaysVisible')"
      :description="showcaseDesc('alwaysVisible')"
      :code="alwaysCode"
    >
      <ScrollArea type="always" class="border-border h-48 w-64 rounded-md border">
        <div class="p-4">
          <p v-for="i in 15" :key="i" class="text-muted-foreground mb-3 text-sm">
            {{ `${t('demo.scrollArea.paragraph')} ${i} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.` }}
          </p>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('scrollType')"
      :description="showcaseDesc('scrollType')"
      :code="scrollTypeCode"
    >
      <ScrollArea type="scroll" class="border-border h-48 w-64 rounded-md border">
        <div class="p-4">
          <p v-for="i in 15" :key="i" class="text-muted-foreground mb-3 text-sm">
            {{ `${t('demo.scrollArea.paragraph')} ${i} — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.` }}
          </p>
        </div>
      </ScrollArea>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('chatContext')"
      :description="showcaseDesc('chatContext')"
      :code="chatCode"
    >
      <div class="border-border bg-card flex w-80 flex-col rounded-lg border shadow-sm">
        <div class="border-border border-b px-4 py-3">
          <h3 class="text-sm font-semibold">{{ t('demo.scrollArea.messages') }}</h3>
        </div>
        <ScrollArea class="h-64">
          <div class="flex flex-col gap-3 p-4">
            <div
              v-for="i in 20"
              :key="i"
              class="rounded-lg px-3 py-2 text-sm"
              :class="i % 3 === 0 ? 'bg-primary text-primary-foreground self-end' : 'bg-muted'"
            >
              {{ i % 3 === 0 ? t('demo.scrollArea.sentMessage') + i : t('demo.scrollArea.receivedMessage') + i }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </DocShowcase>

    <DocPropsTable :props="scrollAreaProps" />
  </div>
</template>
