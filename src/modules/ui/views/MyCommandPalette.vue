<script setup lang="ts">
import { computed, ref, shallowRef, markRaw, type Component } from 'vue';
import { CommandPalette } from '@3df-spa/ui';
import type { CommandPaletteGroup, CommandPaletteItem } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

defineOptions({ name: 'MyCommandPalette' });

const { description, propDesc, showcaseTitle } = useDocPage('commandPalette');

// ── Live demo ────────────────────────────────────────────────────────────────

const open = ref(false);

interface DemoItem {
  value: string;
  label: string;
  description: string;
  color: string;
}

const itemMeta: Record<string, DemoItem> = {
  button:    { value: 'button',    label: 'Button',    description: 'Interactive button with multiple variants and sizes.', color: '#6366f1' },
  badge:     { value: 'badge',     label: 'Badge',     description: 'Small status indicator for labels and categories.',     color: '#8b5cf6' },
  avatar:    { value: 'avatar',    label: 'Avatar',    description: 'User image or initials fallback.',                      color: '#ec4899' },
  card:      { value: 'card',      label: 'Card',      description: 'Container for grouped content sections.',              color: '#f59e0b' },
  accordion: { value: 'accordion', label: 'Accordion', description: 'Collapsible content sections.',                        color: '#10b981' },
  tabs:      { value: 'tabs',      label: 'Tabs',      description: 'Switch between sections within the same view.',        color: '#3b82f6' },
  dialog:    { value: 'dialog',    label: 'Dialog',    description: 'Modal overlay that focuses user attention.',           color: '#ef4444' },
  popover:   { value: 'popover',   label: 'Popover',   description: 'Floating panel anchored to a trigger element.',        color: '#f97316' },
  tooltip:   { value: 'tooltip',   label: 'Tooltip',   description: 'Contextual hint on hover.',                           color: '#14b8a6' },
}

const demoGroups = computed<CommandPaletteGroup[]>(() => [
  {
    label: 'General',
    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    items: ['button', 'badge', 'avatar'].map((k) => ({
      value: itemMeta[k]!.value,
      label: itemMeta[k]!.label,
    })),
  },
  {
    label: 'Layout',
    icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    items: ['card', 'accordion', 'tabs'].map((k) => ({
      value: itemMeta[k]!.value,
      label: itemMeta[k]!.label,
    })),
  },
  {
    label: 'Overlay',
    icon: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3',
    items: ['dialog', 'popover', 'tooltip'].map((k) => ({
      value: itemMeta[k]!.value,
      label: itemMeta[k]!.label,
    })),
  },
])

const previewItem = shallowRef<DemoItem | null>(null);
const previewLoading = ref(false);

async function onSelectedChange(item: CommandPaletteItem | null) {
  if (!item) { previewItem.value = null; return; }
  previewLoading.value = true;
  // Simulate async load
  await new Promise((r) => setTimeout(r, 80));
  previewItem.value = itemMeta[item.value] ?? null;
  previewLoading.value = false;
}

function onSelect(item: CommandPaletteItem) {
  open.value = false;
  console.log('Selected:', item.value);
}

// ── Props table ───────────────────────────────────────────────────────────────

const paletteProps = computed<PropItem[]>(() => [
  { name: 'open',              type: 'boolean',                  default: '-',          description: propDesc('open') },
  { name: 'groups',            type: 'CommandPaletteGroup[]',    default: '-',          description: propDesc('groups') },
  { name: 'searchPlaceholder', type: 'string',                   default: "'Search...'", description: propDesc('searchPlaceholder') },
  { name: 'group.label',       type: 'string',                   default: '-',          description: propDesc('groupLabel') },
  { name: 'group.icon',        type: 'string (SVG path)',         default: '-',          description: propDesc('groupIcon') },
  { name: 'item.value',        type: 'string',                   default: '-',          description: propDesc('itemValue') },
  { name: 'item.label',        type: 'string',                   default: '-',          description: propDesc('itemLabel') },
  { name: 'item.icon',         type: 'string (SVG path)',         default: '-',          description: propDesc('itemIcon') },
  { name: 'item.keywords',     type: 'string[]',                  default: '[]',         description: propDesc('itemKeywords') },
]);

// Used in code snippet strings to avoid HTML parser / linter issues with <script> tags
const OPEN_SCRIPT = '<script' + ' setup>'
const CLOSE_SCRIPT = '</' + 'script>'

// ── Code snippets ─────────────────────────────────────────────────────────────

const basicCode = `${OPEN_SCRIPT}
import { ref } from 'vue'
import { CommandPalette } from '@3df/ui'
import type { CommandPaletteGroup, CommandPaletteItem } from '@3df/ui'

const open = ref(false)

const groups: CommandPaletteGroup[] = [
  {
    label: 'General',
    icon: 'M21 16V8...',
    items: [
      { value: 'button', label: 'Button' },
      { value: 'badge',  label: 'Badge'  },
    ],
  },
  {
    label: 'Layout',
    items: [
      { value: 'card',      label: 'Card'      },
      { value: 'accordion', label: 'Accordion' },
    ],
  },
]

function onSelect(item: CommandPaletteItem) {
  console.log('selected:', item.value)
}
${CLOSE_SCRIPT}

<template>
  <button @click="open = true">Open Palette</button>

  <CommandPalette
    v-model:open="open"
    :groups="groups"
    search-placeholder="Search components..."
    @select="onSelect"
  />
</template>`;

const previewSlotCode = `<CommandPalette
  v-model:open="open"
  :groups="groups"
  @update:selected="loadPreview"
  @select="onSelect"
>
  <template #preview="{ item, close }">
    <!-- item is null when nothing is selected -->
    <div v-if="item" class="flex flex-col h-full">
      <!-- Custom header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <h3 class="font-semibold">{{ item.label }}</h3>
        <button @click="close">✕</button>
      </div>

      <!-- Custom content: your component preview, docs, etc. -->
      <div class="flex-1 overflow-auto p-6">
        <component :is="previewComponent" />
      </div>
    </div>

    <!-- Empty state when nothing is selected -->
    <div v-else class="flex h-full items-center justify-center text-muted-foreground">
      Select an item to preview
    </div>
  </template>
</CommandPalette>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="CommandPalette"
      :description="description"
      import-code="import { CommandPalette } from '@3df/ui'
import type { CommandPaletteItem, CommandPaletteGroup } from '@3df/ui'"
    />

    <!-- Live demo -->
    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <button
        class="bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted/80 transition-colors"
        @click="open = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        Open Command Palette
        <kbd class="bg-background rounded border px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
      </button>

      <CommandPalette
        :open="open"
        :groups="demoGroups"
        search-placeholder="Search components..."
        @update:open="open = $event"
        @update:selected="onSelectedChange"
        @select="onSelect"
      >
        <template #preview="{ item, close }">
          <!-- Loading state -->
          <div v-if="previewLoading" class="flex h-full items-center justify-center">
            <svg class="w-5 h-5 animate-spin text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>

          <!-- Item preview -->
          <template v-else-if="previewItem && item">
            <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-background/60 backdrop-blur-sm shrink-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-sm">{{ item.label }}</span>
              </div>
              <button class="rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 flex-col items-start justify-center gap-4 p-8">
              <!-- Color swatch -->
              <div
                class="w-12 h-12 rounded-xl shadow-md"
                :style="{ backgroundColor: previewItem.color }"
              />
              <div>
                <h3 class="text-xl font-bold">{{ previewItem.label }}</h3>
                <p class="text-sm text-muted-foreground mt-1">{{ previewItem.description }}</p>
              </div>
              <code class="text-xs bg-muted px-3 py-1.5 rounded-md font-mono">
                import {'{'} {{ previewItem.label }} {'}'} from '@3df/ui'
              </code>
            </div>
          </template>

          <!-- Empty state -->
          <div v-else class="flex h-full flex-col items-center justify-center gap-3 text-center px-8 relative">
            <button class="absolute top-2 right-2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity" @click="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
            <div class="rounded-full bg-muted p-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6 text-muted-foreground">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium">Select a component</p>
              <p class="text-xs text-muted-foreground/60 mt-1">Use the search or browse the groups</p>
            </div>
          </div>
        </template>
      </CommandPalette>
    </DocShowcase>

    <!-- Custom preview slot code -->
    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ showcaseTitle('customPreview') }}</h2>
      <p class="text-sm text-muted-foreground">
        The <code class="bg-muted rounded px-1 font-mono text-xs">#preview</code> slot receives
        <code class="bg-muted rounded px-1 font-mono text-xs">{ item, close }</code> and gives you
        full control of the right panel.
      </p>
      <DocCodeBlock :code="previewSlotCode" lang="vue" />
    </section>

    <!-- Slots -->
    <section class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold">Slots</h2>
      <div class="overflow-auto rounded-lg border border-border">
        <table class="w-full text-sm">
          <thead class="bg-muted/50 text-muted-foreground">
            <tr>
              <th class="px-4 py-2.5 text-left font-medium">Slot</th>
              <th class="px-4 py-2.5 text-left font-medium">Scope</th>
              <th class="px-4 py-2.5 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr>
              <td class="px-4 py-2.5 font-mono text-xs">#preview</td>
              <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{ item, close }</td>
              <td class="px-4 py-2.5 text-muted-foreground">Full right panel. <code class="bg-muted px-1 rounded">item</code> is <code class="bg-muted px-1 rounded">null</code> when nothing is selected.</td>
            </tr>
            <tr>
              <td class="px-4 py-2.5 font-mono text-xs">#item</td>
              <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{ item, group, isSelected }</td>
              <td class="px-4 py-2.5 text-muted-foreground">Custom render for each list item. Replaces the default icon + label.</td>
            </tr>
            <tr>
              <td class="px-4 py-2.5 font-mono text-xs">#empty</td>
              <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">—</td>
              <td class="px-4 py-2.5 text-muted-foreground">Content shown in the list when no items match the search.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <DocPropsTable :props="paletteProps" />
  </div>
</template>
