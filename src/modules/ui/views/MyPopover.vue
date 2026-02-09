<script setup lang="ts">
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@3df/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Popover</h1>

    <!-- Popover básico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Popover básico</h2>
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Abrir popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium">Dimensiones</h3>
              <p class="text-muted-foreground text-sm">Configura las dimensiones del componente.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>

    <!-- Popover con formulario -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con formulario</h2>
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Configuración
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="flex flex-col gap-4">
              <div>
                <h3 class="text-sm font-medium">Dimensiones</h3>
                <p class="text-muted-foreground text-sm">
                  Configura las dimensiones del componente.
                </p>
              </div>
              <div class="grid gap-3">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label class="text-right">Ancho</Label>
                  <Input class="col-span-2 h-8" value="100%" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label class="text-right">Max ancho</Label>
                  <Input class="col-span-2 h-8" value="300px" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label class="text-right">Alto</Label>
                  <Input class="col-span-2 h-8" value="25px" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label class="text-right">Max alto</Label>
                  <Input class="col-span-2 h-8" value="none" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>

    <!-- Popover alineación -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación</h2>
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align start</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p class="text-sm">Alineado al inicio del trigger.</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align center</Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <p class="text-sm">Centrado respecto al trigger (default).</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align end</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p class="text-sm">Alineado al final del trigger.</p>
          </PopoverContent>
        </Popover>
      </div>
    </section>

    <!-- Popover side="top" -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Abre hacia arriba</h2>
      <div class="mt-24 flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Popover arriba</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium">Side="top"</h3>
              <p class="text-muted-foreground text-sm">
                Se abre hacia arriba. Si no cabe, auto-flip a abajo.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>

    <!-- Popover con contenido rico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Contenido rico</h2>
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Ver perfil
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="flex gap-4">
              <div
                class="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full text-lg"
              >
                MG
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-sm font-semibold">María García</h3>
                <p class="text-muted-foreground text-xs">Diseñadora de producto</p>
                <p class="text-muted-foreground text-xs">maria@3df.io</p>
                <div class="mt-2 flex gap-2">
                  <Button size="xs">Seguir</Button>
                  <Button variant="outline" size="xs">Mensaje</Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <!-- Info tooltip-like -->
        <Popover>
          <PopoverTrigger>
            <Button variant="ghost" size="icon" class="size-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-64">
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium">¿Qué es esto?</h3>
              <p class="text-muted-foreground text-sm">
                Los popovers son paneles flotantes ideales para mostrar información contextual,
                formularios rápidos o acciones adicionales sin navegar a otra página.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>

    <!-- Popover scoped slot -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Scoped slot (estado del trigger)</h2>
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger v-slot="{ open }">
            <Button :variant="open ? 'secondary' : 'outline'">
              {{ open ? '✕ Cerrar' : '⚙ Abrir configuración' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="flex flex-col gap-3">
              <h3 class="text-sm font-medium">Configuración rápida</h3>
              <div class="grid gap-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label class="text-right text-xs">Tema</Label>
                  <Input class="col-span-2 h-8" value="Oscuro" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label class="text-right text-xs">Idioma</Label>
                  <Input class="col-span-2 h-8" value="Español" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>

    <!-- Popover con ancho personalizado -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Ancho personalizado</h2>
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Pequeño (w-48)</Button>
          </PopoverTrigger>
          <PopoverContent class="w-48">
            <p class="text-sm">Popover angosto.</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Grande (w-96)</Button>
          </PopoverTrigger>
          <PopoverContent class="w-96">
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium">Panel amplio</h3>
              <p class="text-muted-foreground text-sm">
                El ancho default es <code class="bg-muted rounded px-1 text-xs">w-72</code> pero
                puedes sobrescribirlo con cualquier clase de Tailwind via la prop
                <code class="bg-muted rounded px-1 text-xs">class</code>.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  </div>
</template>
