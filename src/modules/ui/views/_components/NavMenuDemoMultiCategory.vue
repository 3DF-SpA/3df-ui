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
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.multiCategory.title') }}</h2>
    <p class="text-muted-foreground text-sm">
      {{ t('demo.navigationMenu.multiCategory.description') }}
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="frameworks">
          <NavigationMenuTrigger>Frameworks</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[450px] md:w-[550px]">
            <ul class="grid gap-3 md:grid-cols-2">
              <li v-for="fw in frameworks" :key="fw.title">
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">{{ fw.title }}</div>
                  <p class="text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug">
                    {{ fw.description }}
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="services">
          <NavigationMenuTrigger>{{ t('demo.navigationMenu.multiCategory.servicesTrigger') }}</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[400px] md:w-[500px]">
            <ul class="grid gap-3 md:grid-cols-2">
              <li v-for="svc in services" :key="svc.title">
                <NavigationMenuLink href="#">
                  <div class="text-sm leading-none font-medium">{{ svc.title }}</div>
                  <p class="text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug">
                    {{ svc.description }}
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="docs-multi">
          <NavigationMenuTrigger>{{ t('demo.navigationMenu.multiCategory.docsTrigger') }}</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[320px]">
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">
                {{ t('demo.navigationMenu.multiCategory.guides') }}
              </div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.multiCategory.guidesDesc') }}
              </p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">API Reference</div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.multiCategory.apiRefDesc') }}
              </p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Changelog</div>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ t('demo.navigationMenu.multiCategory.changelogDesc') }}
              </p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {{ t('demo.navigationMenu.multiCategory.support') }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>
</template>
