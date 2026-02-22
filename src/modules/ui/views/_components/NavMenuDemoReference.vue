<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">9. Referencia de componentes</h2>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-border border-b">
            <th class="pr-4 pb-2 font-medium">Componente</th>
            <th class="pr-4 pb-2 font-medium">Elemento</th>
            <th class="pr-4 pb-2 font-medium">Props</th>
            <th class="pb-2 font-medium">Descripción</th>
          </tr>
        </thead>
        <tbody class="text-muted-foreground">
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenu</td>
            <td class="py-2 pr-4"><code>&lt;nav&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">
              Root provider. Gestiona estado activo, hover delays y click-outside.
            </td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuList</td>
            <td class="py-2 pr-4"><code>&lt;ul&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">Contenedor flex para los ítems del menú.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuItem</td>
            <td class="py-2 pr-4"><code>&lt;li&gt;</code></td>
            <td class="py-2 pr-4">value, class</td>
            <td class="py-2">Envuelve un trigger+content. El value identifica el ítem.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuTrigger</td>
            <td class="py-2 pr-4"><code>&lt;button&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">Botón con chevron que abre el panel al hover o click.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuContent</td>
            <td class="py-2 pr-4"><code>&lt;div&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">Panel desplegable con animación. Se teleporta al viewport.</td>
          </tr>
          <tr class="border-border/50 border-b">
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

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">10. Interacción y teclado</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-border border-b">
            <th class="pr-4 pb-2 font-medium">Acción</th>
            <th class="pb-2 font-medium">Comportamiento</th>
          </tr>
        </thead>
        <tbody class="text-muted-foreground">
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Hover trigger</td>
            <td class="py-2">Abre el panel tras 200ms. Sin delay si ya hay otro abierto.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Hover content</td>
            <td class="py-2">Mantiene el panel abierto. Cierra 300ms después de salir.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Click trigger</td>
            <td class="py-2">Abre/cierra el panel inmediatamente.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Click outside</td>
            <td class="py-2">Cierra cualquier panel abierto.</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Enter / Space</td>
            <td class="py-2">Abre/cierra el panel del trigger enfocado.</td>
          </tr>
          <tr class="border-border/50 border-b">
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
</template>
