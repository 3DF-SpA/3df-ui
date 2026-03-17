<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Button, Toaster, toast } from '@3df/ui';

import { useDocPage } from '@/i18n/composables/useDocPage';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import SonnerDemoRich from './_components/SonnerDemoRich.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('sonner');

const { t } = useI18n();

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

const sonnerProps = computed<PropItem[]>(() => [
  {
    name: 'Toaster: position',
    type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
    default: "'bottom-right'",
    description: propDesc('position'),
  },
  {
    name: 'Toaster: maxVisible',
    type: 'number',
    default: '3',
    description: propDesc('maxVisible'),
  },
  {
    name: 'toast(): title',
    type: 'string',
    default: '-',
    description: propDesc('title'),
  },
  {
    name: 'toast(): description',
    type: 'string',
    default: '-',
    description: propDesc('descriptionProp'),
  },
  {
    name: 'toast(): duration',
    type: 'number',
    default: '5000',
    description: propDesc('duration'),
  },
  {
    name: 'toast(): dismissible',
    type: 'boolean',
    default: 'true',
    description: propDesc('dismissible'),
  },
  {
    name: 'toast(): action',
    type: '{ label: string, onClick: () => void }',
    default: '-',
    description: propDesc('action'),
  },
]);

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
      :description="description"
      import-code="import { Toaster, toast } from '@3df/ui'"
    />

    <Toaster :position="position" />

    <DocShowcase :title="showcaseTitle('variants')" :code="variantsCode">
      <div class="flex flex-wrap gap-3">
        <Button variant="outline" @click="toast(t('demo.sonner.defaultToast'))"> Default </Button>
        <Button variant="outline" @click="toast.success(t('demo.sonner.successCompleted'))">
          Success
        </Button>
        <Button variant="outline" @click="toast.error(t('demo.sonner.errorOccurred'))">
          Error
        </Button>
        <Button variant="outline" @click="toast.warning(t('demo.sonner.warningAction'))">
          Warning
        </Button>
        <Button variant="outline" @click="toast.info(t('demo.sonner.infoUseful'))">
          Info
        </Button>
      </div>
    </DocShowcase>

    <SonnerDemoRich />

    <DocShowcase :title="showcaseTitle('customDuration')" :code="durationCode">
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="toast({ description: t('demo.sonner.goneIn1s'), duration: 1500 })"
        >
          1.5s
        </Button>
        <Button
          variant="outline"
          @click="toast({ description: t('demo.sonner.staying10s'), duration: 10000 })"
        >
          10s
        </Button>
        <Button
          variant="outline"
          @click="
            toast({
              title: t('demo.sonner.persistentTitle'),
              description: t('demo.sonner.persistentDesc'),
              duration: 0,
            })
          "
        >
          {{ t('demo.sonner.persistentBtn') }}
        </Button>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('position')" :code="positionCode">
      <p class="text-muted-foreground text-sm">
        {{ t('demo.sonner.currentPosition') }} <code class="text-foreground font-mono">{{ position }}</code>
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
      <Button variant="outline" @click="toast.success(t('demo.sonner.lookPosition'))">
        {{ t('demo.sonner.testPosition') }}
      </Button>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('noDismissible')" :code="noDismissCode">
      <Button
        variant="outline"
        @click="
          toast({
            title: t('demo.sonner.processingTitle'),
            description: t('demo.sonner.processingDesc'),
            dismissible: false,
            duration: 3000,
          })
        "
      >
        {{ t('demo.sonner.noDismissBtn') }}
      </Button>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('programmatic')" :code="programmaticCode">
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
          {{ t('demo.sonner.create3Toasts') }}
        </Button>
        <Button variant="destructive" @click="toast.dismissAll()"> {{ t('common.closeAll') }} </Button>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('hoverPause')"
      :description="showcaseDesc('hoverPause')"
      :code="hoverCode"
    >
      <Button
        variant="outline"
        @click="
          toast.info({
            title: t('demo.sonner.hoverTitle'),
            description: t('demo.sonner.hoverDesc'),
            duration: 5000,
          })
        "
      >
        {{ t('demo.sonner.testHover') }}
      </Button>
    </DocShowcase>

    <DocPropsTable :props="sonnerProps" />
  </div>
</template>
