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
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.navbar.title') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.navbar.description') }}
    </p>

    <div class="border-border bg-background flex items-center gap-6 rounded-lg border px-6 py-3">
      <div class="flex items-center gap-2 font-semibold">
        <div
          class="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
        >
          3D
        </div>
        <span class="text-sm">3df Space</span>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="product-nav">
            <NavigationMenuTrigger>{{ t('demo.navigationMenu.navbar.productTrigger') }}</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px]">
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">
                  {{ t('demo.navigationMenu.navbar.features') }}
                </div>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('demo.navigationMenu.navbar.featuresDesc') }}
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">
                  {{ t('demo.navigationMenu.navbar.integrations') }}
                </div>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('demo.navigationMenu.navbar.integrationsDesc') }}
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">{{ t('demo.prices') }}</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('demo.navigationMenu.navbar.pricesDesc') }}
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="solutions-nav">
            <NavigationMenuTrigger>{{ t('demo.navigationMenu.navbar.solutionsTrigger') }}</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px]">
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Startups</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('demo.navigationMenu.navbar.startupsDesc') }}
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Enterprise</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('demo.navigationMenu.navbar.enterpriseDesc') }}
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              Blog
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              {{ t('demo.navigationMenu.navbar.contact') }}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  </section>
</template>
