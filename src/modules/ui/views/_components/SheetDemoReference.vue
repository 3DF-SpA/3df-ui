<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const codeScrollable = `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Contenido largo</Button>
  </SheetTrigger>
  <SheetContent class="overflow-y-auto">
    <SheetHeader>
      <SheetTitle>Términos y condiciones</SheetTitle>
      <SheetDescription>Lee los términos antes de continuar.</SheetDescription>
    </SheetHeader>
    <div class="flex flex-col gap-4 py-4">
      <p v-for="i in 20" :key="i">Lorem ipsum...</p>
    </div>
    <SheetFooter>
      <SheetClose><Button variant="outline">Rechazar</Button></SheetClose>
      <SheetClose><Button>Aceptar</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const codeCustomWidth = `<SheetContent class="sm:max-w-lg">
  <!-- Ancho personalizado con sm:max-w-lg -->
</SheetContent>

<SheetContent class="sm:max-w-2xl">
  <!-- Ancho extra con sm:max-w-2xl -->
</SheetContent>`;
</script>

<template>
  <DocShowcase :title="t('demo.sheet.scrollableTitle')" :code="codeScrollable">
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">{{ t('demo.sheet.longContent') }}</Button>
      </SheetTrigger>
      <SheetContent class="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{{ t('demo.sheet.termsTitle') }}</SheetTitle>
          <SheetDescription> {{ t('demo.sheet.termsDesc') }} </SheetDescription>
        </SheetHeader>
        <div class="flex flex-col gap-4 py-4">
          <p v-for="i in 20" :key="i" class="text-muted-foreground text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button variant="outline">{{ t('demo.sheet.reject') }}</Button>
          </SheetClose>
          <SheetClose>
            <Button>{{ t('demo.sheet.accept') }}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </DocShowcase>

  <DocShowcase :title="t('demo.sheet.customWidthTitle')" :code="codeCustomWidth">
    <div class="flex gap-4">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">{{ t('demo.sheet.wideLg') }}</Button>
        </SheetTrigger>
        <SheetContent class="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{{ t('demo.sheet.widePanelTitle') }}</SheetTitle>
            <SheetDescription>
              {{ t('demo.sheet.widePanelDesc') }}
              <code class="text-foreground font-mono text-xs">sm:max-w-lg</code>.
            </SheetDescription>
          </SheetHeader>
          <div class="py-4">
            <p class="text-muted-foreground text-sm">{{ t('demo.sheet.widePanelContent') }}</p>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">{{ t('demo.sheet.extraWide2xl') }}</Button>
        </SheetTrigger>
        <SheetContent class="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{{ t('demo.sheet.extraWidePanelTitle') }}</SheetTitle>
            <SheetDescription>
              {{ t('demo.sheet.extraWidePanelDesc') }}
              <code class="text-foreground font-mono text-xs">sm:max-w-2xl</code>.
            </SheetDescription>
          </SheetHeader>
          <div class="py-4">
            <p class="text-muted-foreground text-sm">{{ t('demo.sheet.extraWidePanelContent') }}</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </DocShowcase>
</template>
