<script setup lang="ts">
import { shallowRef, ref, watch, markRaw, computed, type Component } from 'vue'
import { useRouter } from 'vue-router'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@3df-spa/ui'
import { uiRoutes, chartRoutes } from '@/router'

defineOptions({ name: 'CommandPaletteDemo' })

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [boolean] }>()

const router = useRouter()

type RouteFactory = () => Promise<{ default: Component }>

const componentMap = new Map<string, RouteFactory>()
uiRoutes.forEach((r) => {
  if (r.component && typeof r.component === 'function') {
    componentMap.set(`/ui/${r.path}`, r.component as RouteFactory)
  }
})
chartRoutes.forEach((r) => {
  if (r.component && typeof r.component === 'function') {
    componentMap.set(`/charts/${r.path}`, r.component as RouteFactory)
  }
})

interface PaletteItem {
  name: string
  fullPath: string
  group: string
}

interface PaletteGroup {
  label: string
  items: PaletteItem[]
}

function buildGroups(routes: typeof uiRoutes, prefix: string): PaletteGroup[] {
  const map = new Map<string, PaletteItem[]>()
  for (const r of routes) {
    const group = (r.meta?.group as string) ?? 'Other'
    if (!map.has(group)) map.set(group, [])
    map.get(group)!.push({
      name: r.name as string,
      fullPath: `${prefix}/${r.path}`,
      group,
    })
  }
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }))
}

const allGroups = computed<PaletteGroup[]>(() => [
  ...buildGroups(uiRoutes, '/ui'),
  ...buildGroups(chartRoutes, '/charts'),
])

// Preview state
const previewPath = ref('')
const previewComponent = shallowRef<Component | null>(null)

watch(previewPath, async (p) => {
  if (!p) { previewComponent.value = null; return }
  const factory = componentMap.get(p)
  if (factory) {
    try {
      const mod = await factory()
      previewComponent.value = markRaw(mod.default)
    } catch {
      previewComponent.value = null
    }
  } else {
    previewComponent.value = null
  }
})

function onSelect(value: string) {
  router.push(value)
  emit('update:open', false)
  previewPath.value = ''
  previewComponent.value = null
}

function onOpenChange(val: boolean) {
  emit('update:open', val)
  if (!val) {
    previewPath.value = ''
    previewComponent.value = null
  }
}
</script>

<template>
  <CommandDialog
    :open="props.open"
    :show-close="true"
    class="sm:max-w-[860px]"
    @update:open="onOpenChange"
    @update:selected="previewPath = $event"
    @select="onSelect"
  >
    <div class="flex h-[540px] p-3 gap-3">
      <!-- Lista izquierda -->
      <div class="flex w-[320px] shrink-0 flex-col border border-border rounded-lg overflow-hidden">
        <CommandInput placeholder="Buscar componente..." />
        <CommandList class="flex-1 overflow-auto">
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup
            v-for="group in allGroups"
            :key="group.label"
            :heading="group.label"
          >
            <CommandItem
              v-for="item in group.items"
              :key="item.fullPath"
              :value="item.fullPath"
              @select="onSelect(item.fullPath)"
            >
              {{ item.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
      <!-- Preview derecha -->
      <div class="flex-1 overflow-auto bg-muted/30 rounded-lg">
        <div v-if="previewComponent" class="h-full overflow-auto p-6">
          <component :is="previewComponent" />
        </div>
        <div v-else class="flex h-full items-center justify-center text-muted-foreground text-sm">
          <span>Selecciona un componente para ver la preview</span>
        </div>
      </div>
    </div>
  </CommandDialog>
</template>
