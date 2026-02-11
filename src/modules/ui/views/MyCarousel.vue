<script setup lang="ts">
import { ref } from 'vue';

import type { EmblaCarouselType } from 'embla-carousel';

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@3df/ui';

const api = ref<EmblaCarouselType>();
const currentSlide = ref(0);

function onSetApi(embla: EmblaCarouselType) {
  api.value = embla;
  embla.on('select', () => {
    currentSlide.value = embla.selectedScrollSnap();
  });
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Carousel</h1>

    <!-- Carousel básico (Image Slider) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Image Slider</h2>
      <div class="mx-auto w-full max-w-xs">
        <Carousel @set-api="onSetApi">
          <CarouselContent>
            <CarouselItem v-for="i in 5" :key="i">
              <div class="p-1">
                <Card>
                  <CardContent
                    class="flex aspect-square items-center justify-center p-6"
                  >
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
    </section>

    <!-- Carousel con múltiples slides visibles (Testimonial) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Testimonial Carousel (33% por slide)</h2>
      <div class="mx-auto w-full max-w-lg">
        <Carousel :opts="{ align: 'start' }">
          <CarouselContent>
            <CarouselItem
              v-for="i in 8"
              :key="i"
              class="md:basis-1/2 lg:basis-1/3"
            >
              <div class="p-1">
                <Card>
                  <CardContent
                    class="flex aspect-square items-center justify-center p-6"
                  >
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
    </section>

    <!-- Carousel vertical -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Orientación vertical</h2>
      <div class="mx-auto w-full max-w-xs">
        <Carousel orientation="vertical" :opts="{ align: 'start' }" class="w-full">
          <CarouselContent class="-mt-1 h-[200px]">
            <CarouselItem v-for="i in 5" :key="i" class="pt-1 md:basis-1/2">
              <div class="p-1">
                <Card>
                  <CardContent
                    class="flex items-center justify-center p-6"
                  >
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
    </section>

    <!-- Carousel con loop  -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con loop infinito</h2>
      <div class="mx-auto w-full max-w-xs">
        <Carousel :opts="{ loop: true }">
          <CarouselContent>
            <CarouselItem v-for="i in 5" :key="i">
              <div class="p-1">
                <Card>
                  <CardContent
                    class="flex aspect-square items-center justify-center p-6"
                  >
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
    </section>
  </div>
</template>