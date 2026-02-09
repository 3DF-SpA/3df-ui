<script setup lang="ts">
import { Badge, Button } from '@3df/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-10 p-8">
    <h1 class="text-3xl font-bold">Badge</h1>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">Variants</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">Sizes</h2>
      <div class="flex flex-wrap items-end gap-4">
        <Badge size="sm">Small</Badge>
        <Badge size="default">Default</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">With icons (SVG auto-sized)</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Badge variant="success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
          Aprobado
        </Badge>
        <Badge variant="destructive">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
          Rechazado
        </Badge>
        <Badge variant="warning">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clip-rule="evenodd"
            />
          </svg>
          Pendiente
        </Badge>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">Pill shape (class override)</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Badge class="rounded-full">Default pill</Badge>
        <Badge variant="secondary" class="rounded-full">Secondary pill</Badge>
        <Badge variant="success" class="rounded-full">Success pill</Badge>
        <Badge variant="destructive" class="rounded-full">Destructive pill</Badge>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">As link</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Badge as="a" href="#" class="hover:bg-primary/90 cursor-pointer">Clickable</Badge>
        <Badge as="a" href="#" variant="outline" class="hover:bg-accent cursor-pointer"
          >Outline link</Badge
        >
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">In context</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button>
          Inbox
          <Badge variant="secondary" size="sm" class="rounded-full">24</Badge>
        </Button>
        <Button variant="outline">
          Notificaciones
          <Badge variant="destructive" size="sm" class="rounded-full">3</Badge>
        </Button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Estado del servidor</span>
        <Badge variant="success" size="sm">Online</Badge>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">Mantenimiento</span>
        <Badge variant="warning" size="sm">Programado</Badge>
      </div>
    </section>
  </div>
</template>
