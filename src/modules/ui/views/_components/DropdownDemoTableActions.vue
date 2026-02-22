<script setup lang="ts">
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@3df-spa/ui';
</script>

<template>
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
</template>
