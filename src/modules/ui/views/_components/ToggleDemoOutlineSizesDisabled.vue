<script setup lang="ts">
import { ref } from 'vue';

import { Toggle } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const bold = ref(false);
const italic = ref(false);
const underline = ref(false);

const outlineCode = `<Toggle v-model:pressed="bold" variant="outline">
  <BoldIcon class="size-4" />
</Toggle>
<Toggle v-model:pressed="italic" variant="outline">
  <ItalicIcon class="size-4" />
</Toggle>`;

const sizesCode = `<Toggle v-model:pressed="bold" size="sm">
  <BoldIcon class="size-4" /> Small
</Toggle>
<Toggle v-model:pressed="italic">
  <ItalicIcon class="size-4" /> Default
</Toggle>
<Toggle v-model:pressed="underline" size="lg">
  <UnderlineIcon class="size-4" /> Large
</Toggle>`;

const disabledCode = `<Toggle disabled>
  <BoldIcon class="size-4" />
</Toggle>
<Toggle disabled variant="outline">
  <ItalicIcon class="size-4" />
</Toggle>`;
</script>

<template>
  <DocShowcase title="Variante outline" description="Toggle con borde visible." :code="outlineCode">
    <div class="flex gap-3">
      <Toggle v-model:pressed="bold" variant="outline">
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

      <Toggle v-model:pressed="italic" variant="outline">
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

      <Toggle v-model:pressed="underline" variant="outline">
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
  </DocShowcase>

  <DocShowcase title="Tamaños" description="Tamaños sm, default y lg." :code="sizesCode">
    <div class="flex items-center gap-3">
      <Toggle v-model:pressed="bold" size="sm">
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
        Small
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
        Default
      </Toggle>

      <Toggle v-model:pressed="underline" size="lg">
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
        Large
      </Toggle>
    </div>
  </DocShowcase>

  <DocShowcase
    title="Disabled"
    description="Toggles deshabilitados en ambas variantes."
    :code="disabledCode"
  >
    <div class="flex gap-3">
      <Toggle disabled>
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

      <Toggle disabled variant="outline">
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
    </div>
  </DocShowcase>
</template>
