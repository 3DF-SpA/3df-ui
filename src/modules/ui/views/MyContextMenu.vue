<script setup lang="ts">
import { ref } from 'vue';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '@3df-spa/ui';

const showBookmarks = ref(true);
const showFullUrls = ref(false);
const person = ref('pedro');
</script>

<template>
  <div class="space-y-12">
    
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Context Menu — Básico</h2>
      <p class="text-sm text-muted-foreground">
        Haz clic derecho sobre el área para abrir el menú contextual.
      </p>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            class="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
          >
            Clic derecho aquí
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-64">
          <ContextMenuItem @select="() => {}">
            Atrás
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Adelante
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Recargar
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem v-model:checked="showBookmarks">
            Mostrar marcadores
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem v-model:checked="showFullUrls">
            Mostrar URLs completas
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel inset>Personas</ContextMenuLabel>
          <ContextMenuRadioGroup v-model="person">
            <ContextMenuRadioItem value="pedro">Pedro García</ContextMenuRadioItem>
            <ContextMenuRadioItem value="maria">María López</ContextMenuRadioItem>
            <ContextMenuRadioItem value="juan">Juan Martínez</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </section>

    
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Context Menu — Sub-menú</h2>
      <p class="text-sm text-muted-foreground">
        Menú contextual con sub-menús anidados para acciones de archivo.
      </p>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            class="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
          >
            Clic derecho para acciones de archivo
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-56">
          <ContextMenuItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
            Editar
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Duplicar
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
              Compartir
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Email</ContextMenuItem>
              <ContextMenuItem>Mensaje</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Copiar enlace</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Eliminar
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </section>

    
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Estado reactivo</h2>
      <div class="rounded-md border p-4 text-sm space-y-1">
        <p><strong>Marcadores:</strong> {{ showBookmarks ? 'Visible' : 'Oculto' }}</p>
        <p><strong>URLs completas:</strong> {{ showFullUrls ? 'Sí' : 'No' }}</p>
        <p><strong>Persona:</strong> {{ person }}</p>
      </div>
    </section>
  </div>
</template>