<script setup lang="ts">
import { shallowRef, ref, markRaw, computed, type Component } from 'vue'
import { useRouter } from 'vue-router'
import { CommandPalette } from '@3df-spa/ui'
import type { CommandPaletteItem, CommandPaletteGroup } from '@3df-spa/ui'
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

const groupIconMap: Record<string, string> = {
  General:     'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
  Layout:      'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  Formularios: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM8 13h8M8 17h5M14 2v6h6',
  Navegación:  'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  Charts:      'M18 20V10M12 20V4M6 20v-6',
  Feedback:    'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  Overlay:     'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  Data:        'M12 2C6.48 2 2 4.69 2 8s4.48 6 10 6 10-2.69 10-6-4.48-6-10-6zM2 8v4c0 3.31 4.48 6 10 6s10-2.69 10-6V8M2 12v4c0 3.31 4.48 6 10 6s10-2.69 10-6v-4',
  Media:       'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10.5 7H5l4-5 3 3.5 3-2.5 4 4z',
  Other:       'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
}

function buildGroups(routes: typeof uiRoutes, prefix: string): CommandPaletteGroup[] {
  const map = new Map<string, CommandPaletteItem[]>()
  for (const r of routes) {
    const group = (r.meta?.group as string) ?? 'Other'
    if (!map.has(group)) map.set(group, [])
    map.get(group)!.push({
      value: `${prefix}/${r.path}`,
      label: r.name as string,
      group,
    })
  }
  return Array.from(map.entries()).map(([label, items]) => ({
    label,
    icon: groupIconMap[label] ?? groupIconMap['Other']!,
    items,
  }))
}

const groups = computed<CommandPaletteGroup[]>(() => [
  ...buildGroups(uiRoutes, '/ui'),
  ...buildGroups(chartRoutes, '/charts'),
])

// Preview state
const previewComponent = shallowRef<Component | null>(null)
const currentItem = ref<CommandPaletteItem | null>(null)

async function loadPreview(item: CommandPaletteItem | null) {
  currentItem.value = item
  if (!item) { previewComponent.value = null; return }
  const factory = componentMap.get(item.value)
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
}

function onSelect(item: CommandPaletteItem) {
  router.push(item.value)
}

function onOpenChange(val: boolean) {
  emit('update:open', val)
  if (!val) {
    previewComponent.value = null
    currentItem.value = null
  }
}
</script>

<template>
  <CommandPalette
    :open="props.open"
    :groups="groups"
    search-placeholder="Buscar componente..."
    @update:open="onOpenChange"
    @update:selected="loadPreview"
    @select="onSelect"
  >
    <template #preview="{ item, close }">
      <template v-if="previewComponent && item">
        <!-- Preview header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-background/60 backdrop-blur-sm shrink-0">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm">{{ item.label }}</span>
            <span class="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {{ (item as any).group }}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              @click="onSelect(item); close()"
            >
              Abrir
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
            <button class="rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity" @click="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Preview content -->
        <div class="flex-1 overflow-auto p-6">
          <Transition name="preview" mode="out-in">
            <component :is="previewComponent" :key="item.value" />
          </Transition>
        </div>
      </template>
      <!-- Empty state with close button -->
      <div v-else class="flex h-full flex-col items-center justify-center gap-3 text-center px-8 relative">
        <button class="absolute top-2 right-2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
        <div class="rounded-full bg-muted p-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6 text-muted-foreground">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium">Selecciona un componente</p>
          <p class="text-xs text-muted-foreground/60 mt-1">Usa el buscador o navega por grupos</p>
        </div>
      </div>
    </template>
  </CommandPalette>
</template>

<style scoped>
.preview-enter-active,
.preview-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.preview-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.preview-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
