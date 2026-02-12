<script setup lang="ts">
import { ref } from 'vue';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@3df-spa/ui';

const components = [
  {
    title: 'Alert Dialog',
    description: 'Diálogo modal que interrumpe al usuario con contenido importante.',
  },
  {
    title: 'Hover Card',
    description: 'Vista previa del contenido al pasar el cursor sobre un enlace.',
  },
  {
    title: 'Progress',
    description: 'Barra de progreso para operaciones de larga duración.',
  },
  {
    title: 'Scroll Area',
    description: 'Área de desplazamiento con barras personalizadas.',
  },
  {
    title: 'Tabs',
    description: 'Conjunto de paneles de contenido organizados en pestañas.',
  },
  {
    title: 'Tooltip',
    description: 'Información contextual al pasar el cursor sobre un elemento.',
  },
];

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

const currentLink = ref('');

function handleLinkClick(name: string) {
  currentLink.value = name;
}
</script>

<template>
  <div class="space-y-16 p-8">
    <div>
      <h1 class="text-3xl font-bold">Navigation Menu</h1>
      <p class="text-muted-foreground mt-2">
        Menú de navegación horizontal con paneles desplegables, transiciones suaves y soporte de
        teclado.
      </p>
    </div>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 1. Menú completo (shadcn-style)                       -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">1. Menú completo</h2>
      <p class="text-sm text-muted-foreground">
        Hover sobre los triggers para desplegar los paneles. Incluye item destacado, grid de
        componentes y link directo.
      </p>

      <NavigationMenu>
        <NavigationMenuList>
          <!-- Getting Started -->
          <NavigationMenuItem value="getting-started">
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px] md:w-[500px]">
              <div class="grid gap-3 md:grid-cols-[.75fr_1fr]">
                <div
                  class="row-span-3 flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6"
                >
                  <div class="mb-2 text-lg font-medium">3df UI</div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Componentes Vue 3 con Tailwind CSS. Accesibles y personalizables.
                  </p>
                </div>
                <NavigationMenuLink href="#" @click.prevent="handleLinkClick('Introducción')">
                  <div class="text-sm font-medium leading-none">Introducción</div>
                  <p class="mt-1 text-sm leading-snug text-muted-foreground">
                    Componentes reutilizables con Vue y Tailwind CSS.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" @click.prevent="handleLinkClick('Instalación')">
                  <div class="text-sm font-medium leading-none">Instalación</div>
                  <p class="mt-1 text-sm leading-snug text-muted-foreground">
                    Cómo instalar dependencias y configurar tu proyecto.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" @click.prevent="handleLinkClick('Tipografía')">
                  <div class="text-sm font-medium leading-none">Tipografía</div>
                  <p class="mt-1 text-sm leading-snug text-muted-foreground">
                    Estilos tipográficos y jerarquía visual.
                  </p>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <!-- Components -->
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[400px] md:w-[500px] lg:w-[600px]">
              <ul class="grid w-full gap-3 md:grid-cols-2">
                <li v-for="comp in components" :key="comp.title">
                  <NavigationMenuLink href="#" @click.prevent="handleLinkClick(comp.title)">
                    <div class="text-sm font-medium leading-none">{{ comp.title }}</div>
                    <p class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {{ comp.description }}
                    </p>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <!-- Direct link (no trigger/content) -->
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              @click.prevent="handleLinkClick('Documentación')"
            >
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>

      <p v-if="currentLink" class="text-sm text-muted-foreground">
        Último enlace: <span class="font-medium text-foreground">{{ currentLink }}</span>
      </p>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 2. Centrado (estilo shadcn)                           -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">2. Centrado (estilo shadcn)</h2>
      <p class="text-sm text-muted-foreground">
        Menú centrado con borde redondeado. Ideal como navegación principal de una aplicación.
      </p>

      <div class="flex justify-center rounded-lg border border-border bg-background p-20">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="gs-center">
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent class="w-[400px] md:w-[500px]">
                <div class="grid gap-3 md:grid-cols-[.75fr_1fr]">
                  <div
                    class="row-span-3 flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6"
                  >
                    <div class="mb-2 text-lg font-medium">shadcn/ui</div>
                    <p class="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </div>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">Introduction</div>
                    <p class="mt-1 text-sm leading-snug text-muted-foreground">
                      Re-usable components built with Radix UI and Tailwind CSS.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">Installation</div>
                    <p class="mt-1 text-sm leading-snug text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">Typography</div>
                    <p class="mt-1 text-sm leading-snug text-muted-foreground">
                      Styles for headings, paragraphs, lists...etc
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="comp-center">
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent class="w-[400px] md:w-[500px] lg:w-[600px]">
                <ul class="grid w-full gap-3 md:grid-cols-2">
                  <li v-for="comp in components" :key="comp.title">
                    <NavigationMenuLink href="#">
                      <div class="text-sm font-medium leading-none">{{ comp.title }}</div>
                      <p class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                class="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 3. Multi-categoría con frameworks y servicios          -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">3. Multi-categoría</h2>
      <p class="text-sm text-muted-foreground">
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
                    <div class="text-sm font-medium leading-none">{{ fw.title }}</div>
                    <p class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                    <div class="text-sm font-medium leading-none">{{ svc.title }}</div>
                    <p class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                <div class="text-sm font-medium leading-none">Guías</div>
                <p class="mt-1 text-sm text-muted-foreground">
                  Tutoriales paso a paso para empezar.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">API Reference</div>
                <p class="mt-1 text-sm text-muted-foreground">
                  Documentación completa de la API.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">Changelog</div>
                <p class="mt-1 text-sm text-muted-foreground">
                  Historial de versiones y cambios.
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Soporte
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 4. Menú simple (un solo trigger)                      -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">4. Menú simple</h2>
      <p class="text-sm text-muted-foreground">
        Versión minimalista con un solo trigger y contenido lineal.
      </p>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[320px]">
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">Blog</div>
                <p class="mt-1 text-sm text-muted-foreground">Artículos y tutoriales.</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">GitHub</div>
                <p class="mt-1 text-sm text-muted-foreground">Repositorio open source.</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">Discord</div>
                <p class="mt-1 text-sm text-muted-foreground">Comunidad y soporte.</p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 5. Con link activo                                     -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">5. Con link activo</h2>
      <p class="text-sm text-muted-foreground">
        <code>NavigationMenuLink</code> acepta la prop <code>active</code> para indicar la página
        actual.
      </p>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="pages">
            <NavigationMenuTrigger>Páginas</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[280px]">
              <NavigationMenuLink href="#" :active="true">
                <div class="text-sm font-medium leading-none">Inicio</div>
                <p class="mt-1 text-sm text-muted-foreground">Página principal.</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">Acerca de</div>
                <p class="mt-1 text-sm text-muted-foreground">Información del equipo.</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div class="text-sm font-medium leading-none">Contacto</div>
                <p class="mt-1 text-sm text-muted-foreground">Formulario de contacto.</p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 6. Con logo y barra de navegación completa             -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">6. Navbar con logo</h2>
      <p class="text-sm text-muted-foreground">
        Ejemplo usando el menú como parte de una barra de navegación con logo.
      </p>

      <div class="flex items-center gap-6 rounded-lg border border-border bg-background px-6 py-3">
        <div class="flex items-center gap-2 font-semibold">
          <div class="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
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
                  <div class="text-sm font-medium leading-none">Características</div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Todo lo que necesitas para tu proyecto.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm font-medium leading-none">Integraciones</div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Conecta con tus herramientas favoritas.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm font-medium leading-none">Precios</div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Planes para equipos de todos los tamaños.
                  </p>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="solutions-nav">
              <NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
              <NavigationMenuContent class="w-[400px]">
                <NavigationMenuLink href="#">
                  <div class="text-sm font-medium leading-none">Startups</div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Herramientas para crecer rápidamente.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div class="text-sm font-medium leading-none">Enterprise</div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Soluciones empresariales a escala.
                  </p>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                class="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                class="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Contacto
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 7. Solo links directos                                -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">7. Solo links directos</h2>
      <p class="text-sm text-muted-foreground">
        Sin paneles desplegables — cada ítem es un link directo.
      </p>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Inicio
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Productos
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Precios
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Contacto
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 8. Contenido largo con scroll                         -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">8. Panel con columna triple</h2>
      <p class="text-sm text-muted-foreground">
        Panel ancho con grid de tres columnas para contenido extenso.
      </p>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="mega">
            <NavigationMenuTrigger>Mega Menu</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[600px] lg:w-[750px]">
              <div class="grid gap-4 md:grid-cols-3">
                <div>
                  <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Frameworks
                  </p>
                  <NavigationMenuLink v-for="fw in frameworks" :key="fw.title" href="#">
                    <div class="text-sm font-medium leading-none">{{ fw.title }}</div>
                  </NavigationMenuLink>
                </div>
                <div>
                  <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Servicios
                  </p>
                  <NavigationMenuLink v-for="svc in services" :key="svc.title" href="#">
                    <div class="text-sm font-medium leading-none">{{ svc.title }}</div>
                  </NavigationMenuLink>
                </div>
                <div>
                  <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Recursos
                  </p>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">Blog</div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">Changelog</div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">Community</div>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">GitHub</div>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              class="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 9. Referencia de componentes                          -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">9. Referencia de componentes</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="pb-2 pr-4 font-medium">Componente</th>
              <th class="pb-2 pr-4 font-medium">Elemento</th>
              <th class="pb-2 pr-4 font-medium">Props</th>
              <th class="pb-2 font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenu</td>
              <td class="py-2 pr-4"><code>&lt;nav&gt;</code></td>
              <td class="py-2 pr-4">class</td>
              <td class="py-2">
                Root provider. Gestiona estado activo, hover delays y click-outside.
              </td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenuList</td>
              <td class="py-2 pr-4"><code>&lt;ul&gt;</code></td>
              <td class="py-2 pr-4">class</td>
              <td class="py-2">Contenedor flex para los ítems del menú.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenuItem</td>
              <td class="py-2 pr-4"><code>&lt;li&gt;</code></td>
              <td class="py-2 pr-4">value, class</td>
              <td class="py-2">Envuelve un trigger+content. El value identifica el ítem.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenuTrigger</td>
              <td class="py-2 pr-4"><code>&lt;button&gt;</code></td>
              <td class="py-2 pr-4">class</td>
              <td class="py-2">Botón con chevron que abre el panel al hover o click.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenuContent</td>
              <td class="py-2 pr-4"><code>&lt;div&gt;</code></td>
              <td class="py-2 pr-4">class</td>
              <td class="py-2">Panel desplegable con animación. Se teleporta al viewport.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenuLink</td>
              <td class="py-2 pr-4"><code>&lt;a&gt;</code></td>
              <td class="py-2 pr-4">as, active, class</td>
              <td class="py-2">Link estilizado. Cierra el menú al hacer click.</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">NavigationMenuViewport</td>
              <td class="py-2 pr-4"><code>&lt;div&gt;</code></td>
              <td class="py-2 pr-4">class</td>
              <td class="py-2">Contenedor posicionado donde se renderizan los paneles.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ────────────────────────────────────────────────────── -->
    <!-- 10. Interacción y teclado                             -->
    <!-- ────────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">10. Interacción y teclado</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="pb-2 pr-4 font-medium">Acción</th>
              <th class="pb-2 font-medium">Comportamiento</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">Hover trigger</td>
              <td class="py-2">Abre el panel tras 200ms. Sin delay si ya hay otro abierto.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">Hover content</td>
              <td class="py-2">Mantiene el panel abierto. Cierra 300ms después de salir.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">Click trigger</td>
              <td class="py-2">Abre/cierra el panel inmediatamente.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">Click outside</td>
              <td class="py-2">Cierra cualquier panel abierto.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">Enter / Space</td>
              <td class="py-2">Abre/cierra el panel del trigger enfocado.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">Arrow Down</td>
              <td class="py-2">Abre el panel del trigger enfocado.</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">Escape</td>
              <td class="py-2">Cierra el panel abierto desde cualquier parte del menú.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>