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
    <h2 class="text-xl font-semibold">6. Navbar con logo</h2>
    <p class="text-muted-foreground text-sm">
      Ejemplo usando el menú como parte de una barra de navegación con logo.
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
            <NavigationMenuTrigger>Producto</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px]">
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Características</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  Todo lo que necesitas para tu proyecto.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Integraciones</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  Conecta con tus herramientas favoritas.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Precios</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  Planes para equipos de todos los tamaños.
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="solutions-nav">
            <NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px]">
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Startups</div>
                <p class="text-muted-foreground mt-1 text-sm">
                  Herramientas para crecer rápidamente.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm leading-none font-medium">Enterprise</div>
                <p class="text-muted-foreground mt-1 text-sm">Soluciones empresariales a escala.</p>
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
              Contacto
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  </section>
</template>
