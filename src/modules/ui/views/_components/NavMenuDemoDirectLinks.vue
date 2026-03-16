<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@3df/ui';

const { t } = useI18n();
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">7. Solo links directos</h2>
    <p class="text-muted-foreground text-sm">
      Sin paneles desplegables — cada ítem es un link directo.
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {{ t('common.home') }}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            {{ t('demo.prices') }}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Contacto
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </section>
</template>
