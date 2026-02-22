<script setup lang="ts">
import { ref } from 'vue';

import { Button, Card } from '@3df-spa/ui';

const activeTab = ref(0);
const tabs = [
  {
    title: '¿Qué es plasma?',
    text: 'El plasma es la parte líquida de tu sangre que los científicos convierten en medicamentos que salvan vidas. Tu cuerpo lo repone rápido, así que puedes donar dos veces por semana.',
  },
  {
    title: '¿Qué pasa después?',
    text: 'Una vez donado, el plasma se envía a laboratorios especializados donde se fraccionan las proteínas para crear terapias para enfermedades raras y condiciones crónicas.',
  },
  {
    title: '¿Cómo ayuda?',
    text: 'Cada donación puede ayudar a tratar hasta 18 pacientes diferentes. Los derivados del plasma son esenciales para personas con deficiencias inmunológicas y trastornos de coagulación.',
  },
];
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Feature Card (composición con Card)</h2>
    <p class="text-muted-foreground text-xs">
      Ejemplo usando <code class="bg-muted rounded px-1 py-0.5 text-xs">Card</code> + layout grid
      para lograr el patrón split texto/imagen.
    </p>

    <Card
      class="dark:to-background/80 overflow-hidden bg-gradient-to-br from-sky-100/80 via-sky-50/60 to-white/80 backdrop-blur-sm dark:from-sky-950/40 dark:via-sky-900/20"
    >
      <div class="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
        <div class="flex flex-col justify-center gap-6 p-8 lg:p-12">
          <span
            class="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400"
          >
            Aprende más
          </span>
          <div class="flex flex-col gap-1">
            <button
              v-for="(tab, i) in tabs"
              :key="i"
              class="text-left text-2xl font-bold transition-colors duration-200 lg:text-3xl"
              :class="
                activeTab === i
                  ? 'text-foreground'
                  : 'text-muted-foreground/40 hover:text-muted-foreground/60'
              "
              @click="activeTab = i"
            >
              {{ tab.title }}
            </button>
          </div>
          <p class="text-muted-foreground max-w-md text-sm leading-relaxed">
            {{ tabs[activeTab]?.text }}
          </p>
          <div>
            <Button
              variant="outline"
              class="dark:bg-background rounded-full bg-white px-6 shadow-sm"
            >
              Únete a la lista
            </Button>
          </div>
        </div>
        <div class="relative flex items-center justify-center p-4 lg:p-8">
          <div
            class="relative w-full overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-xl backdrop-blur-md"
          >
            <img
              src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=600&fit=crop"
              alt="Feature image"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Card>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Feature Card — variante oscura</h2>

    <Card
      class="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      <div class="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
        <div class="relative flex items-center justify-center p-4 lg:p-8">
          <div class="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              alt="Dashboard analytics"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
        <div class="flex flex-col justify-center gap-6 p-8 lg:p-12">
          <span class="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Analytics
          </span>
          <h3 class="text-3xl leading-tight font-bold lg:text-4xl">
            Toma decisiones basadas en datos
          </h3>
          <p class="max-w-md text-sm leading-relaxed text-slate-300">
            Nuestro dashboard te da visibilidad completa sobre métricas clave, tendencias y
            patrones. Conecta todas tus fuentes de datos en un solo lugar.
          </p>
          <div class="flex gap-3">
            <Button class="rounded-full bg-white px-6 text-slate-900 hover:bg-white/90">
              Comenzar gratis
            </Button>
            <Button variant="ghost" class="rounded-full text-white hover:bg-white/10">
              Ver demo →
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </section>
</template>
