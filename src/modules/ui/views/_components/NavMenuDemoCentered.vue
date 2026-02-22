<script setup lang="ts">
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
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">2. Centrado (estilo shadcn)</h2>
    <p class="text-muted-foreground text-sm">
      Menú centrado con borde redondeado. Ideal como navegación principal de una aplicación.
    </p>

    <div class="border-border bg-background flex justify-center rounded-lg border p-20">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="gs-center">
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px] md:w-[500px]">
              <div class="grid gap-3 md:grid-cols-[.75fr_1fr]">
                <div
                  class="from-muted/50 to-muted row-span-3 flex flex-col justify-end rounded-md bg-gradient-to-b p-6"
                >
                  <div class="mb-2 text-lg font-medium">shadcn/ui</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </div>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Introduction</div>
                  <p class="text-muted-foreground mt-1 text-sm leading-snug">
                    Re-usable components built with Radix UI and Tailwind CSS.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Installation</div>
                  <p class="text-muted-foreground mt-1 text-sm leading-snug">
                    How to install dependencies and structure your app.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Typography</div>
                  <p class="text-muted-foreground mt-1 text-sm leading-snug">
                    Styles for headings, paragraphs, lists...etc
                  </p>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="comp-center">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px] md:w-[500px] lg:w-[600px]">
              <ul class="grid w-full gap-3 md:grid-cols-2">
                <li v-for="comp in components" :key="comp.title">
                  <NavigationMenuLink href="#">
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
            >
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  </section>
</template>
