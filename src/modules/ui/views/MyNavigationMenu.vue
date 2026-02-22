<script setup lang="ts">
import NavMenuDemoCentered from './_components/NavMenuDemoCentered.vue';
import NavMenuDemoComplete from './_components/NavMenuDemoComplete.vue';
import NavMenuDemoDirectLinks from './_components/NavMenuDemoDirectLinks.vue';
import NavMenuDemoMega from './_components/NavMenuDemoMega.vue';
import NavMenuDemoMultiCategory from './_components/NavMenuDemoMultiCategory.vue';
import NavMenuDemoNavbar from './_components/NavMenuDemoNavbar.vue';
import NavMenuDemoReference from './_components/NavMenuDemoReference.vue';
import NavMenuDemoSimple from './_components/NavMenuDemoSimple.vue';
</script>

<template>
  <div class="space-y-16 p-8">
    <div>
      <h1 class="text-3xl font-bold">Navigation Menu</h1>
      <p class="text-muted-foreground mt-2">
        Menú de navegación horizontal con paneles desplegables, transiciones suaves y soporte de
        teclado.
      </p>
    </div>

    <NavMenuDemoComplete />
    <NavMenuDemoCentered />
    <NavMenuDemoMultiCategory />
    <NavMenuDemoSimple />
    <NavMenuDemoNavbar />
    <NavMenuDemoDirectLinks />
    <NavMenuDemoMega />
    <NavMenuDemoReference />
  </div>
</template>
