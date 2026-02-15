<script setup lang="ts">
import { ref } from 'vue';
import { Banner, Button, Card } from '@3df-spa/ui';

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

const showDismissible = ref(true);
const showFixed = ref(false);

function resetDismissible() {
  showDismissible.value = true;
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Banners</h1>

    <!-- Default -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Default</h2>
      <Banner>
        🚀 Nueva versión disponible — Actualiza ahora para acceder a las últimas funcionalidades.
      </Banner>
    </section>

    <!-- Variantes -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Variantes</h2>
      <div class="flex flex-col gap-3">
        <Banner variant="default">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 1-2.58 5.84" /></svg>
          </template>
          Default — Anuncio general del sistema.
        </Banner>

        <Banner variant="info">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
          </template>
          Info — Mantenimiento programado para el sábado 22 de febrero.
        </Banner>

        <Banner variant="success">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
          </template>
          Success — Tu cuenta ha sido verificada exitosamente.
        </Banner>

        <Banner variant="warning">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </template>
          Warning — Tu suscripción expira en 3 días.
        </Banner>

        <Banner variant="destructive">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
          </template>
          Destructive — Error crítico en el servicio. Contacta soporte.
        </Banner>

        <Banner variant="muted">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
          </template>
          Muted — Este es un banner sutil para información secundaria.
        </Banner>
      </div>
    </section>

    <!-- Con acción -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Con acción</h2>
      <Banner variant="info" align="between">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </template>
        Hay 5 notificaciones sin leer en tu bandeja.
        <template #action>
          <button class="whitespace-nowrap rounded-md bg-white/20 px-3 py-1 text-xs font-medium transition-colors hover:bg-white/30">
            Ver todas
          </button>
        </template>
      </Banner>
    </section>

    <!-- Dismissible -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Dismissible</h2>
      <Banner v-if="showDismissible" variant="success" dismissible @dismiss="showDismissible = false">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
        </template>
        Este banner se puede cerrar haciendo clic en la X.
      </Banner>
      <Button v-if="!showDismissible" variant="outline" size="sm" @click="resetDismissible">
        Mostrar de nuevo
      </Button>
    </section>

    <!-- Alineación -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Alineación</h2>
      <div class="flex flex-col gap-3">
        <Banner variant="muted" align="start">Alineado al inicio (start)</Banner>
        <Banner variant="muted" align="center">Alineado al centro (center)</Banner>
        <Banner variant="muted" align="between">
          Distribuido (between)
          <template #action>
            <button class="rounded-md bg-foreground/10 px-3 py-1 text-xs font-medium transition-colors hover:bg-foreground/20">
              Acción
            </button>
          </template>
        </Banner>
      </div>
    </section>

    <!-- Sticky -->
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
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </template>
          ⚠️ Este banner está fijo en la parte superior de la ventana.
          <template #action>
            <button class="whitespace-nowrap rounded-md bg-white/20 px-3 py-1 text-xs font-medium transition-colors hover:bg-white/30" @click="showFixed = false">
              Entendido
            </button>
          </template>
        </Banner>
      </Teleport>
    </section>

    <!-- ─── Feature Card (composición con Card) ─── -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Feature Card (composición con Card)</h2>
      <p class="text-muted-foreground text-xs">
        Ejemplo usando <code class="rounded bg-muted px-1 py-0.5 text-xs">Card</code> + layout grid para lograr el patrón split texto/imagen.
      </p>

      <Card class="overflow-hidden bg-gradient-to-br from-sky-100/80 via-sky-50/60 to-white/80 backdrop-blur-sm dark:from-sky-950/40 dark:via-sky-900/20 dark:to-background/80">
        <div class="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
          <!-- Texto -->
          <div class="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <span class="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Aprende más
            </span>

            <div class="flex flex-col gap-1">
              <button
                v-for="(tab, i) in tabs"
                :key="i"
                class="text-left text-2xl font-bold transition-colors duration-200 lg:text-3xl"
                :class="activeTab === i ? 'text-foreground' : 'text-muted-foreground/40 hover:text-muted-foreground/60'"
                @click="activeTab = i"
              >
                {{ tab.title }}
              </button>
            </div>

            <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
              {{ tabs[activeTab]?.text }}
            </p>

            <div>
              <Button variant="outline" class="rounded-full bg-white px-6 shadow-sm dark:bg-background">
                Únete a la lista
              </Button>
            </div>
          </div>

          <!-- Imagen -->
          <div class="relative flex items-center justify-center p-4 lg:p-8">
            <div class="relative w-full overflow-hidden rounded-xl border border-white/40 bg-white/20 shadow-xl backdrop-blur-md">
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

    <!-- Feature Card variante oscura -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Feature Card — variante oscura</h2>

      <Card class="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div class="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
          <!-- Imagen -->
          <div class="relative flex items-center justify-center p-4 lg:p-8">
            <div class="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Dashboard analytics"
                class="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <!-- Texto -->
          <div class="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <span class="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Analytics
            </span>
            <h3 class="text-3xl font-bold leading-tight lg:text-4xl">
              Toma decisiones basadas en datos
            </h3>
            <p class="max-w-md text-sm leading-relaxed text-slate-300">
              Nuestro dashboard te da visibilidad completa sobre métricas clave, tendencias y patrones. Conecta todas tus fuentes de datos en un solo lugar.
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
  </div>
</template>