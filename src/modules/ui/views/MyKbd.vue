<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDocPage } from '@/i18n/composables/useDocPage';
import { Kbd } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('kbd');

const { t } = useI18n();

const kbdProps = computed<PropItem[]>(() => [
  {
    name: 'variant',
    type: `'default'`,
    default: `'default'`,
    description: propDesc('variant'),
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'default' | 'lg'`,
    default: `'default'`,
    description: propDesc('size'),
  },
]);

const sizesCode = `<Kbd size="xs">⌘</Kbd>
<Kbd size="sm">⌘</Kbd>
<Kbd>⌘</Kbd>
<Kbd size="lg">⌘</Kbd>`;

const shortcutsCode = `<div class="flex items-center gap-1.5">
  <Kbd>⌘</Kbd>
  <span class="text-muted-foreground text-sm">+</span>
  <Kbd>K</Kbd>
  <span class="text-muted-foreground ml-3 text-sm">Abrir buscador</span>
</div>`;

const specialKeysCode = `<Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>⌥</Kbd> <Kbd>⌃</Kbd>
<Kbd>↵</Kbd> <Kbd>⌫</Kbd> <Kbd>⇥</Kbd> <Kbd>Esc</Kbd>
<Kbd v-for="n in 12" :key="n">F{{ n }}</Kbd>`;

const inlineAndOverrideCode = `<p class="text-sm">
  Presiona <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> para abrir la paleta.
</p>

<Kbd class="bg-primary text-primary-foreground border-primary">⌘</Kbd>
<Kbd class="rounded-full">⌥</Kbd>`;
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Kbd"
      :description="description"
      import-code="import { Kbd } from '@3df/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('sizes')"
      :description="showcaseDesc('sizes')"
      :code="sizesCode"
    >
      <div class="flex items-center gap-4">
        <Kbd size="xs">⌘</Kbd>
        <Kbd size="sm">⌘</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd size="lg">⌘</Kbd>
      </div>
      <p class="text-muted-foreground mt-3 text-xs">xs · sm · default · lg</p>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('shortcuts')"
      :description="showcaseDesc('shortcuts')"
      :code="shortcutsCode"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-1.5">
          <Kbd>⌘</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>K</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">{{ t('demo.openSearch') }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Kbd>⌘</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>⇧</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>P</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">Paleta de comandos</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Kbd>Ctrl</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>C</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">{{ t('common.copy') }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Kbd>Ctrl</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>V</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">Pegar</span>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('specialKeys')"
      :description="showcaseDesc('specialKeys')"
      :code="specialKeysCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
          <Kbd>↵</Kbd>
          <Kbd>⌫</Kbd>
          <Kbd>⇥</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>Space</Kbd>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Kbd v-for="n in 12" :key="n">F{{ n }}</Kbd>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('inlineOverride')"
      :description="showcaseDesc('inlineOverride')"
      :code="inlineAndOverrideCode"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <p class="text-sm">
            Presiona <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> para abrir la paleta de búsqueda,
            o <Kbd size="sm">Esc</Kbd> para cerrar el diálogo actual.
          </p>
          <p class="text-sm">
            Usa <Kbd size="sm">↑</Kbd> y <Kbd size="sm">↓</Kbd> para navegar entre los resultados y
            <Kbd size="sm">↵</Kbd> para confirmar la selección.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Kbd class="bg-primary text-primary-foreground border-primary shadow-primary/50">⌘</Kbd>
          <Kbd
            class="bg-destructive/10 text-destructive border-destructive/30 shadow-destructive/20"
            >Del</Kbd
          >
          <Kbd class="rounded-full">⌥</Kbd>
        </div>
      </div>
    </DocShowcase>

    <DocPropsTable :props="kbdProps" />
  </div>
</template>
