# Contributing to 3DF UI

## Setup

```bash
pnpm install
pnpm dev          # playground en localhost:5173
pnpm build:ui     # compila @3df-spa/ui
pnpm build:charts # compila @3df-spa/charts
pnpm type-check   # verifica tipos estrictamente
pnpm lint         # oxlint + eslint con auto-fix
```

## Convenciones obligatorias

### Patrón de componente

Todo componente en `packages/ui/` **debe** seguir este patrón:

```vue
<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiComponentName', inheritAttrs: false });

const props = withDefaults(defineProps<{ /* props */ }>(), { /* defaults */ });

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="restAttrs" :class="cn('base-classes', attrs.class)">
    <slot />
  </div>
</template>
```

### Reglas críticas

| ✅ Hacer | ❌ No hacer |
|---|---|
| `<script setup lang="ts">` | Options API |
| `defineOptions({ inheritAttrs: false })` | Omitir `inheritAttrs: false` |
| `cn()` para todas las clases | Template literals para clases |
| `border-ui` para bordes | `border`, `border-2`, `ring-1` |
| Tokens Tailwind v4 `@theme` | `tailwind.config.js` (v3) |
| CVA variants en `[name]-variants.ts` | Variantes inline |
| Compound contexts en `[name]-types.ts` | Contextos sin tipado |
| IDs con contador de módulo | `Math.random()` para IDs |
| `onBeforeUnmount` para cleanup | `onUnmounted` |
| `v-show` + CSS para animaciones | `<Transition>` |

### IDs únicos (patrón obligatorio)

```vue
<script lang="ts">
let _myCounter = 0;
</script>
<script setup lang="ts">
const uid = `my-component-${++_myCounter}`;
</script>
```

### Bordes

```html
<!-- ✅ Correcto -->
<div class="border-ui border-border">...</div>
<!-- ❌ Incorrecto -->
<div class="border-2 border-gray-200">...</div>
```

## Agregar un componente

1. Crea `packages/ui/src/components/ui/[name]/`
2. Crea `Ui[Name].vue` siguiendo el patrón
3. Si tiene variantes: `[name]-variants.ts` con CVA
4. Si es compuesto: `[name]-types.ts` con `InjectionKey`
5. Exporta desde el barrel apropiado con JSDoc
6. Agrega demo en `src/modules/ui/views/My[Name].vue`
7. Registra la ruta en `src/router/index.ts`
8. Compila: `pnpm build:ui`

## Agregar un chart

1. Crea `packages/charts/src/chart[name]/`
2. Usa el slot pattern de `UiChartContainer`
3. Exporta desde `packages/charts/src/index.ts`
4. Compila: `pnpm build:charts`

## Publicar

```bash
pnpm changeset         # describe el cambio
pnpm version-packages  # aplica versiones + CHANGELOG
pnpm release           # build + publish
```

## Estructura de commits

```
feat(ui): add Tabs component
fix(charts): remove Math.random from uid generation
docs: update CONTRIBUTING guidelines
```
