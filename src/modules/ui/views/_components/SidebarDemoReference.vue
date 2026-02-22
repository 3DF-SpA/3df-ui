<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">7 · Referencia rápida</h2>
    <div class="overflow-x-auto">
      <table class="w-full max-w-2xl text-sm">
        <thead>
          <tr class="border-border border-b text-left">
            <th class="pr-4 pb-2 font-medium">Componente / Prop</th>
            <th class="pr-4 pb-2 font-medium">Valores</th>
            <th class="pb-2 font-medium">Default</th>
          </tr>
        </thead>
        <tbody class="divide-border divide-y">
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.side</td>
            <td class="py-2 pr-4"><code class="bg-muted rounded px-1">'left' | 'right'</code></td>
            <td class="py-2"><code class="bg-muted rounded px-1">'left'</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.variant</td>
            <td class="py-2 pr-4">
              <code class="bg-muted rounded px-1">'sidebar' | 'floating' | 'inset'</code>
            </td>
            <td class="py-2"><code class="bg-muted rounded px-1">'sidebar'</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.collapsible</td>
            <td class="py-2 pr-4">
              <code class="bg-muted rounded px-1">'offcanvas' | 'icon' | 'none'</code>
            </td>
            <td class="py-2"><code class="bg-muted rounded px-1">'offcanvas'</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarProvider.v-model:open</td>
            <td class="py-2 pr-4"><code class="bg-muted rounded px-1">boolean</code></td>
            <td class="py-2"><code class="bg-muted rounded px-1">true</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarMenuButton.isActive</td>
            <td class="py-2 pr-4"><code class="bg-muted rounded px-1">boolean</code></td>
            <td class="py-2"><code class="bg-muted rounded px-1">false</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarMenuSub.v-model:open</td>
            <td class="py-2 pr-4"><code class="bg-muted rounded px-1">boolean</code></td>
            <td class="py-2"><code class="bg-muted rounded px-1">false</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarMenuAction.showOnHover</td>
            <td class="py-2 pr-4"><code class="bg-muted rounded px-1">boolean</code></td>
            <td class="py-2"><code class="bg-muted rounded px-1">false</code></td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">SidebarMenuSkeleton.showIcon</td>
            <td class="py-2 pr-4"><code class="bg-muted rounded px-1">boolean</code></td>
            <td class="py-2"><code class="bg-muted rounded px-1">false</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
