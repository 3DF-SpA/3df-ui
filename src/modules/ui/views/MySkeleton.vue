<script setup lang="ts">
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@3df-spa/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Skeleton</h1>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Formas básicas</h2>
      <div class="flex flex-col gap-4">
        
        <Skeleton class="h-4 w-[250px]" />
        
        <Skeleton class="h-4 w-[200px]" />
        
        <Skeleton class="h-20 w-full max-w-md" />
        
        <Skeleton class="size-12 rounded-full" />
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card skeleton</h2>
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
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Tabla skeleton</h2>
      <div class="w-full max-w-2xl">
        
        <div class="flex gap-4 border-b border-border pb-3">
          <Skeleton class="h-4 w-[80px]" />
          <Skeleton class="h-4 w-[120px]" />
          <Skeleton class="h-4 flex-1" />
          <Skeleton class="h-4 w-[80px]" />
        </div>
        
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-4 border-b border-border py-4"
        >
          <Skeleton class="h-4 w-[80px]" />
          <Skeleton class="h-4 w-[120px]" />
          <Skeleton class="h-4 flex-1" />
          <Skeleton class="h-4 w-[80px]" />
        </div>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Perfil skeleton</h2>
      <div class="flex items-start gap-6">
        <Skeleton class="size-16 shrink-0 rounded-full" />
        <div class="flex flex-1 flex-col gap-3">
          <Skeleton class="h-5 w-[180px]" />
          <Skeleton class="h-3 w-[250px]" />
          <Skeleton class="h-3 w-[200px]" />
          <div class="mt-2 flex gap-3">
            <Skeleton class="h-8 w-24 rounded-md" />
            <Skeleton class="h-8 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Grid de productos skeleton</h2>
      <div class="grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="i in 3" :key="i" class="overflow-hidden">
          <Skeleton class="aspect-[3/2] w-full rounded-none" />
          <CardHeader>
            <div class="flex items-center justify-between">
              <Skeleton class="h-4 w-[120px]" />
              <Skeleton class="h-5 w-[50px] rounded-md" />
            </div>
            <Skeleton class="h-3 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton class="h-5 w-[80px]" />
          </CardContent>
          <CardFooter>
            <Skeleton class="h-9 w-full rounded-md" />
          </CardFooter>
        </Card>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Formulario skeleton</h2>
      <div class="flex max-w-md flex-col gap-5">
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3.5 w-[60px]" />
          <Skeleton class="h-10 w-full rounded-md" />
        </div>
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3.5 w-[80px]" />
          <Skeleton class="h-10 w-full rounded-md" />
        </div>
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3.5 w-[70px]" />
          <Skeleton class="h-20 w-full rounded-md" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="size-4 rounded-sm" />
          <Skeleton class="h-3.5 w-[160px]" />
        </div>
        <Skeleton class="h-10 w-full rounded-md" />
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Comparativa: Loading vs Cargado</h2>
      <div class="grid max-w-2xl gap-8 sm:grid-cols-2">
        
        <Card>
          <CardHeader>
            <div class="flex items-center gap-3">
              <Skeleton class="size-10 rounded-full" />
              <div class="flex flex-col gap-2">
                <Skeleton class="h-4 w-[120px]" />
                <Skeleton class="h-3 w-[80px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex flex-col gap-2">
            <Skeleton class="h-3 w-full" />
            <Skeleton class="h-3 w-full" />
            <Skeleton class="h-3 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton class="h-9 w-24 rounded-md" />
          </CardFooter>
        </Card>

        
        <Card>
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                AG
              </div>
              <div>
                <p class="text-sm font-semibold">Ana García</p>
                <p class="text-muted-foreground text-xs">Ingeniería</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-sm">
              Desarrolladora senior con 5 años de experiencia en Vue.js y TypeScript. Líder técnica del equipo de frontend.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Ver perfil</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  </div>
</template>