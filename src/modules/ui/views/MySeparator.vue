<script setup lang="ts">
import { Separator } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const separatorProps: PropItem[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Dirección del separador',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description: 'Si es true, usa role="none" en vez de role="separator"',
  },
];

const horizontalCode = `<div class="space-y-1">
  <h3 class="text-sm leading-none font-medium">Radix Primitives</h3>
  <p class="text-muted-foreground text-sm">
    Un conjunto de componentes UI accesibles y sin estilos.
  </p>
</div>
<Separator class="my-4" />
<div class="flex h-5 items-center gap-4 text-sm">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`;

const verticalCode = `<div class="flex h-5 items-center gap-4 text-sm">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Configuración</span>
  <Separator orientation="vertical" />
  <span>Perfil</span>
  <Separator orientation="vertical" />
  <span>Ayuda</span>
</div>`;

const decorativeCode = `<Separator decorative />`;

const customCode = `<Separator class="h-0.5" />
<Separator class="bg-primary" />
<Separator class="my-6" />
<Separator class="border-border h-0 border-t border-dashed bg-transparent" />`;

const contextCode = `<div class="border-border bg-card max-w-sm rounded-lg border p-6 shadow-sm">
  <h3 class="text-base font-semibold">Cuenta</h3>
  <p class="text-muted-foreground mt-1 text-sm">Gestiona tu información personal.</p>
  <Separator class="my-4" />
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm">Nombre</span>
      <span class="text-muted-foreground text-sm">Pedro Duarte</span>
    </div>
    <Separator decorative />
    <div class="flex items-center justify-between">
      <span class="text-sm">Email</span>
      <span class="text-muted-foreground text-sm">pedro@example.com</span>
    </div>
    <Separator decorative />
    <div class="flex items-center justify-between">
      <span class="text-sm">Plan</span>
      <span class="text-muted-foreground text-sm">Pro</span>
    </div>
  </div>
</div>`;
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Separator"
      description="Línea divisoria visual para separar secciones de contenido horizontal o verticalmente."
      import-code="import { Separator } from '@3df/ui'"
    />

    <DocShowcase title="Horizontal (default)" :code="horizontalCode">
      <div class="max-w-md">
        <div class="space-y-1">
          <h3 class="text-sm leading-none font-medium">Radix Primitives</h3>
          <p class="text-muted-foreground text-sm">
            Un conjunto de componentes UI accesibles y sin estilos.
          </p>
        </div>
        <Separator class="my-4" />
        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase title="Vertical" :code="verticalCode">
      <div class="flex h-5 items-center gap-4 text-sm">
        <span>Home</span>
        <Separator orientation="vertical" />
        <span>Configuración</span>
        <Separator orientation="vertical" />
        <span>Perfil</span>
        <Separator orientation="vertical" />
        <span>Ayuda</span>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Decorativo"
      description='Cuando el separador es puramente visual y no aporta información semántica, usa decorative para que se renderice con role="none".'
      :code="decorativeCode"
    >
      <div class="max-w-md space-y-3">
        <p class="text-sm">Primer bloque de contenido.</p>
        <Separator decorative />
        <p class="text-sm">Segundo bloque de contenido.</p>
      </div>
    </DocShowcase>

    <DocShowcase title="Estilos personalizados" :code="customCode">
      <div class="flex max-w-md flex-col gap-6">
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Más grueso (h-0.5):</p>
          <Separator class="h-0.5" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Color personalizado:</p>
          <Separator class="bg-primary" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Con margen automático:</p>
          <Separator class="my-6" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Dashed (border trick):</p>
          <Separator class="border-border h-0 border-t border-dashed bg-transparent" />
        </div>
      </div>
    </DocShowcase>

    <DocShowcase title="En contexto — Card con secciones" :code="contextCode">
      <div class="border-border bg-card max-w-sm rounded-lg border p-6 shadow-sm">
        <h3 class="text-base font-semibold">Cuenta</h3>
        <p class="text-muted-foreground mt-1 text-sm">Gestiona tu información personal.</p>
        <Separator class="my-4" />
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Nombre</span>
            <span class="text-muted-foreground text-sm">Pedro Duarte</span>
          </div>
          <Separator decorative />
          <div class="flex items-center justify-between">
            <span class="text-sm">Email</span>
            <span class="text-muted-foreground text-sm">pedro@example.com</span>
          </div>
          <Separator decorative />
          <div class="flex items-center justify-between">
            <span class="text-sm">Plan</span>
            <span class="text-muted-foreground text-sm">Pro</span>
          </div>
        </div>
      </div>
    </DocShowcase>

    <DocPropsTable :props="separatorProps" />
  </div>
</template>
