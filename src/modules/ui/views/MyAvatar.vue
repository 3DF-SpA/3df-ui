<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const avatarProps: PropItem[] = [
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Tamaño del avatar',
  },
];

const anatomyCode = `<Avatar>
  <AvatarImage src="..." alt="..." />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`;

const profileCode = `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<div>
  <p class="text-sm leading-none font-medium">shadcn</p>
  <p class="text-muted-foreground text-sm">m@example.com</p>
</div>`;

const sizesCode = `<Avatar size="xs">...</Avatar>
<Avatar size="sm">...</Avatar>
<Avatar size="md">...</Avatar>
<Avatar size="lg">...</Avatar>
<Avatar size="xl">...</Avatar>`;

const fallbackCode = `<!-- Imagen rota -->
<Avatar>
  <AvatarImage src="/broken-image.png" alt="Broken" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<!-- Sin src -->
<Avatar>
  <AvatarImage src="" alt="Empty" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
<!-- Sin imagen -->
<Avatar>
  <AvatarFallback>MR</AvatarFallback>
</Avatar>`;

const teamCode = `<div class="flex -space-x-3">
  <Avatar v-for="member in members" :key="member.name" class="border-background border-2">
    <AvatarImage v-if="member.src" :src="member.src" :alt="member.name" />
    <AvatarFallback>{{ member.initials }}</AvatarFallback>
  </Avatar>
</div>`;

const iconFallbackCode = `<Avatar size="lg">
  <AvatarFallback>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </AvatarFallback>
</Avatar>`;

const teamMembers = [
  { name: 'Alice', src: 'https://i.pravatar.cc/150?u=alice', initials: 'AL' },
  { name: 'Bob', src: 'https://i.pravatar.cc/150?u=bob', initials: 'BO' },
  { name: 'Charlie', src: 'https://i.pravatar.cc/150?u=charlie', initials: 'CH' },
  { name: 'Diana', src: 'https://i.pravatar.cc/150?u=diana', initials: 'DI' },
  { name: 'Eve', src: undefined, initials: 'EV' },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Avatar"
      description="Imagen de perfil circular con fallback de iniciales o ícono cuando la imagen no está disponible."
      import-code="import { Avatar, AvatarFallback, AvatarImage } from '@3df-spa/ui'"
    />

    <DocPropsTable :props="avatarProps" />

    <div class="flex flex-col gap-3">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" language="vue" />
    </div>

    <DocShowcase
      title="Perfil de usuario"
      description="Avatar con imagen y datos del usuario."
      :code="profileCode"
    >
      <div class="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm leading-none font-medium">shadcn</p>
          <p class="text-muted-foreground text-sm">m@example.com</p>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Tamaños"
      description="Cinco tamaños disponibles desde xs hasta xl."
      :code="sizesCode"
    >
      <div class="flex items-end gap-4">
        <div class="flex flex-col items-center gap-2">
          <Avatar size="xs">
            <AvatarImage src="https://github.com/shadcn.png" alt="xs" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span class="text-muted-foreground text-xs">xs</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="sm" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span class="text-muted-foreground text-xs">sm</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar size="md">
            <AvatarImage src="https://github.com/shadcn.png" alt="md" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span class="text-muted-foreground text-xs">md</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="lg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span class="text-muted-foreground text-xs">lg</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar size="xl">
            <AvatarImage src="https://github.com/shadcn.png" alt="xl" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span class="text-muted-foreground text-xs">xl</span>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Fallback"
      description="Iniciales mostradas cuando la imagen falla, está vacía o no se proporciona."
      :code="fallbackCode"
    >
      <div class="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/broken-image.png" alt="Broken" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="" alt="Empty" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Equipo"
      description="Avatares apilados con superposición negativa para mostrar miembros de un equipo."
      :code="teamCode"
    >
      <div class="flex -space-x-3">
        <Avatar v-for="member in teamMembers" :key="member.name" class="border-background border-2">
          <AvatarImage v-if="member.src" :src="member.src" :alt="member.name" />
          <AvatarFallback>{{ member.initials }}</AvatarFallback>
        </Avatar>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Fallback con ícono"
      description="Usa un SVG como contenido del fallback en lugar de iniciales."
      :code="iconFallbackCode"
    >
      <div class="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </AvatarFallback>
        </Avatar>
      </div>
    </DocShowcase>
  </div>
</template>
