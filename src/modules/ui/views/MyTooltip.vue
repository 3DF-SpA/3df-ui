<script setup lang="ts">
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@3df-spa/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Tooltip</h1>

    <!-- Básico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básico</h2>
      <div class="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">Hover sobre mí</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Este es un tooltip básico</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Posiciones (side) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Posiciones</h2>
      <div class="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Top (default)</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip arriba</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip abajo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip izquierda</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip derecha</TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Alineación -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación</h2>
      <div class="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Start</Button>
          </TooltipTrigger>
          <TooltipContent align="start">Alineado al inicio</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Center</Button>
          </TooltipTrigger>
          <TooltipContent align="center">Alineado al centro</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">End</Button>
          </TooltipTrigger>
          <TooltipContent align="end">Alineado al final</TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Con iconos -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con botones de icono</h2>
      <div class="flex gap-3">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Descargar archivo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copiar al portapapeles</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Eliminar elemento</TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Delay personalizado -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Delay personalizado</h2>
      <div class="flex flex-wrap gap-4">
        <Tooltip :delay="0">
          <TooltipTrigger>
            <Button variant="outline" size="sm">Instantáneo (0ms)</Button>
          </TooltipTrigger>
          <TooltipContent>¡Aparezco al instante!</TooltipContent>
        </Tooltip>

        <Tooltip :delay="300">
          <TooltipTrigger>
            <Button variant="outline" size="sm">Normal (300ms)</Button>
          </TooltipTrigger>
          <TooltipContent>Delay por defecto</TooltipContent>
        </Tooltip>

        <Tooltip :delay="1000">
          <TooltipTrigger>
            <Button variant="outline" size="sm">Lento (1s)</Button>
          </TooltipTrigger>
          <TooltipContent>Tardo 1 segundo en aparecer</TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Contenido rico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Contenido rico</h2>
      <div class="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">Con contenido rico</Button>
          </TooltipTrigger>
          <TooltipContent class="max-w-xs">
            <div class="flex flex-col gap-1">
              <p class="font-semibold">Atajo de teclado</p>
              <p class="text-muted-foreground text-xs">
                Presiona
                <kbd class="border-border bg-muted rounded border px-1 py-0.5 font-mono text-[10px]"
                  >Ctrl+S</kbd
                >
                para guardar los cambios.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Auto-flip -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Auto-flip en bordes</h2>
      <p class="text-muted-foreground max-w-md text-sm">
        El tooltip cambia de posición automáticamente si no hay espacio suficiente en la dirección
        preferida. Prueba en los bordes de la pantalla.
      </p>
      <div class="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Se adapta</Button>
          </TooltipTrigger>
          <TooltipContent side="top"> Me reposiciono si no hay espacio arriba </TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- Focus trigger -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Se activa con focus (Tab)</h2>
      <p class="text-muted-foreground max-w-md text-sm">
        Usa
        <kbd class="border-border bg-muted rounded border px-1 py-0.5 font-mono text-xs">Tab</kbd>
        para navegar a los botones y ver los tooltips sin mouse.
      </p>
      <div class="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Primero</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip por focus</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Segundo</Button>
          </TooltipTrigger>
          <TooltipContent>También por focus</TooltipContent>
        </Tooltip>
      </div>
    </section>
  </div>
</template>
