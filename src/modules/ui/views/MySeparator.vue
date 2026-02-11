<script setup lang="ts">
import { Separator } from '@3df/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Separator</h1>

    <!-- ─── 1. Horizontal (default) ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Horizontal (default)</h2>
      <div class="max-w-md">
        <div class="space-y-1">
          <h3 class="text-sm font-medium leading-none">Radix Primitives</h3>
          <p class="text-muted-foreground text-sm">
            Un conjunto de componentes UI accesibles y sin estilos.
          </p>
        </div>
        <Separator class="my-4" />
        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    </section>

    <!-- ─── 2. Vertical ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Vertical</h2>
      <div class="flex h-5 items-center gap-4 text-sm">
        <span>Home</span>
        <Separator orientation="vertical" />
        <span>Configuración</span>
        <Separator orientation="vertical" />
        <span>Perfil</span>
        <Separator orientation="vertical" />
        <span>Ayuda</span>
      </div>
    </section>

    <!-- ─── 3. Decorativo ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Decorativo (sin role="separator")</h2>
      <p class="text-muted-foreground max-w-md text-sm">
        Cuando el separador es puramente visual y no aporta información semántica,
        usa <code class="text-foreground font-mono text-xs">decorative</code> para que
        se renderice con <code class="text-foreground font-mono text-xs">role="none"</code>.
      </p>
      <div class="max-w-md space-y-3">
        <p class="text-sm">Primer bloque de contenido.</p>
        <Separator decorative />
        <p class="text-sm">Segundo bloque de contenido.</p>
      </div>
    </section>

    <!-- ─── 4. Custom styling ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Estilos personalizados</h2>
      <div class="flex max-w-md flex-col gap-6">
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Más grueso (h-0.5):</p>
          <Separator class="h-0.5" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Color personalizado:</p>
          <Separator class="bg-primary" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Con margen automático:</p>
          <Separator class="my-6" />
        </div>
        <div>
          <p class="text-muted-foreground mb-2 text-sm">Dashed (border trick):</p>
          <Separator class="h-0 border-t border-dashed border-border bg-transparent" />
        </div>
      </div>
    </section>

    <!-- ─── 5. En contexto ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">En contexto — Card con secciones</h2>
      <div class="max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 class="text-base font-semibold">Cuenta</h3>
        <p class="text-muted-foreground mt-1 text-sm">Gestiona tu información personal.</p>
        <Separator class="my-4" />
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Nombre</span>
            <span class="text-muted-foreground text-sm">Pedro Duarte</span>
          </div>
          <Separator decorative />
          <div class="flex items-center justify-between">
            <span class="text-sm">Email</span>
            <span class="text-muted-foreground text-sm">pedro@example.com</span>
          </div>
          <Separator decorative />
          <div class="flex items-center justify-between">
            <span class="text-sm">Plan</span>
            <span class="text-muted-foreground text-sm">Pro</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 6. Referencia de Props ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Referencia de Props</h2>
      <div class="overflow-x-auto rounded-lg border border-border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-2 text-left font-medium">Prop</th>
              <th class="px-4 py-2 text-left font-medium">Tipo</th>
              <th class="px-4 py-2 text-left font-medium">Default</th>
              <th class="px-4 py-2 text-left font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">orientation</td>
              <td class="px-4 py-2 font-mono text-xs">'horizontal' | 'vertical'</td>
              <td class="px-4 py-2 font-mono text-xs">'horizontal'</td>
              <td class="px-4 py-2">Dirección del separador</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-2 font-mono text-xs">decorative</td>
              <td class="px-4 py-2 font-mono text-xs">boolean</td>
              <td class="px-4 py-2 font-mono text-xs">false</td>
              <td class="px-4 py-2">
                Si es <code class="font-mono">true</code>, usa
                <code class="font-mono">role="none"</code> en vez de
                <code class="font-mono">role="separator"</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>