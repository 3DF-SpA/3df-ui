<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const formasCode = `<Skeleton class="h-4 w-[250px]" />
<Skeleton class="h-4 w-[200px]" />
<Skeleton class="h-20 w-full max-w-md" />
<Skeleton class="size-12 rounded-full" />`;

const cardCode = `<Card class="w-full max-w-sm">
  <CardHeader>
    <div class="flex items-center gap-4">
      <Skeleton class="size-10 rounded-full" />
      <div class="flex flex-col gap-2">
        <Skeleton class="h-4 w-[150px]" />
        <Skeleton class="h-3 w-[100px]" />
      </div>
    </div>
  </CardHeader>
  <CardContent class="flex flex-col gap-3">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-3/4" />
  </CardContent>
  <CardFooter class="gap-2">
    <Skeleton class="h-9 w-20 rounded-md" />
    <Skeleton class="h-9 w-20 rounded-md" />
  </CardFooter>
</Card>`;

const tablaCode = `<div class="flex gap-4 border-b pb-3">
  <Skeleton class="h-4 w-[80px]" />
  <Skeleton class="h-4 w-[120px]" />
  <Skeleton class="h-4 flex-1" />
  <Skeleton class="h-4 w-[80px]" />
</div>
<div v-for="i in 5" :key="i" class="flex items-center gap-4 border-b py-4">
  <Skeleton class="h-4 w-[80px]" />
  <Skeleton class="h-4 flex-1" />
  <Skeleton class="h-4 w-[80px]" />
</div>`;
</script>

<template>
  <DocShowcase
    title="Formas básicas"
    description="Líneas de texto, bloques y círculos para representar diferentes tipos de contenido."
    :code="formasCode"
  >
    <div class="flex flex-col gap-4">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
      <Skeleton class="h-20 w-full max-w-md" />
      <Skeleton class="size-12 rounded-full" />
    </div>
  </DocShowcase>

  <DocShowcase
    title="Card skeleton"
    description="Esqueleto de tarjeta con avatar, líneas de texto y botones de acción."
    :code="cardCode"
  >
    <Card class="w-full max-w-sm">
      <CardHeader>
        <div class="flex items-center gap-4">
          <Skeleton class="size-10 rounded-full" />
          <div class="flex flex-col gap-2">
            <Skeleton class="h-4 w-[150px]" />
            <Skeleton class="h-3 w-[100px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="flex flex-col gap-3">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-3/4" />
      </CardContent>
      <CardFooter class="gap-2">
        <Skeleton class="h-9 w-20 rounded-md" />
        <Skeleton class="h-9 w-20 rounded-md" />
      </CardFooter>
    </Card>
  </DocShowcase>

  <DocShowcase
    title="Tabla skeleton"
    description="Filas de tabla con celdas skeleton para representar datos tabulares en carga."
    :code="tablaCode"
  >
    <div class="w-full max-w-2xl">
      <div class="border-border flex gap-4 border-b pb-3">
        <Skeleton class="h-4 w-[80px]" />
        <Skeleton class="h-4 w-[120px]" />
        <Skeleton class="h-4 flex-1" />
        <Skeleton class="h-4 w-[80px]" />
      </div>
      <div v-for="i in 5" :key="i" class="border-border flex items-center gap-4 border-b py-4">
        <Skeleton class="h-4 w-[80px]" />
        <Skeleton class="h-4 w-[120px]" />
        <Skeleton class="h-4 flex-1" />
        <Skeleton class="h-4 w-[80px]" />
      </div>
    </div>
  </DocShowcase>
</template>
