<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, nextTick } from 'vue'
import type { App } from 'vue'
import { EditorView } from 'codemirror'
import { initEditor, renderPreview } from '@/composables/useDemoEditor'
import { Badge, Separator } from '@3df-spa/ui'

defineOptions({ name: 'DemoZone' })

const DEFAULT_CODE = `\x3Cscript setup>
// ref, computed, reactive, watch, onMounted ya están disponibles
const count = ref(0)
const name = ref('Mundo')
const checked = ref(false)
\x3C/script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Hola, {{ name }} 👋</h1>
    <div class="flex gap-2 flex-wrap">
      <Button @click="count++">Clicks: {{ count }}</Button>
      <Button variant="outline" @click="count = 0">Reset</Button>
    </div>
    <div class="flex items-center gap-2">
      <Switch :checked="checked" @update:checked="checked = $event" />
      <Label>Switch: {{ checked ? 'ON' : 'OFF' }}</Label>
    </div>
    <Input v-model="name" placeholder="Escribe tu nombre..." class="max-w-xs" />
    <Badge variant="secondary">@3df-spa/ui</Badge>
  </div>
</template>`

const activeTab = ref<'editor' | 'guide'>('editor')

const GUIDE_CATEGORIES = [
  { name: '🖱️ Botones & Inputs', components: ['Button', 'Input', 'Textarea', 'Label', 'Checkbox', 'Switch', 'Slider', 'Toggle'] },
  { name: '📦 Display', components: ['Badge', 'Avatar', 'Card', 'CardHeader', 'CardContent', 'CardTitle', 'CardDescription', 'Separator', 'Skeleton', 'Progress', 'Kbd'] },
  { name: '🗃️ Datos', components: ['Table', 'TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell', 'Pagination'] },
  { name: '🪟 Overlays', components: ['Dialog', 'DialogTrigger', 'DialogContent', 'Sheet', 'Drawer', 'Popover', 'PopoverTrigger', 'PopoverContent', 'Tooltip', 'TooltipTrigger', 'TooltipContent', 'DropdownMenu'] },
  { name: '🗂️ Navegación', components: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent', 'Breadcrumb', 'Menubar'] },
  { name: '📂 Disclosure', components: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent', 'Collapsible'] },
  { name: '🔔 Feedback', components: ['Alert', 'AlertDescription', 'AlertTitle', 'Sonner', 'EmptyState'] },
  { name: '🔽 Selección', components: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'Combobox', 'Command'] },
]

const editorContainer = ref<HTMLElement | null>(null)
const previewContainer = ref<HTMLElement | null>(null)
const previewApp = shallowRef<App | null>(null)
let editorView: EditorView | null = null

let debounceTimer: ReturnType<typeof setTimeout>
function onCodeUpdate(newCode: string) {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (previewContainer.value) {
      previewApp.value = renderPreview(newCode, previewContainer.value, previewApp.value)
    }
  }, 400)
}

onMounted(() => {
  if (editorContainer.value) {
    editorView = initEditor(editorContainer.value, onCodeUpdate, DEFAULT_CODE)
  }
  // Initial render after next tick so container exists
  nextTick(() => {
    if (previewContainer.value) {
      previewApp.value = renderPreview(DEFAULT_CODE, previewContainer.value, null)
    }
  })
})

onUnmounted(() => {
  clearTimeout(debounceTimer)
  editorView?.destroy()
  previewApp.value?.unmount()
})
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-background text-foreground">
    <!-- Panel izquierdo -->
    <div class="flex w-1/2 flex-col border-r border-border">
      <!-- Header con tabs -->
      <div class="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-1.5">
        <div class="flex rounded-md overflow-hidden border border-border text-xs">
          <button
            :class="['px-3 py-1 transition-colors', activeTab === 'editor' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground']"
            @click="activeTab = 'editor'"
          >⌨️ Editor</button>
          <button
            :class="['px-3 py-1 transition-colors border-l border-border', activeTab === 'guide' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground']"
            @click="activeTab = 'guide'"
          >📖 Guía</button>
        </div>
        <span class="ml-auto text-xs text-muted-foreground">Vue SFC · Tailwind · @3df-spa/ui</span>
      </div>

      <!-- Editor CodeMirror -->
      <div ref="editorContainer" class="h-full overflow-auto" :class="{ 'hidden': activeTab === 'guide' }" />

      <!-- Guía de uso -->
      <div v-if="activeTab === 'guide'" class="h-full overflow-auto p-5 space-y-5 text-sm">
        <div>
          <h2 class="text-base font-semibold text-foreground mb-1">📚 Cómo usar el editor</h2>
          <p class="text-muted-foreground text-xs leading-relaxed">
            Escribe un Vue SFC en el editor. La sección <code class="bg-muted px-1 rounded font-mono">&lt;template&gt;</code> es obligatoria.
            La sección <code class="bg-muted px-1 rounded font-mono">&lt;script setup&gt;</code> es opcional.
          </p>
        </div>

        <div class="rounded-md bg-muted p-3 text-xs font-mono space-y-1 text-foreground">
          <p class="text-muted-foreground">// Composables disponibles sin importar:</p>
          <p><span class="text-blue-500">ref</span>, <span class="text-blue-500">computed</span>, <span class="text-blue-500">reactive</span>, <span class="text-blue-500">watch</span>, <span class="text-blue-500">onMounted</span></p>
          <p class="text-muted-foreground mt-2">// HTML y Tailwind CSS también funcionan:</p>
          <p>&lt;<span class="text-green-500">div</span> <span class="text-yellow-500">class</span>="<span class="text-orange-400">p-4 flex gap-2</span>"&gt;...&lt;/div&gt;</p>
        </div>

        <Separator />

        <div class="space-y-4">
          <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Componentes disponibles</h3>
          <div v-for="cat in GUIDE_CATEGORIES" :key="cat.name" class="space-y-1.5">
            <p class="text-xs font-medium text-foreground">{{ cat.name }}</p>
            <div class="flex flex-wrap gap-1">
              <Badge
                v-for="comp in cat.components"
                :key="comp"
                variant="outline"
                class="font-mono text-xs cursor-default"
              >{{ comp }}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div class="text-xs text-muted-foreground space-y-1">
          <p>💡 Los componentes se usan <strong>sin prefijo</strong> — escribe <code class="bg-muted px-1 rounded">&lt;Button&gt;</code> no <code class="bg-muted px-1 rounded">&lt;UiButton&gt;</code></p>
          <p>🎨 Tailwind CSS completo disponible en el preview</p>
          <p>⚡ El preview se actualiza automáticamente con 400ms de debounce</p>
        </div>
      </div>
    </div>

    <!-- Preview panel -->
    <div class="flex w-1/2 flex-col">
      <div class="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preview</span>
        <span class="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>
      <div
        ref="previewContainer"
        class="h-full w-full overflow-auto bg-background p-4"
      />
    </div>
  </div>
</template>
