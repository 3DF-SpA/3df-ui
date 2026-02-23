<script setup lang="ts">
import { Badge, Button } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import BadgeDemoIcons from './_components/BadgeDemoIcons.vue';

const badgeProps: PropItem[] = [
  {
    name: 'variant',
    type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink' | 'gray'",
    default: "'default'",
    description: 'Estilo visual del badge',
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description: 'Tamaño del badge',
  },
  { name: 'as', type: 'string', default: "'span'", description: 'Elemento HTML a renderizar' },
  {
    name: 'truncate',
    type: 'boolean',
    default: 'false',
    description: 'Trunca el texto con elipsis si desborda',
  },
];

const variantsCode = `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>`;

const colorsCode = `<Badge variant="red">Red</Badge>
<Badge variant="blue">Blue</Badge>
<Badge variant="green">Green</Badge>
<!-- También funciona con class="rounded-full" -->
<Badge variant="purple" class="rounded-full">Purple</Badge>`;

const sizesCode = `<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>`;

const iconsCode = `<Badge variant="success">
  <svg><!-- ícono check --></svg>
  Aprobado
</Badge>
<Badge variant="destructive">
  <svg><!-- ícono X --></svg>
  Rechazado
</Badge>`;

const pillCode = `<Badge class="rounded-full">Default pill</Badge>
<Badge variant="secondary" class="rounded-full">Secondary pill</Badge>
<Badge variant="success" class="rounded-full">Success pill</Badge>`;

const asLinkCode = `<Badge as="a" href="#" class="hover:bg-primary/85 cursor-pointer transition-[background-color] duration-200">
  Clickable
</Badge>
<Badge as="a" href="#" variant="outline" class="hover:bg-accent cursor-pointer transition-[background-color] duration-200">
  Outline link
</Badge>`;

const contextCode = `<Button>
  Inbox
  <Badge variant="secondary" size="sm" class="rounded-full">24</Badge>
</Button>
<span class="text-sm font-medium">Estado del servidor</span>
<Badge variant="success" size="sm">Online</Badge>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Badge"
      description="Etiqueta compacta para mostrar estados, categorías o metadatos."
      import-code="import { Badge } from '@3df-spa/ui'"
    />

    <DocShowcase
      title="Variantes"
      description="Estilos semánticos disponibles para el badge."
      :code="variantsCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Colores"
      description="Variantes de color y su versión píldora con rounded-full."
      :code="colorsCode"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <Badge variant="red">Red</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="yellow">Yellow</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="blue">Blue</Badge>
          <Badge variant="indigo">Indigo</Badge>
          <Badge variant="purple">Purple</Badge>
          <Badge variant="pink">Pink</Badge>
          <Badge variant="gray">Gray</Badge>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <Badge variant="red" class="rounded-full">Red</Badge>
          <Badge variant="orange" class="rounded-full">Orange</Badge>
          <Badge variant="yellow" class="rounded-full">Yellow</Badge>
          <Badge variant="green" class="rounded-full">Green</Badge>
          <Badge variant="teal" class="rounded-full">Teal</Badge>
          <Badge variant="blue" class="rounded-full">Blue</Badge>
          <Badge variant="indigo" class="rounded-full">Indigo</Badge>
          <Badge variant="purple" class="rounded-full">Purple</Badge>
          <Badge variant="pink" class="rounded-full">Pink</Badge>
          <Badge variant="gray" class="rounded-full">Gray</Badge>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Tamaños"
      description="Tamaños predefinidos para el badge."
      :code="sizesCode"
    >
      <div class="flex flex-wrap items-end gap-4">
        <Badge size="sm">Small</Badge>
        <Badge size="default">Default</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Con íconos"
      description="Los SVG dentro del badge se dimensionan automáticamente."
      :code="iconsCode"
    >
      <BadgeDemoIcons />
    </DocShowcase>

    <DocShowcase
      title="Forma píldora"
      description="Usa class='rounded-full' para obtener bordes completamente redondeados."
      :code="pillCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Badge class="rounded-full">Default pill</Badge>
        <Badge variant="secondary" class="rounded-full">Secondary pill</Badge>
        <Badge variant="success" class="rounded-full">Success pill</Badge>
        <Badge variant="destructive" class="rounded-full">Destructive pill</Badge>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Como enlace"
      description="Renderiza el badge como un elemento anchor usando la prop as."
      :code="asLinkCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Badge
          as="a"
          href="#"
          class="hover:bg-primary/85 cursor-pointer transition-[background-color] duration-200"
          >Clickable</Badge
        >
        <Badge
          as="a"
          href="#"
          variant="outline"
          class="hover:bg-accent cursor-pointer transition-[background-color] duration-200"
          >Outline link</Badge
        >
        <Badge
          as="a"
          href="#"
          variant="blue"
          class="cursor-pointer transition-[background-color] duration-200 hover:bg-blue-700"
          >Blue link</Badge
        >
      </div>
    </DocShowcase>

    <DocShowcase
      title="En contexto"
      description="Badges usados dentro de botones e indicadores de estado."
      :code="contextCode"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <Button>
            Inbox
            <Badge variant="secondary" size="sm" class="rounded-full">24</Badge>
          </Button>
          <Button variant="outline">
            Notificaciones
            <Badge variant="destructive" size="sm" class="rounded-full">3</Badge>
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Estado del servidor</span>
          <Badge variant="success" size="sm">Online</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Mantenimiento</span>
          <Badge variant="warning" size="sm">Programado</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Versión</span>
          <Badge variant="blue" size="sm">v2.1.0</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Prioridad</span>
          <Badge variant="purple" size="sm">Alta</Badge>
        </div>
      </div>
    </DocShowcase>

    <DocPropsTable :props="badgeProps" />
  </div>
</template>
