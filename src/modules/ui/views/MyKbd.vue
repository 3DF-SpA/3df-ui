<script setup lang="ts">
import { Kbd } from '@3df/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Kbd (Keyboard Input)</h1>

    <!-- 1. Tamaños -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Tamaños</h2>
      <div class="flex items-center gap-4">
        <Kbd size="xs">⌘</Kbd>
        <Kbd size="sm">⌘</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd size="lg">⌘</Kbd>
      </div>
      <p class="text-muted-foreground text-xs">xs · sm · default · lg</p>
    </section>

    <!-- 2. Combinaciones de teclas -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Combinaciones de teclas</h2>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-1.5">
          <Kbd>⌘</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>K</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">Abrir buscador</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Kbd>⌘</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>⇧</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>P</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">Paleta de comandos</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Kbd>Ctrl</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>C</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">Copiar</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Kbd>Ctrl</Kbd>
          <span class="text-muted-foreground text-sm">+</span>
          <Kbd>V</Kbd>
          <span class="text-muted-foreground ml-3 text-sm">Pegar</span>
        </div>
      </div>
    </section>

    <!-- 3. Teclas especiales -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Teclas especiales</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
        <Kbd>↵</Kbd>
        <Kbd>⌫</Kbd>
        <Kbd>⇥</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Space</Kbd>
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
      </div>
    </section>

    <!-- 4. Teclas de función -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Teclas de función</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Kbd v-for="n in 12" :key="n">F{{ n }}</Kbd>
      </div>
    </section>

    <!-- 5. Inline con texto -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Uso inline con texto</h2>
      <p class="text-sm">
        Presiona <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> para abrir la paleta de búsqueda,
        o <Kbd size="sm">Esc</Kbd> para cerrar el diálogo actual.
      </p>
      <p class="text-sm">
        Usa <Kbd size="sm">↑</Kbd> y <Kbd size="sm">↓</Kbd> para navegar entre los resultados y
        <Kbd size="sm">↵</Kbd> para confirmar la selección.
      </p>
    </section>

    <!-- 6. Con clases custom -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Override de clases</h2>
      <div class="flex items-center gap-3">
        <Kbd class="bg-primary text-primary-foreground border-primary shadow-primary/50">⌘</Kbd>
        <Kbd class="bg-destructive/10 text-destructive border-destructive/30 shadow-destructive/20">Del</Kbd>
        <Kbd class="rounded-full">⌥</Kbd>
      </div>
    </section>
  </div>
</template>