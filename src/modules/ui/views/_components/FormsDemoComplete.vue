<script setup lang="ts">
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
</script>

<template>
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
</template>
