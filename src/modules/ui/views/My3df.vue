<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'My3dfDemo' });

import {
  Ui3df,
  Ui3dfRadius,
  Ui3dfBorderOpacity,
  Ui3dfLetterSpacing,
  use3dfConfig,
  DEFAULT_CONFIG,
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@3df-spa/ui';
import type { Ui3dfConfig } from '@3df-spa/ui';

const { config, reset } = use3dfConfig();

// v-model example
const controlledConfig = ref<Partial<Ui3dfConfig>>({ ...DEFAULT_CONFIG });
</script>

<template>
  <div class="flex flex-col gap-10">
    <!-- Page header -->
    <div>
      <h1 class="text-2xl font-bold">3DF Customizer</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Runtime design token customizer. Changes persist in
        <code class="text-xs bg-muted px-1 py-0.5 rounded">localStorage</code>
        and survive page reloads.
      </p>
    </div>

    <!-- SECTION 1: Setup -->
    <section class="flex flex-col gap-3">
      <h2 class="text-base font-semibold">1. Setup — App.vue</h2>
      <p class="text-sm text-muted-foreground">
        Add one line to your root component to restore saved config on every page load:
      </p>
      <pre class="rounded-lg bg-muted p-4 text-xs overflow-x-auto"><code>// App.vue
import { use3dfConfig } from '@3df-spa/ui'
use3dfConfig() // loads localStorage → applies CSS vars on mount</code></pre>
    </section>

    <!-- SECTION 2: Panel + Live preview -->
    <section class="flex flex-col gap-4">
      <h2 class="text-base font-semibold">2. Panel Visual</h2>
      <p class="text-sm text-muted-foreground">
        Drop
        <code class="text-xs bg-muted px-1 py-0.5 rounded">&lt;Ui3df /&gt;</code>
        anywhere — settings page, sidebar, floating panel.
      </p>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Panel -->
        <div class="flex flex-col gap-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Panel</span>
          <Ui3df />
        </div>

        <!-- Live preview -->
        <div class="flex flex-col gap-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview en tiempo real</span>
          <div class="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <Input placeholder="Text input..." />
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text here.</CardDescription>
            </CardHeader>
            <CardContent>Content that reacts to radius, border and letter-spacing changes.</CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- SECTION 3: Composable usage -->
    <section class="flex flex-col gap-3">
      <h2 class="text-base font-semibold">3. Composable — use3dfConfig()</h2>
      <p class="text-sm text-muted-foreground">
        Access and mutate the config directly. Changes are saved and applied automatically.
      </p>
      <pre class="rounded-lg bg-muted p-4 text-xs overflow-x-auto"><code>import { use3dfConfig } from '@3df-spa/ui'

const { config, reset } = use3dfConfig()

// Read
// { version: 1, radiusStep: 4, borderOpacity: 0.2, letterSpacing: 0 }

// Mutate — auto-saves to localStorage + applies CSS vars
config.value.radiusStep = 6      // → --ui-radius: 2rem
config.value.borderOpacity = 0.8

// Reset to defaults
reset()</code></pre>

      <!-- Live state display -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">Estado actual del config</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-1 font-mono text-xs">
            <span>version: <strong>{{ config.version }}</strong></span>
            <span>radiusStep: <strong>{{ config.radiusStep }}</strong></span>
            <span>borderOpacity: <strong>{{ config.borderOpacity }}</strong></span>
            <span>letterSpacing: <strong>{{ config.letterSpacing }}</strong></span>
          </div>
          <Button class="mt-3" variant="outline" size="sm" @click="reset()">Reset a defaults</Button>
        </CardContent>
      </Card>
    </section>

    <!-- SECTION 4: v-model -->
    <section class="flex flex-col gap-3">
      <h2 class="text-base font-semibold">4. Modo controlado — v-model</h2>
      <p class="text-sm text-muted-foreground">
        Pasa tu propio estado reactivo como
        <code class="text-xs bg-muted px-1 py-0.5 rounded">v-model</code>
        para sincronización bidireccional.
      </p>
      <pre class="rounded-lg bg-muted p-4 text-xs overflow-x-auto"><code>&lt;Ui3df v-model="myConfig" /&gt;

// myConfig se actualiza automáticamente cuando el usuario mueve los sliders</code></pre>
      <Ui3df v-model="controlledConfig" title="Panel Controlado" />
      <Card>
        <CardContent class="pt-4">
          <pre class="text-xs">{{ JSON.stringify(controlledConfig, null, 2) }}</pre>
        </CardContent>
      </Card>
    </section>

    <!-- SECTION 5: Individual sliders -->
    <section class="flex flex-col gap-3">
      <h2 class="text-base font-semibold">5. Sliders individuales</h2>
      <p class="text-sm text-muted-foreground">
        Usa cada slider por separado si no quieres el panel completo.
      </p>
      <pre class="rounded-lg bg-muted p-4 text-xs overflow-x-auto"><code>import { Ui3dfRadius, Ui3dfBorderOpacity, Ui3dfLetterSpacing } from '@3df-spa/ui'</code></pre>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><CardContent class="pt-4"><Ui3dfRadius /></CardContent></Card>
        <Card><CardContent class="pt-4"><Ui3dfBorderOpacity /></CardContent></Card>
        <Card><CardContent class="pt-4"><Ui3dfLetterSpacing /></CardContent></Card>
      </div>
    </section>
  </div>
</template>
