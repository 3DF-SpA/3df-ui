<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@3df-spa/ui';
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Cards tipo feature (landing page)</h2>
    <div class="grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card class="border-0 bg-amber-50 shadow-none dark:bg-amber-950/30">
        <CardContent class="pt-6">
          <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
            <div class="flex flex-col gap-3">
              <div class="flex gap-2">
                <div class="h-2 w-16 rounded-full bg-amber-300/60"></div>
                <div class="h-2 w-10 rounded-full bg-amber-200/60"></div>
              </div>
              <div class="flex gap-2">
                <div class="h-2 w-20 rounded-full bg-amber-300/40"></div>
                <div class="h-2 w-8 rounded-full bg-amber-200/40"></div>
              </div>
              <div class="flex gap-2">
                <div class="h-2 w-12 rounded-full bg-amber-300/40"></div>
                <div class="h-2 w-14 rounded-full bg-amber-200/40"></div>
              </div>
              <div
                class="mt-2 flex items-center justify-between rounded-md border border-amber-200 bg-white px-3 py-2 dark:border-amber-800 dark:bg-white/5"
              >
                <span class="text-xs font-medium">Auto QA score</span>
                <div class="flex items-center gap-1.5">
                  <span
                    class="flex size-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white"
                    >✓</span
                  >
                  <span class="text-sm font-bold">80</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardHeader class="pt-0">
          <CardTitle class="text-xl font-bold">Analiza interacciones en segundos.</CardTitle>
          <CardDescription class="text-sm">
            Visualiza el panorama completo de cada interacción: chat, email, teléfono y video, de un
            vistazo.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card class="border-0 bg-teal-50 shadow-none dark:bg-teal-950/30">
        <CardContent class="pt-6">
          <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
            <div class="flex flex-col gap-2">
              <p class="text-xs font-semibold">Training Plan</p>
              <div class="flex items-center gap-2">
                <div class="size-7 rounded-full bg-teal-200 dark:bg-teal-700"></div>
                <div class="flex flex-col">
                  <span class="text-xs font-medium">Simón Gregory</span>
                  <span class="text-[10px] text-teal-600 dark:text-teal-400"
                    >QA score ↘ 1.25 this week</span
                  >
                </div>
              </div>
              <div class="mt-1 flex flex-col gap-1.5">
                <div
                  class="flex items-center gap-2 rounded-sm bg-teal-50 px-2 py-1.5 dark:bg-teal-900/30"
                >
                  <span
                    class="flex size-4 items-center justify-center rounded-full bg-teal-500 text-[8px] text-white"
                    >📞</span
                  >
                  <span class="truncate text-[11px]">Resolving Login Issues with Emp...</span>
                </div>
                <div
                  class="flex items-center gap-2 rounded-sm bg-teal-50 px-2 py-1.5 dark:bg-teal-900/30"
                >
                  <span
                    class="flex size-4 items-center justify-center rounded-full bg-teal-400 text-[8px] text-white"
                    >💬</span
                  >
                  <span class="truncate text-[11px]">Assisting a Tech-Savvy Customer</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardHeader class="pt-0">
          <CardTitle class="text-xl font-bold">Genera entrenamientos personalizados.</CardTitle>
          <CardDescription class="text-sm">
            Entrena agentes con simulaciones IA que replican escenarios reales y mejoran sus
            habilidades.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card class="border-0 bg-emerald-50 shadow-none dark:bg-emerald-950/30">
        <CardContent class="pt-6">
          <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
            <div class="flex flex-col gap-2">
              <p class="text-xs font-semibold">Conversation performance</p>
              <div class="mb-1 flex items-center gap-3">
                <div class="flex items-center gap-1">
                  <span class="inline-block size-2.5 rounded-sm bg-emerald-500"></span>
                  <span class="text-[10px]">Reps</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="inline-block size-2.5 rounded-sm bg-teal-400"></span>
                  <span class="text-[10px]">Bots</span>
                </div>
              </div>
              <div class="flex items-end gap-1.5">
                <div class="flex w-full flex-col items-center gap-0.5">
                  <div class="h-10 w-full rounded-t-sm bg-emerald-400/60"></div>
                  <div class="h-6 w-full rounded-t-sm bg-teal-300/60"></div>
                </div>
                <div class="flex w-full flex-col items-center gap-0.5">
                  <div class="h-12 w-full rounded-t-sm bg-emerald-400/70"></div>
                  <div class="h-8 w-full rounded-t-sm bg-teal-300/70"></div>
                </div>
                <div class="flex w-full flex-col items-center gap-0.5">
                  <div class="h-8 w-full rounded-t-sm bg-emerald-400/50"></div>
                  <div class="h-10 w-full rounded-t-sm bg-teal-300/50"></div>
                </div>
                <div class="flex w-full flex-col items-center gap-0.5">
                  <div class="h-14 w-full rounded-t-sm bg-emerald-500/80"></div>
                  <div class="h-10 w-full rounded-t-sm bg-teal-400/80"></div>
                </div>
                <div class="flex w-full flex-col items-center gap-0.5">
                  <div class="h-16 w-full rounded-t-sm bg-emerald-500"></div>
                  <div class="h-12 w-full rounded-t-sm bg-teal-400"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardHeader class="pt-0">
          <CardTitle class="text-xl font-bold">Observa la satisfacción crecer.</CardTitle>
          <CardDescription class="text-sm">
            QA y entrenamiento trabajan juntos para mejorar cada conversación, ya sea humana o IA.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>
