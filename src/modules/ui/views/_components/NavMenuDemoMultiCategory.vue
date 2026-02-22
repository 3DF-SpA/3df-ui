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
    <h2 class="text-xl font-semibold">3. Multi-categoría</h2>
    <p class="text-muted-foreground text-sm">
      Múltiples triggers con categorías distintas: frameworks, servicios, documentación y soporte.
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
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Documentación</NavigationMenuTrigger>
          <NavigationMenuContent class="w-[320px]">
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Guías</div>
              <p class="text-muted-foreground mt-1 text-sm">Tutoriales paso a paso para empezar.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">API Reference</div>
              <p class="text-muted-foreground mt-1 text-sm">Documentación completa de la API.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div class="text-sm leading-none font-medium">Changelog</div>
              <p class="text-muted-foreground mt-1 text-sm">Historial de versiones y cambios.</p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#"
            class="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Soporte
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  </section>
</template>
