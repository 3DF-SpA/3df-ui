<script setup lang="ts">
import { EmptyState, Button } from '@3df-spa/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Empty State</h1>

    <!-- Sin resultados -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Sin resultados</h2>
      <div class="rounded-lg border border-border">
        <EmptyState
          title="No se encontraron resultados"
          description="Intenta ajustar los filtros de búsqueda o crea un nuevo elemento."
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <Button variant="outline" size="sm">Limpiar filtros</Button>
          <Button size="sm">Crear nuevo</Button>
        </EmptyState>
      </div>
    </section>

    <!-- Carrito vacío -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Carrito vacío</h2>
      <div class="rounded-lg border border-border">
        <EmptyState
          title="Tu carrito está vacío"
          description="Agrega productos para comenzar tu compra."
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </template>
          <Button size="sm">Explorar productos</Button>
        </EmptyState>
      </div>
    </section>

    <!-- Sin notificaciones -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Sin notificaciones</h2>
      <div class="rounded-lg border border-border">
        <EmptyState
          title="Todo al día"
          description="No tienes notificaciones nuevas. Relájate y disfruta."
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </template>
        </EmptyState>
      </div>
    </section>

    <!-- Solo título y descripción (sin icono ni acciones) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Mínimo (solo texto)</h2>
      <div class="rounded-lg border border-border">
        <EmptyState
          title="Sin datos disponibles"
          description="Los datos se mostrarán aquí cuando estén disponibles."
        />
      </div>
    </section>

    <!-- Con clase personalizada -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con altura mínima</h2>
      <div class="rounded-lg border border-border">
        <EmptyState
          class="min-h-80"
          title="Sube tu primer archivo"
          description="Arrastra y suelta archivos aquí, o haz clic para seleccionar."
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </template>
          <Button variant="outline" size="sm">Seleccionar archivos</Button>
        </EmptyState>
      </div>
    </section>
  </div>
</template>