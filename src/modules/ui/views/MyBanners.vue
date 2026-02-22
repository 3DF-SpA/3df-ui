<script setup lang="ts">
import { ref } from 'vue';

import { Banner, Button } from '@3df-spa/ui';

import BannersDemoFeatureCards from './_components/BannersDemoFeatureCards.vue';
import BannersDemoVariants from './_components/BannersDemoVariants.vue';

const showDismissible = ref(true);
const showFixed = ref(false);

function resetDismissible() {
  showDismissible.value = true;
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Banners</h1>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Default</h2>
      <Banner>
        🚀 Nueva versión disponible — Actualiza ahora para acceder a las últimas funcionalidades.
      </Banner>
    </section>

    <BannersDemoVariants />

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con acción</h2>
      <Banner variant="info" align="between">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </template>
        Hay 5 notificaciones sin leer en tu bandeja.
        <template #action>
          <button
            class="rounded-md bg-white/20 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors hover:bg-white/30"
          >
            Ver todas
          </button>
        </template>
      </Banner>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Dismissible</h2>
      <Banner
        v-if="showDismissible"
        variant="success"
        dismissible
        @dismiss="showDismissible = false"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </template>
        Este banner se puede cerrar haciendo clic en la X.
      </Banner>
      <Button v-if="!showDismissible" variant="outline" size="sm" @click="resetDismissible">
        Mostrar de nuevo
      </Button>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación</h2>
      <div class="flex flex-col gap-3">
        <Banner variant="muted" align="start">Alineado al inicio (start)</Banner>
        <Banner variant="muted" align="center">Alineado al centro (center)</Banner>
        <Banner variant="muted" align="between">
          Distribuido (between)
          <template #action>
            <button
              class="bg-foreground/10 hover:bg-foreground/20 rounded-md px-3 py-1 text-xs font-medium transition-colors"
            >
              Acción
            </button>
          </template>
        </Banner>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Posición fija (demo)</h2>
      <Button variant="outline" size="sm" @click="showFixed = !showFixed">
        {{ showFixed ? 'Ocultar' : 'Mostrar' }} banner fijo
      </Button>
      <Teleport to="body">
        <Banner
          v-if="showFixed"
          variant="warning"
          position="fixed"
          dismissible
          align="between"
          @dismiss="showFixed = false"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </template>
          ⚠️ Este banner está fijo en la parte superior de la ventana.
          <template #action>
            <button
              class="rounded-md bg-white/20 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors hover:bg-white/30"
              @click="showFixed = false"
            >
              Entendido
            </button>
          </template>
        </Banner>
      </Teleport>
    </section>

    <BannersDemoFeatureCards />
  </div>
</template>
