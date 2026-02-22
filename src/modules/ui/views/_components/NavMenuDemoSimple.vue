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
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">4. Menú simple</h2>
    <p class="text-muted-foreground text-sm">
      Versión minimalista con un solo trigger y contenido lineal.
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[320px]">
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Blog</div>
              <p class="text-muted-foreground mt-1 text-sm">Artículos y tutoriales.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">GitHub</div>
              <p class="text-muted-foreground mt-1 text-sm">Repositorio open source.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Discord</div>
              <p class="text-muted-foreground mt-1 text-sm">Comunidad y soporte.</p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">5. Con link activo</h2>
    <p class="text-muted-foreground text-sm">
      <code>NavigationMenuLink</code> acepta la prop <code>active</code> para indicar la página
      actual.
    </p>

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="pages">
          <NavigationMenuTrigger>Páginas</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[280px]">
            <NavigationMenuLink href="#" :active="true">
              <div class="text-sm leading-none font-medium">Inicio</div>
              <p class="text-muted-foreground mt-1 text-sm">Página principal.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Acerca de</div>
              <p class="text-muted-foreground mt-1 text-sm">Información del equipo.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Contacto</div>
              <p class="text-muted-foreground mt-1 text-sm">Formulario de contacto.</p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>
</template>
