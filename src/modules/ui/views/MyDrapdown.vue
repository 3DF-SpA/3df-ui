<script setup lang="ts">
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@3df/ui';

function onAction(action: string) {
  alert(`Acción: ${action}`);
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Dropdown Menu</h1>

    <!-- Dropdown básico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Dropdown básico</h2>
      <div class="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              Abrir menú
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
          <DropdownMenuContent>
            <DropdownMenuItem @select="onAction('perfil')">
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
              Perfil
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem @select="onAction('configuración')">
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
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :disabled="true">
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
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              Ayuda (próximamente)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true" @select="onAction('cerrar sesión')">
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              Cerrar sesión
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>

    <!-- Dropdown con label/secciones -->
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

    <!-- Dropdown con alineación -->
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

    <!-- Dropdown hacia arriba -->
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

    <!-- Dropdown con botón de ícono (acciones) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Menú de acciones (botón icono)</h2>
      <div class="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
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
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @select="onAction('editar')">
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem @select="onAction('duplicar')">
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
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem @select="onAction('compartir')">
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
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" x2="12" y1="2" y2="15" />
              </svg>
              Compartir
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @select="onAction('archivar')">
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
                <rect width="20" height="5" x="2" y="3" rx="1" />
                <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                <path d="M10 12h4" />
              </svg>
              Archivar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true" @select="onAction('eliminar')">
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
              Eliminar
              <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>

    <!-- Dropdown en contexto (tabla de ejemplo) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">En contexto — Tabla con acciones</h2>
      <div class="border-border max-w-2xl rounded-lg border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-border bg-muted/50 border-b">
              <th class="px-4 py-3 text-left font-medium">Nombre</th>
              <th class="px-4 py-3 text-left font-medium">Estado</th>
              <th class="px-4 py-3 text-left font-medium">Rol</th>
              <th class="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-border border-b">
              <td class="px-4 py-3">María García</td>
              <td class="px-4 py-3"><Badge variant="success" size="sm">Activo</Badge></td>
              <td class="text-muted-foreground px-4 py-3">Admin</td>
              <td class="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" class="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                    <DropdownMenuItem>Cambiar rol</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem :destructive="true">Suspender</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
            <tr class="border-border border-b">
              <td class="px-4 py-3">Carlos López</td>
              <td class="px-4 py-3"><Badge variant="warning" size="sm">Pendiente</Badge></td>
              <td class="text-muted-foreground px-4 py-3">Editor</td>
              <td class="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" class="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                    <DropdownMenuItem>Reenviar invitación</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem :destructive="true">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3">Ana Martínez</td>
              <td class="px-4 py-3"><Badge variant="destructive" size="sm">Inactivo</Badge></td>
              <td class="text-muted-foreground px-4 py-3">Visor</td>
              <td class="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" class="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                    <DropdownMenuItem>Reactivar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem :destructive="true">Eliminar permanente</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Dropdown con variantes de trigger -->
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

    <!-- Auto-positioning demo -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Auto-positioning (flip + shift)</h2>
      <p class="text-muted-foreground max-w-xl text-sm">
        El dropdown detecta los bordes del viewport y se reposiciona automáticamente. Prueba
        moviendo la ventana o haciendo scroll para ver cómo el menú cambia de lado o se desplaza.
      </p>

      <div class="flex items-start justify-between gap-4">
        <!-- Esquina izquierda - debería flip a la derecha si no cabe -->
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

        <!-- Centro -->
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">Centro</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Centrado respecto</DropdownMenuItem>
            <DropdownMenuItem>al trigger</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Esquina derecha - debería flip a la izquierda si no cabe -->
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

      <!-- Side flip demo -->
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
