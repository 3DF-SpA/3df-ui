<script setup lang="ts">
import { ref } from 'vue';

import { Collapsible, CollapsibleContent, CollapsibleTrigger, Button } from '@3df-spa/ui';

const isOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Collapsible</h1>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Collapsible básico</h2>
      <div class="mx-auto w-full max-w-sm">
        <Collapsible class="space-y-2">
          <div class="flex items-center justify-between space-x-4">
            <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
            <CollapsibleTrigger>
              <template #default="{ open }">
                <Button variant="ghost" size="sm" class="w-9 p-0">
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
                    class="h-4 w-4 transition-transform"
                    :class="open ? 'rotate-180' : ''"
                  >
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                  <span class="sr-only">Toggle</span>
                </Button>
              </template>
            </CollapsibleTrigger>
          </div>
          <div class="rounded-md border border-border/60 px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
          <CollapsibleContent class="space-y-2">
            <div class="rounded-md border border-border/60 px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
            <div class="rounded-md border border-border/60 px-4 py-3 font-mono text-sm">@stitches/react</div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Controlado con v-model:open</h2>
      <div class="mx-auto w-full max-w-sm space-y-4">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="isOpen = !isOpen">
            {{ isOpen ? 'Cerrar' : 'Abrir' }}
          </Button>
          <span class="text-muted-foreground text-sm">
            Estado: <strong>{{ isOpen ? 'abierto' : 'cerrado' }}</strong>
          </span>
        </div>
        <Collapsible v-model:open="isOpen" class="space-y-2">
          <div class="flex items-center justify-between space-x-4">
            <h4 class="text-sm font-semibold">Sección controlada</h4>
            <CollapsibleTrigger>
              <Button variant="ghost" size="sm" class="w-9 p-0">
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
                  class="h-4 w-4 transition-transform"
                  :class="isOpen ? 'rotate-180' : ''"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div class="rounded-md border border-border/60 p-4">
              <p class="text-sm">
                Este contenido se puede controlar tanto con el trigger interno como
                con el botón externo, gracias al binding bidireccional de v-model.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Deshabilitado</h2>
      <div class="mx-auto w-full max-w-sm">
        <Collapsible disabled class="space-y-2">
          <div class="flex items-center justify-between space-x-4">
            <h4 class="text-sm font-semibold opacity-50">Sección deshabilitada</h4>
            <CollapsibleTrigger>
              <Button variant="ghost" size="sm" class="w-9 p-0" disabled>
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
                  class="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div class="rounded-md border border-border/60 p-4">
              <p class="text-sm">Este contenido no debería mostrarse.</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Abierto por defecto</h2>
      <div class="mx-auto w-full max-w-sm">
        <Collapsible default-open class="space-y-2">
          <div class="flex items-center justify-between space-x-4">
            <h4 class="text-sm font-semibold">FAQ: ¿Qué es un Collapsible?</h4>
            <CollapsibleTrigger>
              <template #default="{ open }">
                <Button variant="ghost" size="sm">
                  {{ open ? 'Ocultar' : 'Mostrar' }}
                </Button>
              </template>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div class="rounded-md border border-border/60 p-4">
              <p class="text-sm">
                Un Collapsible es un componente interactivo que permite expandir y
                contraer una sección de contenido. Es ideal para FAQs, menús
                laterales, y paneles de configuración.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  </div>
</template>