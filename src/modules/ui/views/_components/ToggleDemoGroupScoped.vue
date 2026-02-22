<script setup lang="ts">
import { ref } from 'vue';

import { Toggle } from '@3df-spa/ui';

const leftAlign = ref(true);
const centerAlign = ref(false);
const rightAlign = ref(false);

function setAlign(align: 'left' | 'center' | 'right') {
  leftAlign.value = align === 'left';
  centerAlign.value = align === 'center';
  rightAlign.value = align === 'right';
}

const muted = ref(false);
const favorite = ref(false);
const pinned = ref(false);
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Grupo exclusivo (alineación)</h2>
    <div class="flex">
      <Toggle
        :pressed="leftAlign"
        variant="outline"
        class="rounded-r-none border-r-0"
        @update:pressed="setAlign('left')"
      >
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
          <line x1="21" x2="3" y1="6" y2="6" />
          <line x1="15" x2="3" y1="12" y2="12" />
          <line x1="17" x2="3" y1="18" y2="18" />
        </svg>
      </Toggle>

      <Toggle
        :pressed="centerAlign"
        variant="outline"
        class="rounded-none border-r-0"
        @update:pressed="setAlign('center')"
      >
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
          <line x1="21" x2="3" y1="6" y2="6" />
          <line x1="17" x2="7" y1="12" y2="12" />
          <line x1="19" x2="5" y1="18" y2="18" />
        </svg>
      </Toggle>

      <Toggle
        :pressed="rightAlign"
        variant="outline"
        class="rounded-l-none"
        @update:pressed="setAlign('right')"
      >
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
          <line x1="21" x2="3" y1="6" y2="6" />
          <line x1="21" x2="9" y1="12" y2="12" />
          <line x1="21" x2="7" y1="18" y2="18" />
        </svg>
      </Toggle>
    </div>
    <p class="text-muted-foreground text-sm">
      Alineación: {{ leftAlign ? 'Izquierda' : centerAlign ? 'Centro' : 'Derecha' }}
    </p>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Scoped slot (estado dinámico)</h2>
    <div class="flex gap-3">
      <Toggle v-model:pressed="muted">
        <template #default="{ pressed }">
          <svg
            v-if="!pressed"
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" x2="16" y1="9" y2="15" />
            <line x1="16" x2="22" y1="9" y2="15" />
          </svg>
          {{ pressed ? 'Muted' : 'Sound' }}
        </template>
      </Toggle>

      <Toggle v-model:pressed="favorite">
        <template #default="{ pressed }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            :fill="pressed ? 'currentColor' : 'none'"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </svg>
          {{ pressed ? 'Favorito' : 'Agregar' }}
        </template>
      </Toggle>

      <Toggle v-model:pressed="pinned" variant="outline">
        <template #default="{ pressed }">
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
            <line x1="12" x2="12" y1="17" y2="22" />
            <path
              d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"
            />
          </svg>
          {{ pressed ? 'Pinned' : 'Pin' }}
        </template>
      </Toggle>
    </div>
  </section>
</template>
