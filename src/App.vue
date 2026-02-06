<script setup lang="ts">
import { uiVersion } from '@3df/ui';
</script>

<template>
  <main class="min-h-screen p-8">
    <div class="border-border bg-card rounded-lg border p-4">
      UI package: <span class="font-semibold">{{ uiVersion }}</span>
    </div>
  </main>
</template>

<style scoped></style>
