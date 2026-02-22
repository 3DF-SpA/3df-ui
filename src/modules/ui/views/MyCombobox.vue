<script setup lang="ts">
import { ref } from 'vue';

import { Combobox } from '@3df-spa/ui';

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

const selectedFramework = ref('');
const selectedLanguage = ref('ts');
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Combobox</h1>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Combobox básico</h2>
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
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con valor por defecto y opción deshabilitada</h2>
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
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Múltiples comboboxes</h2>
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
    </section>
  </div>
</template>