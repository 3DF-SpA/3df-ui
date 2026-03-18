<script setup lang="ts">
import { Item, ItemDescription, ItemLabel } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

function onAction(action: string) {
  alert(`Acción: ${action}`);
}
</script>

<template>
  <DocShowcase title="Variantes" code="">
    <div class="w-full max-w-md space-y-2">
      <Item as="button" variant="default" @click="onAction('default')">
        <ItemLabel>Default variant</ItemLabel>
        <ItemDescription>hover:bg-accent</ItemDescription>
      </Item>
      <Item as="button" variant="ghost" @click="onAction('ghost')">
        <ItemLabel>Ghost variant</ItemLabel>
        <ItemDescription>hover:bg-accent/50</ItemDescription>
      </Item>
      <Item as="button" variant="muted" @click="onAction('muted')">
        <ItemLabel>Muted variant</ItemLabel>
        <ItemDescription>bg-muted/50</ItemDescription>
      </Item>
      <Item as="button" variant="destructive" @click="onAction('destructive')">
        <ItemLabel>Destructive variant</ItemLabel>
        <ItemDescription>hover:bg-destructive/10</ItemDescription>
      </Item>
    </div>
  </DocShowcase>

  <DocShowcase title="Tamaños" code="">
    <div class="w-full max-w-md space-y-2">
      <Item as="button" size="sm" @click="onAction('sm')">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </template>
        <ItemLabel>Small item</ItemLabel>
      </Item>
      <Item as="button" size="default" @click="onAction('default')">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </template>
        <ItemLabel>Default item</ItemLabel>
      </Item>
      <Item as="button" size="lg" @click="onAction('lg')">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </template>
        <ItemLabel>Large item</ItemLabel>
      </Item>
    </div>
  </DocShowcase>

  <DocShowcase title="Disabled" code="">
    <div class="w-full max-w-md space-y-2">
      <Item as="button" disabled>
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
          </svg>
        </template>
        <ItemLabel>Disabled item</ItemLabel>
        <ItemDescription>Cannot interact with this item</ItemDescription>
        <template #end>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-muted-foreground"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </template>
      </Item>
    </div>
  </DocShowcase>

  <DocShowcase title="Como enlace" code="">
    <div class="w-full max-w-md space-y-2">
      <Item as="a" href="https://vuejs.org" target="_blank" rel="noopener">
        <template #start>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </template>
        <ItemLabel>Vue.js Documentation</ItemLabel>
        <ItemDescription>vuejs.org — opens in new tab</ItemDescription>
        <template #end>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-muted-foreground"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
          </svg>
        </template>
      </Item>
    </div>
  </DocShowcase>

  <DocShowcase title="Solo texto" code="">
    <div class="border-border w-full max-w-md rounded-lg border">
      <Item as="button" @click="onAction('General')">
        <ItemLabel>General</ItemLabel>
      </Item>
      <Item as="button" @click="onAction('Appearance')">
        <ItemLabel>Appearance</ItemLabel>
      </Item>
      <Item as="button" @click="onAction('Integrations')">
        <ItemLabel>Integrations</ItemLabel>
      </Item>
    </div>
  </DocShowcase>
</template>
