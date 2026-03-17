<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@3df-spa/ui';

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

const currentLink = ref('');

function handleLinkClick(name: string) {
  currentLink.value = name;
}
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.complete.title') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.complete.description') }}
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
                  {{ t('demo.navigationMenu.complete.tagline') }}
                </p>
              </div>
              <NavigationMenuLink
                href="#"
                @click.prevent="handleLinkClick(t('demo.navigationMenu.complete.intro'))"
              >
                <div class="text-sm leading-none font-medium">
                  {{ t('demo.navigationMenu.complete.intro') }}
                </div>
                <p class="text-muted-foreground mt-1 text-sm leading-snug">
                  {{ t('demo.navigationMenu.complete.introDesc') }}
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#"
                @click.prevent="handleLinkClick(t('demo.navigationMenu.complete.install'))"
              >
                <div class="text-sm leading-none font-medium">
                  {{ t('demo.navigationMenu.complete.install') }}
                </div>
                <p class="text-muted-foreground mt-1 text-sm leading-snug">
                  {{ t('demo.navigationMenu.complete.installDesc') }}
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="#"
                @click.prevent="handleLinkClick(t('demo.typography'))"
              >
                <div class="text-sm leading-none font-medium">{{ t('demo.typography') }}</div>
                <p class="text-muted-foreground mt-1 text-sm leading-snug">
                  {{ t('demo.navigationMenu.complete.typographyDesc') }}
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
            @click.prevent="handleLinkClick(t('demo.navigationMenu.multiCategory.docsTrigger'))"
          >
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>

    <p v-if="currentLink" class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.complete.lastLink') }}
      <span class="text-foreground font-medium">{{ currentLink }}</span>
    </p>
  </section>
</template>
