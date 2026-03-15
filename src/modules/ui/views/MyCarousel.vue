<script setup lang="ts">
import { ref } from 'vue';

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@3df/ui';
import type { EmblaCarouselType } from 'embla-carousel';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const api = ref<EmblaCarouselType>();
const currentSlide = ref(0);

function onSetApi(embla: EmblaCarouselType) {
  api.value = embla;
  embla.on('select', () => {
    currentSlide.value = embla.selectedScrollSnap();
  });
}

const carouselProps: PropItem[] = [
  {
    name: 'Carousel: orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Dirección del desplazamiento.',
  },
  {
    name: 'Carousel: opts',
    type: 'Partial<EmblaOptionsType>',
    default: '-',
    description: 'Opciones de Embla Carousel (align, loop, etc.).',
  },
  {
    name: 'Carousel: plugins',
    type: 'EmblaPluginType[]',
    default: '-',
    description: 'Plugins de Embla (autoplay, etc.).',
  },
  {
    name: 'Carousel: @set-api',
    type: '(api: EmblaCarouselType) => void',
    default: '-',
    description: 'Evento emitido con la instancia de Embla para control programático.',
  },
];

const anatomyCode = `<Carousel>
  <CarouselContent>
    <CarouselItem />
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;

const basicCode = `<Carousel @set-api="onSetApi">
  <CarouselContent>
    <CarouselItem v-for="i in 5" :key="i">
      <Card>
        <CardContent class="flex aspect-square items-center justify-center p-6">
          <span class="text-4xl font-semibold">{{ i }}</span>
        </CardContent>
      </Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;

const multiSlideCode = `<Carousel :opts="{ align: 'start' }">
  <CarouselContent>
    <CarouselItem v-for="i in 8" :key="i" class="md:basis-1/2 lg:basis-1/3">
      <Card>
        <CardContent class="flex aspect-square items-center justify-center p-6">
          {{ i }}
        </CardContent>
      </Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;

const verticalCode = `<Carousel orientation="vertical" :opts="{ align: 'start' }">
  <CarouselContent class="-mt-1 h-[200px]">
    <CarouselItem v-for="i in 5" :key="i" class="pt-1 md:basis-1/2">
      <Card>
        <CardContent class="flex items-center justify-center p-6">
          {{ i }}
        </CardContent>
      </Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;

const loopCode = `<Carousel :opts="{ loop: true }">
  <CarouselContent>
    <CarouselItem v-for="i in 5" :key="i">
      <Card>
        <CardContent class="flex aspect-square items-center justify-center p-6">
          {{ i }}
        </CardContent>
      </Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Carousel"
      description="Componente de carrusel basado en Embla Carousel para desplazar contenido horizontal o verticalmente."
      import-code="import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" />
    </section>

    <DocShowcase
      title="Básico con API"
      description="Usa @set-api para obtener la instancia de Embla y rastrear el slide actual."
      :code="basicCode"
    >
      <div class="mx-auto w-full max-w-xs">
        <Carousel @set-api="onSetApi">
          <CarouselContent>
            <CarouselItem v-for="i in 5" :key="i">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{{ i }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p class="text-muted-foreground mt-2 text-center text-sm">
          Slide {{ currentSlide + 1 }} de 5
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Múltiples slides visibles"
      description="Usa basis-1/3 en CarouselItem para mostrar varios slides a la vez."
      :code="multiSlideCode"
    >
      <div class="mx-auto w-full max-w-lg">
        <Carousel :opts="{ align: 'start' }">
          <CarouselContent>
            <CarouselItem v-for="i in 8" :key="i" class="md:basis-1/2 lg:basis-1/3">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-3xl font-semibold">{{ i }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Orientación vertical"
      description="Desplazamiento vertical con orientation='vertical'."
      :code="verticalCode"
    >
      <div class="mx-auto w-full max-w-xs">
        <Carousel orientation="vertical" :opts="{ align: 'start' }" class="w-full">
          <CarouselContent class="-mt-1 h-[200px]">
            <CarouselItem v-for="i in 5" :key="i" class="pt-1 md:basis-1/2">
              <div class="p-1">
                <Card>
                  <CardContent class="flex items-center justify-center p-6">
                    <span class="text-3xl font-semibold">{{ i }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </DocShowcase>

    <DocShowcase
      title="Con loop infinito"
      description="Habilita loop: true en opts para ciclo continuo."
      :code="loopCode"
    >
      <div class="mx-auto w-full max-w-xs">
        <Carousel :opts="{ loop: true }">
          <CarouselContent>
            <CarouselItem v-for="i in 5" :key="i">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{{ i }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </DocShowcase>

    <DocPropsTable :props="carouselProps" />
  </div>
</template>
