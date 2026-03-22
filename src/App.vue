<script setup lang="ts">
import { use3dfConfig } from '@3df-spa/ui'

use3dfConfig()
</script>

<template>
  <div style="letter-spacing: var(--ui-letter-spacing)">
    <RouterView />
  </div>
</template>
