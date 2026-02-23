<script setup lang="ts">
import { ref } from 'vue';

import { Button, Toaster, toast } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import SonnerDemoRich from './_components/SonnerDemoRich.vue';

const position = ref<
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
>('bottom-right');

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

const sonnerProps: PropItem[] = [
  {
    name: 'Toaster: position',
    type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
    default: "'bottom-right'",
    description: 'Posición de las notificaciones en la pantalla.',
  },
  {
    name: 'Toaster: maxVisible',
    type: 'number',
    default: '3',
    description: 'Máximo de notificaciones visibles simultáneamente.',
  },
  {
    name: 'toast(): title',
    type: 'string',
    default: '-',
    description: 'Título principal de la notificación.',
  },
  {
    name: 'toast(): description',
    type: 'string',
    default: '-',
    description: 'Texto descriptivo de la notificación.',
  },
  {
    name: 'toast(): duration',
    type: 'number',
    default: '5000',
    description: 'Duración en ms (0 = persistente).',
  },
  {
    name: 'toast(): dismissible',
    type: 'boolean',
    default: 'true',
    description: 'Permite cerrar manualmente la notificación.',
  },
  {
    name: 'toast(): action',
    type: '{ label: string, onClick: () => void }',
    default: '-',
    description: 'Botón de acción dentro de la notificación.',
  },
];

const variantsCode = `toast('Toast por defecto')
toast.success('Operación completada')
toast.error('Algo salió mal')
toast.warning('Ten cuidado')
toast.info('Información útil')`;

const durationCode = `toast({ description: 'Me voy en 1.5s', duration: 1500 })
toast({ description: 'Me quedo 10s', duration: 10000 })
toast({ title: 'Persistente', description: 'Solo se cierra manualmente.', duration: 0 })`;

const positionCode = `<Toaster :position="position" />`;

const noDismissCode = `toast({
  title: 'Procesando...',
  description: 'No se puede cerrar manualmente.',
  dismissible: false,
  duration: 3000,
})`;

const programmaticCode = `toast.success({ description: 'Toast 1', duration: 15000 })
toast.info({ description: 'Toast 2', duration: 15000 })
toast.warning({ description: 'Toast 3', duration: 15000 })

toast.dismissAll()`;

const hoverCode = `toast.info({
  title: 'Pasa el mouse encima',
  description: 'El timer se pausa mientras mantengas el hover.',
  duration: 5000,
})`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Sonner — Toast Notifications"
      description="Sistema de notificaciones tipo toast con variantes, acciones y posicionamiento configurable."
      import-code="import { Toaster, toast } from '@3df-spa/ui'"
    />

    <Toaster :position="position" />

    <DocShowcase title="Variantes" :code="variantsCode">
      <div class="flex flex-wrap gap-3">
        <Button variant="outline" @click="toast('Este es un toast por defecto')"> Default </Button>
        <Button variant="outline" @click="toast.success('Operación completada exitosamente')">
          Success
        </Button>
        <Button variant="outline" @click="toast.error('Algo salió mal, intenta de nuevo')">
          Error
        </Button>
        <Button variant="outline" @click="toast.warning('Ten cuidado con esta acción')">
          Warning
        </Button>
        <Button variant="outline" @click="toast.info('Aquí tienes información útil')">
          Info
        </Button>
      </div>
    </DocShowcase>

    <SonnerDemoRich />

    <DocShowcase title="Duración personalizada" :code="durationCode">
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="toast({ description: 'Me voy en 1.5 segundos', duration: 1500 })"
        >
          1.5s
        </Button>
        <Button
          variant="outline"
          @click="toast({ description: 'Me quedo 10 segundos', duration: 10000 })"
        >
          10s
        </Button>
        <Button
          variant="outline"
          @click="
            toast({
              title: 'Persistente',
              description: 'Solo se cierra manualmente.',
              duration: 0,
            })
          "
        >
          Persistente (∞)
        </Button>
      </div>
    </DocShowcase>

    <DocShowcase title="Posición" :code="positionCode">
      <p class="text-muted-foreground text-sm">
        Actual: <code class="text-foreground font-mono">{{ position }}</code>
      </p>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="pos in positions"
          :key="pos"
          :variant="position === pos ? 'default' : 'outline'"
          size="sm"
          @click="position = pos"
        >
          {{ pos }}
        </Button>
      </div>
      <Button variant="outline" @click="toast.success('¡Mira la posición!')">
        Probar posición
      </Button>
    </DocShowcase>

    <DocShowcase title="No dismissible" :code="noDismissCode">
      <Button
        variant="outline"
        @click="
          toast({
            title: 'Procesando...',
            description: 'Esta notificación no se puede cerrar manualmente.',
            dismissible: false,
            duration: 3000,
          })
        "
      >
        Sin botón de cerrar
      </Button>
    </DocShowcase>

    <DocShowcase title="Control programático" :code="programmaticCode">
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="
            () => {
              toast.success({ description: 'Toast 1', duration: 15000 });
              toast.info({ description: 'Toast 2', duration: 15000 });
              toast.warning({ description: 'Toast 3', duration: 15000 });
            }
          "
        >
          Crear 3 toasts
        </Button>
        <Button variant="destructive" @click="toast.dismissAll()"> Cerrar todos </Button>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Hover pausa el timer"
      description="Al pasar el mouse sobre un toast, el temporizador de auto-cierre se pausa. Al quitar el mouse, se reanuda."
      :code="hoverCode"
    >
      <Button
        variant="outline"
        @click="
          toast.info({
            title: 'Pasa el mouse encima',
            description: 'El timer se pausa mientras mantengas el hover.',
            duration: 5000,
          })
        "
      >
        Probar hover
      </Button>
    </DocShowcase>

    <DocPropsTable :props="sonnerProps" />
  </div>
</template>
