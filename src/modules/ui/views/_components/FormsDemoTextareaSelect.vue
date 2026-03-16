<script setup lang="ts">
import { ref } from 'vue';

import { Label, Select, SelectItem, Textarea } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const bio = ref('');
const country = ref('');
const role = ref('');
</script>

<template>
  <DocShowcase
    title="Textarea"
    description="Área de texto con estados: normal, error y deshabilitado."
    code='<Label for="bio">Biografía</Label>
<Textarea id="bio" v-model="bio" placeholder="Cuéntanos sobre ti..." />'
  >
    <div class="grid max-w-md gap-4">
      <div class="flex flex-col gap-2">
        <Label for="bio">Biografía</Label>
        <Textarea id="bio" v-model="bio" placeholder="Cuéntanos sobre ti..." />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="bio-error">Con error</Label>
        <Textarea id="bio-error" aria-invalid="true" placeholder="Campo requerido" model-value="" />
        <p class="text-destructive text-xs">Este campo es obligatorio.</p>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="bio-disabled" :disabled="true">Deshabilitado</Label>
        <Textarea id="bio-disabled" disabled model-value="No puedes editar esto." />
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    title="Select"
    description="Selector desplegable con estados: normal, deshabilitado y error."
    code='<Select v-model="country" placeholder="Selecciona un país">
  <SelectItem value="mx">México</SelectItem>
  <SelectItem value="ar">Argentina</SelectItem>
</Select>'
  >
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
  </DocShowcase>
</template>
