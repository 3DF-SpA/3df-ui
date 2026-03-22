<script setup lang="ts">
import { Ui3df, use3dfConfig } from '@3df-spa/ui'

defineOptions({ name: 'My3dfDemo' })

use3dfConfig()
</script>

<template>
  <div class="container mx-auto max-w-4xl py-10 flex flex-col gap-10">
    <div>
      <h1 class="text-3xl font-bold">3DF Customizer</h1>
      <p class="text-muted-foreground mt-2">Personaliza la apariencia global de los componentes.</p>
    </div>

    <!-- Panel live -->
    <Ui3df />

    <!-- Setup guide -->
    <div class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold">Uso</h2>
      <p class="text-sm text-muted-foreground">
        Llama <code class="bg-muted px-1 rounded">use3dfConfig()</code> en tu
        <code class="bg-muted px-1 rounded">App.vue</code> para restaurar la configuración al recargar:
      </p>
      <pre class="bg-muted rounded-lg p-4 text-sm overflow-x-auto"><code>import { use3dfConfig } from '@3df-spa/ui'
const { config, reset } = use3dfConfig()</code></pre>

      <p class="text-sm text-muted-foreground">O usa el panel con v-model:</p>
      <pre class="bg-muted rounded-lg p-4 text-sm overflow-x-auto"><code>&lt;Ui3df /&gt;</code></pre>
    </div>
  </div>
</template>
