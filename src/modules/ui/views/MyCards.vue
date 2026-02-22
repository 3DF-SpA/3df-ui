<script setup lang="ts">
import { ref } from 'vue';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectItem,
  Switch,
} from '@3df-spa/ui';

import CardsDemoFeatures from './_components/CardsDemoFeatures.vue';
import CardsDemoPricing from './_components/CardsDemoPricing.vue';
import CardsDemoProducts from './_components/CardsDemoProducts.vue';

const notifications = ref(true);
const framework = ref('vue');
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Cards</h1>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card básica</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Título de la card</CardTitle>
            <CardDescription>Una descripción breve del contenido de la card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm">
              Este es el contenido principal de la card. Puedes poner cualquier cosa aquí.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Acción</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card con formulario</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Crear proyecto</CardTitle>
            <CardDescription>Configura tu nuevo proyecto en un click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <Label for="project-name">Nombre</Label>
                <Input id="project-name" placeholder="Mi proyecto" />
              </div>
              <div class="flex flex-col gap-2">
                <Label for="project-framework">Framework</Label>
                <Select
                  id="project-framework"
                  v-model="framework"
                  placeholder="Selecciona un framework"
                >
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt</SelectItem>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter class="justify-between">
            <Button variant="ghost">Cancelar</Button>
            <Button>Crear</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card con notificaciones</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>Configura cómo quieres recibir notificaciones.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">Push</span>
                  <span class="text-muted-foreground text-xs">Recibir notificaciones push.</span>
                </div>
                <Switch v-model="notifications" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">Email</span>
                  <span class="text-muted-foreground text-xs">Resumen diario por correo.</span>
                </div>
                <Switch :model-value="false" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">SMS</span>
                  <span class="text-muted-foreground text-xs">Alertas críticas por SMS.</span>
                </div>
                <Switch :model-value="false" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card con badges</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Deploy #1234</CardTitle>
              <Badge variant="success" size="sm">Exitoso</Badge>
            </div>
            <CardDescription>Desplegado hace 3 minutos en producción.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Rama</span>
                <span class="font-mono text-xs">main</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Commit</span>
                <span class="font-mono text-xs">a3f8c2d</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Duración</span>
                <span>42s</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" class="w-full">Ver logs</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card interactiva (hover)</h2>
      <div class="grid max-w-md gap-4">
        <Card class="cursor-pointer transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Documentación</CardTitle>
            <CardDescription>Aprende a usar @3df-spa/ui con guías y ejemplos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm">
              Guías completas, API reference y ejemplos interactivos para cada componente.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card solo contenido</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardContent class="pt-6">
            <p class="text-sm">
              Una card puede tener solo contenido, sin header ni footer. Usa
              <code class="bg-muted rounded px-1 py-0.5 text-xs">class="pt-6"</code> en CardContent
              para compensar el padding superior.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <CardsDemoPricing />
    <CardsDemoProducts />
    <CardsDemoFeatures />
  </div>
</template>
