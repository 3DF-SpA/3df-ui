<script setup lang="ts">
import { ref } from 'vue';

import { Button, Input, Label } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const searchSm = ref('');
const searchLg = ref('');
const disabledInput = ref('No puedes editar esto');
</script>

<template>
  <DocShowcase
    title="Input"
    description="Campos de texto básicos con label."
    code='<Label for="name">Nombre</Label>
<Input id="name" v-model="name" placeholder="Tu nombre completo" />'
  >
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
  </DocShowcase>

  <DocShowcase
    title="Input — Tamaños"
    description="Variantes de tamaño: sm, default y lg."
    code='<Input size="sm" placeholder="Buscar (sm)..." />
<Input placeholder="Nombre (default)..." />
<Input size="lg" placeholder="Buscar (lg)..." />'
  >
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
  </DocShowcase>

  <DocShowcase
    title="Input — Estados"
    description="Disabled, error y file input."
    code='<Input disabled v-model="disabledInput" />
<Input aria-invalid="true" placeholder="Campo inválido" />
<Input type="file" />'
  >
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
  </DocShowcase>

  <DocShowcase
    title="Input — Con botón"
    description="Input combinado con un botón de acción."
    code='<div class="flex gap-2">
  <Input placeholder="tu@email.com" type="email" class="flex-1" />
  <Button>Suscribir</Button>
</div>'
  >
    <div class="flex max-w-md gap-2">
      <Input placeholder="tu@email.com" type="email" class="flex-1" />
      <Button>Suscribir</Button>
    </div>
  </DocShowcase>
</template>
