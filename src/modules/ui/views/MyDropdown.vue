<script setup lang="ts">
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@3df-spa/ui';

import DropdownDemoBasic from './_components/DropdownDemoBasic.vue';
import DropdownDemoIconActions from './_components/DropdownDemoIconActions.vue';
import DropdownDemoTableActions from './_components/DropdownDemoTableActions.vue';

function onAction(action: string) {
  alert(`Acción: ${action}`);
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Dropdown Menu</h1>

    <DropdownDemoBasic />

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con secciones (labels)</h2>
      <div class="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              Mi cuenta
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
                class="ml-1 opacity-50"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @select="onAction('perfil')">Perfil</DropdownMenuItem>
            <DropdownMenuItem @select="onAction('facturación')">Facturación</DropdownMenuItem>
            <DropdownMenuItem @select="onAction('equipo')">Equipo</DropdownMenuItem>
            <DropdownMenuItem @select="onAction('suscripción')">Suscripción</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Soporte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @select="onAction('docs')">Documentación</DropdownMenuItem>
            <DropdownMenuItem @select="onAction('api')">API Reference</DropdownMenuItem>
            <DropdownMenuItem :disabled="true">Chat en vivo</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true" @select="onAction('eliminar cuenta')">
              Eliminar cuenta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación del dropdown</h2>
      <div class="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Align start (default)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Opción A</DropdownMenuItem>
            <DropdownMenuItem>Opción B</DropdownMenuItem>
            <DropdownMenuItem>Opción C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Align center</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Opción A</DropdownMenuItem>
            <DropdownMenuItem>Opción B</DropdownMenuItem>
            <DropdownMenuItem>Opción C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Align end</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Opción A</DropdownMenuItem>
            <DropdownMenuItem>Opción B</DropdownMenuItem>
            <DropdownMenuItem>Opción C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Abre hacia arriba (side="top")</h2>
      <div class="mt-32 flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Menú arriba</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>

    <DropdownDemoIconActions />

    <DropdownDemoTableActions />

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Variantes de trigger</h2>
      <div class="flex flex-wrap items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Primary trigger</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Acción 1</DropdownMenuItem>
            <DropdownMenuItem>Acción 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary">Secondary trigger</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Acción 1</DropdownMenuItem>
            <DropdownMenuItem>Acción 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="destructive">Danger trigger</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem :destructive="true">Confirmar eliminación</DropdownMenuItem>
            <DropdownMenuItem>Cancelar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger v-slot="{ open }">
            <Button variant="ghost" size="sm">
              {{ open ? 'Cerrar' : 'Ghost trigger' }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>El trigger cambia de texto</DropdownMenuItem>
            <DropdownMenuItem>según el estado</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Auto-positioning (flip + shift)</h2>
      <p class="text-muted-foreground max-w-xl text-sm">
        El dropdown detecta los bordes del viewport y se reposiciona automáticamente. Prueba
        moviendo la ventana o haciendo scroll para ver cómo el menú cambia de lado o se desplaza.
      </p>

      <div class="flex items-start justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">← Borde izquierdo</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Auto-flip horizontal</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se ajusta si no cabe</DropdownMenuItem>
            <DropdownMenuItem>hacia la izquierda</DropdownMenuItem>
            <DropdownMenuItem>del viewport</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Centro</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Centrado respecto</DropdownMenuItem>
            <DropdownMenuItem>al trigger</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Borde derecho →</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Auto-flip horizontal</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se ajusta si no cabe</DropdownMenuItem>
            <DropdownMenuItem>hacia la derecha</DropdownMenuItem>
            <DropdownMenuItem>del viewport</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div class="mt-4">
        <p class="text-muted-foreground mb-3 text-xs">
          Este tiene side="bottom" pero si estás cerca del fondo, se abre arriba automáticamente:
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Auto-flip vertical ↕</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Si hay espacio abajo → abre abajo</DropdownMenuItem>
            <DropdownMenuItem>Si NO hay espacio → abre arriba</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Haz scroll para probar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  </div>
</template>
