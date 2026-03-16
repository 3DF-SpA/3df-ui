<script setup lang="ts">
import { ref, computed } from 'vue';

import { Combobox } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc } = useDocPage('combobox');

const selectedFramework = ref('');
const selectedLanguage = ref('ts');

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
];

const languages = [
  { value: 'ts', label: 'TypeScript' },
  { value: 'js', label: 'JavaScript' },
  { value: 'py', label: 'Python' },
  { value: 'rs', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java', disabled: true },
];

const comboboxProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    default: "''",
    description: propDesc('modelValue'),
  },
  {
    name: 'options',
    type: 'ComboboxOption[]',
    description: propDesc('options'),
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Select option...'",
    description: propDesc('placeholder'),
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: "'Search...'",
    description: propDesc('searchPlaceholder'),
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No results found.'",
    description: propDesc('emptyMessage'),
  },
]);

const basicCode = `<Combobox
  v-model="selectedFramework"
  :options="frameworks"
  placeholder="Selecciona un framework..."
  search-placeholder="Buscar framework..."
  empty-message="No se encontró ningún framework."
/>`;

const defaultValueCode = `<Combobox
  v-model="selectedLanguage"
  :options="languages"
  placeholder="Selecciona un lenguaje..."
  search-placeholder="Buscar lenguaje..."
  empty-message="No se encontró ningún lenguaje."
/>`;

const multipleCode = `<div class="flex flex-wrap gap-4">
  <Combobox
    v-model="selectedFramework"
    :options="frameworks"
    placeholder="Framework..."
    class="w-[200px]"
  />
  <Combobox
    v-model="selectedLanguage"
    :options="languages"
    placeholder="Lenguaje..."
    class="w-[200px]"
  />
</div>`;
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Combobox"
      :description="description"
      import-code="import { Combobox } from '@3df/ui'"
    />

    <DocShowcase title="Básico" :code="basicCode">
      <div class="flex max-w-sm flex-col gap-2">
        <Combobox
          v-model="selectedFramework"
          :options="frameworks"
          placeholder="Selecciona un framework..."
          search-placeholder="Buscar framework..."
          empty-message="No se encontró ningún framework."
        />
        <p class="text-muted-foreground text-sm">
          Selección: <strong>{{ selectedFramework || 'ninguna' }}</strong>
        </p>
      </div>
    </DocShowcase>

    <DocShowcase title="Con valor por defecto y opción deshabilitada" :code="defaultValueCode">
      <div class="flex max-w-sm flex-col gap-2">
        <Combobox
          v-model="selectedLanguage"
          :options="languages"
          placeholder="Selecciona un lenguaje..."
          search-placeholder="Buscar lenguaje..."
          empty-message="No se encontró ningún lenguaje."
        />
        <p class="text-muted-foreground text-sm">
          Selección: <strong>{{ selectedLanguage || 'ninguna' }}</strong>
        </p>
      </div>
    </DocShowcase>

    <DocShowcase title="Múltiples comboboxes" :code="multipleCode">
      <div class="flex flex-wrap gap-4">
        <Combobox
          v-model="selectedFramework"
          :options="frameworks"
          placeholder="Framework..."
          class="w-[200px]"
        />
        <Combobox
          v-model="selectedLanguage"
          :options="languages"
          placeholder="Lenguaje..."
          class="w-[200px]"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="comboboxProps" />
  </div>
</template>
