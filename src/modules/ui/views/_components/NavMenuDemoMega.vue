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

const frameworks = [
  { title: 'Next.js', description: 'Framework React fullstack con SSR y App Router.' },
  { title: 'SvelteKit', description: 'Framework Svelte con routing, SSR y adaptadores.' },
  { title: 'Nuxt', description: 'Framework Vue intuitivo con auto-imports y SSR.' },
  { title: 'Remix', description: 'Framework web centrado en estándares y user experience.' },
  { title: 'Astro', description: 'Framework para sitios centrados en contenido.' },
];

const services = [
  { title: 'API Gateway', description: 'Gestión centralizada de APIs y rate limiting.' },
  { title: 'Authentication', description: 'Login social, MFA y gestión de sesiones.' },
  { title: 'Database', description: 'PostgreSQL, Redis y almacenamiento de objetos.' },
  { title: 'Analytics', description: 'Métricas en tiempo real y paneles personalizados.' },
];
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">8. Panel con columna triple</h2>
    <p class="text-muted-foreground text-sm">
      Panel ancho con grid de tres columnas para contenido extenso.
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
                  Servicios
                </p>
                <NavigationMenuLink v-for="svc in services" :key="svc.title" href="#">
                  <div class="text-sm leading-none font-medium">{{ svc.title }}</div>
                </NavigationMenuLink>
              </div>
              <div>
                <p
                  class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase"
                >
                  Recursos
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
