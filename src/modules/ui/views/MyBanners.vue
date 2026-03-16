<script setup lang="ts">
import { ref } from 'vue';

import { Banner, Button } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import BannersDemoFeatureCards from './_components/BannersDemoFeatureCards.vue';
import BannersDemoVariants from './_components/BannersDemoVariants.vue';

const showDismissible = ref(true);
const showFixed = ref(false);

function resetDismissible() {
  showDismissible.value = true;
}

const bannerProps: PropItem[] = [
  {
    name: 'variant',
    type: "'default' | 'info' | 'success' | 'warning' | 'destructive' | 'muted'",
    default: "'default'",
    description: 'Estilo visual del banner.',
  },
  {
    name: 'position',
    type: "'static' | 'sticky' | 'fixed'",
    default: "'static'",
    description: 'Posicionamiento CSS del banner.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'between'",
    default: "'center'",
    description: 'Alineación horizontal del contenido.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    default: 'false',
    description: 'Muestra un botón de cierre que emite el evento dismiss.',
  },
];

const defaultCode = `<Banner>
  Nueva versión disponible — Actualiza ahora.
</Banner>`;

const actionCode = `<Banner variant="info" align="between">
  <template #icon>
    <svg class="size-4">...</svg>
  </template>
  Hay 5 notificaciones sin leer.
  <template #action>
    <button class="rounded-md bg-white/20 px-3 py-1 text-xs">
      Ver todas
    </button>
  </template>
</Banner>`;

const dismissibleCode = `<Banner
  v-if="showDismissible"
  variant="success"
  dismissible
  @dismiss="showDismissible = false"
>
  Este banner se puede cerrar.
</Banner>`;

const alignCode = `<Banner variant="muted" align="start">Inicio</Banner>
<Banner variant="muted" align="center">Centro</Banner>
<Banner variant="muted" align="between">
  Distribuido
  <template #action>
    <button>Acción</button>
  </template>
</Banner>`;

const fixedCode = `<Banner
  variant="warning"
  position="fixed"
  dismissible
  @dismiss="showFixed = false"
>
  Banner fijo en la parte superior.
</Banner>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Banner"
      description="Barra informativa para anuncios, alertas y notificaciones globales. Soporta variantes, posicionamiento fijo/sticky y acciones."
      import-code="import { Banner } from '@3df/ui'"
    />

    <DocShowcase title="Default" :code="defaultCode">
      <Banner>
        Nueva versión disponible — Actualiza ahora para acceder a las últimas funcionalidades.
      </Banner>
    </DocShowcase>

    <BannersDemoVariants />

    <DocShowcase title="Con acción" :code="actionCode">
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
    </DocShowcase>

    <DocShowcase title="Dismissible" :code="dismissibleCode">
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
    </DocShowcase>

    <DocShowcase title="Alineación" :code="alignCode">
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
    </DocShowcase>

    <DocShowcase title="Posición fija (demo)" :code="fixedCode">
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
          Este banner está fijo en la parte superior de la ventana.
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
    </DocShowcase>

    <BannersDemoFeatureCards />

    <DocPropsTable :props="bannerProps" />
  </div>
</template>
