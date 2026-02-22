<script setup lang="ts">
import { ref } from 'vue';

import { Button, Checkbox, Input, Label, Select, SelectItem, Textarea } from '@3df-spa/ui';

import FormsDemoComplete from './_components/FormsDemoComplete.vue';
import FormsDemoRadioSwitch from './_components/FormsDemoRadioSwitch.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const searchSm = ref('');
const searchLg = ref('');
const bio = ref('');
const country = ref('');
const role = ref('');
const terms = ref(false);
const newsletter = ref(true);
const disabledInput = ref('No puedes editar esto');
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Formularios</h1>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Input</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex flex-col gap-2">
          <Label for="name">Nombre</Label>
          <Input id="name" v-model="name" placeholder="Tu nombre completo" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="correo@ejemplo.com" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="password">Contraseña</Label>
          <Input id="password" v-model="password" type="password" placeholder="••••••••" />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Input — Tamaños</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex flex-col gap-2">
          <Label for="search-sm">Small</Label>
          <Input id="search-sm" v-model="searchSm" size="sm" placeholder="Buscar (sm)..." />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="name-def">Default</Label>
          <Input id="name-def" placeholder="Nombre (default)..." />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="search-lg">Large</Label>
          <Input id="search-lg" v-model="searchLg" size="lg" placeholder="Buscar (lg)..." />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Input — Estados</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex flex-col gap-2">
          <Label for="disabled-input" :disabled="true">Deshabilitado</Label>
          <Input id="disabled-input" v-model="disabledInput" disabled />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="error-input">Con error</Label>
          <Input
            id="error-input"
            aria-invalid="true"
            placeholder="Campo inválido"
            model-value="email@invalido"
          />
          <p class="text-destructive text-xs">Por favor ingresa un email válido.</p>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="file-input">Archivo</Label>
          <Input id="file-input" type="file" />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Input — Con botón</h2>
      <div class="flex max-w-md gap-2">
        <Input placeholder="tu@email.com" type="email" class="flex-1" />
        <Button>Suscribir</Button>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Textarea</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex flex-col gap-2">
          <Label for="bio">Biografía</Label>
          <Textarea id="bio" v-model="bio" placeholder="Cuéntanos sobre ti..." />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="bio-error">Con error</Label>
          <Textarea
            id="bio-error"
            aria-invalid="true"
            placeholder="Campo requerido"
            model-value=""
          />
          <p class="text-destructive text-xs">Este campo es obligatorio.</p>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="bio-disabled" :disabled="true">Deshabilitado</Label>
          <Textarea id="bio-disabled" disabled model-value="No puedes editar esto." />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Select</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex flex-col gap-2">
          <Label for="country">País</Label>
          <Select id="country" v-model="country" placeholder="Selecciona un país">
            <SelectItem value="mx">México</SelectItem>
            <SelectItem value="ar">Argentina</SelectItem>
            <SelectItem value="co">Colombia</SelectItem>
            <SelectItem value="es">España</SelectItem>
            <SelectItem value="cl">Chile</SelectItem>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="role">Rol</Label>
          <Select id="role" v-model="role" placeholder="Selecciona un rol">
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Visor</SelectItem>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="select-disabled" :disabled="true">Deshabilitado</Label>
          <Select id="select-disabled" disabled model-value="ar">
            <SelectItem value="ar">Argentina</SelectItem>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="select-error">Con error</Label>
          <Select
            id="select-error"
            aria-invalid="true"
            model-value=""
            placeholder="Selecciona una opción"
          >
            <SelectItem value="a">Opción A</SelectItem>
            <SelectItem value="b">Opción B</SelectItem>
          </Select>
          <p class="text-destructive text-xs">Debes seleccionar una opción.</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Checkbox</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" v-model="terms" />
          <Label for="terms">Acepto los términos y condiciones</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="newsletter" v-model="newsletter" />
          <Label for="newsletter">Recibir newsletter semanal</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="cb-disabled" disabled :model-value="true" />
          <Label for="cb-disabled" :disabled="true">Opción deshabilitada (checked)</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="cb-disabled2" disabled :model-value="false" />
          <Label for="cb-disabled2" :disabled="true">Opción deshabilitada (unchecked)</Label>
        </div>
      </div>
    </section>

    <FormsDemoRadioSwitch />

    <FormsDemoComplete />
  </div>
</template>
