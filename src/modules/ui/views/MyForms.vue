<script setup lang="ts">
import { ref } from 'vue';

import {
  Button,
  Checkbox,
  Input,
  Label,
  Radio,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@3df-spa/ui';

const name = ref('');
const email = ref('');
const password = ref('');
const searchSm = ref('');
const searchLg = ref('');
const bio = ref('');
const country = ref('');
const role = ref('');
const notifications = ref(true);
const darkMode = ref(false);
const marketing = ref(true);
const terms = ref(false);
const newsletter = ref(true);
const plan = ref('pro');
const contact = ref('email');
const disabledInput = ref('No puedes editar esto');
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Formularios</h1>

    <!-- Input -->
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

    <!-- Input sizes -->
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

    <!-- Input states -->
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

    <!-- Input with addons -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Input — Con botón</h2>
      <div class="flex max-w-md gap-2">
        <Input placeholder="tu@email.com" type="email" class="flex-1" />
        <Button>Suscribir</Button>
      </div>
    </section>

    <!-- Textarea -->
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

    <!-- Select -->
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

    <!-- Checkbox -->
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

    <!-- Radio -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Radio</h2>
      <div class="grid max-w-md gap-4">
        <p class="text-sm font-medium">Plan</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <Radio id="plan-free" v-model="plan" value="free" name="plan" />
            <Label for="plan-free">Free</Label>
          </div>
          <div class="flex items-center gap-2">
            <Radio id="plan-pro" v-model="plan" value="pro" name="plan" />
            <Label for="plan-pro">Pro — $9/mes</Label>
          </div>
          <div class="flex items-center gap-2">
            <Radio id="plan-enterprise" v-model="plan" value="enterprise" name="plan" />
            <Label for="plan-enterprise">Enterprise — $29/mes</Label>
          </div>
          <div class="flex items-center gap-2">
            <Radio id="plan-disabled" value="custom" name="plan" disabled />
            <Label for="plan-disabled" :disabled="true">Custom (no disponible)</Label>
          </div>
        </div>

        <p class="text-sm font-medium">Contacto preferido</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <Radio id="contact-email" v-model="contact" value="email" name="contact" />
            <Label for="contact-email">Email</Label>
          </div>
          <div class="flex items-center gap-2">
            <Radio id="contact-phone" v-model="contact" value="phone" name="contact" />
            <Label for="contact-phone">Teléfono</Label>
          </div>
          <div class="flex items-center gap-2">
            <Radio id="contact-sms" v-model="contact" value="sms" name="contact" />
            <Label for="contact-sms">SMS</Label>
          </div>
        </div>
      </div>
    </section>

    <!-- Switch -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Switch</h2>
      <div class="grid max-w-md gap-4">
        <div class="flex items-center justify-between">
          <Label for="notifications">Notificaciones</Label>
          <Switch id="notifications" v-model="notifications" />
        </div>
        <div class="flex items-center justify-between">
          <Label for="dark-mode">Modo oscuro</Label>
          <Switch id="dark-mode" v-model="darkMode" />
        </div>
        <div class="flex items-center justify-between">
          <Label for="marketing">Emails de marketing</Label>
          <Switch id="marketing" v-model="marketing" />
        </div>
        <div class="flex items-center justify-between">
          <Label for="switch-disabled" :disabled="true">Deshabilitado</Label>
          <Switch id="switch-disabled" disabled :model-value="false" />
        </div>
      </div>
    </section>

    <!-- Complete form example -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Formulario completo</h2>
      <form class="border-border grid max-w-md gap-5 rounded-lg border p-6" @submit.prevent>
        <div class="flex flex-col gap-2">
          <Label for="form-name">Nombre completo</Label>
          <Input id="form-name" placeholder="Juan Pérez" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="form-email">Email</Label>
          <Input id="form-email" type="email" placeholder="juan@ejemplo.com" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="form-country">País</Label>
          <Select id="form-country" placeholder="Selecciona un país">
            <SelectItem value="mx">México</SelectItem>
            <SelectItem value="ar">Argentina</SelectItem>
            <SelectItem value="co">Colombia</SelectItem>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="form-bio">Mensaje</Label>
          <Textarea id="form-bio" placeholder="¿En qué podemos ayudarte?" />
        </div>

        <div class="flex flex-col gap-3">
          <p class="text-sm font-medium">Plan</p>
          <div class="flex items-center gap-2">
            <Radio id="form-free" value="free" name="form-plan" />
            <Label for="form-free">Free</Label>
          </div>
          <div class="flex items-center gap-2">
            <Radio id="form-pro" value="pro" name="form-plan" />
            <Label for="form-pro">Pro</Label>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <Label for="form-newsletter">Recibir novedades</Label>
          <Switch id="form-newsletter" />
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="form-terms" />
          <Label for="form-terms">Acepto los términos y condiciones</Label>
        </div>

        <div class="flex gap-3 pt-2">
          <Button type="submit" class="flex-1">Enviar</Button>
          <Button type="reset" variant="outline">Limpiar</Button>
        </div>
      </form>
    </section>
  </div>
</template>
