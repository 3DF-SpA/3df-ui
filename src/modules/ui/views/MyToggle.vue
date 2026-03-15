<script setup lang="ts">
import { ref } from 'vue';

import { Toggle } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import ToggleDemoGroupScoped from './_components/ToggleDemoGroupScoped.vue';
import ToggleDemoOutlineSizesDisabled from './_components/ToggleDemoOutlineSizesDisabled.vue';

const bold = ref(false);
const italic = ref(false);
const underline = ref(false);

const toggleProps: PropItem[] = [
  {
    name: 'variant',
    type: "'default' | 'outline'",
    default: "'default'",
    description: 'Estilo visual del toggle',
  },
  {
    name: 'size',
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    description: 'Tamaño del toggle',
  },
  {
    name: 'pressed',
    type: 'boolean',
    default: 'false',
    description: 'Estado presionado (v-model:pressed)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita la interacción',
  },
];

const basicCode = `<Toggle v-model:pressed="bold">
  <BoldIcon class="size-4" />
</Toggle>
<Toggle v-model:pressed="italic">
  <ItalicIcon class="size-4" />
</Toggle>
<Toggle v-model:pressed="underline">
  <UnderlineIcon class="size-4" />
</Toggle>`;

const withTextCode = `<Toggle v-model:pressed="bold">
  <BoldIcon class="size-4" />
  Bold
</Toggle>
<Toggle v-model:pressed="italic">
  <ItalicIcon class="size-4" />
  Italic
</Toggle>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Toggle"
      description="Botón de dos estados que alterna entre activado y desactivado."
      import-code="import { Toggle } from '@3df/ui'"
    />

    <DocShowcase
      title="Básico"
      description="Toggles con íconos y estado reactivo."
      :code="basicCode"
    >
      <div class="flex flex-col gap-4">
        <div class="flex gap-3">
          <Toggle v-model:pressed="bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            </svg>
          </Toggle>

          <Toggle v-model:pressed="italic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" x2="10" y1="4" y2="4" />
              <line x1="14" x2="5" y1="20" y2="20" />
              <line x1="15" x2="9" y1="4" y2="20" />
            </svg>
          </Toggle>

          <Toggle v-model:pressed="underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 4v6a6 6 0 0 0 12 0V4" />
              <line x1="4" x2="20" y1="20" y2="20" />
            </svg>
          </Toggle>
        </div>
        <p class="text-muted-foreground text-sm">
          Bold: {{ bold }}, Italic: {{ italic }}, Underline: {{ underline }}
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Con texto"
      description="Toggles que combinan ícono y etiqueta de texto."
      :code="withTextCode"
    >
      <div class="flex gap-3">
        <Toggle v-model:pressed="bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          </svg>
          Bold
        </Toggle>

        <Toggle v-model:pressed="italic">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" x2="10" y1="4" y2="4" />
            <line x1="14" x2="5" y1="20" y2="20" />
            <line x1="15" x2="9" y1="4" y2="20" />
          </svg>
          Italic
        </Toggle>
      </div>
    </DocShowcase>

    <ToggleDemoOutlineSizesDisabled />
    <ToggleDemoGroupScoped />

    <DocPropsTable :props="toggleProps" />
  </div>
</template>
