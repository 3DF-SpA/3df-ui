<script setup lang="ts">
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const codeAutoPos = `<!-- align="end" / "center" / "start" -->
<DropdownMenuContent align="end">
  <DropdownMenuItem>Se ajusta al viewport</DropdownMenuItem>
</DropdownMenuContent>

<!-- Auto-flip vertical: si no hay espacio abajo, abre arriba -->
<DropdownMenuContent>
  <DropdownMenuItem>Se reposiciona automáticamente</DropdownMenuItem>
</DropdownMenuContent>`;
</script>

<template>
  <DocShowcase
    title="Auto-positioning (flip + shift)"
    description="El dropdown detecta los bordes del viewport y se reposiciona automáticamente."
    :code="codeAutoPos"
  >
    <div class="flex flex-col gap-6">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <p class="text-muted-foreground mb-3 text-xs">
          side="bottom" con auto-flip: si estás cerca del fondo, se abre arriba automáticamente.
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
    </div>
  </DocShowcase>
</template>
