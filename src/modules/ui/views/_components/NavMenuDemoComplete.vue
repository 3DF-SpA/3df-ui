<script setup lang="ts">
import { ref } from 'vue';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@3df-spa/ui';

const components = [
  {
    title: 'Alert Dialog',
    description: 'Diálogo modal que interrumpe al usuario con contenido importante.',
  },
  {
    title: 'Hover Card',
    description: 'Vista previa del contenido al pasar el cursor sobre un enlace.',
  },
  {
    title: 'Progress',
    description: 'Barra de progreso para operaciones de larga duración.',
  },
  {
    title: 'Scroll Area',
    description: 'Área de desplazamiento con barras personalizadas.',
  },
  {
    title: 'Tabs',
    description: 'Conjunto de paneles de contenido organizados en pestañas.',
  },
  {
    title: 'Tooltip',
    description: 'Información contextual al pasar el cursor sobre un elemento.',
  },
];

const currentLink = ref('');

function handleLinkClick(name: string) {
  currentLink.value = name;
}
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">1. Menú completo</h2>
    <p class="text-muted-foreground text-sm">
      Hover sobre los triggers para desplegar los paneles. Incluye item destacado, grid de
      componentes y link directo.
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="getting-started">
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[400px] md:w-[500px]">
            <div class="grid gap-3 md:grid-cols-[.75fr_1fr]">
              <div
                class="from-muted/50 to-muted row-span-3 flex flex-col justify-end rounded-md bg-gradient-to-b p-6"
              >
                <div class="mb-2 text-lg font-medium">3df UI</div>
                <p class="text-muted-foreground text-sm leading-tight">
                  Componentes Vue 3 con Tailwind CSS. Accesibles y personalizables.
                </p>
              </div>
              <NavigationMenuLink href="#" @click.prevent="handleLinkClick('Introducción')">
                <div class="text-sm leading-none font-medium">Introducción</div>
                <p class="text-muted-foreground mt-1 text-sm leading-snug">
                  Componentes reutilizables con Vue y Tailwind CSS.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#" @click.prevent="handleLinkClick('Instalación')">
                <div class="text-sm leading-none font-medium">Instalación</div>
                <p class="text-muted-foreground mt-1 text-sm leading-snug">
                  Cómo instalar dependencias y configurar tu proyecto.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#" @click.prevent="handleLinkClick('Tipografía')">
                <div class="text-sm leading-none font-medium">Tipografía</div>
                <p class="text-muted-foreground mt-1 text-sm leading-snug">
                  Estilos tipográficos y jerarquía visual.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="components">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[400px] md:w-[500px] lg:w-[600px]">
            <ul class="grid w-full gap-3 md:grid-cols-2">
              <li v-for="comp in components" :key="comp.title">
                <NavigationMenuLink href="#" @click.prevent="handleLinkClick(comp.title)">
                  <div class="text-sm leading-none font-medium">{{ comp.title }}</div>
                  <p class="text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug">
                    {{ comp.description }}
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            @click.prevent="handleLinkClick('Documentación')"
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>

    <p v-if="currentLink" class="text-muted-foreground text-sm">
      Último enlace: <span class="text-foreground font-medium">{{ currentLink }}</span>
    </p>
  </section>
</template>
