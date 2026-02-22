<script setup lang="ts">
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@3df-spa/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Avatar</h1>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">User Profile</h2>
      <div class="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium leading-none">shadcn</p>
          <p class="text-muted-foreground text-sm">m@example.com</p>
        </div>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Tamaños</h2>
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
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Fallback (imagen rota)</h2>
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
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Team Members</h2>
      <div class="flex -space-x-3">
        <Avatar
          v-for="member in [
            { name: 'Alice', src: 'https://i.pravatar.cc/150?u=alice', initials: 'AL' },
            { name: 'Bob', src: 'https://i.pravatar.cc/150?u=bob', initials: 'BO' },
            { name: 'Charlie', src: 'https://i.pravatar.cc/150?u=charlie', initials: 'CH' },
            { name: 'Diana', src: 'https://i.pravatar.cc/150?u=diana', initials: 'DI' },
            { name: 'Eve', initials: 'EV' },
          ]"
          :key="member.name"
          class="border-2 border-background"
        >
          <AvatarImage
            v-if="member.src"
            :src="member.src"
            :alt="member.name"
          />
          <AvatarFallback>{{ member.initials }}</AvatarFallback>
        </Avatar>
      </div>
    </section>

    
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Fallback con icono</h2>
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
    </section>
  </div>
</template>