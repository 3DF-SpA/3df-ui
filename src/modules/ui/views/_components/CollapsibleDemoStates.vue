<script setup lang="ts">
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const disabledCode = `<Collapsible disabled>
  <CollapsibleTrigger>
    <Button variant="ghost" size="sm" disabled>Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>No se puede abrir.</p>
  </CollapsibleContent>
</Collapsible>`;

const defaultOpenCode = `<Collapsible default-open>
  <CollapsibleTrigger>
    <template #default="{ open }">
      <Button variant="ghost" size="sm">{{ open ? 'Ocultar' : 'Mostrar' }}</Button>
    </template>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Visible desde el inicio.</p>
  </CollapsibleContent>
</Collapsible>`;
</script>

<template>
  <DocShowcase
    title="Deshabilitado"
    description="El collapsible no responde a interacciones."
    :code="disabledCode"
  >
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
          <div class="border-border/60 rounded-md border p-4">
            <p class="text-sm">Este contenido no debería mostrarse.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </DocShowcase>

  <DocShowcase
    title="Abierto por defecto"
    description="El contenido se muestra inicialmente con default-open."
    :code="defaultOpenCode"
  >
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
          <div class="border-border/60 rounded-md border p-4">
            <p class="text-sm">
              Un Collapsible es un componente interactivo que permite expandir y contraer una
              sección de contenido. Es ideal para FAQs, menús laterales y paneles de configuración.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </DocShowcase>
</template>
