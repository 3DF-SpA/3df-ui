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

const frameworks = computed(() => [
  { title: 'Next.js', description: t('demo.navigationMenu.frameworks.nextjs') },
  { title: 'SvelteKit', description: t('demo.navigationMenu.frameworks.sveltekit') },
  { title: 'Nuxt', description: t('demo.navigationMenu.frameworks.nuxt') },
  { title: 'Remix', description: t('demo.navigationMenu.frameworks.remix') },
  { title: 'Astro', description: t('demo.navigationMenu.frameworks.astro') },
]);

const services = computed(() => [
  { title: 'API Gateway', description: t('demo.navigationMenu.services.apiGateway') },
  { title: 'Authentication', description: t('demo.navigationMenu.services.authentication') },
  { title: 'Database', description: t('demo.navigationMenu.services.database') },
  { title: 'Analytics', description: t('demo.navigationMenu.services.analytics') },
]);
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.mega.title') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.mega.description') }}
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="mega">
          <NavigationMenuTrigger>Mega Menu</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[600px] lg:w-[750px]">
            <div class="grid gap-4 md:grid-cols-3">
              <div>
                <p
                  class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase"
                >
                  Frameworks
                </p>
                <NavigationMenuLink v-for="fw in frameworks" :key="fw.title" href="#">
                  <div class="text-sm leading-none font-medium">{{ fw.title }}</div>
                </NavigationMenuLink>
              </div>
              <div>
                <p
                  class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase"
                >
                  {{ t('demo.navigationMenu.mega.servicesLabel') }}
                </p>
                <NavigationMenuLink v-for="svc in services" :key="svc.title" href="#">
                  <div class="text-sm leading-none font-medium">{{ svc.title }}</div>
                </NavigationMenuLink>
              </div>
              <div>
                <p
                  class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase"
                >
                  {{ t('demo.navigationMenu.mega.resourcesLabel') }}
                </p>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Blog</div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Changelog</div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">Community</div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">GitHub</div>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>
</template>
