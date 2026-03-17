<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@3df/ui';

const { t } = useI18n();

const components = computed(() => [
  {
    title: 'Alert Dialog',
    description: t('demo.navigationMenu.components.alertDialog'),
  },
  {
    title: 'Hover Card',
    description: t('demo.navigationMenu.components.hoverCard'),
  },
  {
    title: 'Progress',
    description: t('demo.navigationMenu.components.progress'),
  },
  {
    title: 'Scroll Area',
    description: t('demo.navigationMenu.components.scrollArea'),
  },
  {
    title: 'Tabs',
    description: t('demo.navigationMenu.components.tabs'),
  },
  {
    title: 'Tooltip',
    description: t('demo.navigationMenu.components.tooltip'),
  },
]);
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.centered.title') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.centered.description') }}
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
                  <div class="mb-2 text-lg font-medium">@3df/ui</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </div>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Introduction</div>
                  <p class="text-muted-foreground mt-1 text-sm leading-snug">
                    Re-usable components built with Vue 3 and Tailwind CSS v4.
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
