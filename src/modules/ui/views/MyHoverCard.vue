<script setup lang="ts">
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@3df/ui';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Hover Card</h1>

    <!-- Básico — perfil de usuario -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Perfil de usuario</h2>
      <p class="text-muted-foreground text-xs">Pasa el cursor sobre el enlace para ver la vista previa.</p>
      <div>
        <HoverCard>
          <HoverCardTrigger>
            <a
              href="https://github.com/vuejs"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-medium underline decoration-dotted underline-offset-4"
            >
              @vuejs
            </a>
          </HoverCardTrigger>
          <HoverCardContent>
            <div class="flex justify-between space-x-4">
              <div class="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                V
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">@vuejs</h4>
                <p class="text-sm text-muted-foreground">
                  The Progressive JavaScript Framework. Approachable, Performant, Versatile.
                </p>
                <div class="flex items-center pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span class="text-xs text-muted-foreground">Joined February 2014</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>

    <!-- Alineación start -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación start</h2>
      <p class="text-muted-foreground text-xs">El card se alinea al inicio del trigger.</p>
      <div>
        <HoverCard>
          <HoverCardTrigger>
            <span class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4">
              Hover aquí (align start)
            </span>
          </HoverCardTrigger>
          <HoverCardContent align="start">
            <p class="text-sm">
              Este card está alineado al <strong>inicio</strong> del trigger. Útil para elementos al borde izquierdo.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>

    <!-- Alineación end -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación end</h2>
      <p class="text-muted-foreground text-xs">El card se alinea al final del trigger.</p>
      <div class="flex justify-end">
        <HoverCard>
          <HoverCardTrigger>
            <span class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4">
              Hover aquí (align end)
            </span>
          </HoverCardTrigger>
          <HoverCardContent align="end">
            <p class="text-sm">
              Este card está alineado al <strong>final</strong> del trigger. Ideal para elementos al borde derecho.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>

    <!-- Side top -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Posición superior</h2>
      <p class="text-muted-foreground text-xs">El card aparece por encima del trigger.</p>
      <div class="pt-40">
        <HoverCard>
          <HoverCardTrigger>
            <span class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4">
              Hover aquí (side top)
            </span>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p class="text-sm">
              Contenido posicionado arriba del trigger con auto-flip si no hay espacio.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>

    <!-- Delays personalizados -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Delays personalizados</h2>
      <p class="text-muted-foreground text-xs">
        <code>openDelay=200</code> y <code>closeDelay=100</code> para respuesta más rápida.
      </p>
      <div>
        <HoverCard :open-delay="200" :close-delay="100">
          <HoverCardTrigger>
            <span class="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4">
              Hover aquí (delays rápidos)
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div class="space-y-2">
              <h4 class="text-sm font-semibold">Respuesta rápida</h4>
              <p class="text-sm text-muted-foreground">
                Este hover card abre más rápido (200ms) y cierra más rápido (100ms) que el default.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>

    <!-- Contenido rico -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Contenido rico</h2>
      <p class="text-muted-foreground text-xs">Hover card con contenido enriquecido (avatar, stats, bio).</p>
      <div>
        <HoverCard>
          <HoverCardTrigger>
            <div class="flex cursor-default items-center gap-2">
              <div class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
                NM
              </div>
              <span class="text-sm font-medium underline decoration-dotted underline-offset-4">
                Nicolás M.
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <div class="flex gap-4">
              <div class="bg-primary text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold">
                NM
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">Nicolás M.</h4>
                <p class="text-sm text-muted-foreground">
                  Full-stack developer. Vue.js & TypeScript enthusiast.
                </p>
                <div class="flex gap-4 pt-2">
                  <div class="flex items-center gap-1">
                    <span class="text-xs font-semibold">128</span>
                    <span class="text-xs text-muted-foreground">repos</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs font-semibold">1.4k</span>
                    <span class="text-xs text-muted-foreground">followers</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs font-semibold">42</span>
                    <span class="text-xs text-muted-foreground">following</span>
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  </div>
</template>