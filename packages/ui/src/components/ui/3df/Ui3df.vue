<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { cn } from '../../../lib/utils'
import type { ClassValue } from 'clsx'
import { use3dfConfig } from './use-3df-config'
import Ui3dfRadius from './Ui3dfRadius.vue'
import Ui3dfBorderOpacity from './Ui3dfBorderOpacity.vue'
import Ui3dfLetterSpacing from './Ui3dfLetterSpacing.vue'

defineOptions({ name: 'Ui3dfCustomizer', inheritAttrs: false })

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue }
const restAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})

const { config, reset } = use3dfConfig()

defineExpose({ config, reset })
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('flex flex-col gap-6 p-4 rounded-xl border-ui border-border bg-card text-card-foreground', attrs.class)"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold">Personalización 3DF</h3>
      <button
        @click="reset"
        class="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Resetear
      </button>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-xs font-medium text-muted-foreground">Radio</label>
      <Ui3dfRadius
        :model-value="config.radiusStep"
        @update:model-value="config.radiusStep = $event"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-xs font-medium text-muted-foreground">Opacidad de borde</label>
      <Ui3dfBorderOpacity
        :model-value="config.borderOpacity"
        @update:model-value="config.borderOpacity = $event"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-xs font-medium text-muted-foreground">Espaciado de letras</label>
      <Ui3dfLetterSpacing
        :model-value="config.letterSpacing"
        @update:model-value="config.letterSpacing = $event"
      />
    </div>
  </div>
</template>
