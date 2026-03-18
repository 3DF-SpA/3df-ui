<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Button, Card, CardContent, CardFooter, CardHeader, Skeleton } from '@3df-spa/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const perfilCode = `<Skeleton class="size-16 shrink-0 rounded-full" />
<div class="flex flex-1 flex-col gap-3">
  <Skeleton class="h-5 w-[180px]" />
  <Skeleton class="h-3 w-[250px]" />
  <Skeleton class="h-3 w-[200px]" />
  <div class="mt-2 flex gap-3">
    <Skeleton class="h-8 w-24 rounded-md" />
    <Skeleton class="h-8 w-24 rounded-md" />
  </div>
</div>`;

const gridCode = `<Card v-for="i in 3" :key="i" class="overflow-hidden">
  <Skeleton class="aspect-[3/2] w-full rounded-none" />
  <CardHeader>
    <Skeleton class="h-4 w-[120px]" />
    <Skeleton class="h-3 w-full" />
  </CardHeader>
  <CardContent>
    <Skeleton class="h-5 w-[80px]" />
  </CardContent>
  <CardFooter>
    <Skeleton class="h-9 w-full rounded-md" />
  </CardFooter>
</Card>`;

const formularioCode = `<div class="flex flex-col gap-2">
  <Skeleton class="h-3.5 w-[60px]" />
  <Skeleton class="h-10 w-full rounded-md" />
</div>
<div class="flex items-center gap-2">
  <Skeleton class="size-4 rounded-sm" />
  <Skeleton class="h-3.5 w-[160px]" />
</div>
<Skeleton class="h-10 w-full rounded-md" />`;

const comparativaCode = `<!-- Loading -->
<Card>
  <CardHeader>
    <Skeleton class="size-10 rounded-full" />
    <Skeleton class="h-4 w-[120px]" />
  </CardHeader>
  <CardContent>
    <Skeleton class="h-3 w-full" />
    <Skeleton class="h-3 w-2/3" />
  </CardContent>
</Card>

<!-- Cargado -->
<Card>
  <CardHeader>
    <div class="bg-primary text-primary-foreground ...">AG</div>
    <p>Ana García</p>
  </CardHeader>
  <CardContent>
    <p>Desarrolladora senior con 5 años...</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Ver perfil</Button>
  </CardFooter>
</Card>`;
</script>

<template>
  <DocShowcase
    :title="t('views.skeleton.showcases.profile.title')"
    :description="t('views.skeleton.showcases.profile.description')"
    :code="perfilCode"
  >
    <div class="flex items-start gap-6">
      <Skeleton class="size-16 shrink-0 rounded-full" />
      <div class="flex flex-1 flex-col gap-3">
        <Skeleton class="h-5 w-[180px]" />
        <Skeleton class="h-3 w-[250px]" />
        <Skeleton class="h-3 w-[200px]" />
        <div class="mt-2 flex gap-3">
          <Skeleton class="h-8 w-24 rounded-md" />
          <Skeleton class="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.skeleton.showcases.grid.title')"
    :description="t('views.skeleton.showcases.grid.description')"
    :code="gridCode"
  >
    <div class="grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="i in 3" :key="i" class="overflow-hidden">
        <Skeleton class="aspect-[3/2] w-full rounded-none" />
        <CardHeader>
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-[120px]" />
            <Skeleton class="h-5 w-[50px] rounded-md" />
          </div>
          <Skeleton class="h-3 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-5 w-[80px]" />
        </CardContent>
        <CardFooter>
          <Skeleton class="h-9 w-full rounded-md" />
        </CardFooter>
      </Card>
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.skeleton.showcases.form.title')"
    :description="t('views.skeleton.showcases.form.description')"
    :code="formularioCode"
  >
    <div class="flex max-w-md flex-col gap-5">
      <div class="flex flex-col gap-2">
        <Skeleton class="h-3.5 w-[60px]" />
        <Skeleton class="h-10 w-full rounded-md" />
      </div>
      <div class="flex flex-col gap-2">
        <Skeleton class="h-3.5 w-[80px]" />
        <Skeleton class="h-10 w-full rounded-md" />
      </div>
      <div class="flex flex-col gap-2">
        <Skeleton class="h-3.5 w-[70px]" />
        <Skeleton class="h-20 w-full rounded-md" />
      </div>
      <div class="flex items-center gap-2">
        <Skeleton class="size-4 rounded-sm" />
        <Skeleton class="h-3.5 w-[160px]" />
      </div>
      <Skeleton class="h-10 w-full rounded-md" />
    </div>
  </DocShowcase>

  <DocShowcase
    :title="t('views.skeleton.showcases.comparison.title')"
    :description="t('views.skeleton.showcases.comparison.description')"
    :code="comparativaCode"
  >
    <div class="grid max-w-2xl gap-8 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <Skeleton class="size-10 rounded-full" />
            <div class="flex flex-col gap-2">
              <Skeleton class="h-4 w-[120px]" />
              <Skeleton class="h-3 w-[80px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <Skeleton class="h-3 w-full" />
          <Skeleton class="h-3 w-full" />
          <Skeleton class="h-3 w-2/3" />
        </CardContent>
        <CardFooter>
          <Skeleton class="h-9 w-24 rounded-md" />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <div
              class="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-bold"
            >
              AG
            </div>
            <div>
              <p class="text-sm font-semibold">Ana García</p>
              <p class="text-muted-foreground text-xs">{{ t('views.skeleton.demo.engineering') }}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-sm">
            {{ t('views.skeleton.demo.seniorDevBio') }}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">{{ t('demo.viewProfile') }}</Button>
        </CardFooter>
      </Card>
    </div>
  </DocShowcase>
</template>
