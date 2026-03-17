<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, getLocale } from '@/i18n'

useI18n()
const current = ref(getLocale())

function toggle() {
  const next = current.value === 'es' ? 'en' : 'es'
  current.value = next
  setLocale(next)
}
</script>

<template>
  <button
    class="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
    :aria-label="`Switch language to ${current === 'es' ? 'English' : 'Español'}`"
    @click="toggle"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
    <span class="uppercase tracking-wider">{{ current === 'es' ? 'EN' : 'ES' }}</span>
  </button>
</template>
