<script setup lang="ts">
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
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.simple.title') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.simple.description') }}
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>{{ t('demo.navigationMenu.simple.resourcesTrigger') }}</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[320px]">
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Blog</div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.simple.blogDesc') }}
              </p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">GitHub</div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.simple.githubDesc') }}
              </p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Discord</div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.simple.discordDesc') }}
              </p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.simple.activeTitle') }}</h2>
    <p class="text-muted-foreground text-sm">
      <code>NavigationMenuLink</code> {{ t('demo.navigationMenu.simple.activeDescription') }}
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="pages">
          <NavigationMenuTrigger>{{ t('demo.navigationMenu.simple.pagesTrigger') }}</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[280px]">
            <NavigationMenuLink href="#" :active="true">
              <div class="text-sm leading-none font-medium">{{ t('common.home') }}</div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.simple.homeDesc') }}
              </p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">
                {{ t('demo.navigationMenu.simple.about') }}
              </div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.simple.aboutDesc') }}
              </p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">
                {{ t('demo.navigationMenu.simple.contact') }}
              </div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.simple.contactDesc') }}
              </p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>
</template>
